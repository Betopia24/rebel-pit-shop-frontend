import { socialLinks } from "@/config/social-links"

type SocialIconProps = {
  id: (typeof socialLinks)[number]["id"]
}

function SocialIcon({ id }: SocialIconProps) {
  if (id === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-4.5"
        fill="currentColor"
      >
        <path d="M13.5 22v-9h3l.45-3.5H13.5V7.27c0-1.01.28-1.7 1.74-1.7H17.1V2.44A24.8 24.8 0 0 0 14.39 2C11.7 2 9.86 3.64 9.86 6.65V9.5H6.82V13h3.04v9h3.64Z" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="
            flex size-11 items-center justify-center
            rounded-full
            border border-primary/70
            text-zinc-100
            transition-[background-color,border-color,color,box-shadow,transform]
            duration-200
            hover:-translate-y-0.5
            hover:border-primary
            hover:bg-primary
            hover:text-black
            hover:shadow-[0_0_22px_rgba(212,175,55,0.18)]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
          "
        >
          <SocialIcon id={social.id} />
        </a>
      ))}
    </div>
  )
}