# Créditos de imágenes

Registro de origen y licencia de las fotografías de `public/`. Las fotos de stock se usan bajo licencia libre (Unsplash License / Pexels License), que permite el uso comercial sin atribución obligatoria; se documenta aquí el origen por transparencia y para poder sustituirlas.

## Encargo internacional (septiembre de 2026)

Durante este encargo Unsplash y Pexels no eran accesibles desde el entorno de Claude Code (política de red del entorno), así que **no se descargaron fotos nuevas**. Las doce imágenes nuevas son **recortes propios** de fotografías con licencia libre que ya estaban en el repositorio desde encargos anteriores, generados con `scripts/crop-image.mjs` (Chromium/canvas, JPEG, todas < 150 KB). Ninguna página ni post nuevo repite un recorte. Se evitaron banderas y monumentos en las páginas de Estados Unidos e India, como pedía el brief.

### Páginas de servicio (FASE 1 y 2)

| Archivo nuevo | Recorte de | Uso | Peso |
|---|---|---|---|
| `public/fotos/expediente-nomada.jpg` (900×1200) | `public/blog/real-consejos.jpg` | Home, sección "¿Vas a pedir el visado de nómada digital?" (ES/EN) | 86 KB |
| `public/fotos/expediente-documentos.jpg` (1200×800) | `public/blog/real-consejos.jpg` | `/traduccion-jurada-visado-nomada-digital` y `/en/sworn-translation-spain-digital-nomad-visa` | 78 KB |
| `public/fotos/certificacion-firma.jpg` (1200×900) | `public/fotos/foto-firma.jpg` | `/traduccion-certificada-uscis` y `/en/certified-translation-uscis` | 85 KB |
| `public/fotos/pasaporte-eeuu.jpg` (1200×900) | `public/blog/post-property.jpg` | `/traduccion-jurada-estados-unidos` y `/en/sworn-translation-usa-spain` | 37 KB |
| `public/fotos/estudiante-portatil.jpg` (1200×900) | `public/academicos.jpg` | `/traduccion-jurada-india` y `/en/sworn-translation-india-spain` | 111 KB |
| `public/fotos/acuerdo-empresa.jpg` (1200×900) | `public/mercantiles.jpg` | `/traduccion-jurada-urgente-grandes-volumenes` y `/en/urgent-sworn-translation-large-projects` | 46 KB |

### Blog (FASE 3)

| Archivo nuevo | Recorte de | Post | Peso |
|---|---|---|---|
| `public/blog/post-nomada-digital.jpg` | `public/fotos/foto-documentos.jpg` | `/blog/documentos-visado-nomada-digital-apostilla-traduccion-jurada` | 71 KB |
| `public/blog/post-digital-nomad-visa.jpg` | `public/blog/real-consejos.jpg` | `/en/blog/spain-digital-nomad-visa-documents-apostille-sworn-translation` | 78 KB |
| `public/blog/post-uscis-jurada-certificada.jpg` | `public/fotos/foto-firma.jpg` | `/blog/traduccion-jurada-o-certificada-uscis-espana` | 46 KB |
| `public/blog/post-sworn-vs-certified.jpg` | `public/docs-real.jpg` | `/en/blog/sworn-vs-certified-translation-uscis-spain` | 88 KB |
| `public/blog/post-india-mea.jpg` | `public/academicos.jpg` | `/blog/documentos-indios-visado-espana-apostilla-mea` | 79 KB |
| `public/blog/post-indian-documents.jpg` | `public/blog/real-apostilla.jpg` | `/en/blog/indian-documents-spanish-visa-mea-apostille-sworn-translation` | 131 KB |

Origen de los archivos base: fotografías de stock con licencia libre incorporadas al repositorio en encargos anteriores (agosto de 2026 y anteriores). [[COMPLETAR: URL de origen en Unsplash/Pexels de `real-consejos.jpg`, `foto-firma.jpg`, `foto-documentos.jpg`, `post-property.jpg`, `academicos.jpg`, `mercantiles.jpg`, `docs-real.jpg` y `real-apostilla.jpg`, si Elena o el autor del rediseño de agosto las conservan]]

## Cómo sustituir una imagen

1. Descarga la foto nueva de Unsplash o Pexels (licencia libre) y anota aquí su URL.
2. Recorta y comprime con `node scripts/crop-image.mjs <entrada> <salida.jpg> <x> <y> <ancho> <alto> <anchoSalida> [calidad]` o con la herramienta que prefieras (< 150 KB).
3. Sustituye el archivo en `public/fotos/` o `public/blog/` manteniendo el nombre, o cambia la ruta en `content/servicios/*.js` (`image.src`), `content/posts*.js` (`image`) y `app/(es)/page.js` / `app/en/page.js`.
