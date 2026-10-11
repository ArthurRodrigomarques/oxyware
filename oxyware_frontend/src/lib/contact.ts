interface ContactDetails {
  readonly email: string;
  readonly phone: string;
  readonly emailHref: string;
  readonly phoneHref: string;
  readonly whatsappHref: string;
  readonly instagramHref: string;
}

export const CONTACT: ContactDetails = {
  email: "oxyware.app@gmail.com",
  phone: "+55 (13) 98862-2256",
  emailHref: "mailto:oxyware.app@gmail.com",
  phoneHref: "tel:+5513988622256",
  whatsappHref: "https://wa.me/5513988622256",
  instagramHref: "https://www.instagram.com/oxyware",
};
