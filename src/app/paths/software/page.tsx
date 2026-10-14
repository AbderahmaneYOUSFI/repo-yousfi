import { CareerPathPage, careerPathMetadata } from "@/components/career-path-page";

export const metadata = careerPathMetadata("software");

export default function SoftwarePage() {
  return <CareerPathPage slug="software" />;
}
