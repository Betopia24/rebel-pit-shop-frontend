
import type { Coach } from "@/features/about/types"


/* =========================================================
   REBEL BOXING CLUB — COACH DATA

   Static data for the initial version.

   Later, replace the data source in get-coaches.ts
   with your backend API. The UI stays unchanged.

   Images are expected in:
   public/images/about-us/
========================================================= */

export const coaches: Coach[] = [
  {
    id: "coach-nichole",
    slug: "nichole",

    name: "Nichole",

    role:
      "Nutrition & Boxing Coach, Personal Trainer, Owner",

    image: {
      src:
        "/images/about-us/Untitled-design-2025-05-02T115024.488.webp",
      alt:
        "Coach Nichole of Rebel Boxing Club.",
    },

    biography: [
      "Nichole has been an athlete all her life, and that’s taught her that success comes with discipline and consistency, but even more important than that, a person has to be willing to do the things other people aren’t.",

      "She started as a member after having her third baby, learning to box in classes, and began training a couple of years later. Now as one of the owners of Rebel, Nichole continues to push the boundaries of what’s “comfortable” in classes, always providing a unique, rewarding experience that members love to hate (but mostly love).",

      "As a personal trainer, Nichole helps her clients focus less on the scale and more on what matters – progress, results, and increased strength.",

      "If you come on a day Nichole is working, you’ll likely to meet her two loveable pitbulls, Pickles and Frankie. They’re the emotional support of the gym!",
    ],

    specialties: [
      "Boxing",
      "Nutrition",
      "Personal Training",
    ],

    sortOrder: 1,
  },

  {
    id: "coach-nhut",
    slug: "nhut",

    name: "Nhut",

    role: "Boxing Coach & Owner",

    image: {
      src:
        "/images/about-us/Untitled-design-2025-05-02T115930.937.webp",
      alt:
        "Coach Nhut of Rebel Boxing Club.",
    },

    biography: [
      "Nhut earned his BA in Kinesiology and Exercise Science from Wichita State University, and has been focused on personal and group training ever since. He is our quiet force of motivation, the one that helps remind our members they can do the tough thing, even if that tough thing is a lot of the burpees that he loves.",

      "Nhut taught boxing classes at other gyms before he joined the Rebel team and delights in offering the warm-ups that get your heartrate up like no other coach. Jumping into a Nhut class you’ll get consistent, technical help with a lot of leg work thrown in for good measure.",
    ],

    specialties: [
      "Boxing",
      "Kinesiology",
      "Group Training",
    ],

    sortOrder: 2,
  },

  {
    id: "coach-cory",
    slug: "cory",

    name: "Cory",

    role: "Boxing Coach",

    image: {
      src:
        "/images/about-us/Untitled-design-2025-05-02T113905.094.webp",
      alt:
        "Coach Cory of Rebel Boxing Club.",
    },

    biography: [
      "Cory has been involved in martial arts and coaching for 13 years now. He began in Karate where he was an assistant coach at Butler CC. Over the years, Cory has learned and adapted a lot of technical knowledge from other coaches and professional fighters that he brings into every class and personal mitts session. He really loves working with people that are not satisfied with just being good – they want to be better.",
    ],

    specialties: [
      "Boxing",
      "Martial Arts",
      "Personal Mitts",
    ],

    sortOrder: 3,
  },

  {
    id: "coach-kelsey",
    slug: "kelsey",

    name: "Kelsey",

    role: "Boxing Coach",

    image: {
      src:
        "/images/about-us/Untitled-design-2025-05-02T113231.634.webp",
      alt:
        "Coach Kelsey of Rebel Boxing Club.",
    },

    biography: [
      "For as long as she can remember, Kelsey has been training for something. She loves the feeling that working hard gives her and even more so, she likes experiencing this with others. Kelsey got her degree in Athletic Training & Kinesiology from Kansas State University while also being on the Rowing team and working as an athletic trainer with multiple KSU sports teams. Her major taught her how to look at the body as a kinetic chain, each part being important to the next, and train the body in safe and healthy ways.",

      "One of Kelsey’s favorite things about exercising is setting goals and doing hard things. For the last 5 years she’s been doing those exact two things alongside other people in boxing classes and it has made it even more fun to her. Coaching boxing has enhanced this opportunity for her and she’s just getting started.",
    ],

    specialties: [
      "Boxing",
      "Athletic Training",
      "Kinesiology",
    ],

    sortOrder: 4,
  },

  {
    id: "coach-john",
    slug: "john",

    name: "John",

    role: "Kickboxing Coach",

    image: {
      src:
        "/images/about-us/Untitled-design-2025-05-02T133354.528.webp",
      alt:
        "Coach John of Rebel Boxing Club.",
    },

    biography: [
      "John brings over 13 years of military experience and a deep background in Brazilian Jiu-Jitsu and Muay Thai to his coaching at Rebel. As a BJJ brown belt Coach John is very familiar with hard work and consistency. His class takes a fast-paced, technical approach, he’s all about sharpening skills, building confidence, and keeping you moving with purpose.",

      "His coaching style is energetic and disciplined, blending detailed instruction with nonstop intensity. John’s classes are designed to challenge both your technique and your conditioning, expect powerful striking drills, constant movement, and a motivating push from start to finish.",
    ],

    specialties: [
      "Kickboxing",
      "Brazilian Jiu-Jitsu",
      "Muay Thai",
    ],

    sortOrder: 5,
  },

  {
    id: "coach-moses",
    slug: "moses",

    name: "Moses",

    role: "Boxing Coach",

    image: {
      src:
        "/images/about-us/Untitled-design-2025-05-02T140941.902.webp",
      alt:
        "Coach Moses of Rebel Boxing Club.",
    },

    biography: [
      "With 8 years of experience, Moses is a high-energy boxing trainer who turns workouts into a full-blown experience. Specializing in fun, Moses is a full-blown architect when it comes to designing his classes, often powered by great music and good vibes. He helps people punch their way to confidence, fitness, and serious skill without taking the fun out of the fight. Whether you’re brand new or leveling up, expect sweat, laughter, and beats that keep you moving.",
    ],

    specialties: [
      "Boxing",
      "Group Fitness",
      "Technique",
    ],

    sortOrder: 6,
  },

  {
    id: "coach-devin",
    slug: "devin",

    name: "Devin",

    role: "Kickboxing Coach",

    image: {
      src:
        "/images/about-us/Untitled-design-2025-05-02T135959.586.webp",
      alt:
        "Coach Devin of Rebel Boxing Club.",
    },

    biography: [
      "Coach Devin is a 2x undefeated State Champion wrestler and an amateur MMA fighter with a strong base in wrestling and kickboxing. With over five years of coaching experience throughout Wichita and two years as a Rebel coach, he brings both skill and intensity to every session.",

      "His classes are fast-moving and focused built around explosive drills, solid technique, and smart strategy. Devin knows how to push members out of their comfort zone while keeping things grounded in real-world application.",

      "Whether you’re refining your striking, improving footwork, or just looking to get stronger and sharper, Devin’s coaching delivers.",
    ],

    specialties: [
      "Kickboxing",
      "Wrestling",
      "MMA",
    ],

    sortOrder: 7,
  },
]
