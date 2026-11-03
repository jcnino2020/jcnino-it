# JC Niñonuevo | IT Portfolio

A professional portfolio with static pages and a serverless contact function for JC Niñonuevo, a BS Information Technology student at the University of St. La Salle in Bacolod City, Philippines.

## Pages

- `index.html`: biography, selected work, capabilities, tools, research, dated experience, project filters, and the contact form.
- `case-study-gnet.html`, `case-study-drainwatch.html`, `case-study-hydroalert.html`, `case-study-truthlens.html`: project problems, approaches, challenges, implemented behavior, source links, dates, and limitations.
- `web-development.html`: existing web-project archive.
- `research-capstones.html`: three public project briefs with proposed methods and explicit evidence boundaries; downloadable PDF and Markdown.
- `system-design.html`: source-derived architecture and IndexedDB model diagrams, available as SVG downloads.
- `network-labs.html`: original isolated VLAN/routing/DHCP practice pack with setup instructions, configuration files, and expected-verification worksheet.
- `creative-work.html`: existing aerial, travel, and university-event photographs plus three verified original YouTube films.
- `photo-manager.html`: local gallery content-management utility.

## Implementation

The homepage, case studies, and four content collections use semantic static HTML, `assets/home.css`, and `assets/home.js`. The established visual system uses Helvetica Neue with midnight navy, ice blue, and off-white surfaces. The web-project archive uses the existing Tailwind/GSAP setup, `assets/portfolio.css`, `assets/2026.css`, and shared navigation/modal logic in `assets/portfolio.js`.

Static pages need no build step or package installation. The contact endpoint in `api/contact.mjs` is deployed as a Vercel Node function with built-in APIs only. A basic static preview does not execute that endpoint; use Vercel development for a complete backend preview. Run the static pages locally with:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. The existing Vercel integration deploys pushes to `main`.

## Professional content

- `downloads/JC-Ninonuevo-CV.pdf`: public CV based on the owner-supplied resume. Personal demographic data, residential address, private phone numbers, and reference contacts are omitted.
- `images/jc-ninonuevo.jpg`: headshot extracted from the supplied resume.
- `images/projects/`: actual screenshots captured from the public project interfaces on 3 November 2026, with origin metadata embedded in the JPEGs.
- `PORTFOLIO-CONTENT.md`: factual sources and claim boundaries.
- `PRODUCT.md`: product scope and constraints.

Project source dates describe recorded source changes, rather than project start or completion. Prototype capabilities and limitations are identified explicitly; no unverified impact metrics are used.

## Contact

- GitHub: [github.com/jcnino2020](https://github.com/jcnino2020)
- LinkedIn: [linkedin.com/in/jcninoo](https://linkedin.com/in/jcninoo)
- Email: jcninonuevo@gmail.com

## Content collection boundaries

Education/training is sourced from the supplied resume and AWS IAM course completion certificate. The supplied certificate is available from the homepage training section. Testimonials, award documents, and approved research files remain unavailable; no such claims are fabricated. Research downloads are newly prepared project briefs, rather than published papers. The practice configurations have not been executed in Packet Tracer or on hardware; no saved .pkt/.pka simulation or observed output is claimed.

## Visitor features

`assets/visitor.js` provides email copying, category/search filtering with URL state and empty recovery, contact validation/status, and opt-in film players. `api/contact.mjs` forwards validated messages to the owner’s existing enquiry inbox; messages appear there, rather than generating email notifications. Inbox failures are displayed without clearing visitor input.

`404.html` is the custom Vercel missing-page response and uses root-absolute assets. The legacy web archive now links to every collection. Captions/transcripts are not fabricated: original films currently lack caption tracks and the owner has no files; players request captions when supplied, and text overviews/the lab read-along remain available.

Run backend validation and delivery-contract tests with `node --test tests/contact.test.mjs`. These tests inject an upstream response and never send messages to the real inbox.

## Sharing and search discovery

The public origin is `https://jcnino-it.vercel.app`. All 10 public pages have clean canonical URLs, Open Graph metadata, and large social cards using the local 1200 × 630 PNG. `sitemap.xml` lists these pages and `robots.txt` advertises the sitemap. The photo manager and error page use `noindex`; this is an indexing preference, not access control.

The homepage Person JSON-LD uses the public name, approved headshot, existing description, and verified GitHub/YouTube profiles. It excludes private resume details and unverified profile identifiers.

Refresh metadata with `python3 scripts/build-seo.py`, render the card with `python3 scripts/render-social-card.py` (ImageMagick required), and validate with `python3 scripts/validate-seo.py`. After deployment, use `python3 scripts/validate-seo.py --live` to verify direct page responses and published discovery assets. Social platforms and search engines control recrawling and cache refreshes.

## More navigation

Every public header includes a native More disclosure. `scripts/build-navigation.py` keeps the ten static headers and the shared archive header in sync. The menu covers all nine secondary public pages plus the education/certificate section. Utility and missing-page routes are not navigation destinations.

`assets/navigation.js` adds hover opening, a short exit delay, animated closing, keyboard focus handling, Escape, outside click, and touch toggling. `assets/navigation.css` provides the shared popover and mobile layout, with reduced-motion support. Native disclosure behavior remains available without JavaScript on static pages. Run `python3 scripts/build-navigation.py` after changing the menu list, then `python3 scripts/validate-navigation.py` to compare every header against the sitemap.
