// app/components/DocumentCatalog.js
import { DOCUMENTS } from "../../content/documents";
import {
  IconFileText,
  IconHeart,
  IconShieldCheck,
  IconCreditCard,
  IconGraduationCap,
  IconBookOpen,
  IconBriefcase,
  IconEdit,
  IconHelpCircle,
} from "./Icons";

const ICONS = {
  fileText: IconFileText,
  heart: IconHeart,
  shieldCheck: IconShieldCheck,
  creditCard: IconCreditCard,
  graduationCap: IconGraduationCap,
  bookOpen: IconBookOpen,
  briefcase: IconBriefcase,
  edit: IconEdit,
  helpCircle: IconHelpCircle,
};

export default function DocumentCatalog() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {DOCUMENTS.map((doc) => {
        const Icon = ICONS[doc.icon];
        return (
          <div
            key={doc.id}
            className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy-50 text-brand-navy">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">{doc.name}</h3>
            <div className="mt-3">
              {doc.price != null ? (
                <span className="inline-flex rounded-full bg-brand-navy px-3 py-1 text-sm font-semibold text-white">
                  {doc.price} €
                </span>
              ) : (
                <span className="inline-flex rounded-full bg-brand-gold-100 px-3 py-1 text-sm font-semibold text-brand-gold-900 ring-1 ring-brand-gold-300">
                  Pendiente de presupuestar
                </span>
              )}
            </div>
            <button
              type="button"
              className="mt-5 w-full rounded-xl bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy-700"
            >
              Seleccionar
            </button>
          </div>
        );
      })}
    </div>
  );
}
