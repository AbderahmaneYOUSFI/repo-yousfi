import { CareerPathPage, careerPathMetadata } from "@/components/career-path-page";

export const metadata = careerPathMetadata("digital");

export default function DigitalPage() {
  return <CareerPathPage slug="digital" />;
}
