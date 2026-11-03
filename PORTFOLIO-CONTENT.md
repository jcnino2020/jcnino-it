# Portfolio content evidence

Updated 3 November 2026.

- Biography, headshot, education, experience, training, and tools: user-supplied resume. Public CV deliberately excludes demographic data, residential address, private phone numbers, and reference contact details.
- Availability: existing public invitation for projects, collaboration, and opportunities; the resume adds networking and infrastructure career interests. No immediate start date or work-hours commitment is asserted.
- Featured project source: public jcnino2020/jcnino repository, project directories matching the four slugs. Git timestamps were checked against the source checkout. Source dates are explicitly distinguished from project completion dates.
- Development focus describes the work shown. Specific individual/team responsibilities and leadership for these four projects have not been supplied and are not asserted.
- Screenshots: browser captures of the public interfaces on 3 November 2026. TruthLens uses the quiz screen to avoid reproducing unverified marketing metrics.
- Evidence consists of observable behavior and inspectable public implementation. No user-impact figures or quantitative accuracy/performance claims are invented.
- Archive projects without a verified matching public repository retain their unpublished status; the actual portfolio entry now links to its verified source and README.
- Deployment: push this repository’s main branch to trigger its existing Vercel integration. Confirm the resulting commit status before reporting success.

## Additional portfolio collections (3 November 2026)

- User confirmed that testimonials, certificate/award files, and approved research files are not available yet. Do not invent endorsements, award achievements, verification URLs, published papers, or study findings. Training is listed as training from the supplied resume.
- Education: BSIT 2023-2027 (expected completion), STEM 2020-2023, and applied areas supported by the resume. Applied areas are not claimed as exact transcript/course titles.
- Research: newly authored public concept briefs based on the existing portfolio descriptions; proposed evaluations are explicitly labeled, and HydroAlert evidence is limited to inspectable implementation. No private manuscript, survey data, or unpublished research file was copied. PDF and Markdown files are project briefs, not papers.
- Network resources: original practice configurations and expected-verification worksheet for a Cisco 1941/2960 VLAN/routing/DHCP example. Reviewed against Cisco's public documentation. Not executed in a simulator or on hardware; no .pkt/.pka or terminal-output proof is claimed.
- System diagrams: source-derived static portfolio delivery, HydroAlert field-report flow, and HydroAlert IndexedDB report object. No photography is presented as a technical diagram in the updated collection.
- Creative photographs: existing owner portfolio assets (Drone-001, FM-01, SE-01), with visual descriptions. No unsupported camera settings, shoot dates, or publication credits added.
- Creative video titles and ownership verified through YouTube's public oEmbed endpoint: K_9mOUj-flY = Manila 2024; fddAYV8uWgc = USLS Campus Montage; hJMdcnx4vAo = Liceo Yearbook 2022 Pictorial BTS; author JC Niñonuevo. Those videos were previously mislabeled as network demonstrations; updated pages separate them correctly.

## Visitor feature verification

- Contact: /api/contact is a POST-only server function; validates name/email/topic/message/request ID, rejects cross-origin browser submissions and oversized payloads, and forwards only public enquiry fields to the existing www.jcnino.dev/api/enquiries service. It cannot read or administer enquiries, forwards no credentials, and does not change inbox security. Stable request IDs support safe retries through the inbox's existing duplicate detection.
- Contact outcome: success requires an explicit 201/success:true from the inbox; errors retain visitor text. Existing inbox GET returned 401 during inspection. Automated success/error testing uses injected/mock responses and does not send test messages to the real inbox. No production storage success is inferred from mock testing.
- Copy email: Clipboard API with selected-text fallback and a visible live status.
- Project exploration: seven actual projects/collections, category and search controls, URL state, visible result count, empty/reset state, and all entries visible without JavaScript.
- Collection wayfinding: breadcrumbs/category navigation include the remaining legacy web-development archive; existing case-study breadcrumbs retained.
- Video: YouTube's visible player labels reported captions unavailable on all three original uploads (Manila 2024, USLS Campus Montage, Liceo Yearbook 2022 Pictorial BTS). The owner confirmed no caption files. Opt-in youtube-nocookie players request captions when available; brief source/cover-based written overviews are explicitly not spoken transcripts. The actual network lab has a full text walkthrough, not a falsely labeled video transcript.
- Missing pages: root 404.html uses absolute asset/navigation URLs so deeply nested missing paths can recover. Verify production HTTP status is 404, not a successful-page rewrite.

- Architecture documentation now separates static page delivery from the new server-side contact path. The page-delivery SVG is explicitly scoped and does not imply the contact form is browser-only. Native-select verification confirms all six topics, including Web development; an integration test checks that each selectable topic is accepted by the delivery validator.

## Approved palette update

The owner selected midnight navy + ice blue + off-white. Recolored public-site CSS, browser theme metadata, and source-based vector diagrams. Photography and real interface screenshots remain faithful to their originals. Error text keeps its semantic warm hue; success uses explicit text with an ice-blue tint. Existing features and contact behavior are preserved.

## Sharing metadata evidence

- Public origin: `https://jcnino-it.vercel.app`; canonical paths follow the existing Vercel clean-URL configuration.
- The local social card uses the approved navy, ice-blue, and off-white palette, existing public identity/location, and a 1200 × 630, 8-bit RGB PNG. Its editable SVG and render script are included.
- The sitemap contains 10 public pages. Utility/error pages, API routes, query-state variations, and downloads are excluded. Utility/error pages remain crawlable so their noindex directives can be read.
- Person JSON-LD uses the resume-confirmed public name, approved headshot, and existing description. GitHub account `jcnino2020` was confirmed through the connected account (ID 162215151); YouTube handle `@jcninoo` was verified from the original films. LinkedIn remains a visible existing link but is excluded from `sameAs` because independent verification was unavailable. No X handle or private account email is published.
- Validation covers singleton metadata, absolute image URLs, clean canonical paths, structured-data boundaries, sitemap/robots consistency, image dimensions, and live asset equality. Page bodies are unchanged by this metadata update.

Implementation references: [Open Graph](https://ogp.me/), [Schema.org Person](https://schema.org/Person), and [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Metadata supports discovery without promising indexing, ranking, or immediate social-cache refreshes.
