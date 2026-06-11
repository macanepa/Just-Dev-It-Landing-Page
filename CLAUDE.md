# Just Dev It — Contexto del proyecto (sitio web justdev.it)

## Qué es esta empresa
Just Dev It es una consultora chilena de desarrollo de software a medida fundada en 2023
por Joaquín Espíldora (CEO) y Matías Cánepa (CTO), basada en Santiago. Servicios:
automatización RPA, data engineering, IA aplicada, web scraping a escala, desarrollo web
e integración de sistemas (ERP/CRM). Verticales objetivo: energías renovables, legal
(LegalTech), minería, financiero (fondos, AGFs, fintech) y PropTech. Producto propio:
Data Inmobiliaria (datainmobiliaria.cl), 9,5M de propiedades indexadas.

Clientes que SÍ se pueden mencionar públicamente (ya figuran en el JSON-LD del sitio):
Pacific Hydro Chile, Macal, Contego, ESE Business School (UANDES) y un grupo empresarial
multi-sociedad (sin nombre). Ningún otro cliente se nombra sin autorización de Joaquín.

## Objetivo actual del repositorio
Actualización integral de marketing digital / SEO. La especificación completa con la
auditoría y los entregables está en @docs/seo_spec_di_jdi.md (Parte 2 = este sitio).
Resumen del diagnóstico (junio 2026):
- Bien hecho y NO tocar sin razón: title/meta/canonical/hreflang del home, GTM
  (contenedor GTM-N67BW2PN), los 6 bloques JSON-LD existentes.
- Problema central: el sitio es one-page. El sitemap declara anclas (#servicios, etc.)
  que Google ignora; solo hay 1 URL indexable. Hay que crear páginas reales por
  servicio y por vertical según la tabla de la spec.
- El dominio .it geolocaliza a Italia para Google; las señales locales chilenas
  (contenido es-CL, schema LocalBusiness, enlaces .cl) son parte de la mitigación.

## Stack
Sitio aparentemente estático (HTML/CSS/JS, carpetas /assets, /css, /js; sitemap.xml
escrito a mano). PRIMERA TAREA de cualquier sesión nueva: verificar el stack y el
proceso de build/deploy reales en este repo y actualizar esta sección con lo encontrado.

## Reglas de trabajo
1. Todo cambio en rama propia (`seo/fase-1-paginas-verticales`, etc.). NUNCA commit
   directo a main. NUNCA deploy: los PRs los revisa y mergea Joaquín.
2. Un PR por fase de la spec. Commits descriptivos en español.
3. Reutilizar el design system y los componentes existentes del home para las páginas
   nuevas. No introducir frameworks, librerías ni dependencias nuevas sin preguntar.
4. Mantener el peso de página bajo: sin librerías JS pesadas, imágenes en WebP con
   lazy loading y alt descriptivo.
5. No modificar ni eliminar el snippet GTM-N67BW2PN sin confirmación explícita.
6. Si una URL existente cambia, dejar redirección 301. Nunca romper enlaces.

## Reglas SEO para toda página nueva
- Title único, máximo 60 caracteres, keyword primero y marca al final
  (formato: `{Keyword principal} | Just Dev It`).
- Meta description única de 150-160 caracteres con llamado a la acción.
- Canonical absoluto, etiquetas OG completas, hreflang coherente con el home.
- Un solo H1 con la keyword principal; jerarquía H2/H3 lógica.
- JSON-LD: Service o la entidad que corresponda + FAQPage si la página tiene preguntas
  frecuentes (solo preguntas con respuestas reales, nada inventado).
- Mínimo 2 enlaces internos entrantes y salientes por página (home ↔ vertical ↔ caso).
- Agregar la URL nueva al sitemap.xml (sin anclas, con lastmod real) en el mismo PR.

## Reglas de contenido
- Idioma: español de Chile, tono directo y técnico-comercial B2B. Sin anglicismos
  innecesarios, sin superlativos vacíos ("líder", "el mejor") y sin promesas absolutas.
- Solo afirmaciones verificables. Métricas, plazos y resultados de casos: únicamente
  los que ya están publicados en el sitio o los que Joaquín entregue por escrito.
  Si falta un dato, dejar el placeholder `[CONFIRMAR: …]` y avisar en el PR.
- Extensión de páginas de servicio/vertical: 600-1.000 palabras con estructura
  problema → solución → caso → FAQ → CTA de cotización.
- Nunca: keyword stuffing, contenido duplicado entre páginas, schema con datos
  falsos (reseñas, ratings), texto generado de relleno.

## Hoja de ruta (estado al 10-06-2026)
- [ ] Fase 1: páginas /industrias/energia-renovable y /industrias/legaltech + 1 caso
- [ ] Fase 2: sitemap.xml con URLs reales + navegación interna actualizada
- [ ] Fase 3: resto de verticales (mineria, finanzas) y servicios (rpa,
      data-engineering, inteligencia-artificial)
- [ ] Fase 4: medición — confirmar GTM operativo y agregar ID de GA4: [PENDIENTE G-XXXX]
- [ ] Continuo: revisar Search Console tras cada publicación (indexación y queries)

## Pendientes que dependen de Joaquín (no intentar resolver desde el repo)
- ID de propiedad GA4 y acceso al contenedor GTM-N67BW2PN.
- Verificación de dominio en Search Console y Bing Webmaster.
- Google Business Profile de Just Dev It.
- Decisión sobre dominio alternativo .cl (no migrar nada por ahora).
