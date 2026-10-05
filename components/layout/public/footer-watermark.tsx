export function FooterWatermark() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        relative
        mx-auto
        w-full
        max-w-[1700px]
        select-none
        overflow-hidden
      "
    >
      <svg
        viewBox="0 0 1800 220"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
        className="block h-auto w-full"
      >
        <defs>
          <linearGradient
            id="rebel-footer-watermark-gold"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#D4AF37"
              stopOpacity="0.34"
            />

            <stop
              offset="38%"
              stopColor="#9B7923"
              stopOpacity="0.27"
            />

            <stop
              offset="72%"
              stopColor="#6B5218"
              stopOpacity="0.20"
            />

            <stop
              offset="100%"
              stopColor="#3D2E0C"
              stopOpacity="0.14"
            />
          </linearGradient>

          <filter
            id="rebel-footer-watermark-grunge"
            x="-10%"
            y="-30%"
            width="120%"
            height="160%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.34"
              numOctaves="3"
              seed="17"
              result="noise"
            />

            <feColorMatrix
              in="noise"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 2.8 -1.05
              "
              result="texture"
            />

            <feComposite
              in="texture"
              in2="SourceGraphic"
              operator="in"
              result="distressed"
            />

            <feBlend
              in="SourceGraphic"
              in2="distressed"
              mode="multiply"
            />
          </filter>
        </defs>

        <text
          x="50%"
          y="172"
          textAnchor="middle"
          textLength="1660"
          lengthAdjust="spacingAndGlyphs"
          fontFamily="Arial Black, Arial, sans-serif"
          fontSize="180"
          fontWeight="900"
          fill="url(#rebel-footer-watermark-gold)"
          filter="url(#rebel-footer-watermark-grunge)"
        >
          REBEL BOXING CLUB
        </text>
      </svg>

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          bottom-0
          h-[28%]
          bg-linear-to-t
          from-black/30
          to-transparent
        "
      />
    </div>
  )
}