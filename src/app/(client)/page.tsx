import { UncleHoTeachings } from "@/shared/components/home/UncleHoTeachings.com";
import { NewProceduresCarousel } from "@/shared/components/home/NewProceduresCarousel.com";
import { ServicePageView } from "@/modules/client/service";
import { OnlineServices } from "@/shared/components/home/OnlineServices.com";
import { PaknResponseSection } from "@/shared/components/home/PaknResponseSection.com";
import { FloatingAIChatButton } from "@/shared/components/home";
import {
  FaqSectionView,
  NewsHighlightsSectionView,
  StatisticsSectionView,
} from "@/modules/client/homepage";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <UncleHoTeachings />
      <NewProceduresCarousel />
      <ServicePageView />
      <OnlineServices />
      <FaqSectionView />
      <NewsHighlightsSectionView />
      <PaknResponseSection />
      <StatisticsSectionView />
      <FloatingAIChatButton />
    </div>
  );
}
