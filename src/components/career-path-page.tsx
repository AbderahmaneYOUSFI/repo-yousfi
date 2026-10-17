import type { Metadata } from "next";
import { getCareerPath, type CareerPathSlug } from "@/data/career-paths";
import { profile } from "@/data/profile";
import { PortfolioPage } from "./portfolio-page";

export function careerPathMetadata(slug: CareerPathSlug): Metadata {
  const path = getCareerPath(slug);
  return { title: `${path.name} | ${profile.name}`, description: path.metadataDescription };
}

export function CareerPathPage({ slug }: { slug: CareerPathSlug }) {
  return <PortfolioPage slug={slug} />;
}
