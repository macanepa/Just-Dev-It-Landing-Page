# 08 - Just AI

## 🎯 Propósito de la Sección
Agentes de IA personalizados y automatizaciones inteligentes para negocios. Showcase de 3 agentes especializados (inmobiliario, cotizador, email/contenido) + servicio de diseño de agentes a medida.

---

## 🎨 Identidad Visual

### Paleta de Colores
```css
--primary: #7C3AED    /* Púrpura Vibrante */
--secondary: #EC4899  /* Rosa Magenta */
--accent: #22D3EE     /* Cyan Brillante */
--gradient: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)
```

### Tipografía
- **Headings**: Poppins (700-800)
- **Body**: Manrope (400-600)

### Iconografía
- 🤖 IA / Agentes
- ✨ Magia / Inteligencia
- ⚡ Automatización
- 🎯 Precisión / Eficiencia
- 🧠 Aprendizaje / Entrenamiento

---

## 📋 Estructura de Contenido

### Hero Section
**Título**: "Agentes IA que Trabajan por Ti"  
**Subtítulo**: "Automatizaciones inteligentes y agentes personalizados para inmobiliarias, comercio, marketing y más."

**Badge**: `Just AI`

**CTA Principal**: "Diseñar Agente a Medida"  
**CTA Secundario**: "Probar Agente Demo"

---

## 🤖 Showcase de 3 Agentes Especializados

### 1. 🏠 Agente Inmobiliario de Transacciones CL

**Label**: `Real Estate`

**Descripción**: Agente especializado en el mercado inmobiliario chileno. Accede a data de CBR, SII, Conservador y valora propiedades al instante.

**Capacidades**:
- ✨ Busca transacciones por rol, dirección o comuna
- ✨ Valora propiedades con modelos predictivos (ML)
- ✨ Genera comparables automáticos (últimas ventas en 500m)
- ✨ Extrae deudas y gravámenes del CBR
- ✨ Responde en lenguaje natural ("¿Cuánto vale un depto en Providencia de 70m²?")

**Casos de Uso**:
1. **Corredoras**: "Valúa 50 propiedades en 5 minutos vs 2 días manual"
2. **Inversionistas**: "Encuentra propiedades subvaloradas en LATAM"
3. **Bancos**: "Due diligence automatizada para créditos hipotecarios"

**Ejemplo de Interacción**:
```
Usuario: "¿Cuánto vale la propiedad rol 123-45 en Las Condes?"
Agente: "La propiedad en Las Condes (rol 123-45) tiene:
         • Valor fiscal: $185M CLP
         • Valor estimado de mercado: $210M CLP (±8%)
         • Última transacción: Oct 2023 a $200M
         • Comparables: 5 propiedades similares vendidas a $205M promedio
         • Gravámenes: Sin deudas ni hipotecas vigentes"
```

**Stack Técnico**:
- LLM: GPT-4 Turbo (OpenAI) o Claude 3.5 Sonnet (Anthropic)
- Tools: Function calling para consultar APIs de Databam
- Vector DB: Pinecone para RAG con histórico de transacciones
- Deployment: Serverless (AWS Lambda) o Kubernetes

**CTA**: "Probar Agente" → Chat demo con 10 consultas gratis

---

### 2. 💰 Agente Cotizador

**Label**: `Commerce`

**Descripción**: Genera cotizaciones profesionales automáticamente desde tu catálogo de productos/servicios. Con branding personalizado y envío por email.

**Capacidades**:
- ✨ Consulta inventario y precios en tiempo real
- ✨ Aplica descuentos por volumen o temporada
- ✨ Genera PDF de cotización con tu branding (logo, colores)
- ✨ Envía por email automáticamente
- ✨ Seguimiento de cotizaciones (aceptadas/rechazadas/pendientes)

**Casos de Uso**:
1. **Retail B2B**: "Genera 100 cotizaciones/día sin equipo de ventas"
2. **Servicios Profesionales**: "Cotiza proyectos de software en 2 minutos"
3. **Manufactura**: "Cotiza productos con descuentos por volumen automáticamente"

