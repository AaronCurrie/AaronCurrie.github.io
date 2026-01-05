import TimeLine from "../../components/quick-profile-comps/timeline";
import Hero from "../../components/quick-profile-comps/hero";
import ProjectsSection from "../../components/quick-profile-comps/projects";
import About from "../../components/quick-profile-comps/about";
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