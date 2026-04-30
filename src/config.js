// Central site configuration. Override any value via .env (REACT_APP_*).
// All values are safe to expose on the client.

const env = process.env;

export const siteConfig = {
  brand: {
    name: env.REACT_APP_BRAND_NAME || 'Divine Pooja Services',
    tagline:
      env.REACT_APP_BRAND_TAGLINE ||
      'Authentic Vedic poojas at your doorstep, performed by experienced pandits.',
    shortName: env.REACT_APP_BRAND_SHORT || 'Divine Pooja',
  },
  contact: {
    // Use international format without the leading "+" for the WhatsApp link.
    phone: env.REACT_APP_PHONE || '+91 92114 65772',
    phoneIntl: env.REACT_APP_PHONE_INTL || '+919211465772',
    whatsapp: env.REACT_APP_WHATSAPP || '919211465772',
    email: env.REACT_APP_EMAIL || 'dheerajk92114@gmail.com',
    addressLine1: env.REACT_APP_ADDRESS_1 || '',
    addressLine2: env.REACT_APP_ADDRESS_2 || '',
    hours: env.REACT_APP_HOURS || 'Mon - Sun: 6:00 AM - 9:00 PM',
  },
  social: {
    facebook: env.REACT_APP_FACEBOOK || '',
    instagram: env.REACT_APP_INSTAGRAM || '',
  },
  // Optional Formspree / EmailJS / custom endpoint that accepts JSON POSTs.
  // When provided, inquiry forms POST here in addition to opening WhatsApp.
  inquiryEndpoint: env.REACT_APP_INQUIRY_ENDPOINT || '',
  // Public site URL (used for SEO / canonical / structured data)
  siteUrl: env.REACT_APP_SITE_URL || 'https://divinepooja.example.com',
  admin: {
    // Client-side gate only — not real security. Anyone reading the JS bundle
    // can see this. Use it to keep casual visitors out of /admin; protect the
    // real data behind a backend or hosting-level auth if you need stronger
    // guarantees.
    password: env.REACT_APP_ADMIN_PASSWORD || 'admin123',
  },
};

export default siteConfig;
