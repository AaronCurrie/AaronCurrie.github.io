import CollapsableSection from "@/components/collapsable-section/collapsable-section";

const About = () => {
    return (
        <div>
                <p>I'm a full-stack developer with a strong focus on modern frontend frameworks and growing experience in cloud-native backend systems. At Sky, I’ve built accessible, modular, production-ready features using React, Next.js, and GCP - contributing across the full software lifecycle from infrastructure to UI.</p>
                <p>I take pride in writing clean, maintainable code, mentoring junior developers, and continuously levelling up my skills whether it’s leading a project, improving pipelines with Terraform, or implementing scalable architecture.</p>
                <p>Originally from a non-tech background, I bring a grounded, hands-on approach to building software that works.</p>
                <CollapsableSection title='Technologies'>
                    <p>As a full-stack engineer, I have operated across the entire tech stack, building front-end interfaces, REST APIs, and deploying cloud infrastructure.</p>
                    <ul>
                        <li>Front-end: React, React Native, Next.js, HTML, CSS</li>
                        <li>Back-end: Node.js, Express, Koa, REST APIs</li>
                        <li>DevOps & Cloud: GCP, AWS, Terraform, Docker, CI/CD, CircleCI, Octopus deploy</li>
                        <li>Other Tools: Git, Jest, Cypress</li>
                    </ul>
                </CollapsableSection>
        </div>
    )
}

export default About;