import { Hero } from '@/components/sections/hero';
import { CompetenciesGrid } from '@/components/sections/competencies-grid';
import { ProcessStepper } from '@/components/sections/process-stepper';
import { Certifications } from '@/components/sections/certifications';
import { ProjectsShowcase } from '@/components/sections/projects-showcase';
import { FacilityTable } from '@/components/sections/facility-table';
import { SectorsGrid } from '@/components/sections/sectors-grid';
import { LogoCloud } from '@/components/sections/logo-cloud';
import { BlogInsights } from '@/components/sections/blog-insights';
import { CareersList } from '@/components/sections/careers-list';
import { RFQWizard } from '@/components/sections/rfq-wizard';
import { ContactDetails } from '@/components/sections/contact-details';

export default function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <>
      <Hero locale={locale} />
      <LogoCloud />
      <CompetenciesGrid />
      <ProcessStepper />
      <Certifications />
      <ProjectsShowcase />
      <FacilityTable />
      <SectorsGrid />
      <CareersList locale={locale} />
      <BlogInsights locale={locale} />
      <RFQWizard locale={locale} />
      <ContactDetails />
    </>
  );
}
