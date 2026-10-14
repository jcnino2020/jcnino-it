/**
 * Portfolio Shared JavaScript
 * JC Niñonuevo Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    injectComponents();
    initMobileMenu();
    updateYear();
    initLightboxListeners();
    initProjectDetailsModal();
    initInteractiveEffects();
    initScrollSpy();
});

/**
 * Global templates for Navigation, Footer, and Lightbox Elements.
 * This completely isolates layout changes to this single JavaScript file
 * and avoids fetching HTML over CORS, supporting direct local execution.
 */const navHtml = `
<nav id="main-nav" class="fixed top-0 left-0 right-0 z-50">
  <div class="max-w-7xl mx-auto px-6 sm:px-10">
    <div class="flex items-center justify-between h-16 md:h-20">
      <a href="index.html" class="brand-link" aria-label="JC Niñonuevo home"><span class="brand-mark">JC<span class="brand-dot">.</span></span><span class="brand-name">NIÑONUEVO</span></a>
      <div class="hidden md:flex items-center gap-8" id="nav-links">
        <a href="index.html#home" class="nav-link">Home</a>
        <a href="index.html#about" class="nav-link">About</a>
        <a href="index.html#projects" class="nav-link">Work</a>
        <a href="index.html#experience" class="nav-link">Experience</a>
      </div>
      <div class="hidden md:flex items-center" id="nav-cta"><a href="index.html#contact" class="nav-contact">Let's talk <span aria-hidden="true">↗</span></a></div>
      <button id="hamburger" class="md:hidden menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span id="ham-icon">Menu</span><span id="close-icon" class="hidden">Close</span></button>
    </div>
    <div id="mobile-menu" class="closed md:hidden"><div class="mobile-links">
      <a href="index.html#home">Home</a><a href="index.html#about">About</a><a href="index.html#projects">Work</a><a href="index.html#experience">Experience</a><a href="index.html#contact">Contact</a>
    </div></div>
  </div>
</nav>
`;

const footerHtml = `
<footer id="site-footer" class="bg-slate-200 border-t border-border-strong py-12 md:py-16">
  <div class="max-w-7xl mx-auto px-6 sm:px-10">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-border-strong">

      <!-- Column 1: Info and description -->
      <div class="md:col-span-6 flex flex-col items-start gap-4">
        <div class="flex flex-col">
          <span class="text-text-main text-lg font-bold tracking-tight flex items-center gap-1.5">
            JC <span class="font-light text-text-muted">Niñonuevo</span>
          </span>
          <span class="text-[10px] text-text-faint font-sans uppercase tracking-normal mt-1">BS Information Technology Student</span>
        </div>
        <p class="text-text-muted text-xs leading-relaxed max-w-sm font-normal">
          Built as a dedicated IT portfolio to showcase systems, research, development work, and technical learning.
        </p>
        <span class="text-xs text-text-muted flex items-center gap-1.5 font-normal">
          <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Bacolod City, Philippines
        </span>
      </div>

      <!-- Column 2: Quick Links -->
      <div class="md:col-span-3 flex flex-col items-start gap-3">
        <span class="text-text-main text-[10px] font-sans uppercase tracking-normal text-text-faint font-bold">Quick Links</span>
        <div class="flex flex-col gap-2">
           <a href="index.html#home" class="text-text-muted hover:text-blue-600 text-xs font-bold transition-colors">Home</a>
           <a href="index.html#about" class="text-text-muted hover:text-blue-600 text-xs font-bold transition-colors">About</a>
           <a href="index.html#skills" class="text-text-muted hover:text-blue-600 text-xs font-bold transition-colors">Skills</a>
           <a href="index.html#projects" class="text-text-muted hover:text-blue-600 text-xs font-bold transition-colors">Projects</a>
           <a href="index.html#research" class="text-text-muted hover:text-blue-600 text-xs font-bold transition-colors">Research</a>
           <a href="index.html#experience" class="text-text-muted hover:text-blue-600 text-xs font-bold transition-colors">Experience</a>
           <a href="index.html#contact" class="text-text-muted hover:text-blue-600 text-xs font-bold transition-colors">Contact</a>
        </div>
      </div>

      <!-- Column 3: Social & Professional -->
      <div class="md:col-span-3 flex flex-col items-start gap-3">
        <span class="text-text-main text-[10px] font-sans uppercase tracking-normal text-text-faint font-bold">Connect</span>
        <div class="flex flex-col gap-2">
          <a href="mailto:jcninonuevo@gmail.com" class="text-text-muted hover:text-blue-600 text-xs flex items-center gap-2 transition-colors font-normal">
            <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            Email
          </a>
          <a href="https://github.com/jcninoo" target="_blank" class="text-text-muted hover:text-blue-600 text-xs flex items-center gap-2 transition-colors font-normal">
            <svg class="w-3.5 h-3.5 text-slate-800" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/jcninoo" target="_blank" class="text-text-muted hover:text-blue-600 text-xs flex items-center gap-2 transition-colors font-normal">
            <svg class="w-3.5 h-3.5 text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            LinkedIn
          </a>
          <a href="https://facebook.com/jcninoo" target="_blank" class="text-text-muted hover:text-blue-600 text-xs flex items-center gap-2 transition-colors font-normal">
            <svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            Facebook
          </a>
        </div>
      </div>

    </div>

    <!-- Bottom copyright row -->
    <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span class="text-text-faint text-[10px] font-sans uppercase tracking-normal font-bold">JC Niñonuevo &copy; <span class="year"></span>. All rights reserved.</span>
      <span class="text-text-faint text-[10px] font-sans uppercase tracking-normal font-bold">BSIT Academic Portfolio</span>
    </div>
  </div>
</footer>
`;

