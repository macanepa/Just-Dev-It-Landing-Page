// 🔍 DIAGNÓSTICO COMPLETO - Just Dev It Landing Page
// Copia y pega este código en la Consola del navegador (F12)

console.log('%c🔍 INICIANDO DIAGNÓSTICO COMPLETO...', 'font-size: 20px; color: #9B61A4; font-weight: bold;');
console.log('');

// ========================================
// 1. VERIFICAR HERO/BANNER
// ========================================
console.log('%c1️⃣ HERO/BANNER', 'font-size: 16px; color: #04C7AA; font-weight: bold;');
const hero = document.querySelector('#hero');
if (hero) {
    console.log('✅ Hero section encontrada');
    const heroTitle = hero.querySelector('.hero-title');
    const heroDescription = hero.querySelector('.hero-description');
    const heroCTA = hero.querySelectorAll('.btn');
    
    console.log('   Título:', heroTitle ? heroTitle.textContent.trim().substring(0, 50) + '...' : '❌ NO ENCONTRADO');
    console.log('   Descripción:', heroDescription ? '✅ Presente' : '❌ NO ENCONTRADO');
    console.log('   CTAs:', heroCTA.length, 'botones');
} else {
    console.log('❌ Hero section NO ENCONTRADA');
}
console.log('');

// ========================================
// 2. VERIFICAR SECCIÓN DE SERVICIOS
// ========================================
console.log('%c2️⃣ SECCIÓN DE SERVICIOS', 'font-size: 16px; color: #04C7AA; font-weight: bold;');
const servicios = document.querySelector('#servicios');
if (servicios) {
    console.log('✅ Sección de servicios encontrada');
    const serviciosTitle = servicios.querySelector('.slider-title');
    const serviceCards = servicios.querySelectorAll('.slider-card');
    
    console.log('   Título:', serviciosTitle ? serviciosTitle.textContent.trim() : '❌ NO ENCONTRADO');
    console.log('   Cantidad de servicios:', serviceCards.length);
    
    // Verificar cada servicio
    serviceCards.forEach((card, index) => {
        const img = card.querySelector('.slider-card-image');
        const title = card.querySelector('.slider-card-title');
        const imgStatus = img && img.complete ? '✅' : '❌';
        console.log(`   Servicio ${index + 1}: ${title ? title.textContent.trim() : 'Sin título'} - Imagen: ${imgStatus}`);
        if (img && !img.complete) {
            console.log(`      ⚠️ Imagen no cargada: ${img.src}`);
        }
    });
} else {
    console.log('❌ Sección de servicios NO ENCONTRADA');
}
console.log('');

// ========================================
// 3. VERIFICAR PROYECTOS (PORTFOLIO)
// ========================================
console.log('%c3️⃣ PROYECTOS (PORTFOLIO)', 'font-size: 16px; color: #04C7AA; font-weight: bold;');
const portfolio = document.querySelector('#portafolio');
if (portfolio) {
    console.log('✅ Sección de portfolio encontrada');
    const portfolioTitle = portfolio.querySelector('.slider-title');
    const projectCards = portfolio.querySelectorAll('.slider-card');
    
    console.log('   Título:', portfolioTitle ? portfolioTitle.textContent.trim() : '❌ NO ENCONTRADO');
    console.log('   Cantidad de proyectos:', projectCards.length);
    
    // Verificar cada proyecto
    console.log('   Verificando imágenes de proyectos:');
    projectCards.forEach((card, index) => {
        const img = card.querySelector('.slider-card-image');
        const title = card.querySelector('.slider-card-title');
        const imgStatus = img && img.complete ? '✅' : '❌';
        const imgSrc = img ? img.src.split('/').pop() : 'NO IMAGE';
        
        console.log(`   Proyecto ${index + 1}: ${title ? title.textContent.trim() : 'Sin título'}`);
        console.log(`      Imagen: ${imgSrc} ${imgStatus}`);
        
        if (img) {
            const styles = window.getComputedStyle(img);
            console.log(`      Z-index: ${styles.zIndex}, Opacity: ${styles.opacity}, Display: ${styles.display}`);
            
            if (!img.complete) {
                console.log(`      ⚠️ ERROR: Imagen no cargó - ${img.src}`);
            }
        } else {
            console.log(`      ❌ NO HAY ELEMENTO <img>`);
        }
    });
} else {
    console.log('❌ Sección de portfolio NO ENCONTRADA');
}
console.log('');

// ========================================
// 4. VERIFICAR EQUIPO
// ========================================
console.log('%c4️⃣ EQUIPO (NOSOTROS)', 'font-size: 16px; color: #04C7AA; font-weight: bold;');
const equipo = document.querySelector('#nosotros');
if (equipo) {
    console.log('✅ Sección de equipo encontrada');
    const teamCards = equipo.querySelectorAll('.team-card');
    
    console.log('   Cantidad de miembros:', teamCards.length);
    console.log('   Verificando fotos:');
    
    teamCards.forEach((card, index) => {
        const img = card.querySelector('.team-card-avatar img');
        const name = card.querySelector('.card-title');
        const imgStatus = img && img.complete ? '✅' : '❌';
        const imgSrc = img ? img.src.split('/').pop() : 'NO IMAGE';
        
        console.log(`   Miembro ${index + 1}: ${name ? name.textContent.trim() : 'Sin nombre'}`);
        console.log(`      Imagen: ${imgSrc} ${imgStatus}`);
        
        if (img && !img.complete) {
            console.log(`      ⚠️ ERROR: Imagen no cargó - ${img.src}`);
        }
    });
} else {
    console.log('❌ Sección de equipo NO ENCONTRADA');
}
console.log('');

