import TimeLine from "./components/timeline";
import Hero from "./components/hero";
import ProjectsSection from "./components/projects";
import About from "./components/about";
import { projects } from "@/constants/projects";
import { experience } from "@/constants/experience";

export default function MenuPage() {
        return (
        <div>
            <Hero/>
            <About/>
            <ProjectsSection projects={projects}/>
            <TimeLine experience={experience} />
        </div>
    );
}