# Créditos de imágenes

Registro de origen y licencia de las fotografías de `public/`. Las fotos de stock se usan bajo licencia libre (Unsplash License / Pexels License), que permite el uso comercial sin atribución obligatoria; se documenta aquí el origen por transparencia y para poder sustituirlas.

## Encargo internacional (septiembre de 2026)

Durante este encargo Unsplash y Pexels no eran accesibles desde el entorno de Claude Code (política de red del entorno), así que **no se descargaron fotos nuevas**. Las imágenes nuevas (doce en las fases 1-3 y nueve más en la FASE 2B) son **recortes propios** de fotografías con licencia libre que ya estaban en el repositorio desde encargos anteriores, generados con `scripts/crop-image.mjs` (Chromium/canvas, JPEG, todas < 150 KB). Ninguna página ni post nuevo repite un recorte. Se evitaron banderas y monumentos en las páginas de Estados Unidos e India, como pedía el brief.

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

### Hub por países, Irlanda, Canadá, Australia y sustitución de banderas (FASE 2B)

El brief pedía sustituir la foto de la bandera británica de la home por una imagen de documentos/escritorio y comprobar que ninguna otra página usara banderas como imagen principal. Se eliminó `public/fotos/foto-bandera-uk.jpg` (ya no lo usa ninguna página) y se sustituyeron las dos imágenes de bandera del blog. Las páginas de británicos (`/traduccion-jurada-britanicos-espana` y su versión EN) no tienen imagen. Las nueve imágenes siguientes son también recortes propios de fotos con licencia libre del repositorio (`scripts/crop-image.mjs`, JPEG < 150 KB).

| Archivo nuevo | Recorte de | Uso | Peso |
|---|---|---|---|
| `public/fotos/escritorio-documentos.jpg` (1200×900) | `public/docs-real.jpg` | Home ES/EN, sección para británicos (sustituye a `foto-bandera-uk.jpg`) | 113 KB |
| `public/fotos/paises-documentos.jpg` (1200×675) | `public/fotos/foto-documentos.jpg` | `/traduccion-jurada-por-paises` y `/en/sworn-translation-spain-by-country` | 73 KB |
| `public/fotos/irlanda-despacho.jpg` (1200×900) | `public/fotos/proceso-despacho.jpg` | `/traduccion-jurada-irlanda` y `/en/sworn-translation-ireland-spain` | 60 KB |
| `public/fotos/canada-firma.jpg` (1200×900) | `public/fotos/foto-firma.jpg` | `/traduccion-jurada-canada` y `/en/sworn-translation-canada-spain` | 57 KB |
| `public/fotos/australia-viaje.jpg` (1200×900) | `public/blog/post-escanear.jpg` | `/traduccion-jurada-australia` y `/en/sworn-translation-australia-spain` | 84 KB |
| `public/blog/post-conducir.jpg` (sustituido) | `public/fotos/foto-documentos.jpg` | `/blog/traduccion-jurada-permiso-conducir` (antes: bandera) | 71 KB |
| `public/blog/post-visado-uk.jpg` (sustituido) | `public/blog/real-consejos.jpg` | `/blog/traduccion-jurada-visado-reino-unido` (antes: bandera) | 72 KB |
| `public/blog/post-irse-de-espana.jpg` | `public/blog/real-apostilla.jpg` | `/blog/traduccion-jurada-para-irse-de-espana-reino-unido-irlanda-canada-australia` | 134 KB |
| `public/blog/post-leaving-spain.jpg` | `public/docs-real.jpg` | `/en/blog/sworn-translations-leaving-spain-uk-ireland-canada-australia` | 82 KB |

Origen de los archivos base: fotografías de stock con licencia libre incorporadas al repositorio en encargos anteriores (agosto de 2026 y anteriores). [[COMPLETAR: URL de origen en Unsplash/Pexels de `real-consejos.jpg`, `foto-firma.jpg`, `foto-documentos.jpg`, `post-property.jpg`, `academicos.jpg`, `mercantiles.jpg`, `docs-real.jpg`, `real-apostilla.jpg`, `proceso-despacho.jpg` y `post-escanear.jpg`, si Elena o el autor del rediseño de agosto las conservan]]

## Cómo sustituir una imagen

1. Descarga la foto nueva de Unsplash o Pexels (licencia libre) y anota aquí su URL.
2. Recorta y comprime con `node scripts/crop-image.mjs <entrada> <salida.jpg> <x> <y> <ancho> <alto> <anchoSalida> [calidad]` o con la herramienta que prefieras (< 150 KB).
3. Sustituye el archivo en `public/fotos/` o `public/blog/` manteniendo el nombre, o cambia la ruta en `content/servicios/*.js` (`image.src`), `content/posts*.js` (`image`) y `app/(es)/page.js` / `app/en/page.js`.
