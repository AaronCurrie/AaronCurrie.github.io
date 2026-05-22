'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import HudFrame from '@/components/hud/hud-frame';
import StatusIndicator from '@/components/hud/status-indicator';
import styles from './cv-section.module.css';

export default function CVSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="cv" className={styles.section} ref={ref}>
            <motion.div
                className={styles.content}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.65, ease: 'easeOut' }}
            >
                <HudFrame entrance delay={0.2} className={styles.frame}>
                    <div className={styles.inner}>
                        <StatusIndicator status="active" label="CLEARANCE: TOP SECRET" />

                        <p className={styles.label}>PERSONNEL FILE // CLASSIFIED</p>

                        <h2 className={styles.heading}>CURRICULUM VITAE</h2>

                        <p className={styles.subtext}>
                            Full classified dossier available on request. Contains mission
                            history, technical clearances, and operational achievements.
                        </p>

                        {/* Scanline decoration */}
                        <div className={styles.scanlines} aria-hidden="true" />

                        <motion.a
                            href="#"
                            download
                            className={styles.downloadBtn}
                            whileHover={{
                                scale: 1.04,
                                boxShadow:
                                    '0 0 28px rgba(0,208,255,0.55), 0 0 60px rgba(0,208,255,0.2)',
                            }}
                            whileTap={{ scale: 0.97 }}
                        >
                            ↓ DOWNLOAD CV
                        </motion.a>
                    </div>
                </HudFrame>
            </motion.div>
        </section>
    );
}
