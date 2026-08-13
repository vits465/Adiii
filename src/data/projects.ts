export interface Project {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  team: string;
  roles: string[];
  description: string;
  longDescription: string;
  liveUrl?: string;
  repoUrl?: string;
  cover: string;
  featured: boolean;
  stats?: { label: string; value: string }[];
  problem?: string;
  architecture?: string;
  outcome?: string;
}

export const projectsData: Project[] = [
  {
    slug: "house-of-hackney",
    index: "01",
    title: "House of Hackney Enterprise Backend API",
    category: "Enterprise B2C/B2B Architecture",
    year: "2025",
    team: "Oscar Academy Capstone",
    roles: ["Node.js", "Express.js", "MongoDB (43 Collections)", "156 Endpoints"],
    description: "Enterprise-grade RESTful API backend handling 43 MongoDB collections across 5 domain modules with 156 endpoints, engineered using a 3-layer Repository -> Service -> Controller pattern.",
    longDescription: `
      Academy Final Capstone Project for Oscar Career Point Academy. A massive luxury e-commerce backend system built for enterprise scalability and modularity.
      
      Key Architecture Highlights:
      • Engineered a 3-Layer Enterprise Pattern: Controller → Service → Repository for strict separation of concerns, unit testability, and maintainability.
      • 43 MongoDB Collections structured across 5 domain modules (Product Catalog, Commerce/Cart/Checkout, Address/User Management, Orders, Inventory).
      • 156 REST API Endpoints with complete Postman testing collections, input validation schemas, database indexing, and error handling middlewares.
    `,
    repoUrl: "https://github.com/vits465/houseofhackney-Backeend.git",
    cover: "/textures/global/noise.jpeg",
    featured: true,
    stats: [
      { label: "API Endpoints", value: "156 Endpoints" },
      { label: "DB Collections", value: "43 Collections" },
      { label: "Pattern", value: "Repository -> Service -> Controller" }
    ],
    problem: "Building a scalable, maintainable luxury e-commerce architecture capable of handling multi-domain B2B and B2C ordering workflows with clean separation of concerns.",
    architecture: "3-Layer Enterprise Repository -> Service -> Controller architecture in Node.js/Express with MongoDB Mongoose schemas, comprehensive index optimization, and modular routes.",
    outcome: "Successfully shipped 156 endpoints passing full Postman test suites with sub-50ms query latency."
  },
  {
    slug: "the-flat-white",
    index: "02",
    title: "The Flat White Coffee House",
    category: "Cinematic 3D WebGL Café Experience",
    year: "2025",
    team: "Interactive Developer",
    roles: ["Next.js", "Three.js", "GSAP ScrollTrigger", "WebGL"],
    description: "An interactive digital web experience created for an artisan coffee house, combining Three.js 3D visuals with frame-scrubbed video hero animations and steam particles.",
    longDescription: `
      An immersive digital web experience created for an artisan coffee house client, combining interactive 3D elements with fluid scroll storytelling.
      
      Key Engineering Highlights:
      • Implemented Three.js 3D canvas visuals paired with GSAP ScrollTrigger for smooth visual animations.
      • Engineered a scroll-scrubbed video hero section showcasing artisan coffee brewing processes frame-by-frame.
      • Integrated dynamic café menu listings, online reservation triggers, and brand storytelling components.
    `,
    liveUrl: "https://the-flat-white.vercel.app/",
    repoUrl: "https://github.com/vits465/THE-FLAT-WHITE.git",
    cover: "/textures/global/noise.jpeg",
    featured: true,
    stats: [
      { label: "3D Rendering", value: "Three.js / WebGL" },
      { label: "Animation", value: "GSAP ScrollTrigger" },
      { label: "Platform", value: "Next.js + Vercel" }
    ],
    problem: "Crafting a memorable digital identity for an artisan coffee brand that stands out from static restaurant templates.",
    architecture: "Next.js App Router frontend with GLTF 3D coffee bean models, particle steam shaders, and Lenis smooth scrolling.",
    outcome: "Live client platform driving online reservations and brand engagement."
  },
  {
    slug: "treadiiiio-goldsignal",
    index: "03",
    title: "Treadiiiio & GoldSignal Engine",
    category: "Algorithmic Trading & Signal Platform",
    year: "2025",
    team: "Lead Systems Engineer",
    roles: ["Node.js / TS", "Python / XGBoost", "PostgreSQL / TimescaleDB", "Next.js Dashboard"],
    description: "Algorithmic forex trading system & XAU/USD signal aggregation platform featuring Node/TS engine, Python ML confidence scoring, and real-time risk dashboard.",
    longDescription: `
      Engineered as a robust algorithmic trading execution engine and XAU/USD signal intelligence platform.
      
      Key Engineering Highlights:
      • High-frequency tick data processing engine built in Node.js/TypeScript with TimescaleDB time-series storage.
      • Python XGBoost machine learning module evaluating historical signal confidence scores and technical indicators.
      • Real-time Next.js risk monitoring dashboard with WebSocket updates and emergency circuit-breaker protocols.
    `,
    repoUrl: "https://github.com/vits465",
    cover: "/textures/global/noise.jpeg",
    featured: true,
    stats: [
      { label: "Engine", value: "Node/TS + Python ML" },
      { label: "Time-Series DB", value: "TimescaleDB" },
      { label: "Risk Protocols", value: "Automated Stop" }
    ],
    problem: "Aggregating multi-source forex signal feeds and executing risk-managed algorithmic trades with sub-millisecond precision.",
    architecture: "Distributed Node.js micro-engine connected to Python ML microservices via gRPC and WebSocket streaming to a Next.js analytics dashboard.",
    outcome: "Production-ready risk management system processing real-time market ticks."
  },
  {
    slug: "journeyflicker",
    index: "04",
    title: "JourneyFlicker",
    category: "Luxury Travel & Quotation Platform",
    year: "2025",
    team: "Sole Fullstack Developer",
    roles: ["React.js", "Node.js", "Quotation Engine", "Tailwind CSS"],
    description: "Full production platform for a luxury travel agency, featuring dynamic travel itinerary showcases, interactive quotation builder, and PDF brochure generator tool.",
    longDescription: `
      JourneyFlicker is a high-end web platform designed and built for a luxury travel agency.
      
      Key Engineering Highlights:
      • Built a client-facing responsive React platform providing immersive travel packages, destination highlights, and custom query submissions.
      • Engineered an internal administrative workflow tool that unifies travel quotation and PDF brochure generation into a single streamlined workspace with live visual preview and dynamic field editing.
      • Optimised UI performance, page load velocity, and SEO structure for international travel client acquisition.
    `,
    liveUrl: "https://www.journeyflicker.com",
    repoUrl: "https://github.com/vits465/journeyflicker.git",
    cover: "/textures/global/noise.jpeg",
    featured: true,
    stats: [
      { label: "Live Client Site", value: "journeyflicker.com" },
      { label: "Quotation Workflow", value: "Instant PDF Export" },
      { label: "Architecture", value: "Full Stack React/Node" }
    ],
    problem: "Travel agents spent hours manually compiling PDF quotes and brochures for clients.",
    architecture: "React SPA with client-side canvas-to-pdf rendering, live JSON quote builder, and responsive Tailwind UI.",
    outcome: "Reduced quote generation time from 45 minutes to under 2 minutes."
  },
  {
    slug: "bobby-salon",
    index: "05",
    title: "Bobby Salon",
    category: "Men's Grooming Platform",
    year: "2025",
    team: "Frontend & Booking Arch.",
    roles: ["HTML5", "CSS3", "JavaScript", "WhatsApp API", "Bootstrap 5"],
    description: "Production web application for a premier Surat salon with service pricing catalogs, hairstyle portfolio gallery, and instant WhatsApp booking.",
    longDescription: `
      Designed and built end-to-end for a real Surat men's grooming business to elevate their brand presence and digital client bookings.
      
      Key Engineering Highlights:
      • Crafted a responsive UI showcase featuring service catalogs, price tiers, and high-resolution haircut styling galleries.
      • Implemented an instant WhatsApp-integrated appointment booking flow, allowing clients to pre-select services, date, and preferred stylist.
      • Optimized mobile browsing experience, achieving top performance scores and client conversion gains.
    `,
    liveUrl: "https://bobbysalon.in/",
    repoUrl: "https://github.com/vits465/Bobby-Salon.git",
    cover: "/textures/global/noise.jpeg",
    featured: true,
    stats: [
      { label: "Live Client Site", value: "bobbysalon.in" },
      { label: "Booking Flow", value: "WhatsApp Direct" },
      { label: "Mobile Score", value: "100/100" }
    ],
    problem: "Traditional phone booking caused missed client calls during peak salon hours.",
    architecture: "Lightweight HTML5/JS application with pre-filled WhatsApp Web API deep-links.",
    outcome: "Boosted direct digital booking conversions by over 40%."
  },
  {
    slug: "journeyflicker-automation",
    index: "06",
    title: "WhatsApp Inquiry Automation Bot",
    category: "WhatsApp Automation Service",
    year: "2025",
    team: "Backend Engineer",
    roles: ["Node.js", "Express.js", "WhatsApp Web API", "Automation Bot"],
    description: "Companion WhatsApp automation bot designed to handle real-time customer travel inquiries, automated booking follow-ups, and instant quotation dispatches.",
    longDescription: `
      Developed as a companion service to the JourneyFlicker platform to bridge client communications via WhatsApp.
      
      Key Engineering Highlights:
      • Built automated bot flows to instantly respond to incoming travel inquiries 24/7.
      • Integrated automated itinerary follow-ups, quotation dispatches, and appointment reminders.
      • Reduced client response latency from hours to seconds while maintaining context-aware conversation flows.
    `,
    repoUrl: "https://github.com/vits465/journeyflicker-automation.git",
    cover: "/textures/global/noise.jpeg",
    featured: true,
    stats: [
      { label: "Response Rate", value: "Instant 24/7" },
      { label: "Integration", value: "WhatsApp Web API" },
      { label: "Uptime", value: "99.9%" }
    ],
    problem: "Handling high-volume inquiry traffic outside of business hours without human delay.",
    architecture: "Node.js Express daemon utilizing Puppeteer / WhatsApp Web client for automated stateful message parsing.",
    outcome: "Achieved instant automated client engagement."
  }
];

export const archivesData = [
  {
    title: "Fullstack E-Commerce Microservices Architecture",
    description: "Product catalog, Cart, Checkout, Address, and Order modules built with Node.js & Mongoose.",
    year: "2025",
    stack: "Node.js / Express / MongoDB"
  },
  {
    title: "AI Coding Agent Direction Workflow",
    description: "Structured technical specification architecture for orchestrating AI agents to ship features at 5x velocity.",
    year: "2025",
    stack: "Prompt Engineering / System Specs"
  },
  {
    title: "VNSGU Web & Data Analytics Certification",
    description: "WordPress, Web Designing, Artificial Intelligence & Data Science coursework.",
    year: "2024",
    stack: "Academic / VNSGU"
  }
];
