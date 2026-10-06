"use client";
import * as React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
/* =========================================================
   ANIMATION CONFIG
========================================================= */
const ANIMATION_DURATION = 5.066633;
type MotionFrame = {
    time: number;
    x: number;
    y: number;
    energy: number;
};
type RgbChannels = {
    r: number;
    g: number;
    b: number;
};
type CanvasPalette = {
    background: string;
    foreground: RgbChannels;
    primary: RgbChannels;
    shadow: RgbChannels;
};
const MOTION_FRAMES: MotionFrame[] = [
    { time: 0.0, x: 0.25, y: 0.64, energy: 0.42 },
    { time: 0.3, x: 0.25, y: 0.65, energy: 0.43 },
    { time: 0.6, x: 0.27, y: 0.65, energy: 0.48 },
    { time: 0.9, x: 0.31, y: 0.64, energy: 0.6 },
    { time: 1.2, x: 0.38, y: 0.62, energy: 0.76 },
    { time: 1.5, x: 0.46, y: 0.59, energy: 0.88 },
    { time: 1.8, x: 0.54, y: 0.56, energy: 0.86 },
    { time: 2.1, x: 0.6, y: 0.53, energy: 0.8 },
    { time: 2.4, x: 0.64, y: 0.5, energy: 0.84 },
    { time: 2.7, x: 0.67, y: 0.47, energy: 0.96 },
    { time: 3.0, x: 0.68, y: 0.44, energy: 1 },
    { time: 3.3, x: 0.68, y: 0.41, energy: 0.86 },
    { time: 3.6, x: 0.67, y: 0.38, energy: 0.68 },
    { time: 3.9, x: 0.65, y: 0.36, energy: 0.53 },
    { time: 4.2, x: 0.61, y: 0.35, energy: 0.47 },
    { time: 4.5, x: 0.57, y: 0.35, energy: 0.5 },
    { time: 4.8, x: 0.54, y: 0.36, energy: 0.54 },
    { time: 5.0, x: 0.52, y: 0.37, energy: 0.52 },
];
/* =========================================================
   CTA SECTION
========================================================= */
export function ContactCtaSection() {
    const content = siteConfig.contactCta;
    return (<section aria-labelledby="contact-cta-heading" className="
        relative
        isolate
        flex
        min-h-80
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-background
        sm:min-h-88
        md:min-h-96
        lg:min-h-104
      ">
      {/* =====================================================
            LAYER 0 — DOT ANIMATION
        ====================================================== */}
      <AnimatedDotBackground />
      {/* =====================================================
            LAYER 10 — VERY SUBTLE READABILITY
        ====================================================== */}
      <div aria-hidden="true" className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-[radial-gradient(ellipse_at_center,rgb(var(--rgb-background)/0.05)_0%,rgb(var(--rgb-background)/0.02)_36%,transparent_70%)]
        "/>
      {/* =====================================================
            TOP BLEND
        ====================================================== */}
      <div aria-hidden="true" className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-10
          h-14
          bg-linear-to-b
          from-background
          via-background/42
          to-transparent
          md:h-16
        "/>
      {/* =====================================================
            BOTTOM BLEND
        ====================================================== */}
      <div aria-hidden="true" className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-10
          h-14
          bg-linear-to-t
          from-background
          via-background/48
          to-transparent
          md:h-16
        "/>
      {/* =====================================================
            LAYER 20 — CONTENT
        ====================================================== */}
      <div className="
          relative
          z-20
          mx-auto
          flex
          w-full
          max-w-5xl
          flex-col
          items-center
          justify-center
          px-5
          py-14
          text-center
          sm:px-7
          sm:py-16
          md:px-10
        ">
        {/* ===================================================
            HEADING
        ==================================================== */}
        <h2 id="contact-cta-heading" className="
            mx-auto
            max-w-4xl
            font-heading
            font-black
            leading-[0.88]
            tracking-tighter
            text-[clamp(3rem,12vw,4.2rem)]
            sm:text-[clamp(3.8rem,8vw,5rem)]
            lg:text-[clamp(4.6rem,5.8vw,5.8rem)]
          ">
          <span className="text-foreground">
            {content.title}
          </span>{" "}
          <span className="rebel-gold-text">
            {content.accentTitle}
          </span>
        </h2>
        {/* ===================================================
            CTA
        ==================================================== */}
        <Link href={content.button.href} aria-label={`${content.button.label} at ${siteConfig.name}`} className={cn(buttonVariants({
            size: "lg",
        }), `
              group
              relative
              mt-7
              h-12
              min-w-40
              overflow-hidden
              rounded-full
              border
              border-primary/70
              bg-primary
              px-7
              text-[12px]
              font-bold
              uppercase
              tracking-[0.065em]
              text-primary-foreground
              shadow-(--shadow-gold-sm)
              transition-[transform,box-shadow,filter]
              duration-300
              ease-out
              hover:-translate-y-0.5
              hover:bg-primary
              hover:text-primary-foreground
              hover:brightness-105
              hover:shadow-(--shadow-gold-md)
              active:translate-y-0
              active:scale-[0.985]
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:ring-offset-2
              focus-visible:ring-offset-background
              motion-reduce:transform-none
              motion-reduce:transition-none
              sm:mt-8
              sm:h-13
              sm:min-w-44
              sm:px-8
              sm:text-[13px]
            `)}>
          {/* hover sweep */}
          <span aria-hidden="true" className="
              pointer-events-none
              absolute
              inset-y-0
              -left-1/2
              w-1/3
              -skew-x-20
              bg-linear-to-r
              from-transparent
              via-foreground/25
              to-transparent
              transition-[left]
              duration-700
              ease-out
              group-hover:left-[120%]
              motion-reduce:hidden
            "/>
          <MessageCircle aria-hidden="true" className="
              relative
              z-10
              size-4
            "/>
          <span className="relative z-10">
            {content.button.label}
          </span>
          <ArrowRight aria-hidden="true" className="
              relative
              z-10
              size-4
              transition-transform
              duration-300
              ease-out
              group-hover:translate-x-1
              motion-reduce:transform-none
              motion-reduce:transition-none
            "/>
        </Link>
      </div>
    </section>);
}
/* =========================================================
   ANIMATED DOT BACKGROUND
========================================================= */
function AnimatedDotBackground() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    React.useEffect(() => {
        /* =====================================================
           CANVAS
        ====================================================== */
        const canvasElement = canvasRef.current;
        if (!canvasElement) {
            return;
        }
        const context = canvasElement.getContext("2d", {
            alpha: false,
        });
        if (!context) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasElement;
        const ctx: CanvasRenderingContext2D = context;
        /* =====================================================
           INTERACTION SURFACE
    
           Typed alias fixes:
           "interactionSurface is possibly null"
        ====================================================== */
        const interactionSurfaceElement = canvas.closest("section");
        if (!(interactionSurfaceElement
            instanceof HTMLElement)) {
            return;
        }
        const interactionSurface: HTMLElement = interactionSurfaceElement;
        /* =====================================================
           THEME PALETTE
           Canvas colors come from globals.css.
        ====================================================== */
        const initialPalette = readCanvasPalette();
        if (!initialPalette) {
            return;
        }
        let palette: CanvasPalette = initialPalette;
        /* =====================================================
           RUNTIME
        ====================================================== */
        let width = 1;
        let height = 1;
        let dpr = 1;
        let frameId: number | null = null;
        let destroyed = false;
        let isVisible = true;
        let startTime = performance.now();
        /* =====================================================
           POINTER STATE
        ====================================================== */
        let pointerInside = false;
        let pointerTargetX = 0;
        let pointerTargetY = 0;
        let pointerX = 0;
        let pointerY = 0;
        let pointerStrength = 0;
        /* =====================================================
           DOTS
        ====================================================== */
        type Dot = {
            x: number;
            y: number;
        };
        const dots: Dot[] = [];
        /* =====================================================
           ACCESSIBILITY
        ====================================================== */
        const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        let reduceMotion = reducedMotionQuery.matches;
        /* =====================================================
           HELPERS
        ====================================================== */
        function clamp(value: number, min: number, max: number) {
            return Math.max(min, Math.min(max, value));
        }
        function lerp(from: number, to: number, amount: number) {
            return (from +
                (to - from) *
                    amount);
        }
        function smoothstep(amount: number) {
            const t = clamp(amount, 0, 1);
            return (t *
                t *
                (3 - 2 * t));
        }
        /* =====================================================
           AUTOMATIC MOTION
        ====================================================== */
        function sampleMotion(elapsed: number) {
            const localTime = elapsed %
                ANIMATION_DURATION;
            let fromFrame = MOTION_FRAMES[0]!;
            let toFrame = MOTION_FRAMES[MOTION_FRAMES.length -
                1]!;
            for (let index = 0; index <
                MOTION_FRAMES.length -
                    1; index++) {
                const current = MOTION_FRAMES[index]!;
                const next = MOTION_FRAMES[index + 1]!;
                if (localTime >=
                    current.time &&
                    localTime <=
                        next.time) {
                    fromFrame =
                        current;
                    toFrame =
                        next;
                    break;
                }
            }
            const frameDuration = Math.max(toFrame.time -
                fromFrame.time, 0.0001);
            const rawProgress = clamp((localTime -
                fromFrame.time) /
                frameDuration, 0, 1);
            const progress = smoothstep(rawProgress);
            return {
                x: lerp(fromFrame.x, toFrame.x, progress),
                y: lerp(fromFrame.y, toFrame.y, progress),
                energy: lerp(fromFrame.energy, toFrame.energy, progress),
            };
        }
        /* =====================================================
           GRID
        ====================================================== */
        function buildGrid() {
            dots.length = 0;
            const gap = width < 480
                ? 8
                : width < 768
                    ? 9
                    : width < 1280
                        ? 10
                        : width < 1800
                            ? 11
                            : 12;
            const offset = gap / 2;
            for (let y = offset; y < height; y += gap) {
                for (let x = offset; x < width; x += gap) {
                    dots.push({
                        x,
                        y,
                    });
                }
            }
        }
        /* =====================================================
           RESIZE
        ====================================================== */
        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            width =
                Math.max(rect.width, 1);
            height =
                Math.max(rect.height, 1);
            dpr =
                Math.min(window.devicePixelRatio ||
                    1, 1.5);
            canvas.width =
                Math.round(width * dpr);
            canvas.height =
                Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            buildGrid();
        }
        /* =====================================================
           LIGHT FIELD
        ====================================================== */
        function ellipseInfluence(x: number, y: number, centerX: number, centerY: number, radiusX: number, radiusY: number, strength = 1.8) {
            const dx = (x -
                centerX) /
                Math.max(radiusX, 1);
            const dy = (y -
                centerY) /
                Math.max(radiusY, 1);
            return Math.exp(-(dx * dx +
                dy * dy) *
                strength);
        }
        /* =====================================================
           BACKGROUND
        ====================================================== */
        function drawBackground() {
            ctx.fillStyle =
                palette.background;
            ctx.fillRect(0, 0, width, height);
        }
        /* =====================================================
           POINTER SMOOTHING
        ====================================================== */
        function updatePointerState() {
            /*
             * Cursor does not snap.
             * It softly trails the actual mouse.
             */
            const positionSpeed = pointerInside
                ? 0.13
                : 0.07;
            pointerX =
                lerp(pointerX, pointerTargetX, positionSpeed);
            pointerY =
                lerp(pointerY, pointerTargetY, positionSpeed);
            /*
             * Smooth appearance / disappearance.
             */
            pointerStrength =
                lerp(pointerStrength, pointerInside
                    ? 1
                    : 0, pointerInside
                    ? 0.12
                    : 0.055);
        }
        /* =====================================================
           DOT FIELD
        ====================================================== */
        function drawDots(elapsed: number) {
            updatePointerState();
            const motion = sampleMotion(elapsed);
            /* ===================================================
               AUTOMATIC LIGHT POSITION
            =================================================== */
            const centerX = motion.x *
                width;
            const centerY = motion.y *
                height;
            const mainRadiusX = width *
                (0.17 +
                    motion.energy *
                        0.21);
            const mainRadiusY = height *
                (0.18 +
                    motion.energy *
                        0.24);
            /* ===================================================
               TRAIL
            =================================================== */
            const trailX = centerX -
                width *
                    0.12;
            const trailY = centerY +
                height *
                    0.075;
            /* ===================================================
               LEAD
            =================================================== */
            const leadX = centerX +
                width *
                    0.085;
            const leadY = centerY -
                height *
                    0.05;
            /* ===================================================
               BROAD FIELD
            =================================================== */
            const broadX = centerX -
                width *
                    0.025;
            const broadY = centerY +
                height *
                    0.02;
            /* ===================================================
               POINTER FIELD
      
               Limited radius keeps it premium instead of
               becoming a huge flashlight.
            =================================================== */
            const pointerRadiusX = clamp(width *
                0.105, 105, 205);
            const pointerRadiusY = clamp(height *
                0.26, 72, 135);
            /* ===================================================
               RESPONSIVE VISIBILITY
            =================================================== */
            const visibilityBoost = width < 640
                ? 1.2
                : width > 1800
                    ? 1.13
                    : width > 1400
                        ? 1.07
                        : 1;
            const dotRadius = clamp(Math.min(width, height) /
                730, 0.55, 0.92);
            for (const dot of dots) {
                /* =================================================
                   AUTO MAIN
                ================================================= */
                const main = ellipseInfluence(dot.x, dot.y, centerX, centerY, mainRadiusX, mainRadiusY, 1.68);
                /* =================================================
                   AUTO TRAIL
                ================================================= */
                const trail = ellipseInfluence(dot.x, dot.y, trailX, trailY, mainRadiusX *
                    0.96, mainRadiusY *
                    0.86, 1.88);
                /* =================================================
                   AUTO LEAD
                ================================================= */
                const lead = ellipseInfluence(dot.x, dot.y, leadX, leadY, mainRadiusX *
                    0.68, mainRadiusY *
                    0.7, 2);
                /* =================================================
                   AUTO BROAD
                ================================================= */
                const broad = ellipseInfluence(dot.x, dot.y, broadX, broadY, mainRadiusX *
                    1.42, mainRadiusY *
                    1.12, 2.2);
                /* =================================================
                   POINTER — CORE
                ================================================= */
                const pointerCore = ellipseInfluence(dot.x, dot.y, pointerX, pointerY, pointerRadiusX, pointerRadiusY, 1.72) *
                    pointerStrength;
                /* =================================================
                   POINTER — OUTER HALO
        
                   Slightly offset to avoid a perfect circle.
                ================================================= */
                const pointerHalo = ellipseInfluence(dot.x, dot.y, pointerX -
                    pointerRadiusX *
                        0.14, pointerY +
                    pointerRadiusY *
                        0.1, pointerRadiusX *
                    1.55, pointerRadiusY *
                    1.35, 2.3) *
                    pointerStrength;
                /* =================================================
                   ALPHA
                ================================================= */
                let alpha = (0.024 +
                    main *
                        (0.37 +
                            motion.energy *
                                0.31) +
                    trail *
                        0.14 +
                    lead *
                        0.075 +
                    broad *
                        0.06 +
                    pointerCore *
                        0.56 +
                    pointerHalo *
                        0.095) *
                    visibilityBoost;
                /* =================================================
                   EDGE FADE
                ================================================= */
                const nx = dot.x /
                    width;
                const ny = dot.y /
                    height;
                const horizontalFade = Math.sin(clamp(nx, 0, 1) *
                    Math.PI);
                const verticalFade = Math.sin(clamp(ny, 0, 1) *
                    Math.PI);
                const normalEdgeX = 0.42 +
                    horizontalFade *
                        0.58;
                const normalEdgeY = 0.44 +
                    verticalFade *
                        0.56;
                /*
                 * Pointer near edges must still be visible.
                 */
                const pointerPresence = clamp(pointerCore +
                    pointerHalo *
                        0.3, 0, 1);
                const finalEdgeX = lerp(normalEdgeX, 0.92, pointerPresence);
                const finalEdgeY = lerp(normalEdgeY, 0.93, pointerPresence);
                alpha *=
                    finalEdgeX *
                        finalEdgeY;
                if (alpha <
                    0.012) {
                    continue;
                }
                /* =================================================
                   ACTIVE BRIGHTNESS
                ================================================= */
                const active = clamp(main *
                    0.86 +
                    trail *
                        0.2 +
                    lead *
                        0.08 +
                    pointerCore *
                        0.88, 0, 1);
                /* =================================================
                   WARM GOLD AMOUNT
                ================================================= */
                const automaticWarm = main *
                    motion.energy *
                    0.11;
                const pointerWarm = pointerCore *
                    0.24;
                const warm = clamp(automaticWarm +
                    pointerWarm, 0, 0.27);
                /* =================================================
                   COLOR
                ================================================= */
                const neutralBaseFactor = 0.55;
                const neutralBrightFactor = 0.88;
                let red = lerp(palette.foreground.r *
                    neutralBaseFactor, palette.foreground.r *
                    neutralBrightFactor, active);
                let green = lerp(palette.foreground.g *
                    neutralBaseFactor, palette.foreground.g *
                    neutralBrightFactor, active);
                let blue = lerp(palette.foreground.b *
                    neutralBaseFactor, palette.foreground.b *
                    neutralBrightFactor, active);
                red =
                    lerp(red, palette.primary.r, warm);
                green =
                    lerp(green, palette.primary.g, warm);
                blue =
                    lerp(blue, palette.primary.b, warm);
                /* =================================================
                   DOT SIZE
                ================================================= */
                const radius = dotRadius +
                    active *
                        0.16 +
                    pointerCore *
                        0.07;
                /* =================================================
                   DRAW
                ================================================= */
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
                ctx.fillStyle =
                    `rgba(
            ${Math.round(red)},
            ${Math.round(green)},
            ${Math.round(blue)},
            ${clamp(alpha, 0, 0.8)}
          )`;
                ctx.fill();
            }
        }
        /* =====================================================
           VIGNETTE
        ====================================================== */
        function drawVignette() {
            const gradient = ctx.createRadialGradient(width * 0.5, height * 0.5, Math.min(width, height) *
                0.16, width * 0.5, height * 0.5, Math.max(width, height) *
                0.7);
            const shadow = palette.shadow;
            gradient.addColorStop(0, `rgba(${shadow.r}, ${shadow.g}, ${shadow.b}, 0)`);
            gradient.addColorStop(0.64, `rgba(${shadow.r}, ${shadow.g}, ${shadow.b}, 0.015)`);
            gradient.addColorStop(0.82, `rgba(${shadow.r}, ${shadow.g}, ${shadow.b}, 0.10)`);
            gradient.addColorStop(1, `rgba(${shadow.r}, ${shadow.g}, ${shadow.b}, 0.38)`);
            ctx.fillStyle =
                gradient;
            ctx.fillRect(0, 0, width, height);
        }
        /* =====================================================
           FRAME
        ====================================================== */
        function drawFrame(elapsed: number) {
            drawBackground();
            drawDots(elapsed);
            drawVignette();
        }
        /* =====================================================
           POINTER EVENTS
        ====================================================== */
        function handlePointerMove(event: PointerEvent) {
            /*
             * Desktop mouse / stylus only.
             * Touch does not produce fake hover interaction.
             */
            if (event.pointerType !==
                "mouse" &&
                event.pointerType !==
                    "pen") {
                return;
            }
            const rect = interactionSurface.getBoundingClientRect();
            pointerTargetX =
                clamp(event.clientX -
                    rect.left, 0, rect.width);
            pointerTargetY =
                clamp(event.clientY -
                    rect.top, 0, rect.height);
            /*
             * First entry snaps initial state to cursor.
             * After that it smoothly follows.
             */
            if (!pointerInside) {
                pointerX =
                    pointerTargetX;
                pointerY =
                    pointerTargetY;
            }
            pointerInside =
                true;
            if (reduceMotion) {
                pointerX =
                    pointerTargetX;
                pointerY =
                    pointerTargetY;
                pointerStrength =
                    1;
                drawFrame(2.8);
            }
        }
        function handlePointerLeave(event: PointerEvent) {
            if (event.pointerType !==
                "mouse" &&
                event.pointerType !==
                    "pen") {
                return;
            }
            pointerInside =
                false;
            if (reduceMotion) {
                pointerStrength =
                    0;
                drawFrame(2.8);
            }
        }
        interactionSurface.addEventListener("pointerenter", handlePointerMove);
        interactionSurface.addEventListener("pointermove", handlePointerMove);
        interactionSurface.addEventListener("pointerleave", handlePointerLeave);
        /* =====================================================
           RAF CONTROL
        ====================================================== */
        function stopAnimation() {
            if (frameId ===
                null) {
                return;
            }
            cancelAnimationFrame(frameId);
            frameId =
                null;
        }
        function requestNextFrame() {
            if (destroyed ||
                reduceMotion ||
                !isVisible ||
                frameId !== null) {
                return;
            }
            frameId =
                requestAnimationFrame(render);
        }
        function render(timestamp: number) {
            frameId =
                null;
            if (destroyed ||
                !isVisible) {
                return;
            }
            const elapsed = (timestamp -
                startTime) /
                1000;
            drawFrame(elapsed);
            if (!reduceMotion) {
                requestNextFrame();
            }
        }
        /* =====================================================
           RESIZE
        ====================================================== */
        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
            drawFrame(reduceMotion
                ? 2.8
                : (performance.now() -
                    startTime) /
                    1000);
        });
        resizeObserver.observe(canvas);
        /* =====================================================
           VIEWPORT OPTIMIZATION
        ====================================================== */
        const intersectionObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if (!entry) {
                return;
            }

            isVisible =
                entry.isIntersecting;
            if (!isVisible) {
                stopAnimation();
                return;
            }
            if (reduceMotion) {
                drawFrame(2.8);
                return;
            }
            startTime =
                performance.now();
            drawFrame(0);
            requestNextFrame();
        }, {
            rootMargin: "160px 0px",
        });
        intersectionObserver.observe(canvas);
        /* =====================================================
           REDUCED MOTION
        ====================================================== */
        function handleMotionPreferenceChange() {
            reduceMotion =
                reducedMotionQuery.matches;
            stopAnimation();
            if (reduceMotion) {
                drawFrame(2.8);
                return;
            }
            startTime =
                performance.now();
            if (isVisible) {
                drawFrame(0);
                requestNextFrame();
            }
        }
        reducedMotionQuery.addEventListener("change", handleMotionPreferenceChange);
        /* =====================================================
           TAB VISIBILITY
        ====================================================== */
        function handleDocumentVisibility() {
            if (document.hidden) {
                stopAnimation();
                return;
            }
            if (!isVisible) {
                return;
            }
            if (reduceMotion) {
                drawFrame(2.8);
                return;
            }
            startTime =
                performance.now();
            drawFrame(0);
            requestNextFrame();
        }
        document.addEventListener("visibilitychange", handleDocumentVisibility);
        /* =====================================================
           THEME / CSS VARIABLE CHANGES
        ====================================================== */
        const themeObserver = new MutationObserver(() => {
            const nextPalette = readCanvasPalette();
            if (!nextPalette) {
                return;
            }
            palette =
                nextPalette;
            drawFrame(reduceMotion
                ? 2.8
                : (performance.now() -
                    startTime) /
                    1000);
        });
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [
                "class",
                "style",
            ],
        });
        /* =====================================================
           INITIALIZE
        ====================================================== */
        resizeCanvas();
        pointerX =
            width * 0.5;
        pointerY =
            height * 0.5;
        pointerTargetX =
            pointerX;
        pointerTargetY =
            pointerY;
        drawFrame(reduceMotion
            ? 2.8
            : 0);
        if (!reduceMotion) {
            requestNextFrame();
        }
        /* =====================================================
           CLEANUP
        ====================================================== */
        return () => {
            destroyed = true;
            stopAnimation();
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            themeObserver.disconnect();
            interactionSurface.removeEventListener("pointerenter", handlePointerMove);
            interactionSurface.removeEventListener("pointermove", handlePointerMove);
            interactionSurface.removeEventListener("pointerleave", handlePointerLeave);
            reducedMotionQuery.removeEventListener("change", handleMotionPreferenceChange);
            document.removeEventListener("visibilitychange", handleDocumentVisibility);
        };
    }, []);
    return (<canvas ref={canvasRef} aria-hidden="true" className="
        pointer-events-none
        absolute
        inset-0
        z-0
        size-full
      "/>);
}
/* =========================================================
   CANVAS THEME HELPERS
========================================================= */
function readCanvasPalette(): CanvasPalette | null {
    const styles = getComputedStyle(document.documentElement);
    const background = styles
        .getPropertyValue("--surface-canvas")
        .trim();
    const foreground = parseRgbChannels(styles.getPropertyValue("--rgb-foreground"));
    const primary = parseRgbChannels(styles.getPropertyValue("--rgb-primary"));
    const shadow = parseRgbChannels(styles.getPropertyValue("--rgb-black"));
    if (!background || !foreground || !primary || !shadow) {
        return null;
    }
    return {
        background,
        foreground,
        primary,
        shadow,
    };
}
function parseRgbChannels(value: string): RgbChannels | null {
    const channels = value
        .trim()
        .split(/\s+/)
        .map(Number);
    if (channels.length !== 3 ||
        channels.some((channel) => !Number.isFinite(channel))) {
        return null;
    }
    const [r, g, b] = channels;
    if (r === undefined || g === undefined || b === undefined) {
        return null;
    }
    return { r, g, b };
}
