export const siteConfig = {
  name: "Rebel Boxing Club",

  shortName: "Rebel Boxing",

  description:
    "Professional boxing training, personal coaching, and fitness programs.",

  hero: {
    eyebrow: "Rebel Boxing Club",

    title: "Train Hard.",
    accentTitle: "Fight Smart.",

    description:
      "Professional boxing training, personal coaching, and fitness programs for all levels.",

    media: {
      video: "/videos/hero/rebel-boxing-hero.mp4",
      poster: "/images/hero/hero-poster.png",
    },

    primaryCta: {
      label: "View Schedule",
      href: "/schedule",
    },

    secondaryCta: {
      label: "Start Training",
      href: "/personal-training",
    },

    highlights: [
      {
        id: "all-levels",
        label: "All Levels Welcome",
      },
      {
        id: "group-classes",
        label: "Group Classes",
      },
      {
        id: "personal-training",
        label: "Personal Training",
      },
    ],
  },

  trainingOptions: {
    eyebrow: "Training Options",

    title: "Training",
    accentTitle: "Options",

    description:
      "Choose the training experience that fits your goals and lifestyle. From one-on-one coaching to high-energy classes, we've got something for everyone.",

    benefits: [
      {
        id: "personalized",
        label: "Personalized Training",
      },
      {
        id: "coaches",
        label: "Expert Coaches",
      },
      {
        id: "community",
        label: "Supportive Community",
      },
    ],

    cards: [
      {
        id: "personal-training",
        number: "01",
        eyebrow: "One-on-One",
        title: "Personal Training",
        description:
          "Take your fitness to the next level with individualized coaching and nutrition training. Programs tailored to fit your lifestyle.",
        image: "/images/training/personal-training.jpg",
        href: "/personal-training",
      },

      {
        id: "boxing-fitness",
        number: "02",
        eyebrow: "Group Class",
        title: "Boxing Fitness Classes",
        description:
          "Join our motivating classes led by an experienced coach. Bring a friend or come alone and find your new favorite hour of the day.",
        image: "/images/training/boxing-fitness.jpg",
        href: "/schedule",
      },

      {
        id: "discover-workout",
        number: "03",
        eyebrow: "All Levels",
        title: "Discover a Workout You’ll Love",
        description:
          "Rebel Boxing isn't just about getting your sweat on. Build technique, burn calories, improve confidence, and enjoy the energy of our boxing community.",
        image: "/images/training/discover-workout.jpg",
        href: "/schedule",
      },
    ],

    offer: {
      eyebrow: "Special Offer",
      title: "Your First Class",
      accentTitle: "Is On Us.",
      description:
        "Start your fitness journey with a free class for new members.",
      label: "Claim Your Free Class",
      href: "/message",
    },

    explore: {
      label: "Explore More",
      href: "/schedule",
    },
  },

  footer: {
    tagline:
      "Train hard. Fight smart. Become stronger every day.",
  },

  contact: {
    phone: "(316) 558-5385",
    email: "info@rebelboxing.com",
    address: "8909 W Central Ave, Wichita, KS 67212",
  },

  hours: [
    {
      days: "Mon–Fri",
      time: "6:00 AM – 9:00 PM",
    },
    {
      days: "Sat–Sun",
      time: "8:00 AM – 4:00 PM",
    },
  ],
} as const

export type SiteConfig = typeof siteConfig