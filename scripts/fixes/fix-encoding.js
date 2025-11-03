const fs = require('fs');

// Definir los reemplazos
const replacements = {
  'BÃSICAS': 'BÁSICAS',
  'mediciÃ³n': 'medición',
  'obtÃ©n': 'obtén',
  'UbicaciÃ³n': 'Ubicación',
  'conversiÃ³n': 'conversión',
  'âœ…': '✅',
  'âš ï¸': '⚠️',
  'bÃ¡sico': 'básico',
  'ðŸ'¡': '💡',
  'CUÃNDO': 'CUÁNDO',
  'ðŸ"': '📝',
  'CÃ"MO': 'CÓMO',
  'AutomatizaciÃ³n': 'Automatización',
  'EnergÃ­a': 'Energía',
  'automatizaciÃ³n': 'automatización',
  'transformaciÃ³n': 'transformación',
  'consultorÃ­a': 'consultoría',
  'tecnolÃ³gica': 'tecnológica',
};

try {
  // Leer el archivo
  let content = fs.readFileSync('index.html', 'utf8');
  
  // Aplicar los reemplazos
  for (const [old, newStr] of Object.entries(replacements)) {
    content = content.split(old).join(newStr);
  }
  
  // Guardar el archivo
  fs.writeFileSync('index.html', content, 'utf8');
  
  console.log('✅ Caracteres corregidos exitosamente en index.html');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
