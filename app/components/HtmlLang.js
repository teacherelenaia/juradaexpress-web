"use client";

// app/components/HtmlLang.js
// Solo para las páginas 404: cuando un catch-all lanza notFound(), Next 14
// sirve el not-found con su propio shell (<html id="__next_error__">) y se
// pierde el atributo lang del root layout. Este componente lo repone en el
// cliente. Las páginas reales no lo necesitan: su lang llega en el HTML.
import { useEffect } from "react";

export default function HtmlLang({ lang }) {
  useEffect(() => {
    if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
  }, [lang]);
  return null;
}
