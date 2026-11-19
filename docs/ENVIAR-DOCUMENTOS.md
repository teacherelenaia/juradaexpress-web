# «Enviar documentos»: diagnóstico, funcionamiento y conexión con Google Drive

19/11/2026. Páginas `/enviar-documentos` y `/en/send-documents`.

## 1. Qué fallaba antes

Comprobado en el código de `main` y reproducido en local con Chrome:

| Caso | Qué pasaba |
|---|---|
| **Diez fotos de móvil** en la calculadora | Solo entraban **5**; el resto se descartaba con «Como máximo 5 archivos». El servidor (`/api/quote`) también cortaba la lista en 5. |
| **Formulario del catálogo** (`/documentos`) | El archivo **nunca se enviaba**: solo se mostraba en pantalla («De momento este archivo no se envía…») y a Elena le llegaba «pendiente de recibir». Además solo dejaba elegir **un** archivo. |
| **PDF de 8 MB** en la calculadora | Va directo a Vercel Blob, así que el límite de 4,5 MB de Vercel no le afecta… mientras Blob funcione. Si Blob falla, todo lo que pasa de 3,5 MB se manda a WhatsApp. |
| **HEIC de iPhone** en Chrome/Android | El navegador no puede comprimirlo y se sube el original: funciona, pero llega sin convertir. |
| **Varios archivos grandes** | `/api/quote` descarga todos los archivos de Blob, los convierte a base64 y los manda por correo dentro de una función de 60 s. Si se agota el tiempo, el navegador reintenta; el reintento se toma por «envío doble», **responde «recibido» y borra los archivos de Blob**. Resultado: el cliente ve «¡Recibido!» y a Elena no le llega nada. *No reproducido en producción (sin acceso desde aquí); deducido del código.* |
| **Por qué Vercel no registraba errores** | Ninguna de esas rutas escribía nada en los logs: el envío de correo devolvía `false` en silencio y los fallos del navegador no llegan al servidor. |

## 2. Cómo llegan ahora los documentos

1. El cliente pulsa **«Enviar documentos»** (cabecera de toda la web, menú del
   móvil, páginas de expedientes y visados, guías de visado y página de
   gracias tras el pago).
2. Rellena nombre, correo **o** WhatsApp, trámite (opcional) y comentario, y
   elige o arrastra todos sus archivos (en el móvil, también «Hacer una foto»).
3. Cada archivo sube **directo del navegador a Google Drive** (sesión de
   subida reanudable abierta por el servidor), en trozos de 2 MB, con barra de
   progreso por archivo. Si se corta, reintenta hasta 8 veces por trozo,
   espera a que vuelva la conexión y **sigue desde donde iba**. Si un archivo
   falla, los demás continúan.
4. Si ese navegador no consigue hablar con Google, el archivo va a Vercel
   Blob (privado) y el servidor lo copia a Drive y **borra la copia** al momento.
5. Al terminar, el servidor **comprueba en Drive** cada archivo (que existe,
   que está en la carpeta y que pesa lo mismo) y solo entonces lo da por recibido.
6. En Drive: `Documentos de clientes / AAAA-MM-DD Nombre – JX-XXXXXX /`, con
   los archivos con su nombre original y `Datos del envío.txt`. Si el mismo
   cliente (mismo correo o teléfono) vuelve a enviar con la misma referencia,
   se añade a su carpeta.
7. Correo a info@juradaexpress.es:
   `Documentos recibidos · [expediente · ]Nombre · N archivos · JX-XXXXXX`
   («expediente» desde 3 archivos) con el enlace a la carpeta, la lista con
   tamaño y páginas (PDF), contacto, trámite, comentario y origen (Google Ads
   con campaña y palabra clave, ChatGPT o web, misma regla que los avisos
   actuales).
8. Si algo no llega: el cliente ve qué archivo, por qué y dos botones
   (WhatsApp y correo con la referencia escrita), y Elena recibe
   `Subida fallida · Nombre · contacto` con el motivo.
9. Confirmación al cliente en pantalla y por correo (si lo dejó): qué ha
   llegado y que recibirá el presupuesto en menos de 2 horas entre las 9:00
   y las 23:00 (hora de Madrid), fines de semana incluidos.
10. Si recarga la página, se recupera lo escrito y lo ya subido; un archivo a
    medias continúa al volver a elegirlo.

La **calculadora** y el **formulario del catálogo** usan el mismo motor de
subida. La calculadora mantiene su aviso de siempre (`Presupuesto web · …`),
ahora con el enlace a la carpeta de Drive. Mientras Drive no esté conectado,
todo sigue funcionando como antes (Blob + archivos adjuntos al correo), pero
con 40 archivos en vez de 5.

## 3. Límites (a confirmar con Elena)

- 50 MB por archivo y 40 archivos por envío (con Drive).
- Sin Drive conectado: 25 MB por archivo y 100 MB por envío (límite del correo).
- Formatos: PDF, JPG, PNG, HEIC, DOCX y ZIP.
- Se cambian en `app/lib/docSubmission.js` (`LIMITS`).

