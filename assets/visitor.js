function initEmailCopy() {
  document.querySelectorAll('[data-copy-email]').forEach(button => {
    const field = document.getElementById(button.dataset.copyEmail);
    const status = document.getElementById(button.getAttribute('aria-describedby'));
    button.hidden = false;
    button.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(field.value);
        status.textContent = 'Email address copied.';
      } catch {
        field.focus();
        field.select();
        status.textContent = 'The email is selected. Copy it using your browser or keyboard.';
      }
    });
  });
}

function initProjectFilters() {
  const controls = document.querySelector('[data-project-controls]');
  if (!controls) return;
  const items = [...document.querySelectorAll('[data-project-category]')];
  const buttons = [...controls.querySelectorAll('[data-filter]')];
  const search = controls.querySelector('input[type="search"]');
  const status = document.querySelector('[data-project-count]');
  const empty = document.querySelector('[data-project-empty]');
  const params = new URL(location.href).searchParams;
  let category = buttons.some(b => b.dataset.filter === params.get('work')) ? params.get('work') : 'all';
  search.value = params.get('q')?.slice(0, 120) || '';
  const render = (updateURL = true) => {
    const term = search.value.trim().toLocaleLowerCase();
    let count = 0;
    items.forEach(item => {
      const matches = (category === 'all' || item.dataset.projectCategory.split(' ').includes(category)) && item.textContent.toLocaleLowerCase().includes(term);
      item.hidden = !matches;
      if (matches) count++;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    status.textContent = `${count} ${count === 1 ? 'project or collection' : 'projects and collections'} shown`;
    empty.hidden = count !== 0;
    if (updateURL) {
      const url = new URL(location.href);
      category === 'all' ? url.searchParams.delete('work') : url.searchParams.set('work', category);
      term ? url.searchParams.set('q', search.value.trim()) : url.searchParams.delete('q');
      history.replaceState(null, '', url);
    }
  };
  controls.hidden = false;
  buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; render(); }));
  search.addEventListener('input', () => render());
  document.querySelector('[data-reset-projects]').addEventListener('click', () => {
    category = 'all'; search.value = ''; render(); search.focus();
  });
  render(false);
}

function requestID() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
  const hex = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const button = form.querySelector('[type="submit"]');
  const status = form.querySelector('[data-form-status]');
  const fields = ['name', 'email', 'topic', 'message'];
  let sending = false, lastPayload = '', id;
  const mark = (name, message) => {
    const input = form.elements[name], error = document.getElementById(`contact-${name}-error`);
    error.textContent = message || ''; error.hidden = !message;
    if (message) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
  };
  fields.forEach(name => form.elements[name].addEventListener('input', () => mark(name, '')));
  form.noValidate = true;
  button.disabled = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    status.textContent = ''; status.dataset.state = '';
    const data = Object.fromEntries(fields.map(name => [name, form.elements[name].value.trim()]));
    const errors = {};
    if (data.name.length < 2 || data.name.length > 80 || /[\u0000-\u001f]/.test(data.name)) errors.name = 'Enter your name using 2–80 characters.';
    if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address.';
    if (!data.topic) errors.topic = 'Choose a project topic.';
    if (data.message.length < 10 || data.message.length > 3000 || data.message.includes('\0')) errors.message = 'Describe your project using 10–3,000 characters.';
    fields.forEach(name => mark(name, errors[name]));
    if (Object.keys(errors).length) {
      form.elements[Object.keys(errors)[0]].focus();
      status.textContent = 'Check the highlighted fields. Your message has not been sent.'; status.dataset.state = 'error'; return;
    }
    const serialized = JSON.stringify(data);
    if (lastPayload !== serialized || !id) { id = requestID(); lastPayload = serialized; }
    sending = true; button.disabled = true; button.textContent = 'Sending…'; form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your message…';
    try {
      const response = await fetch(form.action, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, requestId: id, website: form.elements.website.value }),
        signal: AbortSignal.timeout(14000)
      });
      const result = await response.json().catch(() => null);
      if (response.status !== 201 || result?.success !== true) {
        if (result?.field && fields.includes(result.field)) { mark(result.field, result.error); form.elements[result.field].focus(); }
        throw new Error(result?.error || 'The inbox is unavailable. Please retry or email me directly.');
      }
      status.textContent = 'Thanks—your message reached my enquiry inbox.'; status.dataset.state = 'success';
      form.reset(); id = null; lastPayload = '';
    } catch (error) {
      status.textContent = error.name === 'TimeoutError' || error.name === 'AbortError' || error instanceof TypeError
        ? 'Delivery could not be confirmed. Your text is still here. Retry or email me directly.'
        : error.message;
      status.dataset.state = 'error';
    } finally {
      sending = false; button.disabled = false; button.textContent = 'Send message'; form.removeAttribute('aria-busy');
    }
  });
}

function initFilmPlayers() {
  document.querySelectorAll('[data-load-film]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      const id = button.dataset.loadFilm;
      if (!/^[\w-]{11}$/.test(id)) return;
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?cc_load_policy=1&cc_lang_pref=en&rel=0`;
      iframe.title = button.dataset.filmTitle;
      iframe.allow = 'encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.className = 'film-player';
      button.closest('.film-media').replaceChildren(iframe);
      iframe.focus();
    }, { once: true });
  });
}

initEmailCopy();
initProjectFilters();
initContactForm();
initFilmPlayers();
