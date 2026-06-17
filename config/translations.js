// ===== SISTEMA DE TRADUCCIONES =====
// Español (es) e Inglés (en)
// IMPORTANTE: El bloque `es` es espejo EXACTO del contenido estático de index.html
// (fuente de verdad). El bloque `en` es la traducción fiel de ese copy.

const translations = {
  es: {
    // Meta tags y SEO - ESPAÑOL (Chile/LATAM)
    meta: {
      title: "Desarrollo de Software a Medida en Chile | Just Dev It",
      description: "Desarrollo de software a medida en Chile: automatización RPA, data engineering e IA aplicada. Cotiza tu proyecto a medida con alcance, precio y plazo cerrados.",
      keywords: "desarrollo software chile, desarrolladora web santiago chile, programación empresarial chile, software a medida chile, automatización empresas chile, rpa chile, data engineering chile, inteligencia artificial chile, proptech chile, fintech chile, legaltech chile, desarrollo web profesional, agencia software santiago, nearshore development chile, empresas tecnología chile, soluciones digitales chile, etl y datos chile, integraciones erp crm chile, pipelines datos chile, procesamiento de datos a escala chile, software financiero chile, desarrollo cloud chile, aws azure gcp chile, web scraping chile, agentes ia chile, dashboards bi chile, medios de pago chile, ecommerce chile, transformación digital chile, consultora tecnológica chile, software empresarial chile, desarrolladores python santiago, desarrolladores javascript chile, business intelligence chile, machine learning chile",
      lang: "es-CL",
      language: "Spanish"
    },

    // Navegación
    nav: {
      services: "Servicios",
      portfolio: "Portafolio",
      about: "Nosotros",
      clients: "Clientes",
      contact: "Contacto",
      cta: "Cotizar Proyecto"
    },

    // Hero Section
    hero: {
      subtitle: "Desarrollo de Software",
      title: "Desarrollo de Software a Medida para",
      titleAccent: "Fintech, Energía y PropTech",
      description: "Data Engineering, Web Scraping, Agentes IA y Automatización RPA. <strong>Python, SQL, JavaScript</strong> para empresas en Santiago, Chile.",
      subtext: "• <strong>Energía, LegalTech, PropTech y Fintech</strong><br />• <strong>Garantía de 30 días</strong> post-entrega<br />• <strong>+20 proyectos</strong> ejecutados<br />",
      tagline: "El software que tu negocio necesita, <strong>justo a tiempo.</strong>",
      ctaPrimary: "Cotizar Proyecto",
      ctaSecondary: "Ver Proyectos",
      stats: {
        stat1Number: "20+",
        stat1Label: "Proyectos",
        stat2Number: "5+",
        stat2Label: "Años",
        stat3Number: "100%",
        stat3Label: "Satisfacción"
      }
    },

    // Intro Section 1 (entre Hero y Servicios)
    intro1: {
      badge: "Software a Medida en Chile",
      title: "Energía, LegalTech & PropTech",
      titleSuffix: "Soluciones",
      titleAccent: "que Funcionan",
      subtitle: "Automatización RPA. Data Engineering y procesamiento de datos a escala. Dashboards de BI. Web Scraping a escala. IA aplicada con modelos de IA generativa (LLMs). Cloud AWS.",
      stats: {
        stat1Number: "20+",
        stat1Label: "Proyectos<br />Exitosos",
        stat2Number: "30 días",
        stat2Label: "Garantía<br />Post-Entrega",
        stat3Number: "350+",
        stat3Label: "Clientes<br />Activos"
      }
    },

    // Services Section (Slider de 6 servicios)
    // Los tags de las cards están hardcodeados en el HTML (texto neutro entre idiomas)
    services: {
      title: "<span class=\"gradient-text\">Soluciones</span> que Impulsan tu Negocio",
      subtitle: "Automatización, datos e integraciones.",
      cta: "Solicitar Demo",
      controls: {
        prev: "Anterior",
        next: "Siguiente"
      },

      service1: {
        category: "Desarrollo",
        title: "Software a Medida",
        description: "Apps web, APIs y RPA que reducen tiempos operativos y toma de decisiones para tu empresa. Cloud-native con monitoreo 24/7."
      },

      service2: {
        category: "Cloud & Data",
        title: "Data Engineering",
        description: "Pipelines que unifican tus fuentes dispersas en una sola base. Procesamos millones de registros y los dejamos consultables con IA."
      },

      service3: {
        category: "IA",
        title: "Inteligencia Artificial",
        description: "Automatización inteligente con los principales LLM's del mercado. Reduce y eficienta el tiempo en tareas repetitivas."
      },

      service4: {
        category: "Industrias",
        title: "Fintech & PropTech",
        description: "Plataformas de inversión y dashboards ejecutivos con datos en tiempo real."
      },

      service5: {
        category: "ERP & CRM",
        title: "Integraciones Enterprise",
        description: "Conectamos tu ERP, tu CRM y tus sistemas con sincronización automática, sin doble digitación."
      },

      service6: {
        category: "Analytics",
        title: "Business Intelligence",
        description: "Dashboards con KPIs en tiempo real. Datos complejos convertidos en decisiones."
      }
    },

    // Intro Section 2 (entre Servicios y Portfolio)
    intro2: {
      badge: "Experiencia Comprobada",
      title: "PropTech, LegalTech & Fintech",
      titleSuffix: "Soluciones",
      titleAccent: "Empresariales",
      subtitle: "Web Scraping a escala, ETL y procesamiento de datos a escala, APIs escalables y desarrollo web a medida. Cloud en AWS y Azure para empresas en Santiago, Chile.",
      stats: {
        stat1Number: "Fintech",
        stat1Label: "Portafolios<br />Automatizados",
        stat2Number: "PropTech",
        stat2Label: "Líderes en<br />Data inmobiliaria en Chile",
        stat3Number: "LegalTech",
        stat3Label: "Automatización<br />De Documentos & Procesos"
      }
    },

    // Portfolio Section (Slider de 10 proyectos)
    // Los tags de las cards están hardcodeados en el HTML (texto neutro entre idiomas)
    portfolio: {
      filters: {
        all: "Todos",
        fintech: "Fintech",
        proptech: "PropTech",
        ia: "IA",
        data: "Data",
        legaltech: "LegalTech"
      },
      title: "<span class=\"gradient-text\">Proyectos</span> que Transforman",
      subtitle: "+20 proyectos ejecutados. Soluciones que escalan negocios.",
      cta: "Empezar Mi Proyecto",
      controls: {
        prev: "Anterior",
        next: "Siguiente"
      },

      project1: {
        category: "IA/ML & Enterprise",
        title: "Agentes de IA",
        description: "Asistentes inteligentes con IA para automatización empresarial."
      },

      project2: {
        category: "Fintech & Automatización",
        title: "Apps Financieras",
        description: "Estados de resultados y reportes financieros automatizados en tiempo real."
      },

      project3: {
        category: "Integraciones & ERP",
        title: "Integración ERP & CRM",
        description: "Sincronización automática bidireccional entre sistemas ERP y CRM. Datos unificados multi-empresa en tiempo real."
      },

      project4: {
        category: "Cloud & Infraestructura",
        title: "Infraestructura Cloud",
        description: "Arquitecturas escalables multi-cloud con bases de datos distribuidas."
      },

      project5: {
        category: "IA & Integraciones",
        title: "Flujos IA Empresariales",
        description: "Integración de IA en workflows empresariales para decisiones automatizadas."
      },

      project6: {
        category: "LegalTech & RPA",
        title: "RPA Judicial",
        description: "Automatización de procesos legales. 1000+ documentos diarios."
      },

      project7: {
        category: "Fintech & Data",
        title: "Backtesting Portafolios",
        description: "Automatizaciones de Portafolio y Backtesting con Data Real."
      },

      project9: {
        category: "Energía & Automatización",
        title: "Automatización Sector Energético",
        description: "Sistema de medición automática y cálculo de costos marginales. SCADA en tiempo real para generación eléctrica."
      },

      project10: {
        category: "Seguridad & Blockchain",
        title: "Encriptado Zero-Knowledge",
        description: "Validaciones seguras sin exponer datos sensibles. Criptografía avanzada para plataforma de votación electrónica."
      }
    },

    // Intro Section 3 (Nearshore/About)
    intro3: {
      badge: "Equipo Senior en Santiago",
      title: "Tu Partner Tecnológico",
      titleSuffix: "en",
      titleAccent: "Chile",
      subtitle: "Propuesta a medida con alcance, precio y plazo cerrados. Entregas incrementales por etapas. Garantía de 30 días post-entrega. Python, desarrollo web a medida y dashboards de BI.",
      stats: {
        stat1Number: "Cerrado",
        stat1Label: "Alcance, Precio<br />y Plazo",
        stat2Number: "30 días",
        stat2Label: "Garantía<br />Post-Entrega",
        stat3Number: "20+",
        stat3Label: "Proyectos<br />Completados"
      }
    },

    // Clients Section
    clients: {
      title: "<span class=\"gradient-text\">Clientes</span> que Confían",
      subtitle: "Empresas líderes que transforman con nuestra tecnología"
    },

    // Team Section
    team: {
      title: "<span class=\"gradient-text\">Equipo</span> Fundador",
      subtitle: "Expertise en Energía, LegalTech, PropTech y Data",

      founder1: {
        name: "Joaquín Espildora M.",
        role: "Fundador & CEO",
        description: "Ingeniero Civil (U. de los Andes), ex Penta Vida. Especialista en gestión de inversiones, PropTech y Fintech."
      },

      founder2: {
        name: "Matías Cánepa G.",
        role: "CTO & Co-Fundador",
        description: "Ingeniero Civil, Magíster en Ciencias de la Computación. Profesor Big Data UANDES. Experto en data engineering, IA aplicada y arquitectura cloud AWS/Azure."
      }
    },

    // Contact Section
    contact: {
      stats: {
        s1Number: "30 días",
        s1Label: "Garantía post-entrega",
        s2Number: "+20",
        s2Label: "Proyectos ejecutados"
      },
      title: "<span class=\"gradient-text\">Cotiza</span> Tu Proyecto",
      subtitle: "Propuesta a medida con alcance, precio y plazo cerrados. Trabajamos por etapas, con entregas incrementales.",
      location: "Santiago, Chile | Respuesta inmediata",

      formCard: {
        title: "Envíanos un Mensaje",
        description: "Completa el formulario y te responderemos con una propuesta personalizada."
      },

      calendarCard: {
        title: "Agenda una Reunión",
        description: "Reserva directamente una videollamada de 45 minutos con nuestro equipo. Sin compromiso.",
        feature1: "Videollamada de 45 minutos",
        feature2: "Hablamos de tu proyecto en detalle",
        feature3: "Recibes una propuesta personalizada",
        feature4: "Sin compromiso ni costos",
        cta: "Agendar Reunión",
        note: "Selecciona el horario que mejor te acomode"
      },

      channels: {
        label: "¿Prefieres hablar directo con nosotros?",
        whatsapp: "WhatsApp directo"
      },

      form: {
        nameLabel: "Nombre",
        namePlaceholder: "Tu nombre",
        lastnameLabel: "Apellido",
        lastnamePlaceholder: "Tu apellido",
        emailLabel: "Email",
        emailPlaceholder: "tu@email.com",
        phoneLabel: "Teléfono",
        phonePlaceholder: "+56 9 1234 5678",
        messageLabel: "Mensaje",
        messagePlaceholder: "Cuéntanos sobre tu proyecto...",
        submitButton: "Enviar Mensaje",
        messages: {
          nameError: "El nombre debe tener al menos 2 caracteres",
          emailError: "Por favor ingresa un email válido",
          messageError: "El mensaje debe tener al menos 10 caracteres",
          sending: "Enviando...",
          success: "¡Mensaje enviado con éxito! Te contactaremos pronto.",
          error: "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.",
          connection: "Error de conexión. Por favor verifica tu internet."
        }
      }
    },

    // Footer
    footer: {
      tagline: "El software que tu negocio necesita, justo a tiempo. Desarrollo a medida desde Santiago de Chile.",
      services: {
        title: "Servicios",
        item1: "Desarrollo Web a Medida",
        item2: "Web Scraping a Escala",
        item3: "Data Engineering",
        item4: "Dashboards de BI",
        item5: "Cloud AWS Azure GCP"
      },

      industries: {
        title: "Industrias",
        item1: "Finanzas",
        item3: "PropTech",
        item4: "LegalTech"
      },

      company: {
        title: "Empresa",
        item1: "Sobre Nosotros",
        item2: "Portfolio",
        item3: "Clientes",
        item4: "Contacto"
      },

      contactInfo: {
        title: "Contacto",
        location: "Santiago, Chile",
        email: "joaquin@justdev.it"
      },

      // Enlaces internos a páginas de servicio/vertical (fase 1 SEO)
      links: {
        rpa: "Automatización RPA",
        energia: "Energía Renovable",
        casoDI: "Caso: Data Inmobiliaria",
        ia: "Inteligencia Artificial",
        agentesIa: "Agentes de IA",
        mineria: "Minería"
      },

      bottom: {
        copyright: "&copy; 2026 Just Dev It. Todos los derechos reservados.",
        credits: "Hecho con 💜 en Chile"
      }
    },

    // Language Selector
    language: {
      switch: "Switch to English"
    },

    // Accesibilidad
    a11y: {
      close: "Cerrar",
      skip: "Saltar al contenido"
    },

    // Banda de resultados (design system handoff)
    band: {
      eyebrow: "Resultados, no promesas",
      title: "Tecnología que se traduce en",
      titleAccent: "eficiencia",
      stat1Number: "20+",
      stat1Label: "Proyectos exitosos",
      stat2Number: "9,5M",
      stat2Label: "Propiedades indexadas",
      stat3Number: "30 días",
      stat3Label: "Garantía post-entrega"
    },

    // Sección destacada de Agentes & IA en el home
    aiSection: {
      eyebrow: "Inteligencia Artificial",
      title: 'Conversa con tu empresa y tus <span class="gradient-text">datos</span>',
      subtitle: "Agentes y asistentes de IA a medida para preguntarle a tu información en lenguaje natural, de forma trazable y segura — sin que tus datos salgan de tu entorno.",
      card1Title: "Pregúntale a tus datos",
      card1Body: "Tu equipo consulta en lenguaje natural y obtiene respuestas, tablas y gráficos. La IA conversa; los números salen de datos validados, no inventados.",
      card2Title: "Trazable y de solo lectura",
      card2Body: "Cada respuesta cita su fuente y el asistente nunca modifica tus sistemas. La decisión siempre es humana.",
      card3Title: "Sobre lo que ya tienes",
      card3Body: "Montamos una capa de IA sobre tu infraestructura actual con servidores MCP a medida. Empiezas acotado y creces por capas.",
      cta: "Ver Agentes de IA"
    },

    // Sección Data Inmobiliaria (showcase de producto propio)
    diSection: {
      eyebrow: "Producto propio · PropTech",
      title: '<span class="gradient-text">Data Inmobiliaria</span>',
      sub: "Nuestra plataforma propia de datos del mercado inmobiliario chileno: validada, en producción y citada por la prensa. La prueba viva de lo que construimos a medida para tu empresa.",
      statProps: "Propiedades indexadas",
      statComunas: "Comunas",
      statYears: "de datos",
      statSources: "Datos oficiales",
      aiTitle: "Pregúntale a tus datos con IA, en lenguaje natural",
      aiBody: 'Data Inmobiliaria se conecta a <strong>Claude</strong> o <strong>ChatGPT</strong> y responde sobre cualquier propiedad —tasaciones, precios y comparables— sin planillas ni descargas. Es la misma tecnología de <a href="/servicios/agentes-ia/">agentes de IA a medida</a> que construimos para que tu empresa converse con sus propios datos.',
      ctaVisit: "Visitar Data Inmobiliaria",
      ctaCase: "Ver el caso técnico",
      pressLabel: "En los medios:",
      moreSummary: "Cómo se conecta con IA (Claude o ChatGPT)"
    },

    // Sección de prensa (Data Inmobiliaria en los medios)
    press: {
      eyebrow: "En la prensa",
      title: '<span class="gradient-text">Data Inmobiliaria</span> en los medios',
      sub: "Nuestro producto y nuestros análisis del mercado inmobiliario, citados por la prensa nacional.",
      summary: "Cobertura en CNN Chile, La Tercera, T13, Publimetro y más",
      tier1: "Destacados",
      tier2: "Más cobertura"
    },

    // Rutas profundas (páginas de servicio / vertical / caso)
    routes: {
      eyebrow: "En profundidad",
      title: "Servicios e industrias en profundidad",
      subtitle: "Páginas dedicadas con casos reales, preguntas frecuentes y el detalle técnico completo.",
      cta: "Ver página",
      rpa: {
        kicker: "Servicio",
        title: "Automatización RPA",
        desc: "Robots de software para reportería, integraciones ERP-CRM y procesos documentales."
      },
      energia: {
        kicker: "Industria",
        title: "Energía Renovable",
        desc: "Reportería operativa automática para generadoras de energía renovable. Casos reales en el sector."
      },
      casoDI: {
        kicker: "Caso de éxito",
        title: "Data Inmobiliaria",
        desc: "9,5 millones de propiedades indexadas. Nuestro producto propio, citado por la prensa."
      }
    },

    // Preloader
    preloader: {
      text: "Cargando experiencia"
    }
  },

  en: {
    // Meta tags y SEO - ENGLISH (USA/International)
    meta: {
      title: "Custom Software Development in Chile | Just Dev It",
      description: "Custom software development in Chile: RPA automation, data engineering and applied AI. Get a tailored project quote with fixed scope, price and timeline.",
      keywords: "software development chile, web development santiago chile, enterprise programming chile, custom software chile, business automation chile, rpa chile, data engineering chile, artificial intelligence chile, proptech chile, fintech chile, legaltech chile, professional web development, software agency santiago, nearshore development chile, technology companies chile, digital solutions chile, etl and data chile, erp crm integrations chile, data pipelines chile, large-scale data processing chile, financial software chile, cloud development chile, aws azure gcp chile, web scraping chile, ai agents chile, bi dashboards chile, payment gateways chile, ecommerce chile, digital transformation chile, technology consulting chile, enterprise software chile, python developers santiago, javascript developers chile, business intelligence chile, machine learning chile",
      lang: "en-US",
      language: "English"
    },

    // Navigation
    nav: {
      services: "Services",
      portfolio: "Portfolio",
      about: "About",
      clients: "Clients",
      contact: "Contact",
      cta: "Get a Quote"
    },

    // Hero Section
    hero: {
      subtitle: "Software Development",
      title: "Custom Software Development for",
      titleAccent: "Fintech, Energy and PropTech",
      description: "Data Engineering, Web Scraping, AI Agents and RPA Automation. <strong>Python, SQL, JavaScript</strong> for companies in Santiago, Chile.",
      subtext: "• <strong>Energy, LegalTech, PropTech and Fintech</strong><br />• <strong>30-day warranty</strong> post-delivery<br />• <strong>+20 projects</strong> delivered<br />",
      tagline: "The software your business needs, <strong>just in time.</strong>",
      ctaPrimary: "Get a Quote",
      ctaSecondary: "View Projects",
      stats: {
        stat1Number: "20+",
        stat1Label: "Projects",
        stat2Number: "5+",
        stat2Label: "Years",
        stat3Number: "100%",
        stat3Label: "Satisfaction"
      }
    },

    // Intro Section 1
    intro1: {
      badge: "Custom Software in Chile",
      title: "Energy, LegalTech & PropTech",
      titleSuffix: "Solutions",
      titleAccent: "that Work",
      subtitle: "RPA automation. Data engineering and large-scale data processing. BI dashboards. Web scraping at scale. Applied AI with generative AI models (LLMs). AWS cloud.",
      stats: {
        stat1Number: "20+",
        stat1Label: "Successful<br />Projects",
        stat2Number: "30 days",
        stat2Label: "Post-Delivery<br />Warranty",
        stat3Number: "350+",
        stat3Label: "Active<br />Clients"
      }
    },

    // Services Section
    // Los tags de las cards están hardcodeados en el HTML (texto neutro entre idiomas)
    services: {
      title: "<span class=\"gradient-text\">Solutions</span> that Drive Your Business",
      subtitle: "Automation, data and integrations.",
      cta: "Request Demo",
      controls: {
        prev: "Previous",
        next: "Next"
      },

      service1: {
        category: "Development",
        title: "Custom Software",
        description: "Web apps, APIs and RPA that cut operating times and speed up decision-making for your company. Cloud-native with 24/7 monitoring."
      },

      service2: {
        category: "Cloud & Data",
        title: "Data Engineering",
        description: "Pipelines that unify your scattered sources into a single base. We process millions of records and make them queryable with AI."
      },

      service3: {
        category: "AI",
        title: "Artificial Intelligence",
        description: "Intelligent automation with the market's leading LLMs. Reduce and streamline time spent on repetitive tasks."
      },

      service4: {
        category: "Industries",
        title: "Fintech & PropTech",
        description: "Investment platforms and executive dashboards with real-time data."
      },

      service5: {
        category: "ERP & CRM",
        title: "Enterprise Integrations",
        description: "We connect your ERP, CRM and systems with automatic synchronization, no double data entry."
      },

      service6: {
        category: "Analytics",
        title: "Business Intelligence",
        description: "Dashboards with real-time KPIs. Complex data turned into decisions."
      }
    },

    // Intro Section 2
    intro2: {
      badge: "Proven Track Record",
      title: "PropTech, LegalTech & Fintech",
      titleSuffix: "Enterprise",
      titleAccent: "Solutions",
      subtitle: "Web scraping at scale, ETL and large-scale data processing, scalable APIs and custom web development. Cloud on AWS and Azure for companies in Santiago, Chile.",
      stats: {
        stat1Number: "Fintech",
        stat1Label: "Automated<br />Portfolios",
        stat2Number: "PropTech",
        stat2Label: "Leaders in<br />Real Estate Data in Chile",
        stat3Number: "LegalTech",
        stat3Label: "Document & Process<br />Automation"
      }
    },

    // Portfolio Section
    // Los tags de las cards están hardcodeados en el HTML (texto neutro entre idiomas)
    portfolio: {
      filters: {
        all: "All",
        fintech: "Fintech",
        proptech: "PropTech",
        ia: "AI",
        data: "Data",
        legaltech: "LegalTech"
      },
      title: "<span class=\"gradient-text\">Projects</span> that Transform",
      subtitle: "+20 projects delivered. Solutions that scale businesses.",
      cta: "Start My Project",
      controls: {
        prev: "Previous",
        next: "Next"
      },

      project1: {
        category: "AI/ML & Enterprise",
        title: "AI Agents",
        description: "Intelligent AI assistants for enterprise automation."
      },

      project2: {
        category: "Fintech & Automation",
        title: "Financial Apps",
        description: "Automated income statements and financial reports in real time."
      },

      project3: {
        category: "Integrations & ERP",
        title: "ERP & CRM Integration",
        description: "Automatic bidirectional synchronization between ERP and CRM systems. Unified multi-company data in real time."
      },

      project4: {
        category: "Cloud & Infrastructure",
        title: "Cloud Infrastructure",
        description: "Scalable multi-cloud architectures with distributed databases."
      },

      project5: {
        category: "AI & Integrations",
        title: "Enterprise AI Workflows",
        description: "AI integration into business workflows for automated decisions."
      },

      project6: {
        category: "LegalTech & RPA",
        title: "Judicial RPA",
        description: "Legal process automation. 1,000+ documents per day."
      },

      project7: {
        category: "Fintech & Data",
        title: "Portfolio Backtesting",
        description: "Portfolio automation and backtesting with real data."
      },

      project9: {
        category: "Energy & Automation",
        title: "Energy Sector Automation",
        description: "Automatic metering system and marginal cost calculation. Real-time SCADA for power generation."
      },

      project10: {
        category: "Security & Blockchain",
        title: "Zero-Knowledge Encryption",
        description: "Secure validations without exposing sensitive data. Advanced cryptography for an electronic voting platform."
      }
    },

    // Intro Section 3 (Nearshore/About)
    intro3: {
      badge: "Senior Team in Santiago",
      title: "Your Technology Partner",
      titleSuffix: "in",
      titleAccent: "Chile",
      subtitle: "Tailored proposal with fixed scope, price and timeline. Incremental deliveries by stages. 30-day post-delivery warranty. Python, custom web development and BI dashboards.",
      stats: {
        stat1Number: "Fixed",
        stat1Label: "Scope, Price<br />and Timeline",
        stat2Number: "30 days",
        stat2Label: "Post-Delivery<br />Warranty",
        stat3Number: "20+",
        stat3Label: "Completed<br />Projects"
      }
    },

    // Clients Section
    clients: {
      title: "<span class=\"gradient-text\">Clients</span> Who Trust Us",
      subtitle: "Leading companies transforming with our technology"
    },

    // Team Section
    team: {
      title: "<span class=\"gradient-text\">Founding</span> Team",
      subtitle: "Expertise in Energy, LegalTech, PropTech and Data",

      founder1: {
        name: "Joaquín Espildora M.",
        role: "Founder & CEO",
        description: "Civil Engineer (U. de los Andes), formerly at Penta Vida. Specialist in investment management, PropTech and Fintech."
      },

      founder2: {
        name: "Matías Cánepa G.",
        role: "CTO & Co-Founder",
        description: "Civil Engineer, MSc in Computer Science. Big Data Professor at UANDES. Expert in data engineering, applied AI and AWS/Azure cloud architecture."
      }
    },

    // Contact Section
    contact: {
      stats: {
        s1Number: "30 days",
        s1Label: "Post-delivery warranty",
        s2Number: "+20",
        s2Label: "Projects delivered"
      },
      title: "<span class=\"gradient-text\">Quote</span> Your Project",
      subtitle: "Tailored proposal with fixed scope, price and timeline. We work in stages, with incremental deliveries.",
      location: "Santiago, Chile | Immediate response",

      formCard: {
        title: "Send Us a Message",
        description: "Fill out the form and we'll get back to you with a personalized proposal."
      },

      calendarCard: {
        title: "Schedule a Meeting",
        description: "Book a 45-minute video call directly with our team. No commitment required.",
        feature1: "45-minute video call",
        feature2: "We discuss your project in detail",
        feature3: "You receive a personalized proposal",
        feature4: "No commitment or costs",
        cta: "Schedule Meeting",
        note: "Choose the time that works best for you"
      },

      channels: {
        label: "Prefer to talk to us directly?",
        whatsapp: "Direct WhatsApp"
      },

      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        lastnameLabel: "Last Name",
        lastnamePlaceholder: "Your last name",
        emailLabel: "Email",
        emailPlaceholder: "your@email.com",
        phoneLabel: "Phone",
        phonePlaceholder: "+1 234 567 8900",
        messageLabel: "Message",
        messagePlaceholder: "Tell us about your project...",
        submitButton: "Send Message",
        messages: {
          nameError: "Name must be at least 2 characters",
          emailError: "Please enter a valid email",
          messageError: "Message must be at least 10 characters",
          sending: "Sending...",
          success: "Message sent! We'll get back to you soon.",
          error: "There was an error sending your message. Please try again.",
          connection: "Connection error. Please check your internet."
        }
      }
    },

    // Footer
    footer: {
      tagline: "The software your business needs, just in time. Custom software development from Santiago, Chile.",
      services: {
        title: "Services",
        item1: "Custom Web Development",
        item2: "Web Scraping at Scale",
        item3: "Data Engineering",
        item4: "BI Dashboards",
        item5: "Cloud AWS Azure GCP"
      },

      industries: {
        title: "Industries",
        item1: "Finance",
        item3: "PropTech",
        item4: "LegalTech"
      },

      company: {
        title: "Company",
        item1: "About Us",
        item2: "Portfolio",
        item3: "Clients",
        item4: "Contact"
      },

      contactInfo: {
        title: "Contact",
        location: "Santiago, Chile",
        email: "joaquin@justdev.it"
      },

      // Enlaces internos a páginas de servicio/vertical (fase 1 SEO)
      links: {
        rpa: "RPA Automation",
        energia: "Renewable Energy",
        casoDI: "Case Study: Data Inmobiliaria",
        ia: "Artificial Intelligence",
        agentesIa: "AI Agents",
        mineria: "Mining"
      },

      bottom: {
        copyright: "&copy; 2026 Just Dev It. All rights reserved.",
        credits: "Made with 💜 in Chile"
      }
    },

    // Language Selector
    language: {
      switch: "Cambiar a Español"
    },

    // Accesibilidad
    a11y: {
      close: "Close",
      skip: "Skip to content"
    },

    // Banda de resultados (design system handoff)
    band: {
      eyebrow: "Results, not promises",
      title: "Technology that translates into",
      titleAccent: "efficiency",
      stat1Number: "20+",
      stat1Label: "Successful projects",
      stat2Number: "9.5M",
      stat2Label: "Indexed properties",
      stat3Number: "30 days",
      stat3Label: "Post-delivery warranty"
    },

    // Sección destacada de Agentes & IA en el home
    aiSection: {
      eyebrow: "Artificial Intelligence",
      title: 'Talk to your company and your <span class="gradient-text">data</span>',
      subtitle: "Custom AI agents and assistants to ask your information in natural language, traceably and securely — without your data ever leaving your environment.",
      card1Title: "Ask your data",
      card1Body: "Your team asks in natural language and gets answers, tables and charts. The AI converses; the numbers come from validated data, not made up.",
      card2Title: "Traceable and read-only",
      card2Body: "Every answer cites its source and the assistant never modifies your systems. The decision is always human.",
      card3Title: "On top of what you have",
      card3Body: "We add an AI layer over your existing infrastructure with custom MCP servers. Start small and grow in layers.",
      cta: "See AI Agents"
    },

    // Data Inmobiliaria section (own-product showcase)
    diSection: {
      eyebrow: "Our own product · PropTech",
      title: '<span class="gradient-text">Data Inmobiliaria</span>',
      sub: "Our own real-estate data platform for Chile: validated, in production and cited by the press. Living proof of what we build, tailor-made, for your company.",
      statProps: "Indexed properties",
      statComunas: "Districts",
      statYears: "of data",
      statSources: "Official data",
      aiTitle: "Ask your data with AI, in natural language",
      aiBody: 'Data Inmobiliaria connects to <strong>Claude</strong> or <strong>ChatGPT</strong> and answers about any property —valuations, prices and comparables— with no spreadsheets or downloads. It is the same custom <a href="/servicios/agentes-ia/">AI agents</a> technology we build so your company can talk to its own data.',
      ctaVisit: "Visit Data Inmobiliaria",
      ctaCase: "See the technical case",
      pressLabel: "In the news:",
      moreSummary: "How it connects with AI (Claude or ChatGPT)"
    },

    // Press section (Data Inmobiliaria in the news)
    press: {
      eyebrow: "In the press",
      title: '<span class="gradient-text">Data Inmobiliaria</span> in the news',
      sub: "Our product and our real-estate market analysis, cited by the national press.",
      summary: "Coverage in CNN Chile, La Tercera, T13, Publimetro and more",
      tier1: "Featured",
      tier2: "More coverage"
    },

    // Rutas profundas (páginas de servicio / vertical / caso)
    routes: {
      eyebrow: "In depth",
      title: "Services and industries in depth",
      subtitle: "Dedicated pages with real cases, FAQs and the full technical detail.",
      cta: "View page",
      rpa: {
        kicker: "Service",
        title: "RPA Automation",
        desc: "Software robots for reporting, ERP-CRM integrations and document workflows."
      },
      energia: {
        kicker: "Industry",
        title: "Renewable Energy",
        desc: "Automated operational reporting for renewable energy generators. Real cases in the sector."
      },
      casoDI: {
        kicker: "Case study",
        title: "Data Inmobiliaria",
        desc: "9.5 million properties indexed. Our own product, cited by the press."
      }
    },

    // Preloader
    preloader: {
      text: "Loading experience"
    }
  }
};

export default translations;
