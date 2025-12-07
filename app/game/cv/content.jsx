    import Typewriter from "@/components/animations/typewriter";

    const ContentFirst = () => {
        return (
            <Typewriter speed={60} pause={1000}>
                <p>Aaron Currie - Full Stack Developer</p>
                <p>Experience: 2.5 years</p>
                <p>Current Employer: Sky UK</p>
                <p>Certifications: GCP Associate Cloud Engineer</p>
                <p>Interests: Snowboarding, Mountain Biking, Hiking</p>
            </Typewriter>
        )
    }

    const ContentSecond = () => {
        return (
            <Typewriter speed={60} pause={1000}>
                <p>Agent is a full-stack developer with a strong focus on modern frontend frameworks and growing experience in cloud-native backend systems.</p>
                <p>He is proficient in React, Next.js, and has a solid understanding of backend technologies like Node.js and Express.</p>
            </Typewriter>
        )
    }

    const ContentThird = () => {
        return (
            <Typewriter speed={60} pause={1000}>
                <p>Skills:</p>
                <p>Front-end: React, React Native, Next.js, HTML, CSS</p>
                <p>Back-end: Node.js, Express, Koa, REST APIs</p>
                <p>DevOps & Cloud: GCP, AWS, Terraform, Docker, CI/CD, CircleCI, Octopus deploy</p>
                <p>Other Tools: Git, Jest, Cypress</p>
            </Typewriter>
        )
    }

    export { ContentFirst, ContentSecond, ContentThird };
