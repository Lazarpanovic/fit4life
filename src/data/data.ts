export const programCategories = [
  {
    id: 0,
    key: "all",
  },
  {
    id: 1,
    key: "professionalSport",
  },
  {
    id: 2,
    key: "fitness",
  },
  {
    id: 3,
    key: "pilates",
  },
  {
    id: 4,
    key: "business",
  },
  {
    id: 5,
    key: "athletic",
  },
  {
    id: 6,
    key: "nature",
  },
  {
    id: 7,
    key: "youngAthletes",
  },
];

export type ProgramCategoryKey =
  | "all"
  | "professionalSport"
  | "fitness"
  | "pilates"
  | "business"
  | "athletic"
  | "nature"
  | "youngAthletes";

export type ProgramKey =
  | "professionalSport"
  | "athletesDevelopment"
  | "healthyInBusiness"
  | "lifeWithNature";

export const newPrograms = [
  {
    id: 1,
    key: "professionalSport" as ProgramKey,
    imageSrc: "/professional-sport.jpg",
    price: "200",
    duration: "1",
    categories: [programCategories[1], programCategories[5]],
  },
  {
    id: 2,
    key: "athletesDevelopment" as ProgramKey,
    imageSrc: "/young-athlete.jpg",
    price: "200",
    duration: "1",
    categories: [programCategories[7], programCategories[5]],
  },
  {
    id: 3,
    key: "healthyInBusiness" as ProgramKey,
    imageSrc: "/healthy-in-business.jpg",
    price: "200",
    duration: "1",
    categories: [programCategories[4], programCategories[2]],
  },
  {
    id: 4,
    key: "lifeWithNature" as ProgramKey,
    imageSrc: "/life-with-nature.jpg",
    price: "200",
    duration: "1",
    categories: [programCategories[2], programCategories[6]],
  },
];

export const categories = [
  {
    id: 0,
    key: "all",
  },
  {
    id: 1,
    key: "training",
  },
  {
    id: 2,
    key: "fitness",
  },
  {
    id: 3,
    key: "wellness",
  },
  {
    id: 4,
    key: "supplements",
  },
  {
    id: 5,
    key: "nutrition",
  },
  {
    id: 6,
    key: "medicine",
  },
  {
    id: 7,
    key: "nature",
  },
];

export type ResourceCategoryKey =
  | "all"
  | "training"
  | "fitness"
  | "wellness"
  | "supplements"
  | "nutrition"
  | "medicine"
  | "nature";

export type ResourceKey =
  | "trainingTips"
  | "supplementsGuide"
  | "injuryPrevention";

export const resources = [
  {
    id: 1,
    key: "trainingTips" as ResourceKey,
    image: "/resource-training.jpg",
    categories: [categories[1], categories[2], categories[3]],
  },
  {
    id: 2,
    key: "supplementsGuide" as ResourceKey,
    image: "/resource-supplements.jpg",
    categories: [categories[4], categories[5]],
  },
  {
    id: 3,
    key: "injuryPrevention" as ResourceKey,
    image: "/resource-injuries.jpg",
    categories: [categories[1], categories[2], categories[6]],
  },
];

export const testimonials = [
  {
    id: 1,
    fullName: "Jessica Martinez",
    title: "Wellness Member",
    imageSrc: "/testimonial-1.jpg",
    description:
      "Joining Fit4Life has been a game-changer! The trainers are incredibly supportive, and the variety of programs keeps me motivated. I've never felt stronger or more confident in my fitness journey.",
  },
  {
    id: 2,
    fullName: "Michael Stevens",
    title: "Gym Enthusiast",
    imageSrc: "/testimonial-2.jpg",
    description:
      "Fit4Life's gym and fitness programs helped me achieve my goals faster than I expected. The atmosphere is welcoming, and the equipment is top-notch. I love the sense of community here!",
  },
  {
    id: 3,
    fullName: "Emily Johnson",
    title: "Spa & Wellness Regular",
    imageSrc: "/testimonial-3.jpg",
    description:
      "I’ve always struggled to find balance in my fitness routine, but Fit4Life’s personalized approach made all the difference. Their spa and sauna services are perfect for relaxation after intense workouts!",
  },
  {
    id: 4,
    fullName: "John Richards",
    title: "Fitness & Sports Program Participant",
    imageSrc: "/testimonial-5.jpg",
    description:
      "Fit4Life offers everything I need—from strength training to yoga and wellness. The coaches are always encouraging, and I feel like I’m part of a family. It’s the best decision I’ve made for my health.",
  },
];

// trainers data
export type TrainerKey = "john" | "rachel" | "christopher" | "david";

export const newTrainers = [
  {
    id: 1,
    key: "john" as TrainerKey,
    imageSrc: "/trainer.png",
    categories: [programCategories[1], programCategories[5]],
    accent: "Performance",
  },
  {
    id: 2,
    key: "rachel" as TrainerKey,
    imageSrc: "/trainer-4.png",
    categories: [programCategories[2], programCategories[3]],
    accent: "Fitness",
  },
  {
    id: 3,
    key: "christopher" as TrainerKey,
    imageSrc: "/trainer-3.png",
    categories: [
      programCategories[2],
      programCategories[4],
      programCategories[5],
    ],
    accent: "Athletic",
  },
  {
    id: 4,
    key: "david" as TrainerKey,
    imageSrc: "/trainer-2.png",
    categories: [programCategories[3], programCategories[5]],
    accent: "Strength",
  },
];

export type PricingPlanKey = "basic" | "pro" | "premium";

export const pricingPlans = [
  {
    id: 0,
    key: "basic" as PricingPlanKey,
    price: "200",
  },
  {
    id: 1,
    key: "pro" as PricingPlanKey,
    price: "250",
  },
  {
    id: 2,
    key: "premium" as PricingPlanKey,
    price: "300",
  },
];
