import AboutSection from "./components/AboutSection";
import AnimationDirector from "./components/AnimationDirector";
import ContactSection from "./components/ContactSection";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LabsSection from "./components/LabsSection";
import ScrollProgress from "./components/ScrollProgress";
import SelectedWorks from "./components/SelectedWorks";
import StrengthsSection from "./components/StrengthsSection";
import TomatoDeskProject from "./components/TomatoDeskProject";
import VideoInsightProject from "./components/VideoInsightProject";

export default function App() {
  if (window.location.pathname.replace(/\/$/, "") === "/projects/tomatodesk") {
    return <TomatoDeskProject />;
  }
  if (window.location.pathname.replace(/\/$/, "") === "/projects/video-insight") {
    return <VideoInsightProject />;
  }
  return (
    <main className="min-h-screen overflow-x-hidden bg-ink-950 text-white">
      <ScrollProgress />
      <AnimationDirector />
      <Header />
      <Hero />
      <div className="post-hero-bg relative overflow-hidden">
        <AboutSection />
        <SelectedWorks />
        <LabsSection />
        <StrengthsSection />
        <ContactSection />
      </div>
    </main>
  );
}