**Ejemplo de Interacción**:
```
Usuario: "Genera cotización para Juan Pérez de Empresa X:
         - 50 unidades de Producto A
         - 20 unidades de Producto B"
         
Agente: "✓ Cotización #12345 generada
         • Cliente: Juan Pérez (Empresa X)
         • Items: 50x Producto A ($10k c/u), 20x Producto B ($25k c/u)
         • Descuento por volumen: 10% (>40 unidades)
         • Total: $945k CLP (IVA incluido)
         • PDF generado y enviado a juan@empresax.cl
         • Válida por 30 días"
```

**Integraciones**:
- ERP/Inventory: API para consultar stock y precios
- CRM: Salesforce, HubSpot para guardar cotizaciones
- Email: SendGrid o AWS SES para envío
- Firma Digital: DocuSign para aceptación de cotización

**CTA**: "Probar Agente" → Form con datos de prueba → PDF de cotización

---

### 3. 📧 Agente de Email & Contenido

**Label**: `Marketing`

**Descripción**: Redacta emails, posts y contenido optimizado con tu tono de voz y contexto de negocio. Aprende de tu marca y genera contenido on-brand.

**Capacidades**:
- ✨ Aprende el tono de voz de tu marca (analiza 10-20 piezas existentes)
- ✨ Genera emails de prospección personalizados (cold email con personalización)
- ✨ Redacta posts para LinkedIn, Instagram, Twitter/X
- ✨ Optimiza para SEO (keywords, meta descriptions)
- ✨ Revisión de gramática y estilo (elimina errores)

**Casos de Uso**:
1. **Agencias de Marketing**: "Redacta 50 emails de prospección B2B en 10 minutos"
2. **Emprendedores**: "Genera 1 mes de contenido para LinkedIn en 1 hora"
3. **E-commerce**: "Optimiza descripciones de productos para SEO"

**Ejemplo de Interacción**:
```
Usuario: "Redacta email de prospección para CEOs de Pymes chilenas
         ofreciendo nuestro servicio de automatización financiera"
         
Agente: "Asunto: [Juan], automatiza las finanzas de [Empresa X] en 10 minutos

         Hola Juan,
         
         Vi que [Empresa X] está creciendo rápido (¡felicitaciones por el 
         nuevo round!). Con ese crecimiento, imagino que armar modelos 
         financieros y reportería se está volviendo un dolor de cabeza.
         
         Nuestros clientes (Pymes como [Cliente Ref]) reducen 10x el tiempo 
         en reportería con Just Finance. ¿Te interesa ver un demo de 15 min?
         
         Saludos,
         [Tu Nombre]"
```

**Fine-tuning**:
- Sube 10-20 emails/posts de tu marca
- El agente analiza:
  - Tono: Formal vs informal, técnico vs conversacional
  - Estructura: Largo de párrafos, uso de bullets, CTAs
  - Vocabulario: Palabras clave, industria jargon

**CTA**: "Probar Agente" → Upload de contenido de muestra → Generación de pieza

---

## 🛠️ Sección: ¿Necesitas un Agente a Medida?

**Título**: "Diseñamos y Entrenamos Agentes IA Personalizados"

**Descripción**: Para tu industria, con acceso a tus sistemas, bases de datos y flujos de trabajo.

**Stats Cards (Grid 3 columnas)**:

**Card 1**:
- **Icono/Texto**: `GPT-4`
- **Descripción**: Modelos de última generación (OpenAI, Anthropic, Mistral)

**Card 2**:
- **Icono/Texto**: `APIs`
- **Descripción**: Conecta con tu stack (Salesforce, SAP, custom APIs)

**Card 3**:
- **Icono/Texto**: `24/7`
- **Descripción**: Operando sin parar, escalando a demanda

**Proceso de Diseño (4 pasos)**:
1. **Consultoría Inicial (1h)**: Entendemos tu caso de uso y flujos
2. **Diseño de Agente**: Definimos tools, prompts y arquitectura
3. **Entrenamiento**: Fine-tuning con tu data (si aplica)
4. **Deployment**: En tu infra (AWS, GCP, Azure) o nuestra

