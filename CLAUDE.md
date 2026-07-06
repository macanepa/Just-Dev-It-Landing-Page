# Just Dev It — Contexto del proyecto (sitio web justdev.it)

## Qué es esta empresa
- Consultora chilena de desarrollo de software a medida, fundada en 2023 por
  Joaquín Espíldora (CEO) y Matías Cánepa (CTO), basada en Santiago.
- Servicios: automatización RPA, data engineering, IA aplicada, web scraping a escala,
  desarrollo web e integración de sistemas (ERP/CRM).
- Verticales objetivo: energías renovables, legal (LegalTech), minería, financiero
  (fondos, AGFs, fintech) y PropTech.
- Producto propio: Data Inmobiliaria (datainmobiliaria.cl), 9,5M de propiedades indexadas.
- Clientes que SÍ se pueden mencionar públicamente (ya figuran en el JSON-LD del sitio):
  Pacific Hydro Chile, Macal, Contego, ESE Business School (UANDES) y un grupo
  empresarial multi-sociedad (sin nombre). Ningún otro cliente se nombra sin
  autorización de Joaquín.

## Objetivo actual del repositorio
Actualización integral de marketing digital / SEO. La especificación completa con la
auditoría y los entregables está en docs/seo_spec_di_jdi.md (Parte 2 = este sitio).
OJO: ese archivo hoy NO está en esta copia de trabajo (docs/ es gitignoreado; pedirlo
si falta) — la auditoría base disponible en local es docs/auditoria_marketing_20260610.md.

Resumen del diagnóstico (junio 2026):
- Bien hecho y NO tocar sin razón: title/meta/canonical del home, GTM
  (contenedor GTM-N67BW2PN), los bloques JSON-LD existentes.
- hreflang NO existe en el sitio y NO corresponde agregarlo: hay una sola URL por
  página y la traducción EN es client-side. La señal correcta es html lang="es-CL"
  estático + contenido en español (verificado 10-06-2026; antes esta nota afirmaba
  que el home tenía hreflang — era falso).
- Problema central: el sitio es one-page. El sitemap declara anclas (#servicios, etc.)
  que Google ignora; solo hay 1 URL indexable. Hay que crear páginas reales por
  servicio y por vertical según la tabla de la spec.
- El dominio .it geolocaliza a Italia para Google; las señales locales chilenas
  (contenido es-CL, schema LocalBusiness, enlaces .cl) son parte de la mitigación.
- i18n: el español estático del HTML es la fuente de verdad SEO. js/i18n.js solo
  traduce por acción manual del usuario (NUNCA por IP ni navigator.language, y NUNCA
  reescribe <html lang>, title ni metas en la carga — eso hacía que Googlebot
  renderizara el home en inglés). Si se edita copy con data-i18n en index.html hay
  que actualizar la MISMA clave en config/translations.js (es y en) o el texto se
  revierte en runtime.

Hoja de ruta por fases y pendientes que dependen de Joaquín (no intentar resolverlos
desde el repo): ver docs/estado_seo.md (doc local; docs/ está gitignoreado y el repo
es público — no committear).

## Stack y deploy (verificado 10-06-2026)
- Sitio estático puro: HTML/CSS/JS vanilla. Sin build, sin package.json, sin tests.
  Vista previa local: `python -m http.server 8000` en la raíz (o Live Server de VS Code).
- Deploy real: push a `main` → GitHub Pages (CNAME justdev.it; `curl -I` devuelve
  Server: GitHub.com). netlify.toml y _headers son configuración MUERTA (no se aplican).
- GitHub Pages no soporta 301s de servidor: para URLs que cambian se usa página puente
  con meta refresh 0 + canonical (patrón en /sections/databam/databam.html; matiza la
  regla 6 de trabajo).

## Trampas conocidas (verificadas 10-06-2026)
- El home NO carga css/components/{navigation,hero,language-selector}.css — esas
  reglas viven duplicadas en el <style> inline de index.html (critical CSS manual):
  todo cambio va en ambos lados.
- css/bundle.css y bundle.min.css son otro pipeline: el home no los usa; las páginas
  interiores cargan bundle.min.css.
- .gitignore ignora docs/ y sections/ — archivos bajo sections/ requieren `git add -f`.
- El repo es PÚBLICO: nada sensible en commits.

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
- Canonical absoluto, etiquetas OG completas (og:locale es_CL), metas geo.* como el
  home; NO agregar hreflang (no hay URLs por idioma).
- JSON-LD: incluir en el @graph un nodo Organization local con
  @id "https://justdev.it/#organization" (Google no resuelve @id entre páginas).
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
