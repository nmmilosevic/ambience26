export type Testimonial = {
  quote: string;
  /** Short homepage line. The full quote stays on /testimonials. */
  pull?: string;
  name: string;
  role?: string;
  place?: string;
  /** Project photography only when the place matches a known project. */
  image?: string;
  href?: string;
};

/**
 * Restored from https://ambiencehomedesign.com/testimonials/
 * Only named clients / companies from the live page (no invented quotes).
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "The work with the Ambience team has been extraordinary. Serious, professional and most importantly, they have been able to adapt, and interpret the style that identifies us as a brand and make the most of the house working hand in hand with us and giving it the warmth that a space of these dimensions needs through materials noble as wood, and textiles.",
    pull:
      "They interpret the style that identifies us as a brand, and give the house the warmth a space of these dimensions needs.",
    name: "AEDAS Homes",
    place: "La Zagaleta, Spain",
    image: "/media/featured-la-zagaleta-ambience-home-design-771a7115.jpg",
    href: "/projects/villa-la-zagaleta",
  },
  {
    quote:
      "A thousand thanks to the whole great team of Andrea Böck. Working with the probably uniquely competent Ambience Team was not only very pleasant and successful, my Villa La Perla Blanca on the beaches of the New Golden Mile was awarded the European Property Award for furniture and decoration design as the highlight of the team's performance. Congratulations to the whole team and especially to Andrea Böck. I am really looking forward to the next assignment together.",
    pull: "A thousand thanks to the whole great team of Andrea Böck.",
    name: "Niklaus Haug",
    role: "See park-immobilien (Switzerland)",
    place: "La Perla Blanca",
    image: "/media/perla-blanca-without-date-d4831b00.jpg",
    href: "/projects/la-perla-blanca-new-golden-mile-spain",
  },
  {
    quote:
      "Our Family of 5 (3 kids and 2 dogs) moved to Marbella from Cambridge (uk), 4 years ago to a newly built modern house. Ambience team helped us with the interior design and final finishing touches, they perfectly understood our Lifestyle and needs of all our family members, they were professional, all installations were on time, we could rely on them. Ever since I always go back to them with any projects within our house and highly recommend them to our friends and all my relocation clients.",
    name: "CEO of Life 4U",
    place: "Czech / UK",
  },
  {
    quote:
      "Andrea has been helping me manage my townhouse near Marbella for around 10 years. She first furnished it, subsequently helped with maintenance works and now offers a highly efficient property management service to include regular visits, property checks and advisory if anything is amiss. Andrea has long ago become a very good friend but continues to offer a highly effective and capable service. I would recommend her firm to anyone owning a property.",
    name: "Jeremy Hale",
    role: "Head of Global Macro Strategy & Asset Allocation, Citigroup London",
  },
  {
    quote:
      "Ambience were recommended to me by a close friend. It took no time for me to understand why! Andrea's diverse knowledge and her understanding of my specific needs were apparent from the very start. This coupled with Ambience's ability to deliver made me a very happy customer indeed. I would have no issue in repeating the recommendation to another friend or associate.",
    name: "Founder of Aspire Group & Associates",
    place: "Budapest, Hungary",
  },
  {
    quote:
      "Our company has for the past two years had the chance to work with Ambience Home Design in connection with two redecorating projects in two different apartments in Spain. Both projects have been carried through in an efficient and professional manner and whenever anything needed attention, it was immediately taken care of. We now have two beautiful apartments due to Ambience Home Design and their fantastic team!",
    name: "AS Klaveness Chartering",
    place: "Norway",
  },
  {
    quote:
      "Some years ago we bought an apartment in Spain. We were very happy and ready to go shopping to decorate our new home. We had, however, no clue were to buy everything and too little time to figure it all out. What a luck we had! Andrea Böck from Ambience Home Design happened to be our new neighbour! She decorated our apartment from A to Z within the time frame and budget we agreed and it looks fabulous. Andrea has kept her promise: \"All you have to do is pick up the key, uncork the champagne and enjoy your stay!\" She still is our favourite neighbour.",
    name: "Amstel Graphics B.V.",
    place: "The Netherlands",
  },
  {
    quote:
      "Dear Andrea I would like to thank you once again for the amazing job you did designing and installing the interior of the Penthouse in La Alzambra for our client. They are very happy with the finished product. We've had great feedback from the clients we've introduced to your company over the past years and I look forward to recommending you again in the near future.",
    name: "Angels Property Services S.L.",
    place: "Spain",
  },
  {
    quote:
      "Ambience Home Design is a reliable and service-minded partner for refurbishment and decoration. Their good taste, personal follow-up and extensive network in Spain made it possible for us to complete an extensive makeover of a penthouse apartment in Los Granados all the while living in Norway. We are very pleased with the work done and the great service rendered.",
    name: "AS Klaveness Chartering",
    role: "Penthouse, Los Granados",
    place: "Norway",
  },
  {
    quote:
      "We would like to share our opinion about our cooperation with Andrea and the Ambience Team. Frankly speaking, we were really impressed how easy and fast Andrea picked up the idea of what we wanted. She has that rare and precious sense of style and she simply feels people in that way. The very first thing we liked was her questionnaire and answering it was an interesting experience as it gave us more understanding of how we really wanted our home to look like. Second great thing was how fast we got the first detailed design plan for our apartment. It was at that moment that we understood we needed her to make our home feel cozy and beautiful and nobody else! Working with Andrea and her team has been a real pleasure. Andrea, thank you very much for everything. Every time we come home, we feel great and happy!",
    pull: "Every time we come home, we feel great and happy.",
    name: "Owners of SP&C LTD",
    place: "Kiev, Ukraine",
  },
  {
    quote:
      "I have worked with Andrea on two projects in La Alzambra. Even though I was away most of the time, we were able to communicate seamlessly over email and it was easy to picture what the finished project would look like thanks to her elaborate presentations. It was a great feeling arriving to Spain to a fully furnished home and avoid the hassle and stress of having to deal with all the things that had to be done. Ambience took care of everything from the outset. Thanks to her hands-on approach, creative ideas, excellent service, and trustworthy team, she turned both my apartments into stylish and elegant spaces, which I truly enjoy! I can only recommend Andrea and her team for their brilliant work.",
    name: "Hans Leegwater",
    role: "CEO LEEGWATER BV",
    place: "The Netherlands",
  },
  {
    quote:
      "I would like to congratulate Andrea and the rest of the Ambience team on the excellent work done with a client that I recently recommended to her. The personal and professional service received was perfect from the original meeting and the sending of detailed digital proposals throughout to final completion, which was achieved on time and against all odds in the middle of July in time for the owners first holiday in her new Marbella home. Apart from creating a very chic and elegant home, Andrea provided an extremely complete and thorough project. Absolutely everything was left in her hands including gardening, pool maintenance, alarm system, insurance and TV and phone connections which neither I or my client were expecting, but are extremely grateful for.",
    name: "Marbella Property Consultant",
    role: "Property consultant since 1996",
    place: "Marbella",
  },
  {
    quote:
      "I have been working with Andrea from Ambience for over 5 years. She has helped many of our clients who have bought in La Finca de Marbella, our flagship development. Their homes are stunning, being decorated with flair, imagination and style. Her company is a delight to work with, the staff are professional and efficient and this get done correctly and on time. Andrea's in-house team consists of designers, architects and craftsmen, all highly skilled and respected in their field. This gives us the confidence that we can leave everything in their capable hands from beginning to end.",
    name: "Owner, Altavista Property",
    place: "La Finca de Marbella",
  },
  {
    quote:
      "Don't look any further. This is the interior designer you have to work with. Andrea and her team made our dream come true in our villa at Finca Cortesin. From the first meeting to handing over the villa the cooperation with Ambience was top notch. A detailed questionnaire helped us to streamline our ideas. The design proposal and renderings implemented all our ideas and the final result of the refurbishing matched our expectations. The communication between us and the design- and the administrative-team was easy and flawless and the whole project was realized in time and within budget. We highly recommend Ambience to anyone looking for a 5-star interior design firm at the Costa del Sol.",
    name: "Beatrice & Hugo Trütsch",
    place: "Switzerland",
  },
  {
    quote:
      "We bought our apartment in Spain, and were so excited about it! At first, we were ready to fix it just a little bit and choose furniture by ourselves, but later we decided to have a complete refurbishment. We were lucky to find Ambience Home Design. And as a result, it turned out to be a totally new apartment. They took care of everything, not only the design, but the whole complete project. Andrea got wonderful idea to change the layout of the apartment, she choose colours, furnitures, decorations… The result was something we could not even imagine. How a small apartment, can become so beautiful, spacious and open?! Now, two years since, every time, coming there we never stop wondering, how beautiful everything is done and how we are really enjoying being there. We want to thank you, Andrea, for such a wonderful work and we only can highly recommend Ambience Home Design.",
    pull:
      "They took care of everything, not only the design, but the whole complete project.",
    name: "Tarja Hukkanen",
    place: "Finland",
  },
  {
    quote:
      "After doing my holiday residence in Marbella, the house in Belgium was the second project with Ambience Home Design, I can only confirm my previous statement. They did an amazing job, again! The house looks really marvellous, every thing fits perfectly together and it is not only a representation of my personal taste, it's also very elegant and classy! Exactly what I was looking for. I wouldn't be able to choose which room I like most. They are all very different and never boring, but they also fit together to make my house elegant, classy and special. Also the painting and installation was done perfectly, and on schedule by very nice, trustworthy and capable people! With this second project, my utmost respect and appreciation for this company only grew stronger. I would recommend Ambience Home Design to anyone who loves elegant and classy interior design by people you can trust completely to finish everything perfectly and on schedule.",
    pull:
      "With our second project with Ambience Home Design, my utmost respect and appreciation for this company only grew stronger.",
    name: "Belgium",
    place: "Belgium",
  },
  {
    quote:
      "We have had the most appreciated experience by working with Ambience Home Design. These nice skillful and professional people with all their effort, understanding and helpful goodwill have made the process of creating a home away from home easy and smooth! We are very pleased with the final result and will thank you deeply for all guidance and support, Andrea.",
    name: "Reidum Aarstad",
  },
  {
    quote:
      "We met Andrea from Ambience about 10 years ago, soon after we bought our apartment. She advised on colour schemes and soft furnishings and we were delighted with the work she carried out for us. We decided to do a complete refurbishment of our apartment this year. This involved structural alterations, new kitchen and bathrooms, new floor finishes and a complete re-vamp of the whole apartment. As a surveyor in the UK, and experienced with this type of project, the thought of doing such a project in Spain and on my own filled me with dread. We commissioned Ambience to do the design and build. We are over the moon with the transformation to our apartment. It looks fantastic. Andrea and her team take huge pride in their work and are extremely enthusiastic. Andrea has great flair for design and we now trust her sufficiently to ask her to sort the completion of the project without even referring to us. We know it will look lovely. All in all we have thoroughly enjoyed working with Ambience and would not hesitate to recommend their excellent work.",
    pull:
      "We are over the moon with the transformation to our apartment. We wouldn't hesitate to recommend Ambience Home Design.",
    name: "Paul Shadbolt",
    place: "London, UK",
  },
  {
    quote:
      "Working with Andrea was a great experience, she transformed our summer house in Marbella in just three months, her lovely taste was exceptional as well as allowing space for the presence of our taste. Her choice of colors to both our houses in Cairo and Alexandria in Egypt was extraordinary; the furniture match, the designs for the wardrobes, the kitchen and bathrooms were amazing. The designs to our London apartment was nevertheless exquisite, she pays particular attention to the details and choses the right workers to come up with the best work. A talented, pleasant and fun person to work with!",
    name: "Sherine Nadim & Mohamed Afifi",
    place: "Cairo, Egypt",
  },
  {
    quote:
      "Ambience understood exactly what we required in our new apartment and delivered the completed project on time, and on budget, and we are delighted with the results. Since completing our project, I have recommended Ambience to a number of friends, and I know that they have also been delighted with the results.",
    name: "Altos de la Quinta",
    place: "Spain",
  },
  {
    quote:
      "Working with the Ambience Team was a pleasure. The service was impeccable and the designers made sure that the project was complete to the last detail.",
    name: "Susanna Foustok",
    place: "Marbella",
  },
  {
    quote:
      "Not only that the Ambience team created our dream holiday apartment in Estepona, but after that they also realize our dream home in Horgen/Switzerland. Amazing. I would like to personal thank Andrea because we felt so looked after during the entire process and your service is fantastic. If I would have another property to design , I would know where to go to! Ambience Home Design in Marbella.",
    name: "Horgen / Estepona",
    place: "Switzerland",
  },
  {
    quote:
      "We are truly amazed by the beautiful creation Ambience crafted for us. As well how the project went from begin to end really amazing. A big applause for the team and a special thanks to Andrea, Nuria and Leonie. This is actually our second project with Ambience. The first project Ambience did for us was our apartment in Hong Kong this was quite a challenge due to the distance. The crew from Spain made it and transformed the apartment cosmopolitan luxury is the result. But this project in Spain is much bigger our family dream house we had the fullest confidence that Ambience will make it beautiful. And actually it was even more beautiful and more amazing than what we had imagined. I would never forgot walking in and just be overwhelmed by emotions and all the little details. The \"ambience\" in the house is amazing it has such a good vibe and to make the house so perfectly can only mean the Ambience really listen to your needs and preference and make it happen. A dream come true.",
    pull: "A dream come true.",
    name: "Nikica Djuric",
  },
  {
    quote:
      "Professional and creative. Ambience creates style in combination with cosiness. They are able to create the house of your dreams by listening to your wishes.",
    name: "Anita Van Oeveren",
  },
  {
    quote:
      "Highly impressed by the professionalism and quality of service provided by Andrea and the team during the renovation of our villa in Sotogrande.",
    name: "Sotogrande",
    place: "Marbella, Spain",
  },
  {
    quote:
      "Thanks to the Ambience team for the quality of the work carried out in our house in Marbella.",
    name: "The Netherlands",
    place: "Marbella",
  },
];

export const homeTestimonials = testimonials.slice(0, 3);

export const featuredPageTestimonial =
  testimonials.find((item) => item.name === "Niklaus Haug") ?? testimonials[0];

export function supportingTestimonials(featured: Testimonial): Testimonial[] {
  return testimonials.filter((item) => item.name !== featured.name);
}

/** Page layout: one photographed feature, two short preludes, then the rest. */
export function testimonialsPageGroups(featured: Testimonial) {
  const rest = supportingTestimonials(featured);
  const pictured = rest.filter((item) => item.image);
  const text = rest.filter((item) => !item.image);
  return {
    pictured,
    prelude: text.slice(0, 2),
    rest: text.slice(2),
  };
}

export function testimonialSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Reading order for /testimonials: featured, short prelude, photographed, remaining. */
export function testimonialsPageOrder(featured: Testimonial): Testimonial[] {
  const { pictured, prelude, rest } = testimonialsPageGroups(featured);
  return [featured, ...prelude, ...pictured, ...rest];
}

export const testimonialsContent = {
  title: "Testimonials",
  items: testimonials.map((item) => ({
    name: item.name,
    role: item.role,
    location: item.place,
    quote: item.quote,
  })),
};