const imageLightboxHtml = `
<div id="lightbox" class="fixed inset-0 z-[9999] bg-slate-950/60 backdrop-blur-md hidden items-center justify-center p-4 md:p-8" role="dialog" aria-modal="true" aria-label="Project detail lightbox">
  <!-- Modal Container -->
  <div class="relative bg-white border border-border-strong w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">

    <!-- Modal Header -->
    <div class="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-border-strong">
      <span class="text-[10px] font-sans uppercase tracking-normal text-text-faint font-bold">System Interface View</span>
      <button onclick="closeLightbox()" aria-label="Close lightbox"
        class="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-slate-200 transition-colors rounded-full border border-border bg-white shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Modal Image Grid -->
    <div class="relative flex-1 bg-slate-100 flex items-center justify-center p-4 md:p-6 min-h-[250px] overflow-hidden">
      <!-- Navigation Buttons -->
      <button onclick="prevImage()" aria-label="Previous project"
        class="absolute left-4 z-50 w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-main bg-white/90 hover:bg-white border border-border-strong rounded-full shadow-md transition-all active:scale-95">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <button onclick="nextImage()" aria-label="Next project"
        class="absolute right-4 z-50 w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-main bg-white/90 hover:bg-white border border-border-strong rounded-full shadow-md transition-all active:scale-95">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <img id="lightbox-img" src="" alt="" class="max-w-full max-h-[50vh] object-contain rounded-lg shadow-sm" />
    </div>

    <!-- Modal Footer Caption -->
    <div class="p-6 bg-white border-t border-border-strong">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex-1">
          <p id="lightbox-caption" class="text-text-body text-sm font-semibold leading-relaxed"></p>
        </div>
        <div class="shrink-0 flex items-center justify-end">
          <span id="lightbox-counter" class="px-3 py-1 bg-slate-100 border border-border rounded-full text-text-faint text-xs font-bold font-sans"></span>
        </div>
      </div>
    </div>
  </div>
</div>
`;

const videoLightboxHtml = `
<div id="video-lightbox" class="fixed inset-0 z-[9999] bg-slate-950/60 backdrop-blur-md hidden items-center justify-center p-4 md:p-8" role="dialog" aria-modal="true" aria-label="Lab simulation video lightbox">
  <!-- Video Modal Container -->
  <div class="relative bg-white border border-border-strong w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto">

    <!-- Video Modal Header -->
    <div class="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-border-strong">
      <span class="text-[10px] font-sans uppercase tracking-normal text-text-faint font-bold">Cisco Lab Simulation Player</span>
      <button onclick="closeVideoLightbox()" aria-label="Close lightbox"
        class="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-slate-200 transition-colors rounded-full border border-border bg-white shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Video Player Container -->
    <div class="relative bg-slate-950 flex items-center justify-center aspect-video w-full overflow-hidden">
      <iframe id="video-iframe" class="w-full h-full"
        src="" title="Video Player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin">
      </iframe>
    </div>

    <!-- Video Modal Caption -->
    <div class="p-6 bg-white border-t border-border-strong">
      <h3 id="video-title" class="text-text-main text-base font-bold"></h3>
      <p class="text-text-muted text-xs mt-1">Cisco Packet Tracer Network Configuration Lab Simulation</p>
    </div>
  </div>
</div>
`;

