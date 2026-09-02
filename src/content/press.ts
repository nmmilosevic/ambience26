export type PressItem = {
  publication: string;
  date?: string;
  quote: string;
};

export const pressContent = {
  title: "Press",
  intro: "Editorials, magazines, and media coverage featuring Ambience Home Design.",
  editorials: [
    {
      publication: "Essential Magazine",
      date: "September 2018",
      quote:
        "Ambience Home Design has been contracted to completely redesign and furnish an old villa in the heart of the renowned Puente Romano area.",
    },
    {
      publication: "Utopia Magazine",
      date: "January 2019",
      quote:
        "We are happy to announce that Ambience has been awarded a prize by the European Property Awards for the Interior Design project of La Perla Blanca on the New Golden Mile.",
    },
    {
      publication: "Design Marbella",
      date: "January 2019",
      quote:
        "I wanted to be somewhere where you have great weather by the sea, with an international feel and people living there from all over.",
    },
    {
      publication: "Perfect Homes International",
      date: "March 2015",
      quote:
        "I find Marsala to be both elegant and sophisticated yet seductive with its earthy vibe.",
    },
  ] satisfies PressItem[],
  video: {
    title: "Interview with the CEO for Bloomberg Television",
    description: "Take a look at Ambience behind the scenes.",
    vimeoId: "244640632",
    poster: "/media/captura-video-entrevista-c85357df.jpg",
  },
  showroom: {
    title: "Showroom films",
    description: "A quiet walk through the Golden Mile showroom atmosphere.",
    poster: "/media/captura-video-15-amiversario-c408a5e5.jpg",
    href: "/projects/new-showroom-golden-mile-marbella",
  },
};
