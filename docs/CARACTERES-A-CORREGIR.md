# Caracteres Corruptos a Corregir

## 📝 Instrucciones
Usa **Find & Replace** en VS Code (Ctrl+H) para corregir estos caracteres:

## Reemplazos Necesarios en `index.html`

| Buscar | Reemplazar por |
|--------|----------------|
| `BÃSICAS` | `BÁSICAS` |
| `mediciÃ³n` | `medición` |
| `obtÃ©n` | `obtén` |
| `UbicaciÃ³n` | `Ubicación` |
| `conversiÃ³n` | `conversión` |
| `âœ…` | `✅` |
| `âš ï¸` | `⚠️` |
| `bÃ¡sico` | `básico` |
| `ðŸ'¡` | `💡` |
| `CUÃNDO` | `CUÁNDO` |
| `ðŸ"` | `📝` |
| `CÃ"MO` | `CÓMO` |
| `AutomatizaciÃ³n` | `Automatización` |
| `EnergÃ­a` | `Energía` |
| `automatizaciÃ³n` | `automatización` |
| `transformaciÃ³n` | `transformación` |
| `consultorÃ­a` | `consultoría` |
| `tecnolÃ³gica` | `tecnológica` |

## 🔧 Cómo Hacerlo en VS Code

1. Abre `index.html`
2. Presiona **Ctrl+H** (Find & Replace)
3. Copia el texto de la columna "Buscar" y pégalo en el campo Find
4. Copia el texto de la columna "Reemplazar por" y pégalo en el campo Replace  
5. Click en "Replace All" (icono con dos flechas)
6. Repite para cada línea de la tabla

## ✅ Verificación
Después de hacer los reemplazos, busca estos caracteres para confirmar que no quedan:
- `Ã` (combinado con otros caracteres)
- `â` (símbolos corruptos)
- `ð` (emojis corruptos)

## 💡 Nota
Este problema ocurrió porque PowerShell alteró el encoding UTF-8 del archivo al hacer modificaciones anteriores.
