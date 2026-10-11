# Medición de Google Ads en juradaexpress.es

Cómo se mide en la web lo que viene de las campañas de Google Ads (activas desde el 09/10/2026) y qué tiene que hacer Elena con cada dato. La base técnica (atribución, modo de consentimiento v2 y conversiones con valor) entró con el PR #37 el 08/10/2026; la referencia de origen en los WhatsApp, con el PR de `feat/whatsapp-origen` el 09/10/2026.

## Qué guarda la web de cada visita

- `app/lib/attribution.js` lee en cada carga de página `gclid`, `gbraid`, `wbraid` y los `utm_*` de la URL, además de la página de entrada (`landing`), el referrer y la fecha (`ts`).
- Se guarda en `sessionStorage` (clave `jx_attr`) mientras dure la pestaña y, solo si el visitante acepta las cookies, en `localStorage` durante 90 días.
- La calculadora de precio manda esa atribución con la solicitud y `/api/quote` la pone en el email a Elena en la línea «Atribución: gclid=… · landing=… · utm=…».

## Origen de los WhatsApp

La mayoría de los clientes escriben por WhatsApp sin pasar por el formulario. Para saber si ese WhatsApp viene de un anuncio, desde el 09/10/2026 la web hace tres cosas cuando alguien pulsa un enlace de WhatsApp **y la visita trae parámetros de campaña** (gclid, gbraid, wbraid o utm_source). Si no los trae, no cambia nada.

### 1. La línea que verá Elena en el mensaje

El texto prellenado del WhatsApp lleva una última línea con una referencia corta:

```
(Ref. anuncio: JX-ABC123)
```

En la versión inglesa de la web: `(Ad ref.: JX-ABC123)`. La referencia son las letras `JX-` más 6 caracteres (letras mayúsculas y números) y es la misma para todos los clics de una misma visita. Vale para cualquier enlace de WhatsApp de la web: botón flotante, barra de acciones del móvil, cabecera, pie, landings y el resumen que genera la calculadora de precio.

Si el cliente borra la línea antes de enviar el mensaje, el email del punto 2 sigue avisando del clic.

### 2. El email que recibe Elena

Con cada referencia nueva llega un email a `QUOTE_TO_EMAIL` (por defecto info@juradaexpress.es) con el asunto `WhatsApp desde anuncio · JX-ABC123` y este contenido:

```
Alguien ha pulsado el botón de WhatsApp de la web viniendo de un anuncio.

Referencia: JX-ABC123 (la verás al final de su mensaje de WhatsApp)
Campaña: visados
Página: /en/sworn-translations-spanish-visas?gclid=…
Fecha: 09/10/2026 18:42 (hora de Madrid)

Datos para Google Ads (importación de conversiones offline):
gclid=… · gbraid= · wbraid= · landing=/en/sworn-translations-spanish-visas?gclid=… · primer toque=2026-10-09T16:40:12.345Z
```

«Campaña» es el `utm_campaign` de la URL del anuncio; si solo viene gclid, pone «Google Ads». No lleva nombre, teléfono ni email del visitante: solo la atribución.

Puede llegar un email sin que después llegue ningún WhatsApp (el cliente abrió WhatsApp y no escribió). Es normal: el email avisa del clic, no del mensaje.

### 3. Dónde quedan los JSON (Vercel Blob)

Cada clic se guarda como un archivo JSON en el almacén privado de Vercel Blob del proyecto (el mismo de la calculadora, token `BLOB_READ_WRITE_TOKEN`), en la ruta:

```
wa-clicks/AAAA/MM/JX-ABC123.json
```

Contiene la referencia, el idioma, la página y la atribución completa (gclid, utm, landing, referrer, fecha del primer y del último toque) más `receivedAt`. Se ven desde Vercel → Storage → el almacén Blob → carpeta `wa-clicks`. Si el archivo de una referencia ya existe, el servidor no lo vuelve a escribir ni manda otro email, así que un cliente que pulse varias veces solo genera un aviso.

