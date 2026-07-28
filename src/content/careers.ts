export type JobOpening = {
  title: string;
  email: string;
  requiresPortfolio: boolean;
};

export const careersContent = {
  title: "Careers",
  intro:
    "If you are a highly skilled, enthusiastic professional and you are interested in joining our team, we invite you to submit your CV.",
  about:
    "Established in 2002, Ambience is an International Interior Design and Architecture firm based in Marbella which has an extensive experience in both residential and commercial projects worldwide.",
  mission:
    "Skilled, flexible employees with initiative and innovation, underpin the future prosperity of our company. Together we create the brand. We strive to set trends and are at the forefront of domesticating materials, textures and patterns.",
  culture:
    "Honesty and integrity are the heart and soul of Ambience's corporate culture. Our actions and methods are held to fulfill impeccable and high moral standards. We take full responsibility for our actions and their consequences.",
  openings: [
    { title: "Senior Architect", email: "careers@ambiencehomedesign.com", requiresPortfolio: true },
    { title: "Interior Designer", email: "careers@ambiencehomedesign.com", requiresPortfolio: true },
    { title: "Architect", email: "careers@ambiencehomedesign.com", requiresPortfolio: true },
    { title: "Aux Administration", email: "careers@ambiencehomedesign.com", requiresPortfolio: false },
    { title: "Reception", email: "careers@ambiencehomedesign.com", requiresPortfolio: false },
    { title: "Installations", email: "careers@ambiencehomedesign.com", requiresPortfolio: false },
  ] satisfies JobOpening[],
};
