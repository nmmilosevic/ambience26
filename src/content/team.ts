export type TeamMember = {
  name: string;
  role: string;
};

export type TeamGroup = {
  title: string;
  members: TeamMember[];
};

export const teamContent = {
  title: "Andrea Böck & The Team",
  founder: {
    name: "Andrea Böck",
    intro:
      "Andrea Böck is a German-born interior designer and curator who founded Ambience in 2002.",
    bio: [
      "Her unequivocal taste for contemporary and luxurious interiors has launched Ambience the leading interior design firm on the Coast.",
      "Andrea's creative eye and attention to detail, and passion for both décor and refurbishment projects, are equally matched by the experience and know-how she's acquired in the many years of dedication in the field, which have been keystone to Ambience's international success and expansion.",
      "Since 2002, Andrea has been commissioned to work on luxury projects in the UK, Belgium, The Netherlands, Germany, Egypt, Switzerland, Morocco, Italy, Hong Kong and St. Lucia, and has ongoing projects with renown architects and developers in both Spain and abroad.",
      "When Andrea is not thinking about the next Project or answering her emails, she enjoys traveling to far countries to find new inspirations and also antique items to bring back, Scuba diving, Horseback riding or hiking in the nature with her dogs.",
    ],
  },
  teamIntro:
    "Our international in-house team consists of not only creative, knowledgeable, motivated designers and architects, but also of a sizeable logistic and installation team with only one goal in mind — to meet strict deadlines, while taken care of the full project management during building phase right up to the last piece of furniture.",
  groups: [
    {
      title: "The Office Team",
      members: [
        { name: "Leoni", role: "Senior Interior Designer" },
        { name: "Gosia", role: "Senior Architect & Interior Designer" },
        { name: "Arancha", role: "Senior Interior Designer & Manager" },
        { name: "Estíbaliz", role: "Andrea's Personal Assistant" },
        { name: "Sara", role: "HR Manager" },
        { name: "Lourdes", role: "Project Coordinator" },
        { name: "Irene", role: "Marketing" },
        { name: "Iván", role: "CGI Artist" },
        { name: "Nuria", role: "Senior Architect & Manager" },
        { name: "Mikel", role: "Architect" },
        { name: "Rafael", role: "Interior Architect" },
        { name: "Mayte", role: "Junior Architect" },
        { name: "Ana Macein Álvarez", role: "Senior Interior Designer & Manager" },
        { name: "Sara", role: "2D Drafter" },
        { name: "Maider", role: "Interior Designer" },
        { name: "Dorota", role: "Interior Designer" },
        { name: "Marta", role: "Interior Designer" },
        { name: "Alejandro", role: "Interior Designer" },
        { name: "Laura", role: "Junior Interior Designer" },
        { name: "Cecilia", role: "Showroom Coordinator & Designers Support" },
        { name: "Lucía", role: "Showroom Recepcionist" },
      ],
    },
    {
      title: "The Logistics Team",
      members: [
        { name: "Anna Maria", role: "Manager of Financial & Orders Operations" },
        { name: "Antonio", role: "Logistics & Installation Operations Manager" },
        { name: "Ana", role: "Logistic Coordinator" },
        { name: "María", role: "Logistic Coordinator" },
        { name: "Juan", role: "Team Leader & Installer" },
        { name: "Jesús González", role: "Installations Coordinator & Installer" },
        { name: "Antonio Villalobos", role: "Installer" },
        { name: "Sara", role: "Order Processor" },
        { name: "Jose Miguel", role: "Account Controller" },
        { name: "Oana", role: "Accounting Assistant" },
        { name: "Sergio", role: "Stock Controller" },
        { name: "Germán", role: "Stock Assistant" },
      ],
    },
  ] satisfies TeamGroup[],
};
