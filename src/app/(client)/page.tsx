import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";
import { UncleHoTeachings } from "@/shared/components/home/UncleHoTeachings.com";
import { NewProceduresCarousel } from "@/shared/components/home/NewProceduresCarousel.com";
import { AdministrativeProcedures } from "@/shared/components/home/AdministrativeProcedures.com";
import { OnlineServices } from "@/shared/components/home/OnlineServices.com";
import { StatisticsSection } from "@/shared/components/home/StatisticsSection.com";
import { ServicesListView } from "@/modules/client/services/components/view/list/ServicesListView.view";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <GovernmentHeader showBreadcrumb={false} currentPage="home" />
      <UncleHoTeachings />
      <NewProceduresCarousel />
      <AdministrativeProcedures />
      <OnlineServices />
      <ServicesListView />
      <StatisticsSection />
    </div>
  );
}
