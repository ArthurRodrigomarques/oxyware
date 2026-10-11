# Envio de orçamentos para a Oxyware

O formulário já utiliza `@emailjs/browser`. Sem um serviço conectado, um template
e a chave pública, ele interrompe o envio antes de chamar o EmailJS. Alterar o
e-mail exibido no site não configura a entrega das mensagens.

## 1. Conectar o e-mail

Crie sua conta no [EmailJS](https://dashboard.emailjs.com/sign-up).
Em **Email Services**, adicione um serviço Gmail, conecte a conta
`oxyware.app@gmail.com` e salve o serviço. Copie o **Service ID**.

[Instruções oficiais para conectar o serviço](https://www.emailjs.com/docs/tutorial/adding-email-service/).

## 2. Criar o template

Em **Email Templates**, crie um template com estes campos:

| Campo | Valor |
| --- | --- |
| To Email | `oxyware.app@gmail.com` (destinatário fixo) |
| Subject | `Novo orçamento Oxyware: {{name}}` |
| From Name | `Site Oxyware` |
| From Email | Use Default Email Address |
| Reply To | `{{reply_to}}` |

Em **Edit Content → Code Editor**, substitua o conteúdo pelo HTML completo de
[`quote-email.html`](quote-email.html). Clique em **Apply Changes** e depois
**Save** para salvar o template.

O modelo usa os campos enviados pelo formulário, preserva as quebras de linha
da mensagem e mostra "Não informado" quando o telefone estiver vazio. O botão
de resposta utiliza `{{reply_to}}`.

Se preferir um conteúdo simples, use:

```text
Nome: {{name}}
E-mail: {{email}}
Telefone: {{phone}}

Projeto:
{{message}}
```

Salve e copie o **Template ID**. O destinatário configurado no template é quem
recebe a mensagem; mantenha-o fixo no e-mail da Oxyware.

[Instruções oficiais sobre o template](https://www.emailjs.com/docs/tutorial/creating-email-template/).

## 3. Preencher a configuração

Em **Account**, copie a **Public Key**. Preencha o arquivo `.env.local` na raiz
de `oxyware_frontend`:

```dotenv
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

Use os três valores reais do painel, sem deixar os campos vazios. Esses campos
identificam o serviço, o template e a conta; não use senha do Gmail ou Private Key.

Reinicie o servidor de desenvolvimento após preencher o arquivo. Na hospedagem,
cadastre as mesmas três variáveis antes de gerar uma nova versão do site.

[Documentação da Public Key](https://www.emailjs.com/docs/sdk/options/).

## 4. Confirmar a entrega

Preencha o formulário em `/pt/contact` e envie uma solicitação de teste.
Confira o histórico do EmailJS e a caixa de entrada de `oxyware.app@gmail.com`,
incluindo spam. A entrega só está confirmada quando a mensagem chegar ao e-mail.

Se o EmailJS rejeitar a solicitação, confira o serviço conectado, o template e as
restrições de origem configuradas na conta. Os dados do formulário continuam
preenchidos em caso de erro.
