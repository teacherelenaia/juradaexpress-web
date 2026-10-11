"use client";

// app/components/VercelAnalytics.js
//
// <Analytics> de @vercel/analytics con el `beforeSend` de
// app/lib/engagement.js, que quita la query (gclid, utm_*…) de la URL que
// el script de Vercel adjunta a los eventos propios. Los root layouts son
// componentes de servidor y no pueden pasar una función al componente
// cliente de Vercel, de ahí este envoltorio (11/10/2026).
import { Analytics } from "@vercel/analytics/next";
import { beforeSend } from "../lib/engagement";

export default function VercelAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
