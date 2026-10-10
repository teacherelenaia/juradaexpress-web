/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    // AVIF primero, WebP como respaldo. next/image negocia por Accept.
    formats: ["image/avif", "image/webp"],
  },
  // IndexNow (10/10/2026): el protocolo exige un archivo /<clave>.txt en la
  // raíz del host. Con INDEXNOW_KEY definida en el build (Vercel), esa URL
  // se reescribe a app/indexnow-key/route.js, que responde la clave en
  // texto plano. Sin la variable no se añade nada y nada se rompe.
  async rewrites() {
    const key = process.env.INDEXNOW_KEY;
    if (!key || !/^[A-Za-z0-9-]{8,128}$/.test(key)) return [];
    return [{ source: `/${key}.txt`, destination: "/indexnow-key" }];
  },
};

export default nextConfig;
