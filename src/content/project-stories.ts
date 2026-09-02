/**
 * Project body copy restored from the live WordPress project pages.
 * Only real studio text: never invent client stories.
 */
export type ProjectStory = {
  location?: string;
  body: string[];
};

function sentenceCase(paragraph: string): string {
  const trimmed = paragraph.replace(/\[TheChamp-Sharing\]\s*/gi, "").trim();
  if (!trimmed) return "";
  // WP sometimes ships entire paragraphs in caps.
  if (trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed)) {
    const lower = trimmed.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return trimmed;
}

function cleanBody(paragraphs: string[]): string[] {
  return paragraphs
    .map(sentenceCase)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter((p) => p.length > 40);
}

const raw: Record<string, ProjectStory> = {
  "la-perla-blanca-new-golden-mile-spain": {
    location: "Estepona, Spain",
    body: [
      "A spectacular 12 bedrooms property with over 2000m2 living space and situated on the frontline beach is currently for sale.",
      "Ambience was not only hired to completely furnish this beauty, but to also introduce some architectural features in the interiors such as wall claddings, vertical gardens, fireplace designs and an impressive bar on the roof-top terrace.",
      "A combination of bespoke furniture, intelligently combined with top brands such as Baxter, Arketipo, Morosso, Galotti & Radice, to name a few, were key factors in the outcome of this very special interior.",
      "These potential spaces both in the interior and exterior became the blank canvas we took on board to layout the key ambiences that would intensify the experience of total luxury living and comfort: our client's Nº1 requirement.",
      "Ambience expresses, always in the pursuit of innovation and attention to detail with each project the level of commitment that Ambience has with the pursuit of innovation and the sensitivity to detail on each project.",
    ],
  },
  emare: {
    location: "Beach front on the New Golden Mile",
    body: [
      "We had a blank canvas with this lush 2 floor villa-apartment situated right on the beach front on the new golden mile.",
      "The entire property has white floor tiles throughout so our concept was to create a luxury beach style apartment. This meant for us that we would incorporate a lot of wooden elements combining them with natural textiles such as linens, cotton and leathers.",
      "Rather than playing with colours we kept the pallet neutral but used bold patterns, fusing together lots of different textures, including Black features such as the coffee table from Arketipo and the lights from Vibia, looking for that striking contrast. We love to occasional chair from Poltrona frau to sit proudly in the corner next to the fire place.",
      "Talking about the fireplace, we designed this beauty to achieve a vocal point in the living area using sand colour wood combined with a black micro cement base to enhance the beach feel we were looking for. In the master bedroom we opted for a shining Baxter leather bed. The clients wish was to have wall mounted bed side tables so we designed a wooden panelling behind the bed as a luxury backdrop.",
    ],
  },
  "icon-beach-villa-marbella-spain": {
    location: "Marbella, Spain",
    body: [],
  },
  "coworking-space": {
    location: "London, UK",
    body: [
      "OUR IDEA FOR CENTRO HOUSE WAS TO DESIGN A UNIQUE WORK ENVIRONMENT THAT OFFERS DIFFERENT CO-WORKING OPTIONS WITHIN ITS IMPRESSIVE 800 M2 PROVIDING AN ELEGANT AND RELAYED VERSATILITY.",
      "ITS EXQUISITE DESIGN IS NOT LACKING LUXURY, IT BRINGS A MODERN, YET VINTAGE TOUCH TO A SHARED SPACE.",
      "CENTRO HOUSE OFFERS MANY WORKING OPTIONS, FROM STATIONARY DESKS, PRIVATE OFFICES, CONFERENCE FACILITIES, AN EXECUTIVE BOARDROOM FOR UP TO 12 PEOPLE, VARIOUS MEETING ROOMS, AND PLENTY OF NETWORKING SPACES. THE DIFFERENT WORKING SPACES ARE CREATED BY FINDING THE PERFECT MATCH BETWEEN MATERIALS, SHAPES, STYLES AND COLOURS TO INSPIRE ITS GUESTS AND TO INCREASE PRODUCTIVITY.",
    ],
  },
  "home-la-zagaleta-benahavis-spain-2": {
    location: "Benahavís, Spain",
    body: [
      "Sitting on a hilltop with spectacular seaviews over to Morocco, this beautiful 6-bedroom villa situated in La Zagaleta was finely furnished with an elegant and contemporary style.",
      "Smokey mirrors, high gloss Zebrano woods, aged brass, colorfull artworks and a variety of luxurious fabrics were some of the elements used to give the space a touch of glamour.",
      "We used brands such as Arketipo, Poltrona Frau, Exteta among others. One of our favourite pieces was the 4 metre dining table in beautiful American walnut by Riva 1920.",
    ],
  },
  "hong-kong": {
    location: "Hong Kong Island",
    body: [
      "Ambience was chosen to design the interior of this 3-bedroom Condo in a new luxury built complex located on mid-level Hong Kong Island.",
      "Our talented team not only installed furniture, we also designed and installed all the custom built in wardrobes, the elegant and exquisite TV unit from floor to ceiling and the stunning American walnut wall cladding for the living area to enhance the feeling of luxury and elegance.",
      "All our custom-built items were produced and designed in Spain given it the European feel our clients were looking for.",
      "It was a pleasure to see our design in Hong Kong meet all expectations and we are honored that our clients entrusted this remarkable project to us.",
    ],
  },
  "casa-del-mar": {
    location: "Marbesa, Marbella",
    body: [
      "Casa del Mar is definitely one of the most impressive modern houses by the beach and the perfect fusion of luxury and elegance.",
      "Situated just meters from the beach on a spectacular plot in one of the trendiest beach resorts in Marbella, Marbesa. Casa del Mar is a tailor-made home with a complete concept that integrates large outdoors areas, a spacious home and beautiful interiors , all designed and customized to provide a chic luxury living by the sea.",
      "Casa del Mar is a top quality home with unlimited modernity and luxury. The chic interiors offer sophistication and style at its best, floor to ceiling windows that allow plenty of light, an indoor patio with a mature olive tree, beautiful internal French windows and plenty of space. The villa offers an impressive entrance hall, a stylish living room with a modern fireplace and a separate dining room.",
      "The house enjoys 5 luxury en-suite bedrooms with a unique and delicate design, two of them being the main suites, both with a separate sitting area as well as a separate dressing area, with captivating views to the gardens.",
    ],
  },
  "equestrian-estate": {
    location: "Marbella, Spain",
    body: [
      "The interior of this property exudes fresh elegance with a contemporary equestrian touch.",
      "Neutral tones set the mood in this spacious villa, and in contrast the bespoke carpentry designed , such as the bar and office library , frame the space beautifully with its deep wood tones.",
      "These potential spaces both in the interior and exterior became the blank canvas we took on board to layout the key ambiences that would intensify the experience of total luxury living and comfort: our client's Nº1 requirement.",
      "Large contemporary pieces of furniture were our choice to fill the ample spaces, whilst accent pieces, such as high-back armchairs, large lamps, bespoke artworks and accessories give the space a warm and inviting feel.",
      "Ambience was also commissioned to design the kitchen and bathrooms as well as the spa area, cinema room and roof-top terrace.",
    ],
  },
  "hotham-united-kingdom-2": {
    location: "Hotham, UK",
    body: [
      "Ambience was contracted to design the interiors for this 25-hectare mansion with its own 3 lakes. Not only did we deliver the entire furniture for this house but also designed and manufactured a bespoke bar, some beautiful rugs, sophisticated wall panelings in some of the rooms and two spectacular cladded concrete pillars with a beautiful lit up crystal lights.",
      "The mix of classic and modern materials and bespoke carpentry make of this luxurious residence a very special interior design project.",
      "This is a classic yet contemporary design project, using elements such as mixed metals, crystal prisms, bold patterns on the rugs and bespoke carpentry, make this a luxurious residential project, one we look forward to furnishing very soon.",
    ],
  },
  "boutique-hotel": {
    body: [
      "THIS GUEST HOUSE PROVIDES PRIVATE AND COSY SPACES WITH 4 EXCLUSIVE EN-SUITE DOUBLE ROOMS. ALL SPACES ARE DESIGNED TO PERFECTION SO THE GUESTS CAN FEEL PAMPERED AND RELAXED. THEY HAVE ACCESS TO THE POOL, GYM, AND WELLNESS FACILITIES, SUCH AS WEEKLY YOGA CLASSES. THEIR STAY IS COMPLETED BY A SHARED LUXURY KITCHEN, VIBRANT LOUNGES, CHILL-OUT AREAS, A BEAUTIFUL SUN TERRACE, DINING ROOMS, AND OPEN SPACES.",
    ],
  },
  "el-arenal-marbella-spain-2": {
    location: "Marbella, Spain",
    body: [
      "The interior of this front-line beach house was conceptualised to feel plush and glamourous within a modern design.",
      "The interior delicately layered in various shades of powder pinks, bronze and metallic finishes makes this design unique to its own.",
      "Bronze and metal combined with velvet and silky satins give this design project a glamorous and modern feel.",
      "The materials such as bronze mirrors, metalised lacquers, crushed velvets and silky satins evoke total luxury, whilst the large beach beds and bamboo dividers on the roof-top terrace bring an easy-going Ibiza feel: the perfect setting to enjoy a beautiful sunset view.",
    ],
  },
  "villa-in-monte-halcones-benahavis-spain-2": {
    location: "Benahavís, Spain",
    body: [
      "This charming Mediterranean villa is exquisitely designed with elegant style.",
    ],
  },
  "columbus-hill-marbella-spain-2": {
    location: "Marbella, Spain",
    body: [],
  },
  "villa-in-puente-romano-marbella-spain-3": {
    location: "Marbella, Spain",
    body: [],
  },
  "ambience-showroom-2": {
    location: "Marbella, Spain",
    body: [],
  },
  "sales-office-in-marbella-2": {
    location: "Marbella, Spain",
    body: [],
  },
  "estrellas-del-mar-sales-office": {
    location: "Marbella, Spain",
    body: [],
  },
  "lucas-fox-international-properties": {
    location: "Marbella, Spain",
    body: [],
  },
};

export const projectStories: Record<string, ProjectStory> = Object.fromEntries(
  Object.entries(raw).map(([slug, story]) => [
    slug,
    {
      location: story.location,
      body: cleanBody(story.body),
    },
  ])
);

export function getProjectStory(slug: string): ProjectStory | undefined {
  const story = projectStories[slug];
  if (!story) return undefined;
  if (!story.location && story.body.length === 0) return undefined;
  return story;
}
