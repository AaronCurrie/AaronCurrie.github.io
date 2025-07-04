import CollapsableSection from '@/components/collapsable-section/collapsable-section';
import styles from './page.module.css'

export default function AboutMe() {
    return (
        <main className={`main-offset ${styles.profileMain}`}>
            <section className={`${styles.section} ${styles.profileHeader}`}>
                <img src='/profilepic.png'/>
                <div className='flex-col'>
                    <h1>Dossier: Aaron Currie</h1>
                    <h2>Agent Code: AC1178</h2>
                    <p>Full-Stack Software Engineer | React & Next.js | Google Cloud Certified</p>
                </div>
            </section>
            <CollapsableSection title='Bio'>
                <p>Agent is a full-stack developer with a strong focus on modern frontend frameworks and growing experience in cloud-native backend systems. On previous missions they built accessible, modular, production-ready features using React, Next.js, and GCP - contributing across the full software lifecycle from infrastructure to UI.</p>
                <p>They write clean, maintainable code, mentoring junior developers, and continuously levelling up skills whether it’s leading a project, improving pipelines with Terraform, or implementing scalable architecture.</p>
                <p>Originally from a non-tech background, They bring a grounded, hands-on approach to building software that works.</p>
            </CollapsableSection>
            <section className={styles.section}>
                <h2>Experience</h2>
                <div>
                    <h3>Title</h3>
                    <p>Company</p>
                    <p>Dates</p>
                    <div>
                        <p>Responsibilities</p>
                        <ul>
                            <li>Responsibility 1</li>
                            <li>Responsibility 2</li>
                            <li>Responsibility 3</li>
                        </ul>
                    </div>
                </div>
            </section> 
            <section className={styles.section}>
                <h2>Education</h2>
                <div>
                    <h3>Degree</h3>
                    <p>Institution</p>
                    <p>Dates</p>
                    <div>
                        <p>Highlights</p>
                        <ul>
                            <li>Highlight 1</li>
                            <li>Highlight 2</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className={styles.section}>
                <h2>Skills</h2>
                <ul>
                    <li>Skill 1</li>
                    <li>Skill 2</li>
                    <li>Skill 3</li>
                </ul>
            </section>
                   
        </main>
    );
}