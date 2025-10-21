export default function Page() {
  return (
    <main>
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#" className="font-semibold text-xl tracking-tight">JuradaExpress</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#servicios" className="hover:opacity-80">Servicios</a>
            <a href="#precios" className="hover:opacity-80">Precios</a>
            <a href="#proceso" className="hover:opacity-80">Cómo funciona</a>
            <a href="#opiniones" className="hover:opacity-80">Opiniones</a>
            <a href="#faq" className="hover:opacity-80">FAQ</a>
            <a href="#contacto" className="hover:opacity-80">Contacto</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="tel:34685891214" className="hidden sm:block">
              <button className="rounded-2xl border px-3 py-2">Llámanos</button>
            </a>
            <a
              href="https://wa.me/34685891214?text=Hola%2C%20necesito%20una%20traducci%C3%B3n%20jurada.%20%C2%BFMe%20das%20presupuesto%3F"
              target="_blank"
            >
              <button className="rounded-2xl px-3 py-2 bg-blue-600 text-white">WhatsApp</button>
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block mb-4 text-sm rounded px-2 py-1 bg-slate-100 border">
              Español ⇆ Inglés · Murcia y online
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Traducciones <span className="text-blue-600">juradas</span> rápidas y oficiales
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Español ⇆ Inglés con entrega digital firmada y/o en papel. Envíos a toda España y extranjero.
              Presupuesto en menos de 1 hora laboral.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-1 rounded px-2 py-1 bg-slate-100 border">24–48 h*</span>
              <span className="inline-flex items-center gap-1 rounded px-2 py-1 bg-slate-100 border">RGPD</span>
              <span className="inline-flex items-center gap-1 rounded px-2 py-1 bg-slate-100 border">Factura</span>
            </div>
            <div className="mt-8 flex gap-3">
              <a href="#contacto">
                <button className="rounded-2xl h-11 px-6 bg-blue-600 text-white">Pide presupuesto</button>
              </a>
              <a href="#servicios">
                <button className="rounded-2xl h-11 px-6 border">Ver servicios</button>
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              * Entrega habitual 24–48 h. Proyectos de más de 20 folios: solicita plazo.
            </p>
          </div>

          <div className="shadow-xl border border-slate-200 rounded-2xl">
            <div className="p-5 border-b"><h3 className="font-semibold">Documentos más habituales</h3></div>
            <div className="p-5">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 text-sm">
                <li>• Certificados (nacimiento, matrimonio, penales)</li>
                <li>• Títulos y expedientes académicos</li>
                <li>• DNI, pasaporte, carnet de conducir</li>
                <li>• Contratos, poderes, escrituras</li>
                <li>• Nóminas, balances, cuentas anuales</li>
                <li>• Sentencias y documentación judicial</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-bold mb-8">Servicios</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl border p-5">
            <p className="font-medium mb-2">Personales</p>
            <p className="text-sm text-slate-600">Certificados oficiales y documentos de identidad.</p>
          </div>
          <div className="rounded-2xl border p-5">
            <p className="font-medium mb-2">Académicos</p>
            <p className="text-sm text-slate-600">Títulos, expedientes, programas, cartas.</p>
          </div>
          <div className="rounded-2xl border p-5">
            <p className="font-medium mb-2">Empresa</p>
            <p className="text-sm text-slate-600">Contratos, cuentas, compliance, comercial.</p>
          </div>
          <div className="rounded-2xl border p-5">
            <p className="font-medium mb-2">Legal / Administración</p>
            <p className="text-sm text-slate-600">Poderes, escrituras, sentencias, AAPP.</p>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section id="proceso" className="bg-white border-y">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-3xl font-bold mb-8">Cómo funciona</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              ["1", "Envía tus documentos", "Foto o PDF legible por formulario, email o WhatsApp."],
              ["2", "Recibe presupuesto", "Fijo y sin sorpresas. Aceptas online."],
              ["3", "Traducción jurada", "Realizada por Intérprete/Traductor Jurado."],
              ["4", "Entrega", "Digital firmada y/o en papel con firma y sello."],
            ].map(([num, title, desc]) => (
              <div key={num} className="relative rounded-2xl border bg-white p-5">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">{num}</div>
                <p className="font-medium mb-1">{title}</p>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-bold mb-8">Precios orientativos</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="rounded-2xl border p-5">
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-semibold">Certificados</span>
              <span className="text-xl font-semibold text-blue-600">35–55 €</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Nacimiento, matrimonio, penales</li>
              <li>Entrega digital o papel</li>
              <li>Hasta ~250 palabras</li>
            </ul>
          </div>
          <div className="rounded-2xl border p-5">
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-semibold">Académicos</span>
              <span className="text-xl font-semibold text-blue-600">50–120 €</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Títulos, expedientes, diplomas</li>
              <li>Formateo y sellos</li>
              <li>Según volumen</li>
            </ul>
          </div>
          <div className="rounded-2xl border p-5">
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-semibold">Documentos legales</span>
              <span className="text-xl font-semibold text-blue-600">A consultar</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Contratos, poderes, sentencias</li>
              <li>Plazos urgentes</li>
              <li>Presupuesto en 1h laboral</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-600">Indícanos destino y requisitos (digital/papel, copias) para ajustar el presupuesto.</p>
      </section>

      {/* OPINIONES */}
      <section id="opiniones" className="bg-white border-y">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-3xl font-bold mb-8">Lo que dicen nuestros clientes</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="rounded-2xl border p-5"><p className="text-slate-700">“Rápidos y muy profesionales. Traducción jurada aceptada sin problemas.”</p><p className="mt-3 font-medium">María G.</p></div>
            <div className="rounded-2xl border p-5"><p className="text-slate-700">“Excelente atención y entrega digital con todas las garantías.”</p><p className="mt-3 font-medium">Daniel R.</p></div>
            <div className="rounded-2xl border p-5"><p className="text-slate-700">“Me orientaron con el trámite y cumplieron el plazo.”</p><p className="mt-3 font-medium">Lucía P.</p></div>
          </div>
        </div>
      </section>

      {/* FAQ + CONTACTO */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-bold mb-8">Preguntas frecuentes</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="rounded-2xl border p-5"><p className="font-medium mb-2">¿Qué es una traducción jurada?</p><p className="text-slate-700">Traducción oficial firmada y sellada por un Intérprete/Traductor Jurado (MAEC).</p></div>
          <div className="rounded-2xl border p-5"><p className="font-medium mb-2">¿Sirve la entrega digital?</p><p className="text-slate-700">En la mayoría de trámites sí. Si necesitan papel, lo enviamos por mensajería.</p></div>
          <div className="rounded-2xl border p-5"><p className="font-medium mb-2">¿Cuánto tarda?</p><p className="text-slate-700">Habitual 24–48 h en documentos cortos (según volumen/legibilidad).</p></div>
          <div className="rounded-2xl border p-5"><p className="font-medium mb-2">¿+20 folios?</p><p className="text-slate-700">Solicita un plazo personalizado.</p></div>
        </div>
      </section>

      <section id="contacto" className="bg-white border-y">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-3xl font-bold mb-8">Pide presupuesto</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border">
              <div className="p-5 border-b"><h3 className="font-semibold">Formulario de contacto</h3></div>
              <div className="p-5">
                <form action="mailto:elena.penaranda@gmail.com" method="post" encType="text/plain" className="space-y-4">
                  <div><label className="text-sm">Nombre</label><input name="Nombre" required placeholder="Tu nombre" className="w-full border rounded px-3 py-2"/></div>
                  <div><label className="text-sm">Email</label><input name="Email" type="email" required placeholder="tucorreo@ejemplo.com" className="w-full border rounded px-3 py-2"/></div>
                  <div><label className="text-sm">Teléfono (opcional)</label><input name="Teléfono" placeholder="XXXXXXXXX" className="w-full border rounded px-3 py-2"/></div>
                  <div><label className="text-sm">Mensaje</label><textarea name="Mensaje" required placeholder="Qué necesitas traducir y para qué trámite" className="w-full border rounded px-3 py-2 h-28"></textarea></div>
                  <button type="submit" className="rounded-2xl h-11 px-6 w-full bg-blue-600 text-white">Solicitar presupuesto</button>
                  <p className="text-xs text-slate-500 text-center mt-2">También por email: elena.penaranda@gmail.com</p>
                </form>
              </div>
            </div>

            <div className="space-y-5 text-sm">
              <div className="rounded-2xl border p-5">
                <p className="font-medium">Email</p>
                <a href="mailto:elena.penaranda@gmail.com" className="text-blue-600 underline">elena.penaranda@gmail.com</a>
                <div className="mt-4">
                  <p className="font-medium">Teléfono / WhatsApp</p>
                  <a href="tel:34685891214" className="underline">34685891214</a>
                </div>
                <div className="mt-4 text-slate-600">
                  <p><strong>Ámbito:</strong> Murcia y online para toda España y extranjero.</p>
                  <p><strong>Idiomas:</strong> Español ⇆ Inglés.</p>
                </div>
              </div>
              <div className="rounded-2xl border p-5 text-slate-700">
                <p className="font-medium mb-2">Datos y cumplimiento</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Datos protegidos (RGPD). Solo para elaborar presupuestos y prestar el servicio.</li>
                  <li>Entrega digital firmada y/o en papel con firma y sello.</li>
                  <li>Factura disponible.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER + BOTÓN WHATSAPP */}
      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-600">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} JuradaExpress. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="underline">Aviso legal</a>
            <a href="#" className="underline">Privacidad</a>
            <a href="#" className="underline">Cookies</a>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/34685891214?text=Hola%2C%20necesito%20una%20traducci%C3%B3n%20jurada.%20%C2%BFMe%20das%20presupuesto%3F"
        target="_blank"
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full shadow-lg px-5 py-3 bg-green-500 text-white"
        aria-label="Chatear por WhatsApp"
      >
        WhatsApp
      </a>
    </main>
  );
}
