# JC Niñonuevo | IT Portfolio

A static professional portfolio for JC Niñonuevo, a BS Information Technology student at the University of St. La Salle in Bacolod City, Philippines.

## Pages

- `index.html`: biography, selected work, capabilities, tools, research, dated experience, and contact links.
- `case-study-gnet.html`, `case-study-drainwatch.html`, `case-study-hydroalert.html`, `case-study-truthlens.html`: project problems, approaches, challenges, implemented behavior, source links, dates, and limitations.
- `web-development.html`: existing web-project archive.
- `research-capstones.html`: three public project briefs with proposed methods and explicit evidence boundaries; downloadable PDF and Markdown.
- `system-design.html`: source-derived architecture and IndexedDB model diagrams, available as SVG downloads.
- `network-labs.html`: original isolated VLAN/routing/DHCP practice pack with setup instructions, configuration files, and expected-verification worksheet.
- `creative-work.html`: existing aerial, travel, and university-event photographs plus three verified original YouTube films.
- `photo-manager.html`: local gallery content-management utility.

## Implementation

The homepage, case studies, and four content collections use semantic static HTML, `assets/home.css`, and `assets/home.js`. The established visual system uses Helvetica Neue with forest green, cream, and mint surfaces. The web-project archive uses the existing Tailwind/GSAP setup, `assets/portfolio.css`, `assets/2026.css`, and shared navigation/modal logic in `assets/portfolio.js`.

No build step or package installation is required. Run locally with:

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

Education/training is sourced from the supplied resume. The owner confirmed that testimonials, certificate/award documents, and approved research files are unavailable; no such claims are fabricated. Research downloads are newly prepared project briefs, rather than published papers. The practice configurations have not been executed in Packet Tracer or on hardware; no saved .pkt/.pka simulation or observed output is claimed.
