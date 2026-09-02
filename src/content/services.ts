export const servicesContent = {
  title: "Our Services",
  intro:
    "Specializing in luxury architectural and interior design for a spectrum of high-end residential clients, Ambience Home Design provides a tailored approach and seamless service, with a commitment to the execution of our client's brief and wishes.",
  lead:
    "The key to every successful decoration project is understanding the customer's ideas and needs right from the start.",
  experience:
    "Our collective experience encompasses architecture, all aspects of interior design from international homes, world class hotel developments and hospitality projects, through to furniture, lighting, product and accessory design.",
  services: [
    {
      title: "Full Refurbishments & Turnkey Projects",
      subtitle: "We take care of our projects from A-Z",
      description:
        "As one of the leading companies for Turnkey renovations on the Costa del Sol and internationally we offer a wide range of high-end design services. Initial conceptualization, Interior Architecture projects, project management of the entire refurbishment and interior design are all managed by our in-house team of professionals.",
      details:
        "We plan every design aspect of your home - from kitchens and bathrooms to fireplaces, wardrobes, floors, down to the smallest details such as the perfect handle and hinge, perfectly matching and thus guaranteeing the WOW effect we always aim for. We work with local craftsmen, reliable suppliers and exclusive international brands to ensure the best quality for your entire project.",
      category: "refurbishment" as const,
    },
    {
      title: "Residential Interior Design",
      subtitle: "Let us put our experience in interior design at the service of your home",
      description:
        "At Ambience Home Design we know that your home is your haven. Thanks to our extensive experience in the residential sector we are highly qualified to create a conceptual design for your property to maximize the space and functionality of each of its zones.",
      details:
        "Regardless of whether you plan to change your home's style, or if you want to renovate it and get it ready for sale on the property market, our team will make the most of your property and always stick to your budget.",
      category: "residential" as const,
    },
    {
      title: "Commercial & Retail Interior Design",
      subtitle: "Ambience creates a unique space that matches and enhances your business identity",
      description:
        "At Ambience we analyze your business to design a space that is suitable for your brand and aimed at your target audience, allowing any visit to your establishment or facilities to become an experience that reinforces your brand's values.",
      details:
        "We create functional and visually stimulating spaces with attractive designs that catch the attention of regular customers and new visitors alike.",
      category: "commercial" as const,
    },
  ],
  capabilities: [
    {
      title: "3D Renders & Autocad Drawings",
      description:
        "Precise drawings and photorealistic visuals so every volume, finish and proportion is agreed before works begin.",
      image: "/media/LOUNGE-CAM3_-26de950b.jpg",
      imageAlt:
        "Photorealistic visualisation of a double-height lounge with timber joinery and garden light",
    },
    {
      title: "Interior Architecture",
      description:
        "Spatial composition, joinery and material language that turn a brief into rooms with calm structure and lasting comfort.",
      image: "/media/tv-units-fireplaces-wardrobes-main-66d5d4bc.jpg",
      imageAlt: "Bespoke marble fireplace set into vertical timber joinery",
    },
    {
      title: "Area Planning",
      description:
        "Intelligent layouts that resolve circulation, privacy and light across living, sleeping and service zones.",
      image: "/media/ambience-reception-lounge-open-plan-kitchen-bar-89bec8c5.jpg",
      imageAlt:
        "Open-plan lounge, bar and reception showing how living, service and arrival zones share one floor",
    },
    {
      title: "Budget Planning",
      description:
        "Transparent scoping and phased budgets, so craftsmanship and specification stay aligned with investment.",
      image: "/media/Ambience-New-Showroom-main-961bd67c.jpg",
      imageAlt:
        "Golden Mile showroom, where furniture, lighting and finishes are specified against the brief",
    },
    {
      title: "Lighting Planning",
      description:
        "Layered natural and artificial light schemes that shape atmosphere from morning through evening.",
      image: "/media/rsz_cam1_night_1-16d7b8fe.jpg",
      imageAlt:
        "Twilight bathroom with layered pendants, recessed light and sunset through the window",
    },
  ],
  awards: {
    title: "Our design awards",
    lead:
      "International Property Awards recognition for interior architecture and commercial workplaces across Spain and Europe.",
    items: [
      {
        image: "/media/award1-ee6a20b0.jpg",
        alt: "International Property Award",
      },
      {
        image: "/media/award2-34ff1b61.jpg",
        alt: "International Property Award",
      },
      {
        image: "/media/award3-be1d6b6a.jpg",
        alt: "International Property Award",
      },
      {
        image: "/media/award4-a73cfec1.jpg",
        alt: "International Property Award",
      },
      {
        image: "/media/award5-38062555.png",
        alt: "International Property Award",
      },
      {
        image: "/media/european-property-award-ambience-home-design-b173eb2d.png",
        alt: "European Property Award, Ambience Home Design",
      },
    ],
  },
};

export type ServiceOffering = (typeof servicesContent.services)[number];
export type ServiceCapability = (typeof servicesContent.capabilities)[number];
