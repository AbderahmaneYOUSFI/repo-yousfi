export type CareerPathSlug = "ai-data" | "software" | "digital";
export type CareerPathAccent = "cyan" | "indigo" | "teal";

export type CareerPath = Readonly<{
  slug: CareerPathSlug;
  name: string;
  description: string;
  introduction: string;
  accent: CareerPathAccent;
  metadataDescription: string;
}>;

export const careerPaths = [
  {
    slug: "ai-data",
    name: "AI & Data",
    description: "Explore the connection between data, intelligent systems and useful software.",
    introduction: "This perspective focuses on applied artificial intelligence and data: understanding problems, exploring information and considering how intelligent systems can support useful software. It connects technology with the questions and decisions it serves.",
    accent: "cyan",
    metadataDescription: "Explore an AI and data perspective focused on applied artificial intelligence, intelligent software and informed decisions.",
  },
  {
    slug: "software",
    name: "Software Engineering",
    description: "Explore software through clear architecture, thoughtful decisions and usable products.",
    introduction: "This perspective focuses on building thoughtful digital products through clear architecture and considered technical decisions. It brings attention to how software is structured, how it serves people and how it can remain understandable as it evolves.",
    accent: "indigo",
    metadataDescription: "Explore a software engineering perspective focused on thoughtful digital products, clear architecture and technical decisions.",
  },
  {
    slug: "digital",
    name: "Digital Transformation",
    description: "Explore how information systems connect technology, business processes and people.",
    introduction: "This perspective connects industrial engineering and information systems with business processes and technology. It focuses on understanding how people and organizations work, and where data and software can support meaningful digital change.",
    accent: "teal",
    metadataDescription: "Explore a digital transformation perspective connecting information systems, business processes, people and technology.",
  },
] as const satisfies readonly CareerPath[];

export function careerPathHref(slug: CareerPathSlug) {
  return `/paths/${slug}` as const;
}

export function getCareerPath(slug: CareerPathSlug): CareerPath {
  const path = careerPaths.find((entry) => entry.slug === slug);
  if (!path) throw new Error(`Missing career path definition: ${slug}`);
  return path;
}
