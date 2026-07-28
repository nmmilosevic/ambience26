export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  place?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The work with the Ambience team has been extraordinary. Serious, professional and most importantly, they have been able to adapt, and interpret the style that identifies us as a brand and make the most of the house working hand in hand with us and giving it the warmth that a space of these dimensions needs through materials noble as wood, and textiles.",
    name: "AEDAS Homes",
    place: "La Zagaleta, Spain",
  },
  {
    quote:
      "Working with the Ambience Team was a pleasure. The service was impeccable and the designers made sure that the project was complete to the last detail.",
    name: "Susanna Foustok",
    place: "Marbella",
  },
  {
    quote:
      "We want to thank you, Andrea, for such a wonderful work and we only can highly recommend Ambience Home Design.",
    name: "Tarja Hukkanen",
    place: "Finland",
  },
  {
    quote:
      "A thousand thanks to the whole great team of Andrea Böck. Working with the probably uniquely competent Ambience Team was not only very pleasant and successful, my Villa La Perla Blanca on the beaches of the New Golden Mile was awarded the European Property Award for furniture and decoration design as the highlight of the team's performance.",
    name: "Niklaus Haug",
    role: "See park-immobilien (Switzerland)",
    place: "La Perla Blanca",
  },
  {
    quote:
      "Andrea has been helping me manage my townhouse near Marbella for around 10 years. She first furnished it, subsequently helped with maintenance works and now offers a highly efficient property management service. I would recommend her firm to anyone owning a property.",
    name: "Jeremy Hale",
    role: "Head of Global Macro Strategy & Asset Allocation, Citigroup London",
  },
  {
    quote:
      "Don't look any further. This is the interior designer you have to work with. Andrea and her team made our dream come true in our villa at Finca Cortesin. The whole project was realized in time and within budget.",
    name: "Beatrice & Hugo Trütsch",
    place: "Switzerland",
  },
  {
    quote:
      "Ambience took care of everything from the outset. Thanks to her hands-on approach, creative ideas, excellent service, and trustworthy team, she turned both my apartments into stylish and elegant spaces.",
    name: "Hans Leegwater",
    role: "CEO LEEGWATER BV",
    place: "The Netherlands",
  },
  {
    quote:
      "We are over the moon with the transformation to our apartment. Andrea and her team take huge pride in their work and are extremely enthusiastic.",
    name: "Paul Shadbolt",
    place: "London, UK",
  },
];

export const homeTestimonials = testimonials.slice(0, 3);

export const testimonialsContent = {
  title: "Testimonials",
  items: testimonials.map((item) => ({
    name: item.name,
    role: item.role,
    location: item.place,
    quote: item.quote,
  })),
};