**CTA**: "Agendar Consultoría" → Calendly con slot de 1h

---

## 🔗 CTAs y Conversión

### CTAs por Agente
1. **Inmobiliario**: "Probar Agente" → Chat interactivo con 10 consultas gratis
2. **Cotizador**: "Probar Agente" → Form → PDF de cotización demo
3. **Email/Contenido**: "Probar Agente" → Upload contenido → Generación

### CTA Principal (Hero)
**Texto**: "Diseñar Agente a Medida"  
**Destino**: Form de contacto con campos:
- Nombre, Empresa, Email, Teléfono
- Caso de uso (textarea)
- Industria (dropdown)
- Sistemas actuales (textarea)

### CTA Final (Footer)
**Texto**: "Diseña tu Agente Personalizado"  
**Subtítulo**: "Cuéntanos tu caso de uso y construimos el agente perfecto para tu negocio."  
**Destino**: Calendly para consultoría

---

## 🛠️ Especificaciones Técnicas

### Arquitectura de Agentes

```
┌─────────────────────────────────────────────┐
│  USER INPUT                                 │
│  "¿Cuánto vale rol 123-45?"                 │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  AGENT ORCHESTRATOR                         │
│  (LangChain / LlamaIndex)                   │
│  - Parse intent                             │
│  - Select tools                             │
│  - Execute tool chain                       │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  TOOLS (Function Calling)                   │
│  - get_property_info(rol)                   │
│  - search_comparables(lat, lng)             │
│  - check_cbr_debt(rol)                      │
│  - generate_valuation(features)             │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  EXTERNAL APIS                              │
│  - Databam API                              │
│  - SII API                                  │
│  - CBR Scraping                             │
└─────────────────────────────────────────────┘
```

### Stack Tecnológico
**LLM Layer**:
- OpenAI GPT-4 Turbo (128k context)
- Anthropic Claude 3.5 Sonnet (200k context)
- Fallback: GPT-3.5 Turbo para queries simples (cost optimization)

**Agent Framework**:
- LangChain (Python) o LangGraph para workflows complejos
- LlamaIndex para RAG (Retrieval-Augmented Generation)
- Function calling nativo de OpenAI

**Vector Database (para RAG)**:
- Pinecone (managed) o Weaviate (self-hosted)
- Embeddings: OpenAI text-embedding-3-large

**Backend**:
- FastAPI (Python) para API REST
- WebSocket para chat en tiempo real
- Redis para session state

**Deployment**:
- Serverless: AWS Lambda + API Gateway (baja latencia)
- Containerized: Kubernetes para workloads pesados
- Monitoreo: LangSmith o Helicone para observability

---

## 📊 KPIs y Métricas de Éxito

### Objetivos de Conversión
- **Demo Requests**: 100 consultas/mes a agentes demo
- **Custom Agent Leads**: 10 consultas de diseño a medida/mes
- **Conversión a Proyecto**: 30% de leads → proyectos (3 proyectos/mes)
- **ARR Objetivo**: $50M CLP/año (proyectos de $500k-$2M c/u)

### Métricas de Agentes (Técnicas)
- **Accuracy**: % de respuestas correctas (> 90%)
- **Latency**: Tiempo de respuesta promedio (< 3s)
- **Tool Success Rate**: % de llamadas a tools exitosas (> 95%)
- **User Satisfaction**: CSAT score (> 4.5/5)

---

## 🎬 Interacciones y Animaciones

### Cards de Agentes
- Hover effect con glow púrpura/rosa
- Animación de "typing..." al probar agente
- Expandir/colapsar de features

### Chat Demo
- Burbujas estilo messenger
- Animación de "thinking..." con dots animados
- Syntax highlighting para outputs estructurados (JSON)

### Formulario de Agente a Medida
- Progress indicator (Paso 1/3)
- Validación en tiempo real
- Animación de envío exitoso (confetti)

---

## 🔍 SEO y Metadata