const projectDetailsModalHtml = `
<div id="project-details-modal" class="project-details-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" aria-describedby="project-modal-summary">
  <div class="project-details-panel" tabindex="-1">
    <div class="project-details-scroll">
      <header class="project-details-header">
        <div class="project-details-heading">
          <div id="project-modal-badges" class="project-details-badges"></div>
          <h2 id="project-modal-title" class="project-details-title"></h2>
          <p id="project-modal-summary" class="project-details-summary"></p>
        </div>
        <button type="button" id="project-modal-close" class="project-details-close" aria-label="Close project details">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </header>

      <div id="project-modal-body" class="project-details-body"></div>

      <footer class="project-details-footer">
        <button type="button" id="project-modal-footer-close" class="project-details-action project-details-action-secondary">Close</button>
        <a id="project-modal-github" href="#" class="project-details-action project-details-action-muted" aria-disabled="true">GitHub Coming Soon</a>
        <a id="project-modal-docs" href="#" class="project-details-action project-details-action-muted" aria-disabled="true">Documentation Coming Soon</a>
        <a id="project-modal-demo" href="#" class="project-details-action project-details-action-primary">Live Demo Coming Soon</a>
      </footer>
    </div>
  </div>
</div>
`;

const projectDetailsData = {
    'msme-financial': {
        title: 'MSME Financial Tracking & Microloan Readiness',
        type: 'Academic / Research-Based Web System',
        status: 'Prototype',
        summary: 'A web-based concept for organizing MSME financial activity, cash flow, and microloan readiness.',
        overview: 'This project is a web-based system concept designed to help micro, small, and medium enterprises organize their financial activity, monitor cash flow, and assess basic readiness for possible microloan applications.',
        problem: 'Many small businesses struggle with incomplete financial records, unstable cash flow tracking, and limited visibility over income and expenses. This system aims to help MSME owners structure their financial information in a simpler and more readable way.',
        targetUsers: ['MSME owners', 'Small business managers', 'Local entrepreneurs', 'Financial support organizations', 'Academic researchers studying MSME development'],
        keyFeatures: ['Dashboard overview for financial activity', 'Income and expense tracking', 'Cash flow summaries', 'Loan readiness indicators', 'MSME profile management', 'Report generation', 'Simple financial record organization'],
        technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'PHP', 'MySQL'],
        workflow: 'The user records business income, expenses, and basic financial information. The dashboard then summarizes cash flow activity and presents indicators that help the user understand whether their records are organized enough for possible microloan preparation.',
        currentStatus: 'Prototype / In Development',
        futureImprovements: ['Add authentication and user roles', 'Add stronger financial analytics', 'Add downloadable PDF reports', 'Add AI-assisted financial suggestions', 'Add data visualization for income and expense trends', 'Add mobile-first dashboard views'],
        learned: 'This project helped me connect system development with real MSME problems, especially the importance of turning messy financial records into structured and understandable information.',
        actions: { demo: { label: 'Live Demo Coming Soon', href: '#' } }
    },
    'msme-inventory': {
        title: 'MSME Inventory & Consumer Access',
        type: 'Capstone / IT Concept',
        status: 'Concept',
        summary: 'A system concept for inventory visibility, product availability, and better consumer access.',
        overview: 'This project is a system concept that connects consumer access issues with MSME operational gaps by helping businesses manage product availability, inventory visibility, and access points.',
        problem: 'Consumers may intend to support MSMEs, but actual access can be affected by stock availability, limited product visibility, poor distribution, and weak digital access. This system concept helps address those gaps by giving MSMEs a clearer way to manage and present product availability.',
        targetUsers: ['MSME owners', 'Store managers', 'Local consumers', 'Small retail businesses', 'Community-based business support groups'],
        keyFeatures: ['Product stock monitoring', 'Inventory alerts', 'Availability status', 'Customer-facing product access', 'Admin control dashboard', 'Product information management', 'Reports and summaries'],
        technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'PHP', 'MySQL'],
        workflow: 'The MSME admin updates product stocks, availability, and product details. Customers or users can view what products are available, reducing uncertainty and improving access between consumer intention and actual purchasing opportunities.',
        currentStatus: 'Concept / Prototype',
        futureImprovements: ['Add real-time inventory updates', 'Add customer reservation feature', 'Add SMS or email stock alerts', 'Add QR-based product access', 'Add basic e-commerce ordering', 'Add analytics for best-selling products'],
        learned: 'This concept helped me understand how IT systems can support operational visibility and improve the connection between business capacity and consumer access.',
        actions: { demo: { label: 'Live Demo Coming Soon', href: '#' } }
    },
    'complaint-payment': {
        title: 'Complaint & Payment System',
        type: 'Web Application',
        status: 'Refactoring',
        summary: 'A PHP records system for complaints, payment summaries, admin workflows, and PDF export.',
        overview: 'This is a PHP-based web application for managing user complaints and payment records, including PDF export functionality and dashboard-style summaries.',
        problem: 'Manual complaint and payment records can become difficult to track, search, summarize, and export. This system helps organize user records into a structured dashboard and supports easier reporting through PDF generation.',
        targetUsers: ['System administrators', 'Users submitting complaints', 'Staff monitoring payment records', 'Organizations handling service-related records'],
        keyFeatures: ['Complaint logging and tracking', 'Payment records and summaries', 'Admin dashboard', 'User-side records', 'PDF export', 'Search and filtering', 'MVC structured architecture'],
        technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
        workflow: 'Users submit complaints or view their payment information. Administrators manage records through a dashboard, track complaint details, review payment summaries, and generate PDF files for documentation or reporting.',
        currentStatus: 'Academic System / Refactoring',
        futureImprovements: ['Complete MVC restructuring', 'Improve dashboard UI', 'Add better validation and error handling', 'Add role-based access control', 'Add notification system', 'Improve PDF layout and export speed'],
        learned: 'This project helped me practice PHP system development, database-driven records, PDF export functionality, and the importance of cleaner architecture through MVC refactoring.',
        actions: { demo: { label: 'Live Demo Coming Soon', href: '#' } }
    },
    'packet-tracer': {
        title: 'Packet Tracer Network Configuration',
        type: 'Networking / Cisco Coursework',
        status: 'Coursework',
        summary: 'Cisco Packet Tracer labs for switching, routing, wireless networking, and security basics.',
        overview: 'This project represents a collection of Cisco Packet Tracer configuration activities focused on switching, routing, wireless networking, and network security fundamentals.',
        problem: 'Network configurations require structured planning, correct addressing, and careful troubleshooting. These labs helped me practice how different network services and devices work together in realistic scenarios.',
        targetUsers: ['Networking students', 'IT students', 'Cisco learners', 'Academic evaluators', 'Beginners practicing network configuration'],
        keyFeatures: ['VLAN segmenting and trunk configurations', 'Inter-VLAN routing using router-on-a-stick', 'DHCP dynamic setups', 'EtherChannel configuration', 'Port security settings', 'WLAN controller basics', 'Switch security practice', 'End-to-end connectivity testing'],
        technologies: ['Cisco Packet Tracer', 'IOS CLI'],
        workflow: 'Each lab starts with a topology and addressing plan. Devices are configured using Cisco IOS commands, then tested through connectivity checks, show commands, and troubleshooting steps.',
        currentStatus: 'Coursework / Practice Labs',
        futureImprovements: ['Add downloadable Packet Tracer files', 'Add topology screenshots', 'Add configuration command snippets', 'Add troubleshooting notes', 'Add before-and-after network diagrams', 'Add short lab writeups per activity'],
        learned: 'These labs helped me build stronger understanding of VLANs, trunking, DHCP, EtherChannel, router-on-a-stick, switch security, and wireless networking basics.',
        actions: { demo: { label: 'View Network Labs Page', href: 'network-labs.html' } }
    },
    'ai-study-app': {
        title: 'AI-Assisted Study App Concept',
        type: 'AI Learning App',
        status: 'Concept',
        summary: 'An AI learning concept that uses simple explanations and follow-up questions to reveal understanding.',
        overview: 'This is an AI-powered learning app concept inspired by the Feynman Technique. It is designed to help students prove understanding by explaining topics simply and receiving AI-generated follow-up questions.',
        problem: 'Many students memorize concepts without fully understanding them. This app concept encourages deeper learning by asking users to explain ideas in their own words and then respond to follow-up questions that reveal knowledge gaps.',
        targetUsers: ['Students', 'Self-learners', 'Reviewers preparing for exams', 'Programming learners', 'Professionals learning complex topics'],
        keyFeatures: ['Interactive topic explanation', 'AI-generated follow-up questions', 'Understanding and completion score', 'Student learning feedback logs', 'Session history', 'Simple learning dashboard', 'Topic-based learning flow'],
        technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'AI API Concept'],
        workflow: 'The user selects a topic, explains it in simple terms, receives AI follow-up questions, improves their explanation, and gets feedback on their level of understanding.',
        currentStatus: 'Concept Prototype',
        futureImprovements: ['Add real AI API integration', 'Add user accounts', 'Add session history', 'Add topic difficulty levels', 'Add learning analytics', 'Add flashcard generation', 'Add exportable review notes'],
        learned: 'This concept helped me explore how AI can be used as a learning companion instead of just an answer generator.',
        actions: { demo: { label: 'Live Demo Coming Soon', href: '#' } }
    },
    'portfolio-website': {
        title: 'Personal IT Portfolio Website',
        type: 'Frontend Development',
        status: 'Live / In Progress',
        summary: 'A responsive IT portfolio for projects, research, networking labs, and technical growth.',
        overview: 'This is a responsive IT portfolio website designed to present my skills, academic projects, research work, networking labs, and learning journey as a BS Information Technology student.',
        problem: 'A general creative portfolio does not properly represent my IT skills and academic systems work. This project refocuses the website into a dedicated IT identity that highlights development, research, networking, and technical learning.',
        targetUsers: ['Internship reviewers', 'Instructors', 'Project collaborators', 'Potential clients', 'Future employers', 'Academic evaluators'],
        keyFeatures: ['Responsive layouts', 'Featured project cards', 'Skills section', 'Research section', 'Experience section', 'Contact section', 'Clean pure light-mode interface', 'Optimized project showroom'],
        technologies: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript'],
        workflow: 'The website acts as a central landing page for my IT identity. Visitors can quickly understand my background, view projects, read research-related work, and contact me for academic or professional opportunities.',
        currentStatus: 'Live / In Progress',
        futureImprovements: ['Add real GitHub links', 'Add downloadable resume', 'Add project screenshots', 'Add separate project detail pages', 'Add case study pages', 'Add contact form backend', 'Add analytics'],
        learned: 'This project helped me clarify my IT identity and build a more focused portfolio for academic and career use.',
        actions: { demo: { label: 'Live Demo: Current Site', href: 'index.html' } }
    }
};