## 4. Pasos para Elena: conectar Google Drive (15 minutos)

Lo hace Elena con su cuenta de Google. Claude Code no ve ni guarda ninguna clave.

**Permiso que se da:** `drive.file`. La web solo puede ver y escribir las
carpetas y archivos que **ella misma crea** (la carpeta «Documentos de
clientes» y lo de dentro). No puede leer nada más del Drive. No se usa
«cuenta de servicio» porque Google no deja que una cuenta de servicio guarde
archivos en un Drive personal.

1. **Proyecto y API.** Entra en <https://console.cloud.google.com/> con la
   cuenta de Google donde quieras los documentos. Crea un proyecto
   («juradaexpress-web»). En «APIs y servicios → Biblioteca», busca
   **Google Drive API** y pulsa «Habilitar».
2. **Pantalla de consentimiento.** «APIs y servicios → Pantalla de
   consentimiento de OAuth» (o «Google Auth Platform»): tipo **Externo**,
   nombre «Jurada Express web», tu correo. En «Permisos/Scopes» añade
   `.../auth/drive.file`. Después, en «Público», pulsa **Publicar la app**
   («En producción»). *Importante:* si se queda en «Prueba», Google caduca la
   autorización a los 7 días y la subida dejaría de funcionar. Con
   `drive.file` no hace falta verificación de Google.
3. **Credenciales.** «Credenciales → Crear credenciales → ID de cliente de
   OAuth», tipo **Aplicación web**. En «URI de redirección autorizados» añade
   `https://developers.google.com/oauthplayground`. Guarda el **ID de
   cliente** y el **secreto**.
4. **Autorizar (sacar el refresh token).** Abre
   <https://developers.google.com/oauthplayground>. Rueda dentada (arriba a
   la derecha) → marca «Use your own OAuth credentials» y pega el ID y el
   secreto. A la izquierda, en «Input your own scopes», escribe
   `https://www.googleapis.com/auth/drive.file` → «Authorize APIs» → entra
   con tu cuenta y acepta (si sale «Google no ha verificado esta app»:
   «Configuración avanzada → Ir a…»). Pulsa «Exchange authorization code for
   tokens» y copia el **Refresh token**.
5. **Vercel.** Proyecto `juradaexpress-web` → Settings → Environment
   Variables. Añade, marcadas como *Sensitive*, en **Production y Preview**:
   - `GOOGLE_CLIENT_ID` = el ID de cliente
   - `GOOGLE_CLIENT_SECRET` = el secreto
   - `GOOGLE_REFRESH_TOKEN` = el refresh token
   - (opcional) `DOCS_SIGNING_SECRET` = una cadena larga aleatoria
   Después, «Redeploy» del último despliegue.
6. **Carpeta madre.** No hay que crearla ni compartirla: en el primer envío
   la web crea **«Documentos de clientes»** en la raíz de tu Mi unidad. Puedes
   moverla donde quieras dentro de tu Drive (la web la sigue encontrando).
7. **Probar en preview.** Abre la URL de preview del PR →
   `/enviar-documentos` y sube archivos de prueba. En preview todo va a la
   carpeta `… – JX-TEST` y no se manda ningún aviso (el correo solo está
   configurado en producción). Bórrala cuando termines.

Si algún día cambias la contraseña de Google o revocas el acceso, repite el
paso 4 y actualiza `GOOGLE_REFRESH_TOKEN`.

## 5. Datos personales

- Casilla de aceptación con enlace a la política de privacidad (ES/EN), que
  ahora nombra Google Drive como lugar de almacenamiento, Vercel como
  almacenamiento temporal y Resend como envío de correos.
- Ningún dato personal en las URL: la referencia y la carpeta viajan en un
  token firmado dentro de la petición, nunca en la dirección.
- Carpetas privadas: la web no crea ningún permiso («cualquiera con el
  enlace» no existe en el código). La confirmación al cliente no incluye el
  enlace a la carpeta.
- Copia intermedia (Vercel Blob) borrada en cuanto el archivo está en Drive o
  en el correo.
- **Conservación propuesta** (escrita en la política, a confirmar): carpetas
  de envíos que no acaban en encargo, se borran a los **3 meses**; con
  encargo, se conservan **1 año** desde la entrega. El borrado lo hace Elena
  a mano por ahora (una vez al mes: ordenar «Documentos de clientes» por
  fecha, que va al principio del nombre).

## 6. Pruebas

`tests/enviar-documentos.spec.mjs` (textos de los avisos, siempre) y, con
`DOCS_E2E=1`, de punta a punta contra un Drive simulado
(`tests/mock-drive.mjs`): PDF de 8 MB + diez fotos de 3,4 MB + HEIC, cortes de
red y errores 503 a mitad de subida, mensajes de error, recuperación tras
recargar y la calculadora. Instrucciones en la cabecera del archivo.