### Meta Tags
```html
<title>Just AI - Agentes IA Personalizados | Automatización Inteligente para Negocios</title>
<meta name="description" content="Agentes de IA especializados para inmobiliarias, comercio y marketing. Diseñamos agentes a medida con GPT-4, conectados a tu stack. Automatización inteligente 24/7.">
<meta name="keywords" content="agentes IA, GPT-4, automatización inteligente, AI agents Chile, chatbot inteligente, cotizador automático, content generation AI">
```

### Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Just AI Agents",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "description": "Agentes IA personalizados desde $500k CLP/proyecto"
  }
}
```

---

## 📐 Wireframe Conceptual

```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo + Badge "Just AI"                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  HERO                                                   │
│  🤖 Agentes IA que Trabajan por Ti                     │
│  Subtítulo...                                           │
│  [Diseñar Agente a Medida] [Probar Demo]               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  SHOWCASE DE 3 AGENTES (Grid Vertical)                  │
│  ┌─────────────────────────────────────────────┐       │
│  │ 🏠 AGENTE INMOBILIARIO                      │       │
│  │ Label: [Real Estate]                        │       │
│  │ Descripción + Capacidades (5 bullets)       │       │
│  │ [Probar Agente]                             │       │
│  └─────────────────────────────────────────────┘       │
│  ┌─────────────────────────────────────────────┐       │
│  │ 💰 AGENTE COTIZADOR                         │       │
│  └─────────────────────────────────────────────┘       │
│  ┌─────────────────────────────────────────────┐       │
│  │ 📧 AGENTE EMAIL/CONTENIDO                   │       │
│  └─────────────────────────────────────────────┘       │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ¿NECESITAS UN AGENTE A MEDIDA?                        │
│  Descripción + Stats (GPT-4 / APIs / 24/7)            │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  CTA FINAL                                              │
│  "Diseña tu Agente Personalizado"                      │
│  [Agendar Consultoría]                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist de Implementación

- [ ] Diseño de 3 agent cards con labels y features
- [ ] Chat demo interactivo (Agente Inmobiliario)
- [ ] Form de cotización (Agente Cotizador) → generación de PDF
- [ ] Upload de contenido + generación (Agente Email)
- [ ] Integración con OpenAI API / Anthropic Claude
- [ ] LangChain agent orchestrator con function calling
- [ ] Vector DB (Pinecone) para RAG con histórico
- [ ] Sistema de rate limiting (10 consultas gratis → paywall)
- [ ] Calendly embed para consultoría
- [ ] Analytics de uso de agentes (Mixpanel/Segment)
- [ ] Monitoreo con LangSmith (traces de agentes)

---

## 📌 Notas Adicionales

### Consideraciones Éticas y Legales
- **Transparencia**: Disclosures de "Powered by AI" en respuestas
- **Bias**: Testing continuo para detectar sesgos en respuestas
- **Privacy**: Data de usuarios encriptada, no usada para fine-tuning sin consentimiento
- **Responsabilidad**: Disclaimer "Verifica información crítica, no somos responsables por decisiones basadas en output de AI"

### Diferenciadores
- **Especialización**: Agentes verticalizados (real estate, commerce) vs chatbots genéricos
- **Integración**: Conecta con APIs chilenas (CBR, SII) vs agentes internacionales
- **Custom**: Servicio de diseño a medida vs plataformas no-code limitadas

### Riesgos Técnicos
- **Latency de LLMs**: GPT-4 puede tomar 5-10s → usar streaming de respuestas
- **Costos**: GPT-4 es caro ($0.01-0.03 per 1k tokens) → optimizar prompts
- **Reliability**: LLMs pueden alucinar → validar outputs con tools

### Roadmap Futuro
- **Q1 2026**: 10 agentes especializados adicionales (legal, HR, finanzas)
- **Q2 2026**: Marketplace de agentes (como GPT Store de OpenAI)
- **Q3 2026**: Fine-tuning con data de clientes (privado, no compartido)
- **Q4 2026**: Agentes multimodales (visión + voz)
