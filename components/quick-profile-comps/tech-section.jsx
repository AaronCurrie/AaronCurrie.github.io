'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { tech } from '@/constants/tech';
import HudFrame from '@/components/hud/hud-frame';
import StatusIndicator from '@/components/hud/status-indicator';
import styles from './tech-section.module.css';

const CATEGORIES = {
    FRONTEND: ['JavaScript', 'React', 'HTML', 'CSS', 'React Native', 'TypeScript'],
    BACKEND: ['Node.js', 'TypeScript', 'Jest'],
    DEVOPS: ['Docker', 'Git', 'GCP', 'Terraform'],
};

export default function TechSection() {
    const [active, setActive] = useState('FRONTEND');
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    const filtered = tech.filter((t) => CATEGORIES[active].includes(t.name));

    return (
        <section id="tech" className={styles.techSection} ref={ref}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.sectionHeader}>
                    <StatusIndicator status="active" label="TECH STACK" />
                    <div className={styles.headerLine} />
                </div>

                <div className={styles.tabs}>
                    {Object.keys(CATEGORIES).map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.tab} ${active === cat ? styles.tabActive : ''}`}
                            onClick={() => setActive(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        className={styles.grid}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.28 }}
                    >
                        {filtered.map((t) => (
                            <HudFrame key={t.name} className={styles.techCard}>
                                <a
                                    href={t.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.cardLink}
                                >
                                    <img
                                        src={t.icon}
                                        alt={t.name}
                                        className={styles.icon}
                                    />
                                    <span className={styles.techName}>{t.name}</span>
                                    <p className={styles.techDesc}>{t.description}</p>
                                </a>
                            </HudFrame>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
