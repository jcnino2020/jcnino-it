import { isIP } from 'node:net';

const inbox = 'https://www.jcnino.dev/api/enquiries';
const topics = ['Web development', 'Systems & data', 'Networking', 'Research', 'Photo & video', 'Other'];
const uuid = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;

export function validateMessage(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'Please complete the contact form.' };
  const value = key => typeof body[key] === 'string' ? body[key].trim() : '';
  const name = value('name'), email = value('email'), topic = value('topic'), message = value('message'), requestId = value('requestId');
  if (name.length < 2 || name.length > 80 || /[\u0000-\u001f]/.test(name)) return { error: 'Enter your name using 2–80 characters.', field: 'name' };
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Enter a valid email address.', field: 'email' };
  if (!topics.includes(topic)) return { error: 'Choose a project topic.', field: 'topic' };
  if (message.length < 10 || message.length > 3000 || message.includes('\0')) return { error: 'Describe your project using 10–3,000 characters.', field: 'message' };
  if (!uuid.test(requestId)) return { error: 'Refresh the page and try again, or use the email link.' };
  return { value: { name, email, topic, message, requestId } };
}

export function createContactHandler(send = fetch) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Use the contact form to send a message.' });
    }
    if (req.headers.origin) {
      try {
        if (new URL(req.headers.origin).host !== req.headers.host) return res.status(403).json({ error: 'Send your message from this website.' });
      } catch { return res.status(403).json({ error: 'Send your message from this website.' }); }
    }
    if (!String(req.headers['content-type'] || '').startsWith('application/json')) return res.status(415).json({ error: 'Refresh the page and try again.' });
    let body = req.body;
    try {
      if (Number(req.headers['content-length']) > 16000) return res.status(413).json({ error: 'Your message is too long. Keep it under 3,000 characters.' });
      if (typeof body === 'string') body = JSON.parse(body);
      if (Buffer.byteLength(JSON.stringify(body) || '') > 16000) return res.status(413).json({ error: 'Your message is too long. Keep it under 3,000 characters.' });
    } catch { return res.status(400).json({ error: 'The message could not be read. Refresh the page and try again.' }); }
    // The honeypot stops automated submissions without sending them to the inbox.
    if (typeof body?.website === 'string' && body.website.trim()) return res.status(201).json({ success: true });
    const checked = validateMessage(body);
    if (checked.error) return res.status(400).json(checked);
    const { topic, message, ...fields } = checked.value;
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
    // Vercel supplies this address; keep the existing inbox's per-visitor rate limits.
    const ip = String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || '').split(',')[0].trim();
    if (isIP(ip)) headers['X-Forwarded-For'] = ip;
    try {
      const response = await send(inbox, {
        method: 'POST', headers,
        body: JSON.stringify({ ...fields, service: 'Other', eventDate: '', place: '', message: `[IT portfolio · ${topic}]\n\n${message}` }),
        signal: AbortSignal.timeout(10000), redirect: 'error'
      });
      if (response.status === 429) {
        res.setHeader('Retry-After', '3600');
        return res.status(429).json({ error: 'Too many messages were sent recently. Please try later or email me directly.' });
      }
      const result = await response.json().catch(() => null);
      if (response.status !== 201 || result?.success !== true) return res.status(503).json({ error: 'The enquiry inbox is unavailable. Your message has not been confirmed. Please retry or email me directly.' });
      return res.status(201).json({ success: true });
    } catch {
      return res.status(503).json({ error: 'Delivery could not be confirmed. Your text is still here. Retry or email me directly.' });
    }
  };
}

export default createContactHandler();