/**
 * Dynamic Component Injector
 */
function injectComponents() {
    // Determine current page context
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';

    // Normalize page names by stripping the .html extension to support clean/extensionless URLs
    const normPage = page.replace(/\.html$/, '') || 'index';

    // 1. Inject Navbar
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (navPlaceholder && !document.getElementById('main-nav')) {
        navPlaceholder.innerHTML = navHtml;
    } else if (!document.getElementById('main-nav')) {
        document.body.insertAdjacentHTML('afterbegin', navHtml);
    }

    // 2. Inject Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder && !document.getElementById('site-footer')) {
        footerPlaceholder.innerHTML = footerHtml;
    }

    // 3. Inject Lightbox
    const lightboxPlaceholder = document.getElementById('lightbox-placeholder');
    if (lightboxPlaceholder && !document.getElementById('lightbox')) {
        lightboxPlaceholder.innerHTML = imageLightboxHtml + videoLightboxHtml;
    }

    if (lightboxPlaceholder && !document.getElementById('project-details-modal')) {
        lightboxPlaceholder.insertAdjacentHTML('beforeend', projectDetailsModalHtml);
    }

    // Toggle Nav Link Active classes
    document.querySelectorAll('#nav-links a, #mobile-menu a, #site-footer a').forEach(a => {
        const href = a.getAttribute('href') || '';
        const isSubpage = href.includes('research-capstones.html') || href.includes('web-development.html') || href.includes('system-design.html') || href.includes('network-labs.html');

        const isNavbarLink = a.closest('#main-nav') || a.closest('#mobile-menu');
        const activeClass = isNavbarLink ? 'text-blue-600' : 'text-text-main';
        const inactiveClass = isNavbarLink ? 'text-slate-600' : 'text-text-muted';

        let isActive = false;
        if (normPage === 'research-capstones' && href.includes('research')) {
            isActive = true;
        } else if (normPage === 'web-development' && href.includes('projects')) {
            isActive = true;
        } else if (normPage === 'system-design' && href.includes('projects')) {
            isActive = true;
        } else if (normPage === 'network-labs' && href.includes('projects')) {
            isActive = true;
        } else if (normPage === 'index' && !isSubpage) {
            if (href.endsWith('#home') || href === 'index.html') {
                isActive = true;
            }
        }

        if (isActive) {
            a.classList.remove('text-text-muted', 'text-slate-600');
            a.classList.add(activeClass, 'active');
        } else {
            a.classList.remove('text-text-main', 'text-blue-600', 'active');
            a.classList.add(inactiveClass);
        }
    });
}