// ========================================
// 5. VERIFICAR TODAS LAS IMÁGENES
// ========================================
console.log('%c5️⃣ RESUMEN DE TODAS LAS IMÁGENES', 'font-size: 16px; color: #04C7AA; font-weight: bold;');
const allImages = document.querySelectorAll('img');
const loadedImages = Array.from(allImages).filter(img => img.complete);
const failedImages = Array.from(allImages).filter(img => !img.complete);

console.log(`   Total de imágenes en la página: ${allImages.length}`);
console.log(`   ✅ Cargadas correctamente: ${loadedImages.length}`);
console.log(`   ❌ No cargadas: ${failedImages.length}`);

if (failedImages.length > 0) {
    console.log('   Imágenes que fallaron:');
    failedImages.forEach(img => {
        console.log(`      ❌ ${img.src}`);
    });
}
console.log('');

// ========================================
// 6. VERIFICAR CSS DE SLIDER CARDS
// ========================================
console.log('%c6️⃣ VERIFICAR CSS DE CARDS', 'font-size: 16px; color: #04C7AA; font-weight: bold;');
const sampleCard = document.querySelector('.slider-card');
if (sampleCard) {
    const sampleImg = sampleCard.querySelector('.slider-card-image');
    const sampleOverlay = sampleCard.querySelector('.slider-card-overlay');
    
    if (sampleImg) {
        const imgStyles = window.getComputedStyle(sampleImg);
        console.log('   Estilos de .slider-card-image:');
        console.log(`      z-index: ${imgStyles.zIndex} ${imgStyles.zIndex === '1' ? '✅' : '❌ Debería ser 1'}`);
        console.log(`      opacity: ${imgStyles.opacity} ${imgStyles.opacity === '1' ? '✅' : '⚠️ Debería ser 1'}`);
        console.log(`      display: ${imgStyles.display} ${imgStyles.display !== 'none' ? '✅' : '❌ No debería ser none'}`);
        console.log(`      position: ${imgStyles.position}`);
    }
    
    if (sampleOverlay) {
        const overlayStyles = window.getComputedStyle(sampleOverlay);
        console.log('   Estilos de .slider-card-overlay:');
        console.log(`      z-index: ${overlayStyles.zIndex} ${overlayStyles.zIndex === '2' ? '✅' : '❌ Debería ser 2'}`);
        console.log(`      position: ${overlayStyles.position}`);
    }
} else {
    console.log('   ❌ No se encontró ninguna card para verificar CSS');
}
console.log('');

// ========================================
// 7. VERIFICAR ARCHIVOS CSS Y JS
// ========================================
console.log('%c7️⃣ VERIFICAR RECURSOS CARGADOS', 'font-size: 16px; color: #04C7AA; font-weight: bold;');
const cssFiles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
const jsFiles = Array.from(document.querySelectorAll('script[src]'));

console.log(`   Archivos CSS cargados: ${cssFiles.length}`);
cssFiles.forEach(css => {
    const href = css.href.split('/').pop();
    console.log(`      ✅ ${href}`);
});

console.log(`   Archivos JS cargados: ${jsFiles.length}`);
jsFiles.forEach(js => {
    const src = js.src.split('/').pop();
    console.log(`      ✅ ${src}`);
});
console.log('');

// ========================================
// 8. VERIFICAR ERRORES EN CONSOLE
// ========================================
console.log('%c8️⃣ VERIFICAR ERRORES', 'font-size: 16px; color: #04C7AA; font-weight: bold;');
console.log('   Revisa arriba en la consola si hay errores en rojo (404, CORS, etc.)');
console.log('');

// ========================================
// RESUMEN FINAL
// ========================================
console.log('%c✅ DIAGNÓSTICO COMPLETO', 'font-size: 20px; color: #9B61A4; font-weight: bold;');
console.log('');
console.log('Si ves ❌ o ⚠️ arriba, esos son los problemas a corregir.');
console.log('');
console.log('%c💡 SOLUCIONES COMUNES:', 'font-size: 14px; color: #FFA500; font-weight: bold;');
console.log('1. Si las imágenes no cargan: Limpia el caché (Ctrl+Shift+R)');
console.log('2. Si ves el texto pero no las imágenes: Verifica z-index en el CSS');
console.log('3. Si faltan secciones: Verifica que no haya errores de HTML');
console.log('4. Si nada funciona: Abre en ventana de incógnito (Ctrl+Shift+N)');
console.log('');
console.log('%c🔗 Más ayuda en: VERIFICACION-IMAGENES.md', 'font-size: 12px; color: #888;');
