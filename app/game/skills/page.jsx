'use client';
import React from 'react';
import styles from './page.module.css';
import { tech } from '@/constants/tech';
import CollapsableSection from '@/components/collapsable-section/collapsable-section';
import FlipGrid from '@/components/flip-grid/flip-grid';
import Cards from '@/components/cards/cards';
import AnimatedLights from '@/components/animations/animated-lights';
import { skills } from './skills-data';
import Tabs from '@/components/tabs/tabs';

const SkillsPage = () => {
    return (
        <main className={`flex-col flex-center main-offset ${styles.container}`}>
            <h1>Skills</h1>
            <Tabs tabs={skills} />

            <CollapsableSection title="Tech At A Glance">
            <FlipGrid>
                {tech.map((item, index) => {
                    return <FlipGrid.Item key={index}>
                        <FlipGrid.ItemFront>
                            <img src={item.icon} alt="Skills Icon" className={styles.logo} />
                        </FlipGrid.ItemFront>
                        <FlipGrid.ItemBack>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </FlipGrid.ItemBack>
                    </FlipGrid.Item>
                })}
            </FlipGrid>
            </CollapsableSection>
            <section className={styles.section}>
                <Cards>
                    <Cards.Item size='md'>
                        <img src="/skills/coms.png" />
                        <div className={styles.cardContent}>
                            <h3>Communication</h3>
                            <p>Clear and confident communicator across both technical and non-technical audiences. The agent regularly presents ideas, contributes to team discussions, working with designers and product owners enabling shared understanding and smooth collaboration.</p>
                        </div>
                    </Cards.Item>
                    <Cards.Item size='md'>
                        <img src="/skills/leadership.png" />
                        <div className={styles.cardContent}>
                            <h3>Leadership</h3>
                            <p>In previous management roles, The agent led teams of up to 20 people, balancing operations, training, and motivation. They now apply those leadership skills in tech by mentoring juniors, taking ownership of features, and driving improvement in team workflows.</p>
                        </div>
                    </Cards.Item>
                    <Cards.Item size='md'>
                        <img src="/skills/learning.png" />
                        <div className={styles.cardContent}>
                            <h3>Self-Learning</h3>
                            <p>Starting out as a self learner with front-end development to completing a full-stack bootcamp, The agent has shown take ownership of learning and development and are able to pick up new skills quickly. They enjoy experimenting with new tech and building side projects.</p>
                        </div>
                    </Cards.Item>
                    <Cards.Item size='md'>
                        <img src="/skills/teamwork.png" />
                        <div className={styles.cardContent}>
                            <h3>Teamwork</h3>
                            <p>Having worked in high-pressure team environments—from software teams to managing hospitality staff, they thrive when working with others. They are proactive about supporting teammates, resolving conflicts, and sharing knowledge to help everyone succeed.</p>
                        </div>
                    </Cards.Item>
                    <Cards.Item size='md'>
                        <img src="/skills/problem.png" />
                        <div className={styles.cardContent}>
                            <h3>Problem Solving</h3>
                            <p>Whether debugging code or streamlining a customer-facing process, The agent brings a logical, curious, and solution-focused mindset. They thrive when dissecting complex problems and building clean, reliable solutions.</p>
                        </div>
                    </Cards.Item>
                    <Cards.Item size='md'>
                        <img src="/skills/adaptability.png" />
                        <div className={styles.cardContent}>
                            <h3>Adaptability</h3>
                            <p>Having transitioned careers, worked internationally, and navigated fast-paced environments. The agent has proven they can adapt quickly to new tools, teams, and challenges—remaining calm and effective under pressure.</p>
                        </div>
                    </Cards.Item>
                </Cards>
            </section>
            <AnimatedLights />
        </main>
    );
};

export default SkillsPage;