/**
 * Mobile Menu Toggle logic
 */
function initMobileMenu() {
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');
    const ham = document.getElementById('ham-icon');
    const x = document.getElementById('close-icon');

    if (!btn || !menu) return;

    let open = false;

    // Remote any duplicate events
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', () => {
        open = !open;
        menu.classList.toggle('open', open);
        menu.classList.toggle('closed', !open);
        newBtn.setAttribute('aria-expanded', String(open));
        newBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        const hamIcon = document.getElementById('ham-icon');
        const closeIcon = document.getElementById('close-icon');
        if (hamIcon) hamIcon.classList.toggle('hidden', open);
        if (closeIcon) closeIcon.classList.toggle('hidden', !open);
    });

    // Close menu on link click
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            open = false;
            menu.classList.add('closed');
            menu.classList.remove('open');
            newBtn.setAttribute('aria-expanded', 'false');
            newBtn.setAttribute('aria-label', 'Open menu');
            const hamIcon = document.getElementById('ham-icon');
            const closeIcon = document.getElementById('close-icon');
            if (hamIcon) hamIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');
        });
    });
}

/**
 * Automatically update copyright year
 */
function updateYear() {
    document.querySelectorAll('.year').forEach(e => {
        e.textContent = new Date().getFullYear();
    });
}

/**
 * Premium Interactive Effects: Mouse-Tilt Card Glare
 */