Sin `BLOB_READ_WRITE_TOKEN` el email se manda igualmente pero no hay control de duplicados.

### 4. Cómo importar una venta a Google Ads con el gclid del email

Cuando un WhatsApp con referencia termina en venta:

1. Busca en el correo el email `WhatsApp desde anuncio · JX-ABC123` y copia el `gclid` de la última línea.
2. Prepara una hoja con la plantilla de Google (Objetivos → Conversiones → Importaciones → «Conversiones de clics» → descargar plantilla) y rellena una fila por venta:
   - **Google Click ID**: el gclid del email.
   - **Conversion Name**: `Compra en la web (Stripe)` o el nombre exacto de la acción de conversión offline que se cree para estas ventas (debe existir en Google Ads antes de importar).
   - **Conversion Time**: fecha y hora del cobro, con zona horaria, por ejemplo `2026-10-12 11:30:00 Europe/Madrid`. Tiene que ser posterior a la fecha del clic.
   - **Conversion Value**: importe cobrado, sin símbolo (por ejemplo `89`).
   - **Conversion Currency**: `EUR`.
3. En Google Ads: Objetivos → Conversiones → Importaciones → «Subir archivo», elige la hoja y pulsa «Vista previa» y después «Aplicar».

El gclid caduca a los 90 días del clic: conviene importar las ventas cada semana. Si el email trae `gbraid` o `wbraid` en lugar de `gclid` (clics desde iOS), Google Ads solo acepta importarlos con las conversiones mejoradas para clientes potenciales, no por la plantilla de Google Click ID.

### Dónde está el código

- `app/lib/waOrigin.js`: genera la referencia, reescribe el enlace y manda el aviso al servidor.
- `app/components/AdsConversion.js`: el listener de clic ya existente llama a ese módulo antes de registrar la conversión.
- `app/components/QuoteCalculator.js`: `buildWhatsApp` añade la línea al resumen de la calculadora.
- `app/api/wa-click/route.js`: valida el aviso, guarda el JSON en Blob y manda el email (Resend, `app/lib/resend.js`).
- `tests/whatsapp-origen.spec.mjs`: prueba de Playwright (`npm test`).

## Comportamiento sin cookies (Vercel)

Desde el 11/10/2026 la web manda a Vercel Analytics qué hace cada visita en la página: hasta dónde baja, cuánto tiempo está, qué secciones llega a ver y en qué pulsa. Vercel Analytics no usa cookies ni identificadores de usuario, así que no necesita consentimiento y cuenta a todas las visitas (GA4 solo ve a quien acepta las cookies: en los primeros días de campaña vio 2 de los 13 clics). Hasta ahora Vercel solo registraba páginas vistas.

### Antes de nada: el plan de Vercel

**Los eventos personalizados de Vercel Analytics solo se recogen en los planes Pro y Enterprise.** El equipo de Vercel de la web (`elena-penarandas-projects`) está en el plan Hobby: el 11/10/2026 la API de eventos respondió «Accessing Analytics custom events requires an Enterprise or Pro plan». Con Hobby, la web envía los eventos pero Vercel los descarta y la pestaña Events no muestra nada; las páginas vistas siguen contándose como hasta ahora (50.000 eventos al mes incluidos, un mes de histórico).

Para que esto funcione hay que pasar el equipo a Pro (20 $ al mes por miembro, con 14 días de prueba). Con Pro: eventos personalizados, 12 meses de histórico y **2 propiedades como máximo por evento**; el complemento Web Analytics Plus (10 $ al mes más) sube a 8 propiedades y a 24 meses. Los eventos se cobran por volumen (0,03 $ por cada 1.000 por encima del crédito mensual incluido): con el tráfico actual, unos 5 a 10 eventos por visita son calderilla.

Hasta que se cambie el plan, el código no estorba ni cuesta nada: la medición de Google (Ads, consent mode, GA4) y las páginas vistas de Vercel siguen igual.

### Qué se envía

