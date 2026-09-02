export type TeamMember = {
  name: string;
  role: string;
  image?: string;
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
    image: "/media/andrea-ambience-home-design-86768ef2.jpg",
    bio: [
      "Her unequivocal taste for contemporary and luxurious interiors has launched Ambience the leading interior design firm on the Coast.",
      "Andrea's creative eye and attention to detail, and passion for both décor and refurbishment projects, are equally matched by the experience and know-how she's acquired in the many years of dedication in the field, which have been keystone to Ambience's international success and expansion.",
      "Since 2002, Andrea has been commissioned to work on luxury projects in the UK, Belgium, The Netherlands, Germany, Egypt, Switzerland, Morocco, Italy, Hong Kong and St. Lucia, and has ongoing projects with renown architects and developers in both Spain and abroad.",
      "When Andrea is not thinking about the next Project or answering her emails, she enjoys traveling to far countries to find new inspirations and also antique items to bring back, Scuba diving, Horseback riding or hiking in the nature with her dogs.",
    ],
  },
  teamIntro:
    "Our international in-house team consists of not only creative, knowledgeable, motivated designers and architects, but also of a sizeable logistic and installation team with only one goal in mind - to meet strict deadlines, while taken care of the full project management during building phase right up to the last piece of furniture.",
  groupPhoto: "/media/staff-ambience-home-design-marbella-50acd8bb.jpg",
  groups: [
    {
      title: "The Office Team",
      members: [
        { name: "Leoni", role: "Senior Interior Designer", image: "/media/leonie-84024adb.jpg" },
        { name: "Gosia", role: "Senior Architect & Interior Designer", image: "/media/gosia-c449df38.jpg" },
        { name: "Arancha", role: "Senior Interior Designer & Manager", image: "/media/arancha-0b9a995b.jpg" },
        { name: "Estíbaliz", role: "Andrea's Personal Assistant", image: "/media/estibaliz-50d5386b.jpg" },
        { name: "Sara", role: "HR Manager", image: "/media/sara-3a973480.jpg" },
        { name: "Lourdes", role: "Project Coordinator", image: "/media/lourdes-6ce92a35.jpg" },
        { name: "Irene", role: "Marketing", image: "/media/irene-3586449a.jpg" },
        { name: "Iván", role: "CGI Artist", image: "/media/Ivan-921d1727.jpg" },
        { name: "Nuria", role: "Senior Architect & Manager", image: "/media/nuria-014c5a2d.jpg" },
        { name: "Mikel", role: "Architect", image: "/media/mikel--38b5c19e.jpg" },
        { name: "Rafael", role: "Interior Architect", image: "/media/rafael-981b43ed.jpg" },
        { name: "Mayte", role: "Junior Architect", image: "/media/mayte-6d950bfe.jpg" },
        { name: "Ana Macein Álvarez", role: "Senior Interior Designer & Manager", image: "/media/mar-56186dc4.jpg" },
        { name: "Sara", role: "2D Drafter", image: "/media/sara-rivas-be79f6ee.jpg" },
        { name: "Maider", role: "Interior Designer", image: "/media/maider-2a17c1c7.jpg" },
        { name: "Dorota", role: "Interior Designer", image: "/media/dorotea-d0dc7ccd.jpg" },
        { name: "Marta", role: "Interior Designer", image: "/media/marta-5cae4913.jpg" },
        { name: "Alejandro", role: "Interior Designer", image: "/media/alejandro-95fac45f.jpg" },
        { name: "Laura", role: "Junior Interior Designer", image: "/media/laura-ac694496.jpg" },
        { name: "Cecilia", role: "Showroom Coordinator & Designers Support", image: "/media/ceciliab-3ffda6ed.jpg" },
        { name: "Lucía", role: "Showroom Recepcionist", image: "/media/lucia-d584bdac.jpg" },
      ],
    },
    {
      title: "The Logistics Team",
      members: [
        { name: "Anna Maria", role: "Manager of Financial & Orders Operations", image: "/media/anna-maria-b99e55b2.jpg" },
        { name: "Antonio", role: "Logistics & Installation Operations Manager", image: "/media/Antonio-abb2b152.jpg" },
        { name: "Ana", role: "Logistic Coordinator", image: "/media/ana-d5d8bb25.jpg" },
        { name: "María", role: "Logistic Coordinator", image: "/media/maria-ambience-home-design-43391e1d.jpg" },
        { name: "Juan", role: "Team Leader & Installer", image: "/media/juan-c9e55fcf.jpg" },
        { name: "Jesús González", role: "Installations Coordinator & Installer", image: "/media/jesus-1a061dd3.jpg" },
        { name: "Antonio Villalobos", role: "Installer", image: "/media/antonio1-cae3ebf2.jpg" },
        { name: "Sara", role: "Order Processor", image: "/media/sara-3889734f.jpg" },
        { name: "Jose Miguel", role: "Account Controller", image: "/media/jose-miguel-0f3678a9.jpg" },
        { name: "Oana", role: "Accounting Assistant", image: "/media/oana-59877161.jpg" },
        { name: "Sergio", role: "Stock Controller", image: "/media/sergio-6afdae7a.jpg" },
        { name: "Germán", role: "Stock Assistant", image: "/media/german-5831cbb2.jpg" },
      ],
    },
  ] satisfies TeamGroup[],
};
