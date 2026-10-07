/* =========================================================
   REBEL BOXING CLUB
   CENTRAL SITE CONFIG

   Keep all reusable:
   - Brand information
   - SEO information
   - Business information
   - Contact information
   - Homepage content
   - Opening hours

   in this file.

   Do not duplicate these values inside components.
========================================================= */


export const siteConfig = {
  /* =======================================================
     BRAND
  ======================================================= */

  name: "Rebel Boxing Club",

  shortName: "Rebel Boxing",

  tagline:
    "Train hard. Fight smart. Become stronger every day.",


  /* =======================================================
     WEBSITE
  ======================================================= */

  url:
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://rebelboxingclub.com",

  locale: "en_US",

  language: "en",

  country: "US",


  /* =======================================================
     DEFAULT DESCRIPTION

     Used by root metadata and other shared SEO surfaces.
  ======================================================= */

  description:
    "Professional boxing training, personal coaching, boxing fitness classes, and expert-led programs for all levels in Wichita, Kansas.",


  /* =======================================================
     SEO
  ======================================================= */

  seo: {
    defaultTitle:
      "Rebel Boxing Club",

    titleTemplate:
      "%s | Rebel Boxing Club",

    homeTitle:
      "Boxing & Fitness Training in Wichita, KS",

    homeDescription:
      "Train at Rebel Boxing Club in Wichita, Kansas with professional boxing classes, personal training, expert coaching, and fitness programs for all levels.",

    openGraphImage:
      "/images/hero/hero-poster.png",

    openGraphImageAlt:
      "Rebel Boxing Club",

    twitterCard:
      "summary_large_image" as const,
  },


  /* =======================================================
     BUSINESS

     Structured separately so this can later feed:
     - LocalBusiness JSON-LD
     - HealthClub JSON-LD
     - Contact pages
     - Footer
     - Maps
  ======================================================= */

  business: {
    type: "HealthClub",

    name: "Rebel Boxing Club",

    priceRange: "$$",

    address: {
      street:
        "8909 W Central Ave",

      city:
        "Wichita",

      region:
        "KS",

      postalCode:
        "67212",

      country:
        "US",

      formatted:
        "8909 W Central Ave, Wichita, KS 67212",
    },
  },


  /* =======================================================
     CONTACT
  ======================================================= */

  contact: {
    phone:
      "(316) 558-5385",

    email:
      "info@rebelboxing.com",

    address:
      "8909 W Central Ave, Wichita, KS 67212",
  },


  /* =======================================================
     BUSINESS HOURS

     `days` and `time`
     are presentation values used by the Footer.

     `dayOfWeek`
     is structured-data friendly and can later be used
     by LocalBusiness JSON-LD.
  ======================================================= */

  hours: [
    {
      id: "weekdays",

      days:
        "Mon–Fri",

      time:
        "6:00 AM – 9:00 PM",

      opens:
        "06:00",

      closes:
        "21:00",

      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
    },

    {
      id: "weekend",

      days:
        "Sat–Sun",

      time:
        "8:00 AM – 4:00 PM",

      opens:
        "08:00",

      closes:
        "16:00",

      dayOfWeek: [
        "Saturday",
        "Sunday",
      ],
    },
  ],


  /* =======================================================
     HERO
  ======================================================= */

  hero: {
    eyebrow:
      "Rebel Boxing Club",

    title:
      "Train Hard.",

    accentTitle:
      "Fight Smart.",

    description:
      "Professional boxing training, personal coaching, and fitness programs for all levels.",


    /* -----------------------------------------------------
       HERO MEDIA
    ----------------------------------------------------- */

    media: {
      video:
        "/videos/hero/rebel-boxing-hero.mp4",

      poster:
        "/images/hero/hero-poster.png",
    },


    /* -----------------------------------------------------
       HERO CTA
    ----------------------------------------------------- */

    primaryCta: {
      label:
        "View Schedule",

      href:
        "/schedule",
    },

    secondaryCta: {
      label:
        "Start Training",

      href:
        "/classes",
    },


    /* -----------------------------------------------------
       HERO HIGHLIGHTS
    ----------------------------------------------------- */

    highlights: [
      {
        id:
          "all-levels",

        label:
          "All Levels Welcome",
      },

      {
        id:
          "group-classes",

        label:
          "Group Classes",
      },

      {
        id:
          "personal-training",

        label:
          "Personal Training",
      },
    ],
  },


  /* =======================================================
     TRAINING OPTIONS
  ======================================================= */

  trainingOptions: {
    eyebrow:
      "Training Options",

    title:
      "Training",

    accentTitle:
      "Options",

    description:
      "Choose the training experience that fits your goals and lifestyle. From one-on-one coaching to high-energy classes, we've got something for everyone.",


    /* -----------------------------------------------------
       BENEFITS
    ----------------------------------------------------- */

    benefits: [
      {
        id:
          "personalized",

        label:
          "Personalized Training",
      },

      {
        id:
          "coaches",

        label:
          "Expert Coaches",
      },

      {
        id:
          "community",

        label:
          "Supportive Community",
      },
    ],


    /* -----------------------------------------------------
       TRAINING CARDS
    ----------------------------------------------------- */

    cards: [
      {
        id:
          "personal-training",

        number:
          "01",

        eyebrow:
          "One-on-One",

        title:
          "Personal Training",

        description:
          "Take your fitness to the next level with individualized coaching and nutrition training. Programs tailored to fit your lifestyle.",

        image:
          "/images/training/personal-training.jpg",

        href:
        "/classes#personal-training",
      },

      {
        id:
          "boxing-fitness",

        number:
          "02",

        eyebrow:
          "Group Class",

        title:
          "Boxing Fitness Classes",

        description:
          "Join our motivating classes led by an experienced coach. Bring a friend or come alone and find your new favorite hour of the day.",

        image:
          "/images/training/boxing-fitness.jpg",

        href:
          "/schedule",
      },

      {
        id:
          "discover-workout",

        number:
          "03",

        eyebrow:
          "All Levels",

        title:
          "Discover a Workout You’ll Love",

        description:
          "Rebel Boxing isn't just about getting your sweat on. Build technique, burn calories, improve confidence, and enjoy the energy of our boxing community.",

        image:
          "/images/training/discover-workout.jpg",

        href:
          "/schedule",
      },
    ],


    /* -----------------------------------------------------
       SPECIAL OFFER
    ----------------------------------------------------- */

    offer: {
      eyebrow:
        "Special Offer",

      title:
        "Your First Class",

      accentTitle:
        "Is On Us.",

      description:
        "Start your fitness journey with a free class for new members.",

      label:
        "Claim Your Free Class",

      href:
        "/message",
    },


    /* -----------------------------------------------------
       EXPLORE CTA
    ----------------------------------------------------- */

    explore: {
      label:
        "Explore More",

      href:
        "/schedule",
    },
  },


  /* =======================================================
     CONTACT CTA
  ======================================================= */

  contactCta: {
    title:
      "Ready to",

    accentTitle:
      "Train?",

    button: {
      label:
        "Talk to Us",

      href:
        "/message",
    },
  },


  /* =======================================================
     SUCCESS STORIES
  ======================================================= */

  successStories: {
    eyebrow:
      "Rebels’ Success Stories",

    title:
      "Stories from",

    accentTitle:
      "Our Members",

    description:
      "Real people. Real progress. Discover how our members have built confidence, strength, and a healthier, happier life at Rebel Boxing Club.",
  },


  /* =======================================================
     FOOTER
  ======================================================= */

  footer: {
    tagline:
      "Train hard. Fight smart. Become stronger every day.",

    copyright:
      "All rights reserved.",
  },
} as const


/* =========================================================
   TYPES
========================================================= */

export type SiteConfig =
  typeof siteConfig


export type TrainingOption =
  (typeof siteConfig.trainingOptions.cards)[number]


export type TrainingBenefit =
  (typeof siteConfig.trainingOptions.benefits)[number]


export type BusinessHour =
  (typeof siteConfig.hours)[number]
