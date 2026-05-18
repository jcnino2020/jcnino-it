# JC Niñonuevo | BSIT Portfolio

An elite, high-fidelity personal portfolio website for JC Niñonuevo, BS Information Technology student, developer, researcher, and systems administrator at the University of St. La Salle (Bacolod City, Philippines).

This site serves as a comprehensive showroom for web applications, database designs, academic research capstones, and Cisco Packet Tracer network topologies.

## Pages & Architecture

- **`index.html`** - The primary dashboard. Features a premium GSAP-powered hero header, interactive focus area panels, dynamic projects showcase, interactive tech stack and specializations grid, professional experience ledger, and social connectivity hubs.
- **`web-development.html`** - Dedicated gallery page for full-stack platforms, client-server models, dynamic SaaS platforms, and responsive Web interfaces.
- **`system-design.html`** - Showroom for relational database blueprints, 3NF E-R diagrams, Level-1 data-flow (DFD) schemas, and backend system schemas.
- **`research-capstones.html`** - Showroom for academic publications, capstone projects, departmental defense models, NLP processing pipelines, and AI integrations.
- **`network-labs.html`** - Interactive learning hub featuring Cisco Packet Tracer enterprise network simulations (routing/switching setups, DHCP, SLAAC, ACLs, OSPF) with an integrated secure YouTube video player.
- **`photo-manager.html`** - A highly sophisticated browser-based **IT Portfolio Project & Cisco Labs Manager** enabling dynamic drag-and-drop file reordering, offline JSON database compiler writes, and dynamic WebP image resizing.

## Tech Stack & Utilities

- **Markup & Layout**: Clean, semantic HTML5 structure.
- **Styling**: Tailwind CSS coupled with shared, pure light-mode styles in `assets/portfolio.css`.
- **Dynamic Injections**: Shared JavaScript templates in `assets/portfolio.js` that dynamically inject the unified navigation navbar, mobile menu overlay, footer, and active link states.
- **Animations**: GSAP (GreenSock Animation Platform) and ScrollTrigger for smooth entry transitions and page physics.
- **Interactive Mechanics**: Glare overlays, smooth anchor transitions, and swipe/keyboard-supported lightboxes.

## Run Locally

To test or develop the portfolio locally, you can serve the workspace folder with any local static HTTP server. For example:

```bash
python3 -m http.server 8000
```

Then navigate your web browser to:
`http://localhost:8000`

## Developer Content Management

The integrated project manager allows local administration of the showcase. Open `/photo-manager.html` in your browser to compile and update `assets/gallery-data.js` database arrays directly from your local filesystem.

## Contact

- **GitHub**: [github.com/jcninoo](https://github.com/jcninoo)
- **Facebook**: [facebook.com/jcninoo](https://facebook.com/jcninoo)
- **Email**: jcninonuevo@gmail.com
