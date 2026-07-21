export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  techUsed: string[];
  startingPrice?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'websites' | 'mobile' | 'ai' | 'automation' | 'dashboard';
  image: string;
  description: string;
  clientIndustry: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: string[];
  liveUrl?: string;
  githubUrl?: string;
  isDemo?: boolean;
}

export interface BlogItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: string;
  readTime: string;
}

export const translations: any = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      about: "About",
      pricing: "Pricing",
      blog: "Blog",
      contact: "Contact",
      getQuote: "Get Quote",
      clientPortal: "Client Portal",
      tracker: "Tracker",
    },
    hero: {
      badge: "Your Trusted Technology Partner",
      title: "We Engineer Custom Digital Solutions for Growing Businesses",
      tagline: "High-performance websites, custom software, and intelligent automation built on trust, clarity, and transparent pricing. No jargon, just results.",
      getQuote: "Get a Free Quote",
      bookMeeting: "Book strategy call",
      trustedBy: "Trusted by companies worldwide",
      stats: {
        projects: "Projects Completed",
        uptime: "Uptime Guaranteed",
        satisfaction: "Client Rating",
        delivery: "On-time Delivery",
      }
    },
    services: {
      title: "Our Services",
      subtitle: "Tailored software development and digital strategy to accelerate your business growth.",
      learnMore: "Learn More",
      startingFrom: "Starting from",
      featuresTitle: "Key Features",
      benefitsTitle: "Business Benefits",
      techTitle: "Technologies",
      ctaButton: "Inquire About This Service",
      items: [
        {
          id: "web-dev",
          title: "Website Development",
          description: "High-performance, SEO-optimized, and responsive marketing websites designed to convert visitors into loyal clients.",
          features: ["Mobile-first responsive layouts", "Speed & Core Web Vitals optimization", "Custom CMS integrations"],
          benefits: ["Increased organic search traffic", "Higher conversion rates", "Clean digital brand presence"],
          techUsed: ["React", "Vite", "Tailwind CSS", "Next.js"],
          startingPrice: "$2,499"
        },
        {
          id: "web-apps",
          title: "Web Applications",
          description: "Robust, scalable, and secure cloud applications customized to streamline your complex business operations.",
          features: ["Real-time data synchronization", "Role-based user permissions", "Secure database structures"],
          benefits: ["Automated company workflows", "Reduced operational overhead", "Accessible anywhere, anytime"],
          techUsed: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL"],
          startingPrice: "$4,999"
        },
        {
          id: "mobile-apps",
          title: "Mobile Apps",
          description: "Feature-rich native and cross-platform mobile apps for iOS and Android that engage customers on the go.",
          features: ["Push notification integrations", "Offline sync capabilities", "Smooth transitions & gestures"],
          benefits: ["Direct customer communication", "Higher brand loyalty", "Enhanced mobile user engagement"],
          techUsed: ["React Native", "TypeScript", "Tailwind CSS", "Firebase"],
          startingPrice: "$5,999"
        },
        {
          id: "ui-ux",
          title: "UI/UX Design",
          description: "User-centric design assets, wireframes, and prototypes focusing on intuitive user journeys and accessibility.",
          features: ["Detailed interactive prototyping", "Comprehensive user research", "Custom visual brand identities"],
          benefits: ["Lower client drop-off rates", "Maximized user satisfaction", "Modernized software aesthetics"],
          techUsed: ["Figma", "Adobe XD", "Tailwind CSS"],
          startingPrice: "$1,499"
        },
        {
          id: "ai-solutions",
          title: "AI & ML Solutions",
          description: "Incorporate machine learning, natural language processing, and predictive analytics to make smarter decisions.",
          features: ["Custom training models", "Structured predictive analytics", "Smart API and chatbot integrations"],
          benefits: ["Data-driven decision making", "Automated customer support", "Advanced predictive intelligence"],
          techUsed: ["Python", "FastAPI", "OpenAI API", "Hugging Face", "PyTorch"],
          startingPrice: "$7,999"
        },
        {
          id: "automation",
          title: "Automation Systems",
          description: "Connect APIs and systems to automate repetitive data entry, syncing, reporting, and marketing flows.",
          features: ["Third-party API integrations", "Scheduled automated reports", "Data pipeline automation"],
          benefits: ["Save hundreds of work hours", "Eliminate human input errors", "Instant action-to-trigger updates"],
          techUsed: ["Node.js", "Python", "Zapier", "Make.com", "Cron Jobs"],
          startingPrice: "$1,999"
        }
      ]
    },
    whyChooseUs: {
      title: "Why Growing Businesses Partner With Us",
      subtitle: "We replace agency mystery and developer jargon with clear processes, weekly progress trackers, and absolute transparency.",
      cards: [
        {
          title: "Total Price Transparency",
          description: "No hidden fees, no scope creep. Our cost estimator and detailed proposals align budgets before writing code."
        },
        {
          title: "Live Progress Tracking",
          description: "Log into your client portal at any time to view real-time milestone completions, task logs, and files."
        },
        {
          title: "Reliable & Clean Code",
          description: "We write well-documented, clean code using modern technologies. You always retain 100% of your source code."
        },
        {
          title: "Post-Launch Support",
          description: "We don't leave you after deployment. Every project includes complimentary support and maintenance options."
        }
      ]
    },
    process: {
      title: "Our Seamless Development Process",
      subtitle: "How we guide your project from initial brainstorming to successful deployment.",
      steps: [
        { num: "01", title: "Requirement Discussion", desc: "We sit down to talk about your goals, user flows, and project scope." },
        { num: "02", title: "Proposal & Quote", desc: "You receive a transparent, itemized proposal with clear milestone pricing." },
        { num: "03", title: "UI/UX Design", desc: "We design high-fidelity interactive wireframes for your review and sign-off." },
        { num: "04", title: "Development", desc: "Our engineers build the application using modern, fast, and secure frameworks." },
        { num: "05", title: "Testing", desc: "Rigorous QA checks for speed, accessibility, responsiveness, and bugs." },
        { num: "06", title: "Deployment", desc: "We launch your project onto cloud servers and configure SEO domains." },
        { num: "07", title: "Support", desc: "Ongoing post-launch maintenance, analytics tracking, and scheduled updates." }
      ]
    },
    portfolio: {
      title: "Featured Projects",
      subtitle: "A showcase of high-quality applications built by our studio. Some are interactive concept designs.",
      filterAll: "All Projects",
      filterWeb: "Websites",
      filterMobile: "Mobile Apps",
      filterAi: "AI/ML",
      filterAutomation: "Automation",
      filterDashboard: "Dashboards",
      clientIndustry: "Client Industry",
      problem: "The Challenge",
      solution: "Our Solution",
      results: "Key Results",
      demoLabel: "Concept Design",
      liveDemo: "Launch Live Demo",
      github: "GitHub Repository",
      items: [
        {
          id: "project-5",
          title: "Northstar - Marketing Site",
          category: "websites",
          image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80",
          description: "A conversion-focused marketing website for a consulting firm with SEO structure, clear calls to action, and a fast mobile experience.",
          clientIndustry: "Professional Services",
          problem: "The brand had an outdated website that was difficult to navigate and not ranking well for target search terms.",
          solution: "Rebuilt the site with a clear messaging hierarchy, CMS-friendly content blocks, and a performance-first frontend experience.",
          technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
          results: ["Raised organic traffic by 38% in 90 days", "Improved conversion rate by 24%", "Reduced average page load time to under 1.7s"],
          liveUrl: "#",
          githubUrl: "#",
          isDemo: true
        },
        {
          id: "project-1",
          title: "Veloce - E-Commerce Analytics",
          category: "dashboard",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
          description: "A centralized dashboard for e-commerce operators tracking cross-channel sales, inventory churn, and customer lifetime value.",
          clientIndustry: "Retail & E-commerce",
          problem: "The client was manually importing CSV files from Shopify, Amazon, and Stripe into spreadsheet dashboards, causing a 2-day delay in metrics reporting.",
          solution: "Built a React + Vite dashboard that aggregates APIs, runs real-time data calculations, and visualizes sales, retention, and inventory levels.",
          technologies: ["React", "Tailwind CSS", "Recharts", "Node.js", "MongoDB"],
          results: ["Eliminated 12 hours of manual CSV entry per week", "Provided instant, real-time visual analytics", "Increased average inventory turn rate by 14%"],
          liveUrl: "#",
          githubUrl: "#",
          isDemo: true
        },
        {
          id: "project-2",
          title: "AuraHealth - Patient Scheduling",
          category: "mobile",
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
          description: "A patient-facing mobile application for booking healthcare appointments, chatting with clinicians, and tracking prescriptions.",
          clientIndustry: "Healthcare / Medical",
          problem: "Patients faced long phone queues to reschedule appointments, and clinical staff were overwhelmed with administrative call volumes.",
          solution: "Developed a cross-platform mobile application featuring calendar booking synchronization, secure direct messaging, and push notifications.",
          technologies: ["React Native", "TypeScript", "Tailwind CSS", "Firebase"],
          results: ["Reduced phone booking volumes by 42%", "No-show rate dropped from 18% to under 4% via auto-reminders", "Patient satisfaction rating rose to 4.8/5"],
          liveUrl: "#",
          githubUrl: "#",
          isDemo: true
        },
        {
          id: "project-3",
          title: "Synthetix AI - Support Agent",
          category: "ai",
          image: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=80",
          description: "AI-driven customer support bot trained on product knowledge bases to solve complex software issues automatically.",
          clientIndustry: "SaaS / Software",
          problem: "First-response support times were averaging 9 hours, leading to high user churn and overstressed customer success reps.",
          solution: "Engineered an AI agent that integrates into Slack and Intercom, parses user queries, searches vector databases, and resolves queries.",
          technologies: ["FastAPI", "Python", "OpenAI GPT-4", "Pinecone", "React"],
          results: ["Instantly resolved 64% of inbound support tickets", "Average first-response time dropped to under 30 seconds", "Saves an estimated $8,500/month in operations"],
          liveUrl: "#",
          githubUrl: "#",
          isDemo: true
        },
        {
          id: "project-4",
          title: "AutoSync - CRM Leads Pipeline",
          category: "automation",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
          description: "Automated leads ingestion pipeline syncing Facebook Ads, Web Forms, and Google Sheets directly to Salesforce with scoring.",
          clientIndustry: "Real Estate & Agencies",
          problem: "Leads gathered from social channels sat uncontacted for hours because reps had to manually check multiple advertising accounts.",
          solution: "Programmed a serverless Node.js integration script that instantly fetches, scores, formats, and distributes leads to active agents via SMS.",
          technologies: ["Node.js", "Express", "Salesforce API", "Twilio", "AWS Lambda"],
          results: ["Lead response time dropped from 3.5 hours to 4 minutes", "Conversion rate on advertising leads increased by 22%", "100% automation of database syncs"],
          liveUrl: "#",
          githubUrl: "#",
          isDemo: true
        }
      ]
    },
    pricing: {
      title: "Simple, Transparent Pricing",
      subtitle: "No surprise invoices. We specify scopes and pricing guidelines upfront.",
      popular: "Most Popular",
      cta: "Choose Plan",
      customCta: "Build Custom Quote",
      plans: [
        {
          name: "Starter",
          price: "$2,499",
          desc: "Perfect for new businesses looking for a professional and SEO-optimized digital presence.",
          features: [
            "Custom 5-page React website",
            "Fully responsive (Mobile/Tablet/Desktop)",
            "Google Analytics & SEO optimization",
            "Contact form & lead capture",
            "1 Month post-launch support",
            "100% Source code ownership"
          ]
        },
        {
          name: "Professional",
          price: "$4,999",
          desc: "Designed for scaling startups needing specialized functionalities or custom client portals.",
          features: [
            "Custom web application up to 10 pages",
            "User login & dashboard panel",
            "Database integration (MongoDB/Postgres)",
            "Payment gateway setup (Stripe/PayPal)",
            "API integrations (CRM/Email)",
            "3 Months post-launch support",
            "Interactive administrative dashboard"
          ],
          popular: true
        },
        {
          name: "Enterprise",
          price: "$9,999+",
          desc: "Full-scale custom software, complex AI agent integrations, or high-performance mobile apps.",
          features: [
            "Custom React Native iOS & Android App",
            "Advanced AI chatbot/ML model integration",
            "High scalability cloud infrastructure (AWS/GCP)",
            "Unlimited user roles & advanced analytics",
            "Custom data syncing pipelines",
            "6 Months premium support & SLA",
            "CI/CD automated deployment pipelines"
          ]
        },
        {
          name: "Custom Project",
          price: "Custom",
          desc: "Have specific requirements that don't fit standard plans? Use our estimator or book a call.",
          features: [
            "Detailed scopes & wireframes before pricing",
            "Custom team allocation",
            "Dedicated project coordinator",
            "Specialized compliance frameworks",
            "Ongoing maintenance contracts",
            "Flexible payments by milestones"
          ]
        }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Answering your questions openly and honestly.",
      items: [
        {
          q: "How long does a typical project take?",
          a: "A standard landing page or marketing website (Starter) takes 2 to 4 weeks. Custom web applications (Professional) usually take 6 to 10 weeks, while large scale mobile apps or enterprise software take 12+ weeks. We provide detailed timelines prior to kick-off."
        },
        {
          q: "Do I actually own the source code?",
          a: "Yes, 100%. Once final payment is completed, the full IP rights and source code repositories are transferred over to you. We do not charge licensing fees or keep your code hostage."
        },
        {
          q: "How is payment structured?",
          a: "We work on a milestone-based payment schedule. Typically, it is 30% upfront, 40% upon approval of designs & mid-development, and 30% after final testing and prior to deployment. This aligns incentives on both sides."
        },
        {
          q: "Do you provide maintenance and updates after launch?",
          a: "Absolutely. Every project includes free support (1 to 6 months depending on the tier). After that, you can opt for our flexible maintenance agreements which cover backups, security patches, small adjustments, and performance checkups."
        },
        {
          q: "Can you redesign or update our existing website/app?",
          a: "Yes. We can review your current tech stack, perform code audits, and reconstruct outdated UI/UX systems. We specialize in migrating legacy systems to modern, fast React + Vite structures."
        }
      ]
    },
    blog: {
      title: "Industry Insights & News",
      subtitle: "Articles to help you understand software architecture, AI strategies, and digital scaling.",
      readArticle: "Read Article",
      backToBlog: "Back to Blog Feed",
      items: [
        {
          id: "post-1",
          title: "Why React + Vite is the Ultimate Combo for Modern SEO Marketing",
          category: "Web Development",
          date: "July 2, 2026",
          summary: "Explore how lightning-fast static builds and client-side optimization boost Google Core Web Vitals and drive lead conversions.",
          content: "In 2026, web page speed is not just a user experience detail; it is a critical SEO factor. Vite has revolutionized the frontend ecosystem by offering extremely fast bundle compilation. Combined with React, Vite allows you to deploy client-side applications that load within milliseconds. When pages load instantly, user bounce rates drop, Google rankings rise, and conversion rates scale up. In this guide, we dive deep into optimizing React applications for core web vitals, pre-rendering strategies, and setting up perfect Meta tags.",
          readTime: "5 min read"
        },
        {
          id: "post-2",
          title: "Integrating AI Agents: A Blueprint for Customer Support Automation",
          category: "AI & ML",
          date: "June 25, 2026",
          summary: "Learn how modern SaaS businesses use LLMs and vector databases to automate 60%+ of client service queries securely.",
          content: "Artificial Intelligence has moved past simple search queries. Today, AI Agents powered by Retrieval-Augmented Generation (RAG) can retrieve information directly from your internal databases and solve complex user problems without human intervention. This post outlines how to connect OpenAI, Pinecone vector search, and custom knowledge bases. We also address key privacy concerns: ensuring client data is secure, sandboxing AI access, and creating seamless handoff hooks so human agents can jump in when needed.",
          readTime: "8 min read"
        },
        {
          id: "post-3",
          title: "How to Build a Lead-Generation Engine: Lessons from Top Digital Agencies",
          category: "Business Strategy",
          date: "June 12, 2026",
          summary: "Stop building flashy websites that do not convert. Learn how transparent pricing, estimators, and clear navigation convert traffic.",
          content: "Many agencies fail because they prioritize flashy animations over clear UX navigation. To build a true lead-generation engine, your site must focus on trust, clear services, and transparent call-to-actions. Interactive widgets, like cost estimators, provide immediate value and capture highly qualified leads. In this article, we outline our exact formula for crafting landing pages that double the industry-standard conversion rates.",
          readTime: "6 min read"
        }
      ]
    },
    contact: {
      title: "Start Your Digital Project Today",
      subtitle: "Fill out the form below, send us a WhatsApp message, or book a strategy meeting directly.",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number (Optional)",
        service: "Selected Service",
        budget: "Budget Range",
        message: "Tell us about your project",
        upload: "Upload Project Brief / Files",
        submit: "Submit Inquiry",
        success: "Thank you! Our engineering team will review your project brief and get back to you within 24 hours.",
        error: "Please fill out all required fields."
      },
      info: {
        email: "--------------",
        phone: "+91 93605 37379",
        whatsapp: "Chat on WhatsApp",
        location: "Chennai,Tamil Nadu,India",
        office: "Main Office",
        socials: "Follow Us"
      }
    },
    estimator: {
      title: "Interactive Cost Estimator",
      subtitle: "Estimate your project cost in real-time. Transparent pricing, no obligation.",
      steps: {
        service: "Choose Service Type",
        complexity: "Choose Complexity Level",
        platforms: "Target Platforms",
        timeline: "Preferred Timeline",
        result: "Estimated Investment"
      },
      complexityOptions: {
        simple: "Simple / MVP (Static pages, basic flows)",
        medium: "Medium / Business (User portals, admin dashboards, database integrations)",
        complex: "Complex / Enterprise (Custom algorithms, real-time messaging, AI integrations, mobile apps)"
      },
      platformOptions: {
        web: "Web Desktop",
        mobile: "iOS & Android Mobile",
        both: "Cross-platform Web & Mobile"
      },
      timelineOptions: {
        fast: "Expedited (1-2 months - Rush delivery)",
        standard: "Standard (3-4 months - Recommended)",
        flexible: "Flexible (5+ months - Budget friendly)"
      },
      leadForm: {
        title: "Submit Estimate as Inquiry",
        desc: "Submit your estimated specifications to our engineers. We will review it and send a detailed project timeline.",
        submit: "Request Free Custom Proposal",
        success: "Estimate submitted! Our team will reach out with a detailed proposal."
      }
    },
    dashboard: {
      title: "Client Portal & Tracker",
      loginTitle: "Client Workspace Login",
      subtitle: "Track your active software builds, milestones, and shared files in real-time.",
      email: "Client Email",
      password: "Access Password",
      button: "Sign In to Portal",
      demoHelp: "Demo Credentials: Use client@demo.com and password123 to log in.",
      logout: "Log Out",
      overview: "Project Overview",
      activeProject: "Active Project",
      status: "Build Status",
      currentMilestone: "Current Milestone",
      milestonesTitle: "Development Milestones",
      chatTitle: "Project Coordinator Chat",
      filesTitle: "Project Shared Files",
      uploadSuccess: "File uploaded successfully to project files!",
      chatPlaceholder: "Ask a question about the build...",
      mockChat: {
        intro: "Hi! I am Sarah, your Project Coordinator. We are currently finalizing the UI/UX designs. Let me know if you have any questions!",
        response: "Got your message! I will pass this to our development team. You'll see updates on the tracker shortly."
      }
    },
    meeting: {
      title: "Book a Strategy Call",
      subtitle: "Pick a date and time for a 30-minute project scoping call with our Lead Architect.",
      success: "Meeting scheduled! A calendar invite has been sent to your email address.",
      selectDate: "Select Date",
      selectTime: "Select Time Slot",
      confirm: "Confirm Scoping Call"
    }
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      portfolio: "Portafolio",
      about: "Nosotros",
      pricing: "Precios",
      blog: "Blog",
      contact: "Contacto",
      getQuote: "Obtener Cotización",
      clientPortal: "Portal Cliente",
      tracker: "Seguimiento",
    },
    hero: {
      badge: "Tu Socio Tecnológico de Confianza",
      title: "Creamos Soluciones Digitales a Medida para Empresas",
      tagline: "Sitios web de alto rendimiento, software personalizado y automatización inteligente basados en la confianza, claridad y precios transparentes. Sin tecnicismos, solo resultados.",
      getQuote: "Obtener Cotización Gratis",
      bookMeeting: "Reservar sesión estratégica",
      trustedBy: "Empresas que confían en nosotros",
      stats: {
        projects: "Proyectos Completados",
        uptime: "Tiempo de Actividad",
        satisfaction: "Calificación de Clientes",
        delivery: "Entregas a Tiempo",
      }
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Desarrollo de software a medida y estrategia digital para acelerar el crecimiento de tu negocio.",
      learnMore: "Saber Más",
      startingFrom: "A partir de",
      featuresTitle: "Características Clave",
      benefitsTitle: "Beneficios de Negocio",
      techTitle: "Tecnologías",
      ctaButton: "Preguntar sobre este servicio",
      items: [
        {
          id: "web-dev",
          title: "Desarrollo de Sitios Web",
          description: "Sitios web de marketing de alto rendimiento, optimizados para SEO y adaptables, diseñados para convertir visitantes en clientes.",
          features: ["Diseños adaptables orientados a móviles", "Optimización de velocidad y Core Web Vitals", "Integración de CMS personalizados"],
          benefits: ["Incremento del tráfico de búsqueda orgánica", "Mayores tasas de conversión", "Presencia digital limpia y profesional"],
          techUsed: ["React", "Vite", "Tailwind CSS", "Next.js"],
          startingPrice: "$2,499"
        },
        {
          id: "web-apps",
          title: "Aplicaciones Web",
          description: "Aplicaciones en la nube robustas, escalables y seguras personalizadas para optimizar tus operaciones comerciales complejas.",
          features: ["Sincronización de datos en tiempo real", "Permisos de usuario basados en roles", "Bases de datos seguras"],
          benefits: ["Automatización de flujos de trabajo", "Reducción de costos operativos", "Accesible en cualquier momento y lugar"],
          techUsed: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL"],
          startingPrice: "$4,999"
        },
        {
          id: "mobile-apps",
          title: "Aplicaciones Móviles",
          description: "Aplicaciones móviles nativas y multiplataforma para iOS y Android que conectan con tus clientes en cualquier lugar.",
          features: ["Integración de notificaciones push", "Sincronización sin conexión", "Gestos y transiciones fluidas"],
          benefits: ["Comunicación directa con el cliente", "Mayor fidelidad de marca", "Experiencia móvil superior"],
          techUsed: ["React Native", "TypeScript", "Tailwind CSS", "Firebase"],
          startingPrice: "$5,999"
        },
        {
          id: "ui-ux",
          title: "Diseño UI/UX",
          description: "Diseño centrado en el usuario, wireframes y prototipos interactivos enfocados en la usabilidad y accesibilidad.",
          features: ["Prototipado interactivo de alta fidelidad", "Investigación detallada de usuarios", "Identidades visuales personalizadas"],
          benefits: ["Menor tasa de abandono de usuarios", "Máxima satisfacción del cliente", "Estética de software moderna"],
          techUsed: ["Figma", "Adobe XD", "Tailwind CSS"],
          startingPrice: "$1,499"
        },
        {
          id: "ai-solutions",
          title: "Soluciones de IA y ML",
          description: "Incorpora aprendizaje automático, procesamiento de lenguaje natural y análisis predictivo para decidir mejor.",
          features: ["Modelos de entrenamiento personalizados", "Análisis predictivo estructurado", "Integración de chat y API inteligentes"],
          benefits: ["Toma de decisiones basada en datos", "Automatización de soporte técnico", "Inteligencia artificial avanzada"],
          techUsed: ["Python", "FastAPI", "OpenAI API", "Hugging Face", "PyTorch"],
          startingPrice: "$7,999"
        },
        {
          id: "automation",
          title: "Sistemas de Automatización",
          description: "Conecta APIs y herramientas para automatizar tareas repetitivas de entrada de datos, reportes y marketing.",
          features: ["Integración de APIs de terceros", "Reportes automatizados programados", "Automatización de flujos de datos"],
          benefits: ["Ahorra cientos de horas de trabajo", "Elimina errores de ingreso manual", "Acciones automáticas al instante"],
          techUsed: ["Node.js", "Python", "Zapier", "Make.com", "Cron Jobs"],
          startingPrice: "$1,999"
        }
      ]
    },
    whyChooseUs: {
      title: "Por Qué las Empresas Eligen Trabajar con Nosotros",
      subtitle: "Reemplazamos el misterio de las agencias por procesos claros, seguimiento en vivo y absoluta transparencia.",
      cards: [
        {
          title: "Transparencia Total de Precios",
          description: "Sin tarifas ocultas ni cambios sorpresa. Nuestro estimador y propuestas detalladas definen el presupuesto desde el inicio."
        },
        {
          title: "Seguimiento en Vivo",
          description: "Accede a tu portal de cliente en cualquier momento para ver hitos completados, tareas de desarrollo y archivos."
        },
        {
          title: "Código Limpio y Seguro",
          description: "Escribimos código bien documentado utilizando tecnologías modernas. Siempre eres dueño del 100% de tu código fuente."
        },
        {
          title: "Soporte Post-Lanzamiento",
          description: "No te dejamos solo tras el lanzamiento. Cada proyecto incluye soporte de cortesía y opciones de mantenimiento continuo."
        }
      ]
    },
    process: {
      title: "Nuestro Proceso de Desarrollo Claro",
      subtitle: "Cómo llevamos tu proyecto desde la idea inicial hasta el lanzamiento exitoso.",
      steps: [
        { num: "01", title: "Discusión de Requisitos", desc: "Nos reunimos para entender tus objetivos, flujos de usuario y el alcance." },
        { num: "02", title: "Propuesta y Cotización", desc: "Recibes una propuesta transparente y detallada con precios claros por hitos." },
        { num: "03", title: "Diseño UI/UX", desc: "Diseñamos wireframes interactivos de alta fidelidad para tu revisión y aprobación." },
        { num: "04", title: "Desarrollo", desc: "Nuestros ingenieros construyen la aplicación usando frameworks rápidos, modernos y seguros." },
        { num: "05", title: "Pruebas", desc: "Revisiones rigurosas de control de calidad para velocidad, accesibilidad, compatibilidad y errores." },
        { num: "06", title: "Despliegue", desc: "Lanzamos tu proyecto en servidores en la nube y configuramos dominios SEO." },
        { num: "07", title: "Soporte", desc: "Mantenimiento continuo post-lanzamiento, métricas de rendimiento y actualizaciones." }
      ]
    },
    portfolio: {
      title: "Proyectos Destacados",
      subtitle: "Una muestra de las aplicaciones de alta calidad construidas por nuestro estudio. Algunas son conceptos interactivos.",
      filterAll: "Todos",
      filterWeb: "Sitios Web",
      filterMobile: "Apps Móviles",
      filterAi: "IA/ML",
      filterAutomation: "Automatizaciones",
      filterDashboard: "Paneles",
      clientIndustry: "Industria del Cliente",
      problem: "El Desafío",
      solution: "Nuestra Solución",
      results: "Resultados Clave",
      demoLabel: "Diseño Conceptual",
      liveDemo: "Ver Demo en Vivo",
      github: "Repositorio GitHub",
      items: [
        {
          id: "project-1",
          title: "Veloce - Analíticas de E-Commerce",
          category: "dashboard",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
          description: "Un panel de analíticas centralizado para tiendas virtuales, rastreando ventas, rotación de inventario y valor del cliente.",
          clientIndustry: "Comercio Electrónico",
          problem: "El cliente importaba manualmente archivos CSV de Shopify, Amazon y Stripe, lo que causaba un retraso de 2 días en los reportes de métricas.",
          solution: "Creamos un panel con React + Vite que agrega APIs, ejecuta cálculos en tiempo real y visualiza ventas, retención e inventarios.",
          technologies: ["React", "Tailwind CSS", "Recharts", "Node.js", "MongoDB"],
          results: ["Eliminó 12 horas de carga manual de CSV por semana", "Proporcionó analíticas visuales en tiempo real", "Incrementó la rotación de inventario en un 14%"],
          liveUrl: "#",
          githubUrl: "#",
          isDemo: true
        },
        {
          id: "project-2",
          title: "AuraHealth - Reservas Clínicas",
          category: "mobile",
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
          description: "Una aplicación móvil para pacientes que permite agendar citas médicas, chatear con doctores y revisar recetas.",
          clientIndustry: "Salud y Medicina",
          problem: "Los pacientes enfrentaban largas esperas telefónicas para reprogramar citas, sobrecargando al personal de la clínica.",
          solution: "Desarrollamos una app móvil multiplataforma con sincronización de calendario, mensajería directa segura y notificaciones automáticas.",
          technologies: ["React Native", "TypeScript", "Tailwind CSS", "Firebase"],
          results: ["Redujo las llamadas de reserva en un 42%", "Las ausencias a citas bajaron del 18% al 4% con recordatorios", "La calificación de satisfacción subió a 4.8/5"],
          liveUrl: "#",
          githubUrl: "#",
          isDemo: true
        },
        {
          id: "project-3",
          title: "Synthetix AI - Agente de Soporte",
          category: "ai",
          image: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=80",
          description: "Bot de soporte al cliente con IA entrenado en bases de conocimiento para resolver problemas complejos de software.",
          clientIndustry: "SaaS / Software",
          problem: "Los tiempos de respuesta de soporte promediaban 9 horas, causando pérdida de usuarios y fatiga en el equipo de soporte.",
          solution: "Construimos un agente de IA integrado en Slack e Intercom que busca en bases vectoriales y resuelve dudas de forma inmediata.",
          technologies: ["FastAPI", "Python", "OpenAI GPT-4", "Pinecone", "React"],
          results: ["Resolvió el 64% de los tickets entrantes al instante", "El tiempo de primera respuesta bajó a menos de 30 segundos", "Ahorro estimado de $8,500/mes en operaciones"],
          liveUrl: "#",
          githubUrl: "#",
          isDemo: true
        },
        {
          id: "project-4",
          title: "AutoSync - Automatización de Leads",
          category: "automation",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
          description: "Pipeline automatizado que sincroniza leads de Facebook Ads y formularios web con CRM Salesforce en tiempo real.",
          clientIndustry: "Bienes Raíces y Agencias",
          problem: "Los leads publicitarios se quedaban sin contactar por horas porque los agentes debían revisar múltiples cuentas de publicidad.",
          solution: "Desarrollamos un flujo sin servidor en Node.js que extrae, califica y distribuye los leads a los agentes en minutos vía SMS.",
          technologies: ["Node.js", "Express", "Salesforce API", "Twilio", "AWS Lambda"],
          results: ["Tiempo de contacto bajó de 3.5 horas a 4 minutos", "Tasa de conversión de leads subió un 22%", "100% de automatización de base de datos"],
          liveUrl: "#",
          githubUrl: "#",
          isDemo: true
        }
      ]
    },
    pricing: {
      title: "Precios Simples y Transparentes",
      subtitle: "Sin facturas sorpresa. Definimos el alcance y el presupuesto por adelantado.",
      popular: "Más Popular",
      cta: "Elegir Plan",
      customCta: "Cotizar Proyecto a Medida",
      plans: [
        {
          name: "Inicial",
          price: "$2,499",
          desc: "Perfecto para nuevos negocios que buscan una presencia digital profesional y optimizada para SEO.",
          features: [
            "Sitio web en React personalizado (5 páginas)",
            "Adaptable a todos los dispositivos (Móvil/Tablet/PC)",
            "Optimización de SEO y Google Analytics",
            "Formulario de contacto y captura de leads",
            "1 Mes de soporte post-lanzamiento",
            "Propiedad de código fuente al 100%"
          ]
        },
        {
          name: "Profesional",
          price: "$4,999",
          desc: "Diseñado para startups en crecimiento que necesitan portales de usuario o funciones avanzadas.",
          features: [
            "Aplicación web a medida de hasta 10 páginas",
            "Portal de usuarios y panel de administración",
            "Base de datos integrada (MongoDB/Postgres)",
            "Pasarela de pago configurada (Stripe/PayPal)",
            "Integración de APIs (CRM/Email)",
            "3 Meses de soporte post-lanzamiento",
            "Panel de control administrativo interactivo"
          ],
          popular: true
        },
        {
          name: "Enterprise",
          price: "$9,999+",
          desc: "Software a gran escala, integraciones de IA avanzadas o aplicaciones móviles de alto rendimiento.",
          features: [
            "App móvil para iOS y Android (React Native)",
            "Integración de modelos de IA y bots avanzados",
            "Infraestructura escalable en la nube (AWS/GCP)",
            "Roles de usuario ilimitados y analíticas avanzadas",
            "Flujos de sincronización de datos a medida",
            "6 Meses de soporte premium y SLA",
            "Pipelines de despliegue automático CI/CD"
          ]
        },
        {
          name: "A Medida",
          price: "Personalizado",
          desc: "¿Tienes requisitos específicos que no encajan en los planes? Usa nuestro estimador o llámanos.",
          features: [
            "Alcance técnico y wireframes antes de cotizar",
            "Asignación de equipo de ingeniería dedicado",
            "Coordinador de proyecto asignado",
            "Cumplimiento de normativas de seguridad",
            "Contratos de mantenimiento continuo",
            "Pagos flexibles divididos por hitos"
          ]
        }
      ]
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Respondiendo a tus preguntas de manera abierta y sincera.",
      items: [
        {
          q: "¿Cuánto tiempo toma un proyecto típico?",
          a: "Un sitio web de marketing estándar (Inicial) toma de 2 a 4 semanas. Las aplicaciones web personalizadas (Profesional) suelen tomar de 6 a 10 semanas, mientras que las apps móviles o software enterprise requieren 12+ semanas. Entregamos cronogramas detallados antes de iniciar."
        },
        {
          q: "¿Realmente soy dueño del código fuente?",
          a: "Sí, al 100%. Una vez completado el pago final, los derechos de propiedad intelectual y los repositorios de código se transfieren a tu nombre. No cobramos tarifas de licencia mensuales ni retenemos tu software."
        },
        {
          q: "¿Cómo se estructuran los pagos?",
          a: "Trabajamos con un esquema de pagos por hitos. Normalmente, es un 30% inicial, 40% tras la aprobación del diseño UI/UX y desarrollo medio, y 30% final tras las pruebas y previo al lanzamiento. Esto alinea incentivos."
        },
        {
          q: "¿Ofrecen soporte y mantenimiento después del lanzamiento?",
          a: "Por supuesto. Cada proyecto incluye soporte gratuito (de 1 a 6 meses según el plan). Después, puedes optar por nuestros acuerdos de mantenimiento flexible que cubren copias de seguridad, parches de seguridad y ajustes."
        },
        {
          q: "¿Pueden rediseñar o actualizar nuestro sitio web o app actual?",
          a: "Sí. Podemos auditar tu código actual, revisar la pila tecnológica y reconstruir sistemas obsoletos. Somos especialistas en migrar plataformas antiguas a modernas estructuras React + Vite."
        }
      ]
    },
    blog: {
      title: "Artículos de Interés y Noticias",
      subtitle: "Publicaciones para ayudarte a entender arquitecturas de software, estrategias de IA y crecimiento digital.",
      readArticle: "Leer Artículo",
      backToBlog: "Volver al Blog",
      items: [
        {
          id: "post-1",
          title: "Por qué React + Vite es la combinación definitiva para SEO y Conversiones",
          category: "Desarrollo Web",
          date: "Julio 2, 2026",
          summary: "Descubre cómo las cargas ultrarrápidas y la optimización en cliente mejoran las métricas Core Web Vitals de Google y atraen leads.",
          content: "En 2026, la velocidad de carga no es un detalle estético; es un factor clave para el SEO. Vite ha revolucionado el desarrollo frontend al compilar paquetes en milisegundos. Junto a React, te permite lanzar apps que se cargan al instante. Cuando un sitio carga de inmediato, las tasas de rebote bajan y el posicionamiento en Google sube. En esta guía analizamos optimización de web vitals, pre-renderizado y metatags efectivos.",
          readTime: "5 min de lectura"
        },
        {
          id: "post-2",
          title: "Agentes de IA: Guía para automatizar el soporte técnico de tu empresa",
          category: "IA y Machine Learning",
          date: "Junio 25, 2026",
          summary: "Aprende cómo las empresas modernas usan LLMs y bases de datos vectoriales para resolver más del 60% de dudas de clientes de forma segura.",
          content: "La Inteligencia Artificial ya no es solo búsquedas sencillas. Hoy, los Agentes de IA basados en RAG (Generación Aumentada por Recuperación) consultan tus bases internas de datos y resuelven dudas complejas del cliente sin participación humana. Este post enseña a conectar OpenAI, búsquedas vectoriales y bases de conocimiento corporativas resguardando la privacidad.",
          readTime: "8 min de lectura"
        },
        {
          id: "post-3",
          title: "Cómo construir un motor de leads: Lecciones de agencias digitales líderes",
          category: "Estrategia de Negocios",
          date: "Junio 12, 2026",
          summary: "Deja de hacer sitios web muy vistosos pero que no convierten. Aprende a convertir tráfico con precios transparentes y herramientas claras.",
          content: "Muchas agencias fallan porque priorizan animaciones complejas en vez de navegación clara. Para generar leads, tu sitio debe centrarse en la confianza, descripción clara de servicios y llamados a la acción concisos. Herramientas como estimadores de costo brindan valor inmediato y capturan contactos de alta calidad. Aquí detallamos nuestra fórmula.",
          readTime: "6 min de lectura"
        }
      ]
    },
    contact: {
      title: "Inicia tu Proyecto Digital Hoy",
      subtitle: "Completa el formulario, envíanos un WhatsApp o agenda una llamada estratégica directamente.",
      form: {
        name: "Nombre Completo",
        email: "Correo Electrónico",
        phone: "Teléfono (Opcional)",
        service: "Servicio Seleccionado",
        budget: "Rango de Presupuesto",
        message: "Cuéntanos sobre tu proyecto",
        upload: "Subir Brief del Proyecto / Archivos",
        submit: "Enviar Consulta",
        success: "¡Gracias! Nuestro equipo de ingeniería revisará tus requerimientos y te contactará en menos de 24 horas.",
        error: "Por favor, completa los campos requeridos."
      },
      info: {
        email: "ingenieria@syaylabs.com",
        phone: "+91 93605 37379",
        whatsapp: "Chatear en WhatsApp",
        location: "Silicon Valley Tech Center, San Jose, CA",
        office: "Oficina Principal",
        socials: "Síguenos"
      }
    },
    estimator: {
      title: "Estimador de Costo Interactivo",
      subtitle: "Estima el costo de tu proyecto en tiempo real. Precios transparentes y sin compromisos.",
      steps: {
        service: "Elige Tipo de Servicio",
        complexity: "Elige Nivel de Complejidad",
        platforms: "Plataformas Objetivo",
        timeline: "Tiempo de Entrega",
        result: "Inversión Estimada"
      },
      complexityOptions: {
        simple: "Simple / MVP (Páginas estáticas, flujos básicos)",
        medium: "Medio / Comercial (Paneles de usuario, base de datos, panel admin)",
        complex: "Complejo / Enterprise (Algoritmos a medida, chats en vivo, IA, app móvil)"
      },
      platformOptions: {
        web: "Web Escritorio",
        mobile: "Móvil iOS y Android",
        both: "Multiplataforma Web y Móvil"
      },
      timelineOptions: {
        fast: "Expedito (1-2 meses - Entrega express)",
        standard: "Estándar (3-4 meses - Recomendado)",
        flexible: "Flexible (5+ meses - Económico)"
      },
      leadForm: {
        title: "Enviar Estimación como Consulta",
        desc: "Envía tu estimación a nuestros ingenieros para que revisen los detalles y te envíen una propuesta formal.",
        submit: "Solicitar Propuesta Formal Gratis",
        success: "¡Estimación enviada! Nuestro equipo se pondrá en contacto pronto."
      }
    },
    dashboard: {
      title: "Portal y Seguimiento de Cliente",
      loginTitle: "Ingreso al Espacio de Cliente",
      subtitle: "Monitorea tus builds activos, hitos y archivos compartidos en tiempo real.",
      email: "Correo del Cliente",
      password: "Contraseña de Acceso",
      button: "Ingresar al Portal",
      demoHelp: "Credenciales Demo: Usa client@demo.com y password123 para ingresar.",
      logout: "Cerrar Sesión",
      overview: "Resumen del Proyecto",
      activeProject: "Proyecto Activo",
      status: "Estado de Compilación",
      currentMilestone: "Hito Actual",
      milestonesTitle: "Hitos de Desarrollo",
      chatTitle: "Chat con Coordinadora de Proyecto",
      filesTitle: "Archivos Compartidos del Proyecto",
      uploadSuccess: "¡Archivo subido exitosamente a la carpeta del proyecto!",
      chatPlaceholder: "Escribe una duda sobre el proyecto...",
      mockChat: {
        intro: "¡Hola! Soy Sarah, tu coordinadora de proyecto. Actualmente estamos finalizando los diseños UI/UX. ¡Avísame si tienes cualquier duda!",
        response: "¡Mensaje recibido! Se lo transmitiré a nuestro equipo de desarrollo. Verás reflejados los cambios pronto en el tracker."
      }
    },
    meeting: {
      title: "Agendar Llamada Estratégica",
      subtitle: "Elige fecha y hora para una sesión de 30 minutos con nuestro Arquitecto de Software principal.",
      success: "¡Reunión agendada! Se ha enviado una invitación de calendario a tu correo.",
      selectDate: "Seleccionar Fecha",
      selectTime: "Seleccionar Horario",
      confirm: "Confirmar Llamada de Scoping"
    }
  }
};
