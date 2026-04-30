import { siteConfig } from '../config';

/**
 * Build a human-readable message for a pooja inquiry / booking request.
 */
export function buildInquiryMessage(data) {
  const lines = [
    `🕉️ New Inquiry — ${siteConfig.brand.name}`,
    '',
    data.subject ? `Subject: ${data.subject}` : null,
    data.poojaName ? `Pooja: ${data.poojaName}` : null,
    data.price ? `Price: ₹${data.price}` : null,
    '',
    `Name: ${data.name || '-'}`,
    `Phone: ${data.phone || '-'}`,
    data.email ? `Email: ${data.email}` : null,
    data.date ? `Preferred Date: ${data.date}` : null,
    data.time ? `Preferred Time: ${data.time}` : null,
    data.address ? `Address: ${data.address}` : null,
    '',
    data.message ? `Message:\n${data.message}` : null,
  ].filter(Boolean);
  return lines.join('\n');
}

/** Open WhatsApp with the inquiry pre-filled. */
export function openWhatsApp(message) {
  const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Open mail client with subject + body pre-filled. */
export function openMail(subject, body) {
  const url = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}

/**
 * Submit an inquiry. If REACT_APP_INQUIRY_ENDPOINT is set, POSTs JSON there
 * (works with Formspree, Getform, Web3Forms, etc.). Always returns a promise.
 */
export async function submitInquiry(data) {
  if (!siteConfig.inquiryEndpoint) return { ok: false, skipped: true };
  try {
    const res = await fetch(siteConfig.inquiryEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    return { ok: res.ok };
  } catch (err) {
    return { ok: false, error: err };
  }
}
