// ===== SISTEMA DE TRADUCCIONES =====
// Español (es) e Inglés (en)
// IMPORTANTE: Contenido EXACTO del sitio justdev.it

const translations = {
  es: {
    // Meta tags y SEO - ESPAÑOL (Chile/LATAM)
    meta: {
      title: "Desarrollo de Software Chile | Just Dev It - Automatización y Data",
      description: "Desarrollo de software a medida en Chile. Automatización RPA, Data Engineering e IA para Fintech y PropTech. +20 proyectos exitosos. ROI en 90 días. ¡Cotiza ahora!",
      keywords: "desarrollo software chile, desarrolladora web santiago chile, programación empresarial chile, software a medida chile, automatización empresas chile, rpa chile, data engineering chile, inteligencia artificial chile, proptech chile, fintech chile, legaltech chile, desarrollo web profesional, agencia software santiago, nearshore development chile, empresas tecnología chile, soluciones digitales chile, etl bigquery chile, integraciones erp crm chile, pipelines datos chile, databricks chile, software financiero chile, desarrollo cloud chile, aws azure gcp chile, web scraping chile, agentes ia chile, power bi chile, webpay transbank chile, shopify chile, transformación digital chile, consultora tecnológica chile, software empresarial chile, desarrolladores python santiago, desarrolladores ruby chile, desarrolladores node chile, business intelligence chile, machine learning chile",
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
      title: "El software que tu empresa necesita",
      titleAccent: "Justo a Tiempo",
      description: "Automatización, datos e integraciones. <strong>RPA, ETL, IA y cloud</strong> para empresas que buscan resultados.",
      subtext: "• <strong>PropTech, Fintech, Energía, Legales y Retail</strong><br />• Entregas <strong>predecibles</strong><br />• <strong>+20 proyectos</strong> exitosos<br />",
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
      badge: "Software Empresarial",
      title: "Automatización & Data",
      titleSuffix: "que Genera",
      titleAccent: "Resultados",
      subtitle: "RPA, cloud y pipelines de datos que reducen costos operativos y mejoran la toma de decisiones.",
      stats: {
        stat1Number: "20+",
        stat1Label: "Proyectos<br />Exitosos",
        stat2Number: "99.9%",
        stat2Label: "Uptime<br />Garantizado",
        stat3Number: "350+",
        stat3Label: "Clientes<br />Activos"
      }
    },

    // Services Section (Slider de 6 servicios)
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
        description: "Apps web, APIs y RPA que reducen tiempos operativos y toma de decisiones para tu empresa. Cloud-native con monitoreo 24/7.",
        tags: ["Python", "Rails", "Node.js"]
      },
      
      service2: {
        category: "Cloud & Data",
        title: "Data Engineering",
        description: "Pipelines ETL enterprise con BigQuery/Databricks. Procesamos millones de registros diarios.",
        tags: ["BigQuery", "AWS", "Azure"]
      },
      
      service3: {
        category: "IA",
        title: "Inteligencia Artificial",
        description: "Automatización inteligente con los principales LLM's del mercado. Reduce y eficienta el tiempo en tareas repetitivas.",
        tags: ["OpenAi", "Claude", "Gemini"]
      },
      
      service4: {
        category: "Fintech & PropTech",
        title: "Fintech & PropTech",
        description: "Plataformas de inversión y dashboards ejecutivos con datos en tiempo real.",
        tags: ["Python", "Power BI", "Web Scraping"]
      },
      
      service5: {
        category: "Integraciones",
        title: "Integraciones Enterprise",
        description: "Conectamos ERPs, CRMs y e-commerce con sincronización automática 24/7.",
        tags: ["SAP", "Salesforce", "APIs"]
      },
      
      service6: {
        category: "Analytics",
        title: "Business Intelligence",
        description: "Dashboards con KPIs en tiempo real. Datos complejos convertidos en decisiones.",
        tags: ["Power BI", "Metabase", "SQL"]
      }
    },

    // Intro Section 2 (entre Servicios y Portfolio)
    intro2: {
      badge: "Impacto Real",
      title: "PropTech, LegalTech & Fintech",
      titleSuffix: "de Clase",
      titleAccent: "Mundial",
      subtitle: "Plataformas empresariales que procesan millones de datos diarios. Automatización de portales, ETL para BigQuery/Databricks y APIs escalables.",
      stats: {
        stat1Number: "Fintech",
        stat1Label: "Portafolios<br />Automatizados",
        stat2Number: "PropTech",
        stat2Label: "Líderes en<br />Data inmobiliaria en Chile",
        stat3Number: "LegalTech",
        stat3Label: "Automatizacion<br />De Documentos & Procesos"
      }
    },

    // Portfolio Section (Slider de 10 proyectos)
    portfolio: {
      title: "<span class=\"gradient-text\">Proyectos</span> que Transforman",
      subtitle: "+20 casos de éxito. Soluciones que escalan negocios.",
      cta: "Empezar Mi Proyecto",
      controls: {
        prev: "Anterior",
        next: "Siguiente"
      },
      
      project1: {
        category: "IA/ML & Enterprise",
        title: "Agentes de IA",
        description: "Asistentes inteligentes con IA para automatización empresarial.",
        tags: ["OpenAi", "Claude", "Gemini"]
      },
      
      project2: {
        category: "Fintech & Automatización",
        title: "Apps Financieras",
        description: "Estados de resultados y reportes financieros automatizados en tiempo real.",
        tags: ["Python", "Power BI", "SQL"]
      },
      
      project3: {
        category: "Retail & Integraciones",
        title: "Integraciones E-commerce",
        description: "Conectores multi-plataforma con sincronización en tiempo real de Inventarios y Stock.",
        tags: ["Shopify", "Wordpress", "WSM"]
      },
      
      project4: {
        category: "Cloud & Infraestructura",
        title: "Infraestructura Cloud",
        description: "Arquitecturas escalables multi-cloud con bases de datos distribuidas.",
        tags: ["AWS", "GCP", "Azure"]
      },
      
      project5: {
        category: "IA & Integraciones",
        title: "Flujos IA Empresariales",
        description: "Integración de IA en workflows empresariales para decisiones automatizadas.",
        tags: ["Flasks", "APIs", "OCR"]
      },
      
      project6: {
        category: "LegalTech & RPA",
        title: "RPA Judicial",
        description: "Automatización de procesos legales. 1000+ documentos diarios.",
        tags: ["Playwright", "Python", "RPA"]
      },
      
      project7: {
        category: "Fintech & Data",
        title: "Backtesting Portafolios",
        description: "Automatizaciones de Portafolio y Backtesting con Data Real.",
        tags: ["Python", "Stocks", "Web Scraping"]
      },
      
      project8: {
        category: "PropTech",
        title: "Databam",
        description: "Plataforma de data inmobiliaria con +500K propiedades en tiempo real con precios de transacción y propietarios.",
        tags: ["Rails", "Python", "BigQuery"]
      },
      
      project9: {
        category: "Energía & Automatización",
        title: "Automatización Sector Energético",
        description: "Sistema de medición automática y cálculo de costos marginales. SCADA en tiempo real para generación eléctrica.",
        tags: ["Azure", "Web Scraping", "Data Engineering"]
      },
      
      project10: {
        category: "Seguridad & Blockchain",
        title: "Encriptado Zero-Knowledge",
        description: "Validaciones seguras sin exponer datos sensibles. Criptografía avanzada.",
        tags: ["ZK-Proofs", "Cryptography", "Validations"]
      }
    },

    // Intro Section 3 (Nearshore/About)
    intro3: {
      badge: "Nearshore Premium",
      title: "Partner Tecnológico",
      titleSuffix: "para",
      titleAccent: "Chile y LATAM",
      subtitle: "Expertise internacional con presencia local. Misma zona horaria, idioma y cultura de negocios. Desarrollo ágil para proyectos críticos.",
      stats: {
        stat1Number: "100%",
        stat1Label: "Clientes<br />Satisfechos",
        stat2Number: "5+ Años",
        stat2Label: "Relaciones<br />Estratégicas",
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
      subtitle: "Expertise en Fintech, PropTech y Data",
      
      founder1: {
        name: "Joaquín Espildora M.",
        role: "Fundador & CEO",
        description: "Ingeniero Civil (Universidad de los Andes). Ex Portfolio Manager con más de $3B USD de AUM. Especialista en PropTech y Fintech."
      },
      
      founder2: {
        name: "Matías Cánepa G.",
        role: "CTO & Co-Fundador",
        description: "Arquitecto de datos AWS/Azure/GCP. Profesor Big Data Universidad de los Andes. Especialista en ETL y cloud serverless."
      }
    },

    // Contact Section
    contact: {
      title: "<span class=\"gradient-text\">Cotiza</span> Tu Proyecto",
      subtitle: "Propuesta en 24hrs.",
      location: "Santiago, Chile | Respuesta inmediata",
      
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
        submitButton: "Enviar Mensaje"
      }
    },

    // Footer
    footer: {
      description: "Transformando ideas en soluciones tecnológicas de primer nivel.",
      
      services: {
        title: "Servicios",
        item1: "Desarrollo de Software",
        item2: "Cloud & Data Engineering",
        item3: "IA Aplicada",
        item4: "Ecosistemas Fintech"
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
        email: "contacto@justdev.it"
      },
      
      bottom: {
        copyright: "&copy; 2025 Just Dev It. Todos los derechos reservados.",
        credits: "Hecho con 💜 en Chile"
      }
    },

    // Language Selector
    language: {
      current: "ES",
      switch: "Switch to English",
      tooltip: "Cambiar idioma"
    },

    // Preloader
    preloader: {
      text: "Cargando experiencia"
    }
  },

  en: {
    // Meta tags y SEO - ENGLISH (USA/International)
    meta: {
      title: "Software Development Chile | Just Dev It - Automation & Data",
      description: "Custom software development in Chile. RPA Automation, Data Engineering & AI for Fintech and PropTech. +20 successful projects. ROI in 90 days. Get a quote now!",
      keywords: "software development chile, web development santiago chile, enterprise programming chile, custom software chile, business automation chile, rpa chile, data engineering chile, artificial intelligence chile, proptech chile, fintech chile, legaltech chile, professional web development, software agency santiago, nearshore development chile, technology companies chile, digital solutions chile, etl bigquery chile, erp crm integrations chile, data pipelines chile, databricks chile, financial software chile, cloud development chile, aws azure gcp chile, web scraping chile, ai agents chile, power bi chile, payment gateways chile, shopify chile, digital transformation chile, technology consulting chile, enterprise software chile, python developers santiago, ruby developers chile, node developers chile, business intelligence chile, machine learning chile",
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
      title: "The software your company needs",
      titleAccent: "Just in Time",
      description: "Automation, data and integrations. <strong>RPA, ETL, AI and cloud</strong> for companies seeking results.",
      subtext: "• <strong>PropTech, Fintech, Energy, Legal and Retail</strong><br />• <strong>Predictable</strong> deliveries<br />• <strong>+20 successful</strong> projects<br />",
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
      badge: "Enterprise Software",
      title: "Automation & Data",
      titleSuffix: "that Generate",
      titleAccent: "Results",
      subtitle: "RPA, cloud and data pipelines that reduce operational costs and improve decision-making.",
      stats: {
        stat1Number: "20+",
        stat1Label: "Successful<br />Projects",
        stat2Number: "99.9%",
        stat2Label: "Guaranteed<br />Uptime",
        stat3Number: "350+",
        stat3Label: "Active<br />Clients"
      }
    },

    // Services Section
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
        description: "Web apps, APIs and RPA that reduce operational times and decision-making for your company. Cloud-native with 24/7 monitoring.",
        tags: ["Python", "Rails", "Node.js"]
      },
      
      service2: {
        category: "Cloud & Data",
        title: "Data Engineering",
        description: "Enterprise ETL pipelines with BigQuery/Databricks. We process millions of daily records.",
        tags: ["BigQuery", "AWS", "Azure"]
      },
      
      service3: {
        category: "AI",
        title: "Artificial Intelligence",
        description: "Intelligent automation with the market's leading LLMs. Reduce and streamline time on repetitive tasks.",
        tags: ["OpenAi", "Claude", "Gemini"]
      },
      
      service4: {
        category: "Fintech & PropTech",
        title: "Fintech & PropTech",
        description: "Investment platforms and executive dashboards with real-time data.",
        tags: ["Python", "Power BI", "Web Scraping"]
      },
      
      service5: {
        category: "Integrations",
        title: "Enterprise Integrations",
        description: "We connect ERPs, CRMs and e-commerce with 24/7 automatic synchronization.",
        tags: ["SAP", "Salesforce", "APIs"]
      },
      
      service6: {
        category: "Analytics",
        title: "Business Intelligence",
        description: "Dashboards with real-time KPIs. Complex data converted into decisions.",
        tags: ["Power BI", "Metabase", "SQL"]
      }
    },

    // Intro Section 2
    intro2: {
      badge: "Real Impact",
      title: "PropTech, LegalTech & Fintech",
      titleSuffix: "of",
      titleAccent: "World-Class",
      subtitle: "Enterprise platforms processing millions of daily data points. Portal automation, ETL for BigQuery/Databricks and scalable APIs.",
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
    portfolio: {
      title: "<span class=\"gradient-text\">Projects</span> that Transform",
      subtitle: "+20 success stories. Solutions that scale businesses.",
      cta: "Start My Project",
      controls: {
        prev: "Previous",
        next: "Next"
      },
      
      project1: {
        category: "AI/ML & Enterprise",
        title: "AI Agents",
        description: "Intelligent assistants with AI for enterprise automation.",
        tags: ["OpenAi", "Claude", "Gemini"]
      },
      
      project2: {
        category: "Fintech & Automation",
        title: "Financial Apps",
        description: "Income statements and automated financial reports in real-time.",
        tags: ["Python", "Power BI", "SQL"]
      },
      
      project3: {
        category: "Retail & Integrations",
        title: "E-commerce Integrations",
        description: "Multi-platform connectors with real-time synchronization of Inventory and Stock.",
        tags: ["Shopify", "Wordpress", "WSM"]
      },
      
      project4: {
        category: "Cloud & Infrastructure",
        title: "Cloud Infrastructure",
        description: "Scalable multi-cloud architectures with distributed databases.",
        tags: ["AWS", "GCP", "Azure"]
      },
      
      project5: {
        category: "AI & Integrations",
        title: "Enterprise AI Workflows",
        description: "AI integration in business workflows for automated decisions.",
        tags: ["Flasks", "APIs", "OCR"]
      },
      
      project6: {
        category: "LegalTech & RPA",
        title: "Judicial RPA",
        description: "Legal process automation. 1000+ daily documents.",
        tags: ["Playwright", "Python", "RPA"]
      },
      
      project7: {
        category: "Fintech & Data",
        title: "Portfolio Backtesting",
        description: "Portfolio automations and Backtesting with Real Data.",
        tags: ["Python", "Stocks", "Web Scraping"]
      },
      
      project8: {
        category: "PropTech",
        title: "Databam",
        description: "Real estate data platform with +500K properties in real-time with transaction prices and owners.",
        tags: ["Rails", "Python", "BigQuery"]
      },
      
      project9: {
        category: "Energy & Automation",
        title: "Energy Sector Automation",
        description: "Automatic measurement system and marginal cost calculation. Real-time SCADA for electric power generation.",
        tags: ["Azure", "Web Scraping", "Data Engineering"]
      },
      
      project10: {
        category: "Security & Blockchain",
        title: "Zero-Knowledge Encryption",
        description: "Secure validations without exposing sensitive data. Advanced cryptography.",
        tags: ["ZK-Proofs", "Cryptography", "Validations"]
      }
    },

    // Intro Section 3 (Nearshore/About)
    intro3: {
      badge: "Premium Nearshore",
      title: "Technology Partner",
      titleSuffix: "for",
      titleAccent: "Chile & LATAM",
      subtitle: "International expertise with local presence. Same time zone, language and business culture. Agile development for critical projects.",
      stats: {
        stat1Number: "100%",
        stat1Label: "Satisfied<br />Clients",
        stat2Number: "5+ Years",
        stat2Label: "Strategic<br />Relationships",
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
      subtitle: "Expertise in Fintech, PropTech and Data",
      
      founder1: {
        name: "Joaquín Espildora M.",
        role: "Founder & CEO",
        description: "Civil Engineer (Universidad de los Andes). Former Portfolio Manager with over $3B USD AUM. Specialist in PropTech and Fintech."
      },
      
      founder2: {
        name: "Matías Cánepa G.",
        role: "CTO & Co-Founder",
        description: "Data Architect AWS/Azure/GCP. Big Data Professor at Universidad de los Andes. Specialist in ETL and serverless cloud."
      }
    },

    // Contact Section
    contact: {
      title: "<span class=\"gradient-text\">Quote</span> Your Project",
      subtitle: "Proposal in 24hrs.",
      location: "Santiago, Chile | Immediate response",
      
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
        submitButton: "Send Message"
      }
    },

    // Footer
    footer: {
      description: "Transforming ideas into world-class technology solutions.",
      
      services: {
        title: "Services",
        item1: "Software Development",
        item2: "Cloud & Data Engineering",
        item3: "Applied AI",
        item4: "Fintech Ecosystems"
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
        email: "contacto@justdev.it"
      },
      
      bottom: {
        copyright: "&copy; 2025 Just Dev It. All rights reserved.",
        credits: "Made with 💜 in Chile"
      }
    },

    // Language Selector
    language: {
      current: "EN",
      switch: "Cambiar a Español",
      tooltip: "Change language"
    },

    // Preloader
    preloader: {
      text: "Loading experience"
    }
  }
};

export default translations;
