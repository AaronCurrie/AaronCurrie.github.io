'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import HudFrame from '@/components/hud/hud-frame';
import StatusIndicator from '@/components/hud/status-indicator';
import styles from './about-section.module.css';

const STATS = [
    { label: 'EXPERIENCE', value: '3+ YRS' },
    { label: 'PROJECTS', value: '6+' },
    { label: 'TECH STACK', value: '12 TOOLS' },
    { label: 'CLEARANCE', value: 'TOP SECRET' },
];

const BIO_PARAGRAPHS = [
    "I'm a full-stack software engineer based in Leeds, UK, currently working at Sky as a Software Engineer. I specialise in building scalable, high-performance web applications using modern frameworks like React, Next.js, and TypeScript.",
    "Over the past three years at Sky, I've delivered impactful projects across frontend architecture, cloud-native backends, and infrastructure automation — progressing from Associate to mid-level engineer within 15 months.",
    "I'm passionate about clean code, developer experience, and engineering systems that scale. Outside of work I'm a snowboarder, drummer, and aviation enthusiast — always seeking the next challenge.",
];

export default function AboutSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className={styles.about} ref={ref}>
            <div className={styles.sectionHeader}>
                <StatusIndicator status="active" label="AGENT DOSSIER" />
                <div className={styles.headerLine} />
            </div>

            <HudFrame entrance delay={0.15} className={styles.outerFrame}>
                <div className={styles.content}>
                    {/* Bio text */}
                    <div className={styles.textBlock}>
                        {BIO_PARAGRAPHS.map((para, i) => (
                            <motion.p
                                key={i}
                                className={styles.bio}
                                initial={{ opacity: 0, y: 40 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.15 }}
                            >
                                {para}
                            </motion.p>
                        ))}
                    </div>

                    {/* Stats panel */}
                    <div className={styles.statsPanel}>
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, x: 30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 + i * 0.12 }}
                            >
                                <HudFrame className={styles.statCard}>
                                    <p className={styles.statLabel}>{stat.label}</p>
                                    <p className={styles.statValue}>{stat.value}</p>
                                </HudFrame>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </HudFrame>
        </section>
    );
}
