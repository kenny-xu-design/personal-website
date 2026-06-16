import AboutSection from "./components/AboutSection";
import AnimationDirector from "./components/AnimationDirector";
import ContactSection from "./components/ContactSection";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ScrollProgress from "./components/ScrollProgress";
import SelectedWorks from "./components/SelectedWorks";
import StrengthsSection from "./components/StrengthsSection";

export default function App() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-ink-950 text-white">
      <ScrollProgress />
      <AnimationDirector />
      <Header />
      <Hero />
      <div className="post-hero-bg relative overflow-hidden">
        <AboutSection />
        <SelectedWorks />
        <StrengthsSection />
        <ContactSection />
      </div>
    </main>
  );
}
