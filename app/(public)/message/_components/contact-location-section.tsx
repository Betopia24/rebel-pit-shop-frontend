import {
  ArrowUpRight,
  MapPin,
  Navigation,
} from "lucide-react"

/* =========================================================
   CONTACT — LOCATION

   Responsibility:
   ONLY show where Rebel Boxing Club is located.

   Contact details such as:
   - Phone
   - Email
   - Opening hours
   - Full business information

   already exist in ContactInformationSection,
   so they are intentionally NOT repeated here.

   Location:
   8909 W Central Ave
   Wichita, KS 67212
========================================================= */

const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/8909+W+Central+Ave,+Wichita,+KS+67212,+USA/@37.6929505,-97.4458333,860m/data=!3m2!1e3!4b1!4m6!3m5!1s0x87bade2f03c98855:0xf97eb26cc91a05e4!8m2!3d37.6929505!4d-97.4458333!16s%2Fg%2F11pvcvtdnq"

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=37.6929505,-97.4458333&z=16&output=embed"

export function ContactLocationSection() {
  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="
        relative
        isolate
        overflow-hidden

        border-t
        border-foreground/8

        bg-surface-deep
        text-foreground

        py-12

        sm:py-14
        lg:py-16
      "
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          bg-[radial-gradient(ellipse_at_50%_100%,var(--gold-06),transparent_58%)]
        "
      />

      {/* TOP ACCENT */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-10

          h-px

          bg-linear-to-r
          from-transparent
          via-primary/40
          to-transparent
        "
      />

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-20

          mx-auto
          w-full
          max-w-[1500px]

          px-5

          sm:px-7
          md:px-10
          lg:px-14
          xl:px-20
        "
      >
        {/* ===================================================
            SECTION HEADER
        ==================================================== */}

        <div
          className="
            mb-7

            flex
            flex-col
            gap-4

            sm:mb-8

            lg:flex-row
            lg:items-end
            lg:justify-between
            lg:gap-12
          "
        >
          <div>
            {/* EYEBROW */}

            <div
              className="
                mb-3

                flex
                items-center
                gap-3
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-8

                  bg-primary
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase

                  tracking-[0.27em]

                  text-primary

                  sm:text-[11px]
                "
              >
                Find Rebel
              </span>

              <span
                aria-hidden="true"
                className="
                  size-1
                  rotate-45
                  bg-primary
                "
              />
            </div>

            {/* HEADING */}

            <h2
              id="location-heading"
              className="
                font-heading
                font-black
                uppercase

                leading-[0.95]
                tracking-[-0.045em]

                text-[clamp(2.4rem,8vw,3.8rem)]

                sm:text-[clamp(2.8rem,5vw,4.2rem)]

                lg:text-[clamp(2.8rem,3.5vw,4rem)]
              "
            >
              Know Where{" "}
              <span className="rebel-gold-text">
                To Go.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[450px]

              text-sm
              leading-7

              text-text-secondary

              lg:text-right
            "
          >
            Planning your first visit? Open Rebel
            Boxing Club in Google Maps and get
            turn-by-turn directions straight to the gym.
          </p>
        </div>

        {/* ===================================================
            MAP EXPERIENCE

            One single visual surface.
            No duplicate business information.
        ==================================================== */}

        <div
          className="
            relative
            isolate

            overflow-hidden

            rounded-2xl

            border
            border-foreground/12

            bg-surface-dark

            shadow-(--shadow-card)
          "
        >
          {/* GOLD TOP DETAIL */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-x-0
              top-0
              z-30

              h-0.5

              bg-linear-to-r
              from-transparent
              via-primary/75
              to-transparent
            "
          />

          {/* =================================================
              MAP
          ================================================== */}

          <div
            className="
              relative

              min-h-[390px]
              w-full

              sm:min-h-[470px]

              lg:min-h-[540px]
            "
          >
            <iframe
              src={MAP_EMBED_URL}
              title="Map showing Rebel Boxing Club in Wichita, Kansas"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="
                absolute
                inset-0

                size-full

                border-0

                grayscale-[0.3]
                saturate-[0.8]
                contrast-[1.03]
              "
            />

            {/* ===============================================
                LIGHT THEME TREATMENT

                Intentionally very subtle so the map
                remains readable and professional.
            ================================================ */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0
                z-10

                bg-background/5
              "
            />

            {/* EDGE VIGNETTE */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0
                z-10

                shadow-[inset_0_0_70px_var(--overlay-black-35)]
              "
            />

            {/* ===============================================
                TOP LEFT — SMALL BRAND MARKER

                No repeated address.
            ================================================ */}

            <div
              className="
                pointer-events-none

                absolute
                left-4
                top-4
                z-20

                sm:left-5
                sm:top-5
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2.5

                  rounded-full

                  border
                  border-foreground/12

                  bg-background/90

                  px-3.5
                  py-2.5

                  shadow-(--shadow-card-soft)

                  backdrop-blur-xl
                "
              >
                <span
                  className="
                    flex
                    size-7
                    items-center
                    justify-center

                    rounded-full

                    bg-primary

                    text-primary-foreground
                  "
                >
                  <MapPin
                    aria-hidden="true"
                    strokeWidth={1.8}
                    className="size-3.5"
                  />
                </span>

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase

                    tracking-[0.17em]

                    text-foreground

                    sm:text-[10px]
                  "
                >
                  Rebel Boxing Club
                </span>
              </div>
            </div>

            {/* ===============================================
                OPEN MAPS BUTTON
            ================================================ */}

            <a
              href={GOOGLE_MAPS_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Rebel Boxing Club in Google Maps"
              className="
                absolute
                right-4
                top-4
                z-20

                inline-flex
                size-10

                items-center
                justify-center

                rounded-full

                border
                border-foreground/12

                bg-background/90

                text-foreground

                shadow-(--shadow-card-soft)

                backdrop-blur-xl

                transition-[background-color,border-color,color]
                duration-200

                hover:border-primary/50
                hover:bg-primary
                hover:text-primary-foreground

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary

                sm:right-5
                sm:top-5
              "
            >
              <ArrowUpRight
                aria-hidden="true"
                className="size-4"
              />
            </a>

            {/* ===============================================
                BOTTOM ACTION PANEL

                Only action-oriented content.
                No hours / phone / email / address.
            ================================================ */}

            <div
              className="
                absolute
                bottom-4
                left-4
                right-4
                z-20

                sm:bottom-5
                sm:left-5
                sm:right-auto
                sm:w-auto
              "
            >
              <div
                className="
                  flex
                  flex-col

                  gap-4

                  rounded-xl

                  border
                  border-foreground/12

                  bg-background/92

                  p-4

                  shadow-(--shadow-card)

                  backdrop-blur-2xl

                  sm:min-w-[390px]
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  sm:gap-6
                  sm:p-5
                "
              >
                <div>
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase

                      tracking-[0.2em]

                      text-primary
                    "
                  >
                    Ready to Visit?
                  </p>

                  <p
                    className="
                      mt-1.5

                      text-sm
                      font-semibold

                      text-foreground
                    "
                  >
                    Let Google Maps guide you to Rebel.
                  </p>
                </div>

                <a
                  href={GOOGLE_MAPS_PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group

                    inline-flex
                    min-h-10
                    shrink-0

                    items-center
                    justify-center

                    gap-2.5

                    rounded-md

                    border
                    border-primary/70

                    bg-primary

                    px-4

                    text-[9px]
                    font-bold
                    uppercase

                    tracking-[0.075em]

                    text-primary-foreground

                    transition-[background-color,box-shadow]
                    duration-300

                    hover:bg-gold-hover
                    hover:shadow-(--shadow-gold-xs)

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-primary

                    motion-reduce:transition-none

                    sm:text-[10px]
                  "
                >
                  <Navigation
                    aria-hidden="true"
                    strokeWidth={1.8}
                    className="size-3.5"
                  />

                  Directions

                  <ArrowUpRight
                    aria-hidden="true"
                    className="
                      size-3.5

                      transition-transform
                      duration-300

                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5

                      motion-reduce:transform-none
                    "
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            QUIET FOOTER LINE

            Purposefully no business details.
        ==================================================== */}

        <div
          className="
            mt-4

            flex
            items-center
            justify-between
            gap-4

            text-[9px]
            font-semibold
            uppercase

            tracking-[0.14em]

            text-text-muted

            sm:text-[10px]
          "
        >
          <span>
            Wichita, Kansas
          </span>

          <span>
            Open in Google Maps
          </span>
        </div>
      </div>
    </section>
  )
}