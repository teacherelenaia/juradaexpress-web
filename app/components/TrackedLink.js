"use client";

// app/components/TrackedLink.js
function track(label) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cta_click", {
      event_category: "engagement",
      event_label: label,
    });
  }
}

export default function TrackedLink({ label, className, children, ...rest }) {
  return (
    <a onClick={() => track(label)} className={className} {...rest}>
      {children}
    </a>
  );
}
