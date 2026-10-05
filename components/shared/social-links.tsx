import Image from "next/image"

import { socialLinks } from "@/config/social-links"

export function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
        >
          <Image
            src={social.icon}
            alt=""
            width={24}
            height={24}
          />
        </a>
      ))}
    </div>
  )
}