Cada evento lleva una propiedad común, `lang` (`es` o `en`), más la suya. La página se registra sola (Vercel guarda la ruta de cada evento, y aquí se le manda sin parámetros), así que no hace falta como propiedad y se respeta el límite de 2 del plan Pro.

| Evento | Propiedad | Cuándo |
| --- | --- | --- |
| `scroll_depth` | `depth`: 25, 50, 75 o 100 | Al bajar hasta ese % del documento. Una vez por valor y carga de página. |
| `time_on_page` | `seconds`: 10, 30, 60 o 120 | Segundos con la pestaña visible (el contador se para si la pestaña está en segundo plano). Una vez por valor. |
| `section_view` | `section` | Cuando al menos la mitad de una sección marcada entra en pantalla (o, si la sección es más alta que la ventana, cuando ocupa al menos media ventana). Una vez por sección y carga. |
| `cta_click` | `cta`: `whatsapp`, `presupuesto`, `llamar`, `email`, `calculadora_enviar` o `pack` (este último con `pack`: id del pack, y sin `lang`) | Pulsación en un enlace de WhatsApp, al catálogo (`/documentos`, `/en/documentos`), a `tel:` o `mailto:`, envío del formulario de la calculadora (se envíe o no) o botón «pedir este pack». |
| `outbound_click` | `host` | Pulsación en un enlace a otro dominio (MAEC, DGT, consulados, Maps…). Solo el host, nunca la URL completa. |

Secciones marcadas (`data-track-section`), solo donde existen en cada plantilla: `precios` (tabla de precios en /precios y /en/precios, sección de precios de la landing del traductor de inglés y de la landing de despachos), `calculadora` (calculadora de precio, en la home y en las landings que la llevan), `pasos` (cómo lo hacemos / cómo funciona), `faq`, y en las guías `tabla`, `oferta` (bloque final) y `fuentes`.

No se envía nunca gclid, gbraid, wbraid, `utm_*`, la referencia `JX-…` de los WhatsApp, email, teléfono ni nada escrito por el visitante. La URL que el script de Vercel adjunta a cada evento propio se recorta a la ruta (sin parámetros); las páginas vistas se dejan como estaban, porque Vercel usa los `utm_*` de esa URL para sus propios filtros de campaña. Los eventos solo se envían en producción (en `next dev` no sale nada) y nunca en las rutas `/api/*`. Nada de esto toca Google Ads, el modo de consentimiento ni GA4.

### Dónde verlo

Vercel → el proyecto → **Analytics** → pestaña **Events**. Cada evento se puede desplegar para ver sus propiedades y filtrar por página, por referrer (`google.com` para las visitas que vienen de Ads) y por país o dispositivo. Los eventos tardan unos minutos en aparecer y se conservan según el plan (12 meses en Pro).

Dos lecturas tipo, con el filtro de referrer en `google.com`:

1. **¿Llegan a ver los precios?** Visitas a `/en/sworn-english-translator`: páginas vistas en la pestaña Pages frente a `section_view` con `section = precios` en la misma página. Si de 10 visitas solo 2 llegan a los precios, el problema está arriba (texto, tiempo de carga, lo que promete el anuncio); si llegan y no escriben, está en los precios o en el botón.
2. **¿Cuántas escriben?** `cta_click` con `cta = whatsapp` (y `presupuesto`, `llamar`) en esa misma página frente a las páginas vistas. Con `scroll_depth` y `time_on_page` se ve si las visitas que no pulsan se van en los primeros segundos (rebote del anuncio) o leen hasta el final y aun así no escriben.

### Dónde está el código

