# Créditos de imágenes

Registro de origen y licencia de las fotografías de `public/`. Todas las fotos de stock se usan bajo licencia libre (Unsplash License / Pexels License), que permite el uso comercial sin atribución obligatoria; se documenta aquí el origen por transparencia y para poder sustituirlas.

## Encargo internacional (septiembre de 2026)

Durante este encargo Unsplash y Pexels no eran accesibles desde el entorno de Claude Code (política de red del entorno), así que **no se descargaron fotos nuevas**. Las seis imágenes de las páginas nuevas son **recortes propios** de fotografías con licencia libre que ya estaban en el repositorio desde el rediseño de agosto, generados con `scripts/crop-image.mjs` (Chromium/canvas, JPEG calidad 0,8, todas < 150 KB). Ninguna página nueva repite un recorte.

| Archivo nuevo | Recorte de | Uso | Peso |
|---|---|---|---|
| `public/fotos/expediente-nomada.jpg` (900×1200) | `public/blog/real-consejos.jpg` | Home, sección "¿Vas a pedir el visado de nómada digital?" (ES/EN) | 86 KB |
| `public/fotos/expediente-documentos.jpg` (1200×800) | `public/blog/real-consejos.jpg` | `/traduccion-jurada-visado-nomada-digital` y `/en/sworn-translation-spain-digital-nomad-visa` | 78 KB |
| `public/fotos/certificacion-firma.jpg` (1200×900) | `public/fotos/foto-firma.jpg` | `/traduccion-certificada-uscis` y `/en/certified-translation-uscis` | 85 KB |
| `public/fotos/pasaporte-eeuu.jpg` (1200×900) | `public/blog/post-property.jpg` | `/traduccion-jurada-estados-unidos` y `/en/sworn-translation-usa-spain` | 37 KB |
| `public/fotos/estudiante-portatil.jpg` (1200×900) | `public/academicos.jpg` | `/traduccion-jurada-india` y `/en/sworn-translation-india-spain` | 111 KB |
| `public/fotos/acuerdo-empresa.jpg` (1200×900) | `public/mercantiles.jpg` | `/traduccion-jurada-urgente-grandes-volumenes` y `/en/urgent-sworn-translation-large-projects` | 46 KB |

Origen de los archivos base: fotografías de stock con licencia libre incorporadas al repositorio en encargos anteriores (agosto de 2026 y anteriores). [[COMPLETAR: URL de origen en Unsplash/Pexels de `real-consejos.jpg`, `foto-firma.jpg`, `post-property.jpg`, `academicos.jpg` y `mercantiles.jpg`, si Elena o el autor del rediseño de agosto las conservan]]

## Cómo sustituir una imagen

1. Descarga la foto nueva de Unsplash o Pexels (licencia libre) y anota aquí su URL.
2. Recorta y comprime con `node scripts/crop-image.mjs <entrada> <salida.jpg> <x> <y> <ancho> <alto> <anchoSalida> [calidad]` o con la herramienta que prefieras (< 150 KB).
3. Sustituye el archivo en `public/fotos/` manteniendo el nombre, o cambia la ruta en `content/servicios/*.js` (`image.src`) y en `app/page.js` / `app/en/page.js`.