function initInteractiveEffects() {
    // Mouse Glare overlay tracking on categories & project cards
    const cards = document.querySelectorAll('.service-card, .video-card, .project-card, .skill-category-card, .research-focus-card, .experience-card, .learning-progress-card, .profile-card, .contact-channel, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/**
 * Lightbox Core Logic
 * Global variables to track state
 */
let currentGallery = [];
let currentIndex = 0;

/**
 * Preload cache — tracks URLs already requested to avoid duplicate fetches.
 * Persists for the lifetime of the page session.
 */
const preloadCache = new Set();

/**
 * Resolve a gallery src to its 1600px WebP counterpart for preloading.
 * (Same logic as getLightboxSrc but targeting the 1600/ folder.)
 */
function getPreloadSrc(src) {
    const decoded = decodeURIComponent(src);
    const match = decoded.match(/^images\/(?:(.+)\/)?([^\/]+)\.(jpe?g|png|webp)$/i);
    if (!match) return null;
    const subfolder = match[1] || null;
    const baseName = match[2];
    const webpName = `${baseName}-1600.webp`;
    return subfolder
        ? `images/optimized/1600/${subfolder}/${webpName}`
        : `images/optimized/1600/${webpName}`;
}

/**
 * Preload the ±3 images around the current index using the 1600px WebP.
 * Uses the Image() constructor so the browser caches the response;
 * subsequent requests for the same URL are served instantly from cache.
 * @param {Array}  gallery  - The current photo array
 * @param {number} index    - The current active index
 */
function preloadNearbyImages(gallery, index) {
    if (!gallery || gallery.length === 0) return;
    const RANGE = 3;
    for (let offset = -RANGE; offset <= RANGE; offset++) {
        if (offset === 0) continue; // current image is already displayed
        const targetIndex = index + offset;
        // Edge-case guard: skip out-of-bounds indexes
        if (targetIndex < 0 || targetIndex >= gallery.length) continue;
        const photo = gallery[targetIndex];
        if (!photo || !photo.src) continue;
        const preloadUrl = getPreloadSrc(photo.src);
        if (!preloadUrl) continue;
        // Skip if already in cache (no duplicate requests)
        if (preloadCache.has(preloadUrl)) continue;
        preloadCache.add(preloadUrl);
        const img = new Image();
        img.src = preloadUrl;
        // No onerror needed — failed preloads are silently ignored;
        // the lightbox fallback chain handles it at display time.
    }
}

function openLightbox(photo, gallery) {
    currentGallery = gallery;
    currentIndex = gallery.indexOf(photo);

    const lb = document.getElementById('lightbox');
    if (!lb) return;

    lb.classList.remove('hidden');
    lb.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // GSAP: fade in the backdrop
    if (window.gsap) {
        gsap.fromTo(lb,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
    }

    // syncLightbox will handle the image entry animation in its onload
    syncLightbox('open');

    // Preload nearby images
    preloadNearbyImages(currentGallery, currentIndex);
}

/**
 * Convert a gallery image src to its 2048px WebP counterpart.
 * Handles paths like:
 *   images/GH-01.JPG                        → images/optimized/2048/GH-01-2048.webp
 *   images/Drone%20Shots/Drone-001.JPG      → images/optimized/2048/Drone Shots/Drone-001-2048.webp
 *   images/Framed%20Moments/FM-01.JPG       → images/optimized/2048/Framed Moments/FM-01-2048.webp
 *   images/School%20Events/SE-01.JPG        → images/optimized/2048/School Events/SE-01-2048.webp
 *   images/Video%20Thumbnails/VI-01.jpg     → images/optimized/2048/Video Thumbnails/VI-01-2048.webp
 */
function getLightboxSrc(src) {
    // Decode any percent-encoded chars in the path
    const decoded = decodeURIComponent(src);
    // Match pattern: images/[optional subfolder/]FILENAME.EXT
    const match = decoded.match(/^images\/(?:(.+)\/)?([^\/]+)\.(jpe?g|png|webp)$/i);
    if (!match) return src; // fallback — return original
    const subfolder = match[1] || null;  // e.g. "Drone Shots", or null for root
    const baseName = match[2];           // e.g. "GH-01"
    const webpName = `${baseName}-2048.webp`;
    if (subfolder) {
        return `images/optimized/2048/${subfolder}/${webpName}`;
    } else {
        return `images/optimized/2048/${webpName}`;
    }
}

function syncLightbox(direction = null) {
    const p = currentGallery[currentIndex];
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');

    if (img) {
        const webpSrc = getLightboxSrc(p.src);
        const probe = new Image();
        probe.src = webpSrc;

        // Helper to perform the actual source swap
        const startLoading = () => {
            img.src = webpSrc;
            img.alt = p.alt || p.title || 'Portfolio Image';

            // Show loading state if not already cached
            if (!probe.complete) {
                img.classList.add('lb-loading');
            }
        };

        // Transition: Fade out the old image before showing the new one
        if (window.gsap && (direction === 'next' || direction === 'prev')) {
            gsap.to(img, {
                opacity: 0,
                x: direction === 'next' ? -30 : 30,
                duration: 0.1,
                ease: 'power2.inOut',
                onComplete: startLoading
            });
        } else {
            // Instant hide for initial open or jumps
            if (window.gsap) gsap.killTweensOf(img);
            img.style.opacity = '0';
            startLoading();
        }

        // Trigger smooth entry once loaded
        img.onload = function () {
            img.classList.remove('lb-loading');

            if (window.gsap) {
                let xOffset = 0;
                if (direction === 'next') xOffset = 30;
                if (direction === 'prev') xOffset = -30;

                gsap.fromTo(img,
                    {
                        x: xOffset,
                        opacity: 0,
                        scale: direction === 'open' ? 0.96 : 0.99
                    },
                    {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.25,
                        ease: 'power2.out',
                        clearProps: 'transform'
                    }
                );
            } else {
                img.style.opacity = '1';
            }
        };

        // Fallback to original if optimized WebP fails
        img.onerror = function () {
            img.classList.remove('lb-loading');
            if (img.src !== p.src) {
                img.src = p.src;
                img.onerror = null;
            }
        };
    }
    if (counter) {
        counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    }
    const caption = document.getElementById('lightbox-caption');
    if (caption) {
        caption.textContent = p.alt || p.title || 'Portfolio System Interface';
    }
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;

    if (window.gsap) {
        gsap.to(lb, {
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
                lb.classList.add('hidden');
                lb.classList.remove('flex');
                document.body.style.overflow = '';
            }
        });
    } else {
        lb.classList.add('hidden');
        lb.classList.remove('flex');
        document.body.style.overflow = '';
    }
}

function prevImage() {
    if (currentGallery.length === 0) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    syncLightbox('prev');
    preloadNearbyImages(currentGallery, currentIndex);
}

function nextImage() {
    if (currentGallery.length === 0) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    syncLightbox('next');
    preloadNearbyImages(currentGallery, currentIndex);
}

function initLightboxListeners() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        if (lb.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // Close on background click
    lb.addEventListener('click', e => {
        if (e.target === lb) closeLightbox();
    });

    // Swipe Support
    let startX = 0, startY = 0;
    lb.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });

    lb.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        if (absX > 50 && absY < 80) {
            if (dx < 0) nextImage();
            else prevImage();
        } else if (absY > 90 && absX < 60) {
            closeLightbox();
        }
    }, { passive: true });
}

