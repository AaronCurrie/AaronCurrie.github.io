'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import HudFrame from '@/components/hud/hud-frame';
import StatusIndicator from '@/components/hud/status-indicator';
import styles from './experience-timeline.module.css';

function ExperienceCard({ exp, index }) {
    const ref = useRef(null);
    return (
        <div ref={ref} className={styles.card}>
            <HudFrame className={styles.cardFrame}>
                <div className={styles.cardContent}>
                    <div className={styles.cardMeta}>
                        <span className={styles.date}>{exp.description.date}</span>
                        <span className={styles.divider}>·</span>
                        <span className={styles.location}>{exp.description.location}</span>
                    </div>
                    <h3 className={styles.company}>{exp.description.company}</h3>
                    <p className={styles.role}>{exp.description.position}</p>
                    <p className={styles.bio}>{exp.description.bio}</p>
                    {exp.description.points && (
                        <ul className={styles.points}>
                            {exp.description.points.slice(0, 3).map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* Card index */}
                <span className={styles.cardIndex}>{String(index + 1).padStart(2, '0')}</span>
            </HudFrame>
        </div>
    );
}

export default function ExperienceTimeline({ experience }) {
    const outerRef = useRef(null);

    // The outer container is tall (scroll distance = card width * count)
    // Sticky inner tracks the scroll and moves cards horizontally
    const { scrollYProgress } = useScroll({
        target: outerRef,
        offset: ['start start', 'end end'],
    });

    // Translate the strip: 0% → -(totalWidth - 100vw)
    // We'll compute in CSS via a custom formula
    const CARD_W = 520; // px — matches CSS
    const GAP = 48;
    const totalScroll = (experience.length - 1) * (CARD_W + GAP);
    const x = useTransform(scrollYProgress, [0, 1], [0, -totalScroll]);

    const headerInView = useInView(outerRef, { once: true, amount: 0.05 });

    return (
        /* Outer: sets scrollable height */
        <div
            ref={outerRef}
            className={styles.outer}
            style={{ height: `calc(100vh + ${totalScroll}px)` }}
        >
            {/* Sticky viewport — stays in view while outer scrolls */}
            <div className={styles.sticky}>
                {/* Section label */}
                <motion.div
                    className={styles.sectionHeader}
                    initial={{ opacity: 0, y: -16 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <StatusIndicator status="active" label="MISSION HISTORY" />
                    <div className={styles.headerLine} />
                    <span className={styles.scrollHint}>← DRAG TO EXPLORE →</span>
                </motion.div>

                {/* Horizontal track */}
                <div className={styles.trackClip}>
                    <motion.div
                        className={styles.track}
                        style={{ x }}
                    >
                        {/* Timeline connector line running full strip width */}
                        <div
                            className={styles.connector}
                            style={{ width: experience.length * (CARD_W + GAP) + CARD_W }}
                        />

                        {experience.map((exp, i) => (
                            <div key={i} className={styles.cardSlot}>
                                {/* Dot on connector */}
                                <div className={`${styles.dot} ${i === 0 ? styles.dotActive : ''}`}>
                                    <span className={styles.dotYear}>
                                        {exp.description.date.split(' ').pop()}
                                    </span>
                                </div>
                                <ExperienceCard exp={exp} index={i} />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Progress bar */}
                <div className={styles.progressBar}>
                    <motion.div
                        className={styles.progressFill}
                        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                    />
                </div>
            </div>
        </div>
    );
}

