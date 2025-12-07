import CollapsableSection from '@/components/collapsable-section/collapsable-section';
import styles from './page.module.css'
import { qestrArray } from '@/constants/questrArray';
import ImageGrid from '@/components/image-grid/image-grid';
import { hobbies } from '@/constants/hobbies';
import AnimatedLights from '@/components/animations/animated-lights';
import CarouselWrapper from '@/components/carousel-wrapper/carousel-wrapper';
import Typewriter from '@/components/animations/typewriter';

export default function AboutMe() {
    return (
        <main className={`main-offset ${styles.profileMain}`}>
            <section className={`${styles.section} ${styles.profileHeader}`}>
                <img src='/profilepic.png'/>
                <div className='flex-col'>
                    <h1>Dossier: Aaron Currie</h1>
                    <Typewriter speed={60} pause={200}>
                        <p>Agent Code: AC1178</p>
                        <p>Full-Stack Software Engineer | React & Next.js | Google Cloud Certified</p>
                    </Typewriter>
      
                </div>
            </section>
            <CollapsableSection title='Bio'>
                <p>I'm a full-stack developer with a strong focus on modern frontend frameworks and growing experience in cloud-native backend systems. At Sky, I’ve built accessible, modular, production-ready features using React, Next.js, and GCP - contributing across the full software lifecycle from infrastructure to UI.</p>
                <p>I take pride in writing clean, maintainable code, mentoring junior developers, and continuously levelling up my skills whether it’s leading a project, improving pipelines with Terraform, or implementing scalable architecture.</p>
                <p>Originally from a non-tech background, I bring a grounded, hands-on approach to building software that works.</p>
            </CollapsableSection>
            <CollapsableSection title='Current Mission'>
                <div className='flex-col'>
                    <h3>Software Engineer</h3>
                    <h4>Sky UK</h4>
                    <h4>Jan 2023 - Present</h4>
                        <ul>
                            <li>Led migration from Next.js Pages Router to App Router, improving codebase scalability and developer experience.</li>
                            <li>{'Designed and implemented a secure, scalable article ingestion pipeline using GCP (API Gateway, Cloud Functions, Pub/Sub).'}</li>
                            <li>Migrated search from Azure to Elasticsearch, enhancing search performance and reliability.</li>
                            <li>Mentored new engineers and technically led a graduate team on an internal tool, covering planning, PR reviews, and architectural guidance.</li>
                            <li>Integrated authentication across stage sites with NextAuth and custom middleware.</li>
                            <li>{'Cybersecurity Champion for my team, ensuring best practices across development'}</li>
                            <li>{'Key contributor on a team building a dynamic website builder platform (similar to Squarespace/Wix) for Sky-branded sites using Next.js and React.'}</li>
                            <li>{'Built reusable component libraries and introduced a column-based layout system, significantly enhancing editorial design flexibility.'}</li>
                            <li>{'Built and maintained CI/CD infrastructure with CircleCI, Octopus, and Terraform.'}</li>
                            <li>{'Introduced and maintained functional testing suite using Cypress.'}</li>
                        </ul>
                </div>
            </CollapsableSection> 
            <CollapsableSection title='Training'>
                    <h3>Full-Stack Software Development Bootcamp</h3>
                    <p>North Coders</p>
                    <p>Aug 2022 – Dec 2022</p>
                        <ul>
                            <li>Intensive, industry-led training in JavaScript and modern web development.</li>
                            <li>Fundamentals: Core JavaScript, algorithms, TDD, Git.</li>
                            <li>Back-end: Built and hosted a RESTful API using Node.js, Express, PostgreSQL, and CI/CD pipelines.</li>
                            <li>Front-end: Developed React apps using components, hooks, and context.</li>
                            <li>Final Project: Created a full-stack application as part of a team, integrating new technologies independently.</li>
                        </ul>
                    <br></br>
                    <div className='flex-col'>
                        <h3>Northcoders Final Project</h3>
                        <h4>Name: Questr</h4>
                        <h4>{'Technologies: React Native, Expo, AWS (Cognito for authentication, DynamoDB for database)'}</h4>
                        <h4>App Description:</h4>
                        <p>Questr is a gamified mobile app designed to get users off the couch and into their local environment. The app overlays real-world quests onto a map of your city, turning everyday locations into opportunities for discovery.</p>
                        <p>Users complete a variety of location-based missions - from taking photos and solving puzzles, to answering questions or engaging in mini battle games - all designed to encourage exploration and interaction. Successful missions reward players with experience points and in-game currency, which can be spent on custom avatars and upgrades.</p>
                        <p>The app combines fun gameplay with real-world movement, offering a playful alternative to traditional city exploration.</p>
                        <CarouselWrapper>
                            {qestrArray.map((quest, index) => {
                                return (
                                    <img
                                    key={index}
                                    src={quest.image}
                                    alt={`Slide ${index}`}
                                    className={`${styles.carouselImage}`}
                                />
                                )
                            })}
                        </CarouselWrapper>
                    </div>
            </ CollapsableSection>
            <CollapsableSection title='Technologies'>
                <p>As a full-stack engineer, I have operated across the entire tech stack, building front-end interfaces, REST APIs, and deploying cloud infrastructure.</p>
                <ul>
                    <li>Front-end: React, React Native, Next.js, HTML, CSS</li>
                    <li>Back-end: Node.js, Express, Koa, REST APIs</li>
                    <li>DevOps & Cloud: GCP, AWS, Terraform, Docker, CI/CD, CircleCI, Octopus deploy</li>
                    <li>Other Tools: Git, Jest, Cypress</li>
                </ul>
            </CollapsableSection>
            <CollapsableSection title='Background Intelligence'>
                <p>Base of Operations: Leeds</p>
                <p>Previous Deployments: UK, Australia, New Zealand — Mission roles: Lab technician, Bar manager, Hospitality.</p>
                <p>{'Current Training: Ongoing ops in cloud engineering (GCP cloud developer professional), HacktheBox cyber security training and side-project development (snowboading trick tacking app).'}</p>
                <p>Currently Reading: Clean code, Robert C. Martin, Stormlight Archive, Branden Sanderson, Nexus, Yuval Harai</p>
                <p>Special Interests: Snowboarding, Touring, Mountain biking, Hiking</p>
                <ImageGrid images={hobbies}/>
            </CollapsableSection>
            <AnimatedLights />
        </main>
    );
}