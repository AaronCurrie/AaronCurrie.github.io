import HeroSection from '@/components/quick-profile-comps/hero-section';
import AboutSection from '@/components/quick-profile-comps/about-section';
import TechSection from '@/components/quick-profile-comps/tech-section';
import PortfolioHologram from '@/components/quick-profile-comps/portfolio-hologram';
import ExperienceTimeline from '@/components/quick-profile-comps/experience-timeline';
import CVSection from '@/components/quick-profile-comps/cv-section';
import { experience } from '@/constants/experience';

export default function QuickPortfolioPage() {
    return (
        <main style={{ overflowX: 'clip' }}>
            <HeroSection />
            <AboutSection />
            <TechSection />
            <PortfolioHologram />
            <ExperienceTimeline experience={experience.slice(0, 5)} />
            <CVSection />
        </main>
    );
}