- `app/lib/engagement.js`: envío con `track` de `@vercel/analytics` (añade `lang`), clasificación de los enlaces y el `beforeSend` que recorta la URL.
- `app/components/EngagementEvents.js`: scroll, tiempo, secciones y clics; montado una vez en `SiteShell`.
- `app/components/VercelAnalytics.js`: el `<Analytics>` de Vercel con ese `beforeSend` (lo usan los dos root layouts).
- `app/components/QuoteCalculator.js`: `cta_click: calculadora_enviar` al enviar el formulario; `PacksSection.js`: botón de pack con `data-track-cta="pack"`.
- `tests/eventos-vercel.spec.mjs`: prueba de Playwright contra el build de producción (proyecto `produccion` de `npm test`, puerto 3312; con `PLAYWRIGHT_PROD_URL` reutiliza un `npm start` ya levantado).

## Variables de entorno

Las de Google Ads (`NEXT_PUBLIC_ADS_ID`, `NEXT_PUBLIC_ADS_CONV_*`), Resend (`RESEND_API_KEY`, `QUOTE_FROM_EMAIL`, `QUOTE_TO_EMAIL`) y Blob (`BLOB_READ_WRITE_TOKEN`) están documentadas en `.env.local.example`. El origen de los WhatsApp no necesita ninguna variable nueva. IndexNow (sección siguiente) usa `INDEXNOW_KEY`.

## IndexNow

Desde el 10/10/2026 la web avisa a Bing y a Yandex de las URL nuevas o cambiadas con el protocolo IndexNow. Importa porque ChatGPT busca en el índice de Bing: sin aviso, una página nueva tarda semanas en aparecer; con aviso, Bing la lee en horas o días.

### Qué hay que configurar una sola vez

La clave es una cadena de 32 caracteres hexadecimales (se genera con `node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"`) y tiene que ser la misma en tres sitios:

1. **Vercel** → el proyecto → Settings → Environment Variables: `INDEXNOW_KEY` en Production (y en Preview si se quiere probar ahí). Después, un nuevo deploy: con la variable en el build, la web sirve `https://juradaexpress.es/<clave>.txt` con la clave en texto plano, que es como Bing comprueba que la clave es nuestra.
2. **GitHub** → el repositorio → Settings → Secrets and variables → Actions → New repository secret: `INDEXNOW_KEY`, mismo valor.
3. **`.env.local`** del ordenador desde el que se lance `npm run indexnow` a mano.

### Qué pasa en cada deploy

La acción `.github/workflows/indexnow.yml` se ejecuta en cada push a `main`: espera tres minutos a que Vercel haya publicado la versión nueva y llama a `POST https://juradaexpress.es/api/indexnow` con la cabecera `Authorization: Bearer <clave>`. La ruta lee el sitemap de producción y lo manda entero a `https://api.indexnow.org/indexnow` (Bing lo reparte a los demás buscadores del protocolo). Sin cabecera o con otra clave, la ruta responde 401; sin `INDEXNOW_KEY` en Vercel, 503. El resultado se ve en la pestaña Actions del repositorio; también se puede lanzar a mano desde ahí («Run workflow»).

### Cómo lanzarlo a mano

Todo el sitemap:

```
npm run indexnow
```

Solo unas URL (rutas o URL completas, las que haga falta):

```
npm run indexnow -- https://juradaexpress.es/en/fbi-background-check-translation-spain
npm run indexnow -- /traduccion-jurada-antecedentes-fbi /en/sworn-translations-spanish-visas
```

Con `--dry-run` muestra la lista sin enviar nada. Respuestas de IndexNow: 200 o 202, enviado; 403, la clave no coincide con el archivo `<clave>.txt` (revisar Vercel); 422, alguna URL no es de juradaexpress.es; 429, demasiados envíos seguidos.

### Dónde está el código

- `app/lib/indexnow.mjs`: lectura del sitemap, validación de las URL y envío (compartido por la ruta y el script).
- `app/api/indexnow/route.js`: `POST /api/indexnow` protegida con la clave.
- `app/indexnow-key/route.js` y la reescritura de `next.config.mjs`: sirven `/<clave>.txt`.
- `scripts/indexnow.mjs`: envío a mano (`npm run indexnow`).
- `.github/workflows/indexnow.yml`: llamada automática tras cada push a `main`.
