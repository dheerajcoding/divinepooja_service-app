# 🕉️ Pujari Baba (pujaribaba.com)

A trustworthy, mobile-friendly website where everyday families can browse poojas,
view transparent pricing, and **book a pandit in one tap on WhatsApp**.

Built with **React 19 + Material UI 7** and ready to deploy to any static host
(Netlify, Vercel, GitHub Pages, S3, Cloudflare Pages, etc.).

---

## ✨ Features

- 🪔 Catalogue of poojas with pricing, benefits and samagri lists
- 📦 Special pooja packages with savings
- 📞 **Get In Touch** form that submits via **WhatsApp + Email** (no backend required)
- 🟢 Floating WhatsApp button on every page
- 🙏 Booking request flow that opens WhatsApp pre-filled with all details
- 📱 PWA installable, mobile-first, fast
- 🔍 SEO ready — meta tags, Open Graph, Twitter card, LocalBusiness JSON-LD
- 🎨 Saffron / gold traditional theme, MUI components, accessible
- 🛣️ Client-side routing with proper 404 page and scroll-to-top
- ⚙️ All branding & contact info driven by `.env` — no code edits needed to rebrand

---

## 🚀 Quick start

```bash
# 1. Install dependencies
npm install

# 2. Configure your business details
cp .env.example .env
# then edit .env with your phone, email, WhatsApp number, etc.

# 3. Run locally
npm start

# 4. Build for production
npm run build

# 5. (optional) Preview the production build locally
npm run serve
```

Open <http://localhost:3000>.

---

## ⚙️ Configuration

All branding, contact information and the optional inquiry endpoint are read
from environment variables (see [`.env.example`](.env.example)). The most
important ones:

| Variable | Purpose |
|---|---|
| `REACT_APP_BRAND_NAME` | Brand shown in navbar / footer / SEO |
| `REACT_APP_PHONE` | Display phone number |
| `REACT_APP_PHONE_INTL` | Phone in `+CCXXXXXXXXXX` format used by `tel:` links |
| `REACT_APP_WHATSAPP` | WhatsApp number digits only (e.g. `919876543210`) |
| `REACT_APP_EMAIL` | Contact email (used by `mailto:` links) |
| `REACT_APP_INQUIRY_ENDPOINT` | *(Optional)* JSON POST endpoint, e.g. a [Formspree](https://formspree.io) / [Web3Forms](https://web3forms.com) URL — gives you a copy of every inquiry by email |

After changing `.env`, restart `npm start` (and rebuild for production).

---

## 📨 How inquiries reach you

When a visitor submits the **Contact** form or **Booking** request:

1. The form is validated client-side.
2. If `REACT_APP_INQUIRY_ENDPOINT` is set, the data is POSTed there (you get an
   email/log in your inbox / dashboard).
3. **WhatsApp opens** with a pre-filled message containing all the details —
   so even with no backend, every lead lands directly in your WhatsApp.
4. There is also an **Email Us** fallback button that opens the user's mail
   client.

This means the site is **fully functional from day one** without any server.

---

## 🌐 Deployment

Any static host works. The included `public/_redirects` ensures client-side
routes work on Netlify-style hosts.

### Netlify / Vercel / Cloudflare Pages
- Build command: `npm run build`
- Publish directory: `build`
- Set the same environment variables you used in `.env` in the host's dashboard.

### GitHub Pages
```bash
npm run build
# then push the `build/` folder to the `gh-pages` branch
```

### Manual / S3
Upload the contents of `build/` to your bucket / web server and ensure all
unknown routes fall back to `index.html`.

---

## 🗂️ Project structure

```
src/
├── App.js                  # Routes + MUI theme
├── config.js               # Brand & contact config (reads .env)
├── data.js                 # Pooja, package, testimonial seed data
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── WhatsAppFab.js      # Sticky WhatsApp button
│   ├── ScrollToTop.js
│   └── InstallPrompt.js    # PWA install banner
├── pages/
│   ├── Home.js
│   ├── PoojaList.js / PoojaDetail.js
│   ├── Packages.js
│   ├── Booking.js / BookingConfirmation.js
│   ├── Contact.js
│   ├── About.js
│   ├── Login.js / Admin.js # Stubs for future use
│   └── NotFound.js
└── utils/
    └── inquiry.js          # WhatsApp + mailto + endpoint helpers
```

---

## 🧹 Customising the pooja list

Edit [`src/data.js`](src/data.js). Each entry supports:

```js
{
  id: 1,
  name: 'Satyanarayan Pooja',
  description: '...',
  duration: 3,                    // hours
  price: 2500,
  originalPrice: 3000,
  image: '/images/image15.png',   // place file in public/images
  category: 'Prosperity',
  benefits: ['Prosperity', ...],
  samagri: ['Coconut', ...],
  priest: 'Pandit Rajesh Sharma',
  experience: '8 years',
  languages: ['Hindi', 'Sanskrit'],
  isPopular: true,
  isOffer: true,
}
```

Add new images to `public/images/` and reference them with `/images/your-file.jpg`.

---

## 🛡️ Security & privacy notes

- No payment is collected on the site — bookings are confirmed manually after
  a WhatsApp / phone conversation. This keeps PCI scope at zero.
- The contact form does not store data in the browser.
- All third-party links use `rel="noopener noreferrer"`.
- Update the placeholder address / phone in `.env` before going live so you
  don't expose `9876543210`.

---

## 📜 License

Proprietary — © Pujari Baba (pujaribaba.com).
