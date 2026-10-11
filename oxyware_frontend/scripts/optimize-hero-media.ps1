param(
    [string]$PublicDirectory = (Join-Path $PSScriptRoot '../public')
)

# Run with Windows PowerShell 5.1. Uses the Windows encoder; no downloads required.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
Add-Type -AssemblyName System.Drawing
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFolder, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Transcoding.MediaTranscoder, Windows.Media, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.MediaProperties.MediaEncodingProfile, Windows.Media, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.MediaProperties.VideoEncodingQuality, Windows.Media, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.FileProperties.ThumbnailMode, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.FileProperties.ThumbnailOptions, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.FileProperties.StorageItemThumbnail, Windows.Storage, ContentType = WindowsRuntime] | Out-Null

$operationMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and
    $_.GetGenericArguments().Count -eq 1 -and $_.GetParameters().Count -eq 1 -and
    $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
} | Select-Object -First 1
$progressMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and
    $_.GetGenericArguments().Count -eq 1 -and $_.GetParameters().Count -eq 1 -and
    $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncActionWithProgress`1'
} | Select-Object -First 1

function Wait-Operation($Operation, [type]$ResultType) {
    $task = $operationMethod.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
    return $task.GetAwaiter().GetResult()
}

$publicPath = (Resolve-Path -LiteralPath $PublicDirectory).Path
$outputPath = Join-Path $publicPath 'media/hero/v1'
New-Item -ItemType Directory -Path $outputPath -Force | Out-Null
$outputFolder = Wait-Operation ([Windows.Storage.StorageFolder]::GetFolderFromPathAsync($outputPath)) ([Windows.Storage.StorageFolder])
$inputs = @('abackgroundvideo.mp4', 'segundo.mp4', 'terceiro.mp4', 'quarto.mp4')

for ($index = 0; $index -lt $inputs.Count; $index++) {
    $number = '{0:00}' -f ($index + 1)
    $inputFile = Wait-Operation ([Windows.Storage.StorageFile]::GetFileFromPathAsync((Join-Path $publicPath $inputs[$index]))) ([Windows.Storage.StorageFile])
    $thumbnail = Wait-Operation ($inputFile.GetThumbnailAsync([Windows.Storage.FileProperties.ThumbnailMode]::VideosView, 1280, [Windows.Storage.FileProperties.ThumbnailOptions]::UseCurrentScale)) ([Windows.Storage.FileProperties.StorageItemThumbnail])
    $thumbnailStream = [System.IO.WindowsRuntimeStreamExtensions]::AsStreamForRead($thumbnail)
    $posterImage = [System.Drawing.Image]::FromStream($thumbnailStream)
    try { $posterImage.Save((Join-Path $outputPath "$number-poster.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg) }
    finally { $posterImage.Dispose(); $thumbnailStream.Dispose(); $thumbnail.Dispose() }

    foreach ($variant in @('mobile', 'desktop')) {
        $quality = if ($variant -eq 'mobile') { [Windows.Media.MediaProperties.VideoEncodingQuality]::HD720p } else { [Windows.Media.MediaProperties.VideoEncodingQuality]::HD1080p }
        $profile = [Windows.Media.MediaProperties.MediaEncodingProfile]::CreateMp4($quality)
        $profile.Audio = $null
        $profile.Video.Bitrate = if ($variant -eq 'mobile') { 1100000 } else { 2500000 }
        $profile.Video.FrameRate.Numerator = 30
        $profile.Video.FrameRate.Denominator = 1
        $outputFile = Wait-Operation ($outputFolder.CreateFileAsync("$number-$variant.mp4", [Windows.Storage.CreationCollisionOption]::ReplaceExisting)) ([Windows.Storage.StorageFile])
        $transcoder = New-Object Windows.Media.Transcoding.MediaTranscoder
        $transcoder.HardwareAccelerationEnabled = $true
        $transcoder.AlwaysReencode = $true
        $prepared = Wait-Operation ($transcoder.PrepareFileTranscodeAsync($inputFile, $outputFile, $profile)) ([Windows.Media.Transcoding.PrepareTranscodeResult])
        if (-not $prepared.CanTranscode) { throw "Unable to transcode $($inputs[$index]): $($prepared.FailureReason)" }
        $transcodeTask = $progressMethod.MakeGenericMethod([double]).Invoke($null, @($prepared.TranscodeAsync()))
        $transcodeTask.GetAwaiter().GetResult() | Out-Null
        Write-Output "$number-$variant.mp4: $((Get-Item -LiteralPath $outputFile.Path).Length) bytes"
    }
}

# Run prepare-hero-streaming.mjs after this process exits so the encoder releases its files.
