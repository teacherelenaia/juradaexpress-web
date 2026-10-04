// app/components/SocialIcons.js
// Iconos de Instagram, Facebook y LinkedIn. Solo se muestran los perfiles
// con URL definida en content/site.js.
import { INSTAGRAM_URL, FACEBOOK_URL, LINKEDIN_URL } from "../../content/site";

const IconInstagram = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const IconFacebook = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M14 8h2.5V5H14a4 4 0 0 0-4 4v2H7.5v3H10v7h3v-7h2.5l.5-3H13V9a1 1 0 0 1 1-1Z" />
  </svg>
);

const IconLinkedIn = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 11v5" />
    <path d="M12 16v-5m0 2.8a2 2 0 0 1 4 0V16" />
    <circle cx="8" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export default function SocialIcons({ className = "", iconClassName = "h-5 w-5" }) {
  const profiles = [
    INSTAGRAM_URL && {
      href: INSTAGRAM_URL,
      label: "Instagram de Jurada Express",
      Icon: IconInstagram,
    },
    FACEBOOK_URL && {
      href: FACEBOOK_URL,
      label: "Facebook de Jurada Express",
      Icon: IconFacebook,
    },
    LINKEDIN_URL && {
      href: LINKEDIN_URL,
      label: "LinkedIn",
      Icon: IconLinkedIn,
    },
  ].filter(Boolean);

  if (profiles.length === 0) return null;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {profiles.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg no-underline"
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  );
}
