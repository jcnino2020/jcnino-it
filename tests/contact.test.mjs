import test from 'node:test';
import assert from 'node:assert/strict';
import { createContactHandler } from '../api/contact.mjs';

const base = { name: 'Preview User', email: 'preview@example.com', topic: 'Networking', message: 'An isolated validation test message.', requestId: '12345678-1234-4234-8234-123456789abc' };
function response() {
  return { code: 200, headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(v) { this.code = v; return this; }, json(v) { this.body = v; return this; } };
}
function request(body = base, headers = {}) {
  return { method: 'POST', headers: { host: 'portfolio.example', origin: 'https://portfolio.example', 'content-type': 'application/json', ...headers }, body };
}

test('valid message reaches only the existing public enquiry inbox with compatible fields', async () => {
  let call;
  const handler = createContactHandler(async (url, options) => { call = { url, options }; return { status: 201, json: async () => ({ success: true }) }; });
  const res = response();
  await handler(request(base, { 'x-forwarded-for': '192.0.2.15, 10.0.0.1' }), res);
  assert.equal(res.code, 201);
  assert.equal(res.body.success, true);
  assert.equal(call.url, 'https://www.jcnino.dev/api/enquiries');
  assert.equal(call.options.headers['X-Forwarded-For'], '192.0.2.15');
  assert.equal(call.options.headers.Origin, undefined);
  assert.equal(call.options.headers.Authorization, undefined);
  const sent = JSON.parse(call.options.body);
  assert.equal(sent.service, 'Other');
  assert.equal(sent.requestId, base.requestId);
  assert.match(sent.message, /^\[IT portfolio · Networking\]\n\n/);
  assert.equal(sent.name, base.name);
});

test('invalid, oversized, and unsupported fields never reach the inbox', async () => {
  let calls = 0;
  const handler = createContactHandler(async () => { calls++; throw Error('Unexpected network call'); });
  const cases = [
    [{ ...base, name: ' ' }, 'name'], [{ ...base, email: 'broken' }, 'email'],
    [{ ...base, topic: 'Unknown' }, 'topic'], [{ ...base, message: 'short' }, 'message'],
    [{ ...base, message: 'x'.repeat(3001) }, 'message'], [{ ...base, requestId: '' }, undefined],
    [null, undefined], [[], undefined]
  ];
  for (const [body, field] of cases) {
    const res = response(); await handler(request(body), res);
    assert.equal(res.code, 400); assert.equal(res.body.field, field);
  }
  assert.equal(calls, 0);
});

test('GET, cross-origin requests, malformed JSON, and excessive bodies are rejected', async () => {
  let calls = 0;
  const handler = createContactHandler(async () => { calls++; });
  const cases = [
    [{ ...request(), method: 'GET' }, 405],
    [request(base, { origin: 'https://another.example' }), 403],
    [request(base, { 'content-type': 'text/plain' }), 415],
    [request('{bad json'), 400],
    [request(base, { 'content-length': '99999' }), 413]
  ];
  for (const [req, expected] of cases) { const res = response(); await handler(req, res); assert.equal(res.code, expected); }
  assert.equal(calls, 0);
});

test('honeypot submissions do not reach or clutter the real inbox', async () => {
  let calls = 0;
  const res = response();
  await createContactHandler(async () => { calls++; })(request({ ...base, website: 'automated input' }), res);
  assert.equal(res.code, 201); assert.equal(calls, 0);
});

test('only confirmed upstream acceptance produces a success response', async () => {
  for (const reply of [
    { status: 200, json: async () => ({ success: true }) },
    { status: 201, json: async () => ({ success: false }) },
    { status: 503, json: async () => ({ error: 'Private backend detail' }) },
    { status: 201, json: async () => { throw Error('Invalid JSON'); } }
  ]) {
    const res = response(); await createContactHandler(async () => reply)(request(), res);
    assert.equal(res.code, 503); assert.equal(res.body.success, undefined);
    assert.doesNotMatch(res.body.error, /Private backend detail/);
  }
});

test('rate limits and connection failures produce recoverable messages', async () => {
  const limited = response();
  await createContactHandler(async () => ({ status: 429 }))(request(), limited);
  assert.equal(limited.code, 429); assert.equal(limited.headers['Retry-After'], '3600');
  const offline = response();
  await createContactHandler(async () => { throw Error('Offline'); })(request(), offline);
  assert.equal(offline.code, 503); assert.match(offline.body.error, /Retry or email/);
});

test('Unicode names and multiline messages retain their original content', async () => {
  let sent;
  const res = response();
  const body = { ...base, name: 'Niñonuevo 李', message: 'A project about accessibility.\nSecond line: مرحبًا 👋' };
  await createContactHandler(async (_url, options) => { sent = JSON.parse(options.body); return { status: 201, json: async () => ({ success: true }) }; })(request(body), res);
  assert.equal(res.code, 201); assert.equal(sent.name, body.name); assert.ok(sent.message.endsWith(body.message));
});

test('all six selectable form topics are supported by the delivery contract', async () => {
  const { readFile } = await import('node:fs/promises');
  const { validateMessage } = await import('../api/contact.mjs');
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const select = html.match(/<select id="contact-topic"[^>]*>([\s\S]*?)<\/select>/)[1];
  const options = [...select.matchAll(/<option(?:\s[^>]*)?>([^<]*)<\/option>/g)].map(match => match[1].replaceAll('&amp;', '&')).filter(value => value !== 'Choose a topic');
  assert.equal(options.length, 6);
  assert.ok(options.includes('Web development'));
  for (const topic of options) assert.ok(validateMessage({ ...base, topic }).value, topic);
});
