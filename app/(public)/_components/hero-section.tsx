import Link from "next/link"

import {
  ArrowRight,
  Dumbbell,
  UserRound,
  UsersRound,
} from "lucide-react"

import { siteConfig } from "@/config/site"


const heroHighlightIcons = {
  "all-levels": UsersRound,
  "group-classes": Dumbbell,
  "personal-training": UserRound,
} as const


export function HeroSection() {
  const { hero } = siteConfig

  return (
    <section
      aria-labelledby="hero-heading"
      className="
        relative
        isolate

        flex
        min-h-svh
        w-full
        items-end

        overflow-hidden
        bg-black

        xl:items-center
      "
    >
      {/* =====================================================
          VIDEO / POSTER
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          -z-40

          bg-cover
          bg-position-[58%_center]
          bg-no-repeat

          md:bg-position-[60%_center]

          xl:bg-position-[62%_center]
        "
        style={{
          backgroundImage: `url(${hero.media.poster})`,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={hero.media.poster}
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          className="
            size-full
            object-cover

            object-[58%_center]

            md:object-[60%_center]

            xl:object-[62%_center]

            motion-reduce:hidden
          "
        >
          <source
            src={hero.media.video}
            type="video/mp4"
          />
        </video>
      </div>


      {/* =====================================================
          BASE VIDEO DARKENING
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-30

          bg-black/20

          md:bg-black/16

          xl:bg-black/10
        "
      />


      {/* =====================================================
          MOBILE / TABLET SAFE AREA
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20

          bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.06)_25%,rgba(0,0,0,0.20)_43%,rgba(0,0,0,0.78)_68%,rgba(0,0,0,0.97)_100%)]

          xl:hidden
        "
      />


      {/* =====================================================
          DESKTOP PERMANENT TEXT-SAFE GRADIENT
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20

          hidden

          xl:block

          xl:bg-[linear-gradient(90deg,rgba(0,0,0,0.97)_0%,rgba(0,0,0,0.92)_20%,rgba(0,0,0,0.78)_34%,rgba(0,0,0,0.52)_47%,rgba(0,0,0,0.18)_62%,rgba(0,0,0,0.02)_80%,rgba(0,0,0,0)_100%)]
        "
      />


      {/* =====================================================
          SUBTLE GOLD CONTENT GLOW
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10

          hidden

          xl:block

          bg-[radial-gradient(circle_at_17%_61%,rgba(212,175,55,0.055),transparent_28%)]
        "
      />


      {/* =====================================================
          NAVBAR READABILITY
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          -z-10

          h-36

          bg-linear-to-b
          from-black/60
          via-black/20
          to-transparent
        "
      />


      {/* =====================================================
          BOTTOM FADE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          -z-10

          h-40

          bg-linear-to-t
          from-black/85
          via-black/18
          to-transparent

          xl:h-28
        "
      />


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10

          w-full

          px-5
          pb-8
          pt-28

          sm:px-7
          sm:pb-10

          md:px-10
          md:pb-12
          md:pt-32

          lg:px-14

          xl:px-20
          xl:pb-12
          xl:pt-32

          2xl:px-24
        "
      >
        <div
          className="
            max-w-147.5
            sm:max-w-155
            md:max-w-162.5
            lg:max-w-170
            xl:max-w-207.5
            xl:translate-y-4
          "
        >
          {/* Eyebrow */}

          <div
            className="
              mb-4
              flex
              items-center
              gap-3.5

              sm:mb-5
              sm:gap-4
            "
          >
            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.32em]
                text-primary

                sm:text-xs

                xl:text-[13px]
              "
            >
              {hero.eyebrow}
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-10
                shrink-0
                bg-primary

                sm:w-12
              "
            />
          </div>


          {/* Heading */}

          <h1
            id="hero-heading"
            className="
              max-w-none

              font-heading
              font-black
              uppercase

              leading-[0.89]
              tracking-[-0.048em]

              text-white

              text-[clamp(2.45rem,11.8vw,4.65rem)]

              sm:text-[clamp(3.5rem,9vw,5.05rem)]

              md:text-[clamp(4rem,7.3vw,5.5rem)]

              lg:text-[clamp(4.35rem,6vw,5.8rem)]

              xl:text-[clamp(4.8rem,5vw,6.1rem)]
            "
          >
            <span
              className="
                block

                drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]
              "
            >
              {hero.title}
            </span>

            <span
              className="
                mt-1
                block
                whitespace-nowrap

                bg-linear-to-r
                from-[#F5D568]
                via-primary
                to-[#B78C24]

                bg-clip-text
                text-transparent

                drop-shadow-[0_4px_24px_rgba(212,175,55,0.10)]
              "
            >
              {hero.accentTitle}
            </span>
          </h1>


          {/* Description */}

          <p
            className="
              mt-5
              max-w-125
              text-sm
              leading-6.5
              text-zinc-200
              sm:mt-6
              sm:text-[15px]
              sm:leading-7
              md:max-w-130
              md:text-base
              xl:max-w-135
              xl:text-[17px]
              xl:leading-7.5
            "
          >
            {hero.description}
          </p>


          {/* CTA */}

          <div
            className="
              mt-7

              flex
              w-full
              flex-col

              gap-3

              min-[430px]:w-auto
              min-[430px]:flex-row

              sm:mt-8
              sm:gap-3.5
            "
          >
            <Link
              href={hero.primaryCta.href}
              className="
                group

                inline-flex
                min-h-12
                items-center
                justify-center
                gap-3

                rounded-md

                border
                border-[#E8C34B]

                bg-linear-to-r
                from-[#F1CE55]
                via-primary
                to-[#BA8E22]

                px-6

                text-[13px]
                font-bold
                uppercase
                tracking-[0.075em]
                text-[#090909]

                shadow-[0_10px_32px_rgba(212,175,55,0.16)]

                transition-[transform,box-shadow,filter]
                duration-300

                hover:-translate-y-0.5
                hover:brightness-105
                hover:shadow-[0_14px_38px_rgba(212,175,55,0.26)]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                focus-visible:ring-offset-black

                motion-reduce:transform-none
                motion-reduce:transition-none

                sm:min-w-48
              "
            >
              <span>
                {hero.primaryCta.label}
              </span>

              <ArrowRight
                aria-hidden="true"
                strokeWidth={2}
                className="
                  size-4
                  shrink-0

                  transition-transform
                  duration-300

                  group-hover:translate-x-1

                  motion-reduce:transition-none
                "
              />
            </Link>


            <Link
              href={hero.secondaryCta.href}
              className="
                inline-flex
                min-h-12
                items-center
                justify-center

                rounded-md

                border
                border-white/20

                bg-black/20

                px-6

                text-[13px]
                font-bold
                uppercase
                tracking-[0.075em]
                text-zinc-100

                shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]

                backdrop-blur-md

                transition-[background-color,border-color,color,transform]
                duration-300

                hover:-translate-y-0.5
                hover:border-primary/55
                hover:bg-primary/6
                hover:text-primary

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                focus-visible:ring-offset-black

                motion-reduce:transform-none
                motion-reduce:transition-none

                sm:min-w-44
              "
            >
              {hero.secondaryCta.label}
            </Link>
          </div>


          {/* Highlights */}

          <ul
            aria-label="Training options"
            className="
              mt-7

              flex
              flex-wrap
              gap-2

              sm:mt-8
              sm:gap-2.5
            "
          >
            {hero.highlights.map((item) => {
              const Icon =
                heroHighlightIcons[item.id]

              return (
                <li
                  key={item.id}
                  className="
                    inline-flex
                    min-h-9
                    items-center
                    gap-2

                    rounded-full

                    border
                    border-white/14

                    bg-black/25

                    px-3.5
                    py-1.5

                    text-[11px]
                    font-medium
                    text-zinc-300

                    shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]

                    backdrop-blur-md

                    sm:px-4
                    sm:text-xs

                    xl:text-[13px]
                  "
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.8}
                    className="
                      size-4
                      shrink-0
                      text-primary
                    "
                  />

                  <span>
                    {item.label}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>


      {/* Bottom accent */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0
          z-20

          hidden
          h-px

          bg-linear-to-r
          from-transparent
          via-primary/30
          to-transparent

          xl:block
        "
      />
    </section>
  )
}