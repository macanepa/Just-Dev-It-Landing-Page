# 📁 Sections - Páginas de las 9 Secciones

Esta carpeta contiene las páginas HTML de producción para cada una de las 9 secciones de Just Dev It.

## 📂 Estructura

```
sections/
├── databam/              # 🟣 Databam - Plataforma de Data Inmobiliaria
│   └── databam.html      # Página de producción
├── tools/                # 🔧 Just Tools - Herramientas de Desarrollo
│   ├── generate-favicon-og.html    # Generador de Favicon y OG Preview
│   └── generate-og-image.html      # Generador de Imágenes Open Graph
├── energy/               # ⚡ Just Energy - (Próximamente)
├── data/                 # 📊 Just Data - (Próximamente)
├── city/                 # 🏙️ Just City Companion - (Próximamente)
├── investing/            # 💰 Just Investing - (Próximamente)
├── finance/              # 💳 Just Finance - (Próximamente)
├── ai/                   # 🤖 Just AI - (Próximamente)
├── logistics/            # 🚚 Just Logistics - (Próximamente)
└── about-us.html         # Página "Nosotros"
```

## 🎯 Estado de Implementación

| Sección | Estado | Archivo |
|---------|--------|---------|
| **Databam** | ✅ Completado | `databam/databam.html` |
| **Just Tools** | ⚙️ Herramientas listas | `tools/*.html` |
| **Just Energy** | 📝 Pendiente | - |
| **Just Data** | 📝 Pendiente | - |
| **Just City** | 📝 Pendiente | - |
| **Just Investing** | 📝 Pendiente | - |
| **Just Finance** | 📝 Pendiente | - |
| **Just AI** | 📝 Pendiente | - |
| **Just Logistics** | 📝 Pendiente | - |
| **About Us** | 📄 Existente | `about-us.html` |

## 📚 Documentación

La documentación de cada sección se encuentra en: `docs/sections/`

- **Mockups**: `docs/sections/mockups/` - Prototipos visuales
- **Especificaciones**: `docs/sections/XX-NOMBRE.md` - Documentación técnica

## 🚀 Navegación

Todas las secciones estarán conectadas a través del **Command Palette** (launcher) que se implementará al final del proyecto.

## 🎨 Theming

Cada sección tiene su propio tema definido en: `css/core/themes.css`

Ejemplo de uso:
```html
<html data-theme="databam">
```

Temas disponibles:
- `databam` - Morado (#6B2CF5)
- `tools` - Cyan (#00D9FF)
- `energy` - Verde (#00FF87)
- `data` - Azul (#4169E1)
- `city` - Naranja (#FF6B35)
- `investing` - Dorado (#FFD700)
- `finance` - Verde esmeralda (#50C878)
- `ai` - Magenta (#FF00FF)
- `logistics` - Rojo (#FF4444)