let activeProjectTrigger = null;
let previousBodyOverflow = '';

function renderProjectList(items) {
    return `
        <ul class="project-details-list">
            ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
}

function renderProjectPills(items) {
    return `
        <div class="project-details-pill-group">
            ${items.map(item => `<span>${item}</span>`).join('')}
        </div>
    `;
}

function renderProjectSection(title, content, modifier = '') {
    return `
        <section class="project-details-section ${modifier}">
            <p class="project-details-section-label">${title}</p>
            ${content}
        </section>
    `;
}

function renderProjectDetails(project) {
    return `
        <div class="project-details-meta">
            <span><strong>Type</strong>${project.type}</span>
            <span><strong>Status</strong>${project.status}</span>
            <span><strong>Tech Stack</strong>${project.technologies.join(', ')}</span>
        </div>

        <div class="project-details-section-grid">
            ${renderProjectSection('Overview', `<p>${project.overview}</p>`)}
            ${renderProjectSection('Problem / Purpose', `<p>${project.problem}</p>`)}
        </div>

        <div class="project-details-section-grid">
            ${renderProjectSection('Target Users', renderProjectList(project.targetUsers), 'project-details-card')}
            ${renderProjectSection('Key Features', renderProjectList(project.keyFeatures), 'project-details-card')}
        </div>

        ${renderProjectSection('Technologies Used', renderProjectPills(project.technologies), 'project-details-card')}
        ${renderProjectSection('System / Workflow Idea', `<p>${project.workflow}</p>`)}
        ${renderProjectSection('Current Status', `<p>${project.currentStatus}</p>`, 'project-details-card')}

        <div class="project-details-section-grid">
            ${renderProjectSection('Future Improvements', renderProjectList(project.futureImprovements), 'project-details-card')}
            ${renderProjectSection('What I Learned', `<p>${project.learned}</p>`, 'project-details-card')}
        </div>
    `;
}

function setProjectAction(link, action, fallbackLabel) {
    if (!link) return;
    const label = action && action.label ? action.label : fallbackLabel;
    const href = action && action.href ? action.href : '#';

    link.textContent = label;
    link.setAttribute('href', href);

    const isPlaceholder = href === '#';
    link.classList.toggle('project-details-action-muted', isPlaceholder);
    link.classList.toggle('project-details-action-primary', !isPlaceholder);
    link.setAttribute('aria-disabled', isPlaceholder ? 'true' : 'false');
}

function openProjectDetails(projectKey) {
    const project = projectDetailsData[projectKey];
    const modal = document.getElementById('project-details-modal');
    const panel = modal ? modal.querySelector('.project-details-panel') : null;
    if (!project || !modal || !panel) return;

    const title = document.getElementById('project-modal-title');
    const summary = document.getElementById('project-modal-summary');
    const badges = document.getElementById('project-modal-badges');
    const body = document.getElementById('project-modal-body');

    if (title) title.textContent = project.title;
    if (summary) summary.textContent = project.summary;
    if (badges) {
        badges.innerHTML = `
            <span class="project-details-badge project-details-badge-type">${project.type}</span>
            <span class="project-details-badge project-details-badge-status">${project.status}</span>
        `;
    }
    if (body) body.innerHTML = renderProjectDetails(project);

    setProjectAction(document.getElementById('project-modal-github'), project.actions && project.actions.github, 'GitHub Coming Soon');
    setProjectAction(document.getElementById('project-modal-docs'), project.actions && project.actions.docs, 'Documentation Coming Soon');
    setProjectAction(document.getElementById('project-modal-demo'), project.actions && project.actions.demo, 'Live Demo Coming Soon');

    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.classList.remove('hidden');
    modal.classList.add('is-open');
    panel.focus();
}

function closeProjectDetails() {
    const modal = document.getElementById('project-details-modal');
    if (!modal || !modal.classList.contains('is-open')) return;

    modal.classList.add('hidden');
    modal.classList.remove('is-open');
    document.body.style.overflow = previousBodyOverflow || '';

    if (activeProjectTrigger) {
        activeProjectTrigger.focus();
        activeProjectTrigger = null;
    }
}

function initProjectDetailsModal() {
    const modal = document.getElementById('project-details-modal');
    if (!modal) return;

    document.querySelectorAll('[data-project]').forEach(trigger => {
        trigger.addEventListener('click', event => {
            event.preventDefault();
            activeProjectTrigger = trigger;
            openProjectDetails(trigger.dataset.project);
        });
    });

    const closeButtons = [
        document.getElementById('project-modal-close'),
        document.getElementById('project-modal-footer-close')
    ].filter(Boolean);

    closeButtons.forEach(button => button.addEventListener('click', closeProjectDetails));

    modal.addEventListener('click', event => {
        const disabledAction = event.target.closest('[aria-disabled="true"]');
        if (disabledAction) {
            event.preventDefault();
            return;
        }

        if (event.target === modal) closeProjectDetails();
    });

    document.addEventListener('keydown', event => {
        if (!modal.classList.contains('is-open')) return;

        if (event.key === 'Escape') {
            closeProjectDetails();
            return;
        }

        if (event.key !== 'Tab') return;

        const focusable = modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });
}

/**
 * Shared GSAP Animation Helpers
 */
function revealOnScroll(elements, options = {}) {
    if (!window.ScrollTrigger) return;

    gsap.utils.toArray(elements).forEach(el => {
        gsap.fromTo(el,
            { y: options.y || 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: options.duration || 0.8,
                ease: options.ease || 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: options.start || 'top 85%',
                    once: true
                }
            }
        );
    });
}

/**
 * Modern ScrollSpy anchor highlighting on index.html scroll
 */
function initScrollSpy() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    const normPage = page.replace(/\.html$/, '') || 'index';
    if (normPage !== 'index') return;

    const sections = ['home', 'about', 'skills', 'projects', 'research', 'experience', 'contact'];
    const navLinks = document.querySelectorAll('#nav-links a, #mobile-menu a');

    window.addEventListener('scroll', () => {
        let current = 'home';
        const scrollPosition = window.scrollY + 250; // offset

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const top = el.offsetTop;
                const height = el.offsetHeight;
                if (scrollPosition >= top && scrollPosition < top + height) {
                    current = id;
                }
            }
        });

        navLinks.forEach(a => {
            const href = a.getAttribute('href') || '';
            const isSubpage = href.includes('research-capstones.html') || href.includes('web-development.html') || href.includes('system-design.html') || href.includes('network-labs.html');
            if (!isSubpage && href.includes(`#${current}`)) {
                a.classList.remove('text-text-muted', 'text-slate-600');
                a.classList.add('text-blue-600', 'active');
            } else {
                if (!isSubpage || (isSubpage && normPage !== 'research-capstones')) {
                    a.classList.remove('text-text-main', 'text-blue-600', 'active');
                    a.classList.add('text-slate-600');
                }
            }
        });
    });
}
