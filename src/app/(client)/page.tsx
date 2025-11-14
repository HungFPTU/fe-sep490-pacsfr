import { UncleHoTeachings } from "@/shared/components/home/UncleHoTeachings.com";
import { NewProceduresCarousel } from "@/shared/components/home/NewProceduresCarousel.com";
import { ServicePageView } from "@/modules/client/service";
import { OnlineServices } from "@/shared/components/home/OnlineServices.com";
import { StatisticsSection } from "@/shared/components/home/StatisticsSection.com";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <UncleHoTeachings />
      <NewProceduresCarousel />
      <ServicePageView />
      <OnlineServices />
      <StatisticsSection />
    </div>
  );
}
