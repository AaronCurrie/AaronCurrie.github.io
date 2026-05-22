'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects } from '@/constants/projects';
import HudFrame from '@/components/hud/hud-frame';
import StatusIndicator from '@/components/hud/status-indicator';
import styles from './portfolio-hologram.module.css';

/* ── Draggable image strip ──────────────────────── */
function ImageStrip({ images, projectName }) {
    const x = useMotionValue(0);
    const [glitch, setGlitch] = useState(false);
    const ITEM_W = 440;

    const triggerGlitch = () => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 320);
    };

    if (!images || images.length === 0) {
        return (
            <div className={styles.noImage}>
                <span className={styles.noImageLabel}>[ NO VISUAL DATA ]</span>
            </div>
        );
    }

    return (
        <div className={styles.stripViewport} onMouseEnter={triggerGlitch}>
            {glitch && <div className={styles.glitchOverlay} aria-hidden="true" />}
            <motion.div
                className={styles.strip}
                drag="x"
                dragConstraints={{ left: -(images.length - 1) * ITEM_W, right: 0 }}
                style={{ x, width: images.length * ITEM_W }}
                dragElastic={0.08}
                whileTap={{ cursor: 'grabbing' }}
            >
                {images.map((img, i) => (
                    <div key={i} className={styles.stripItem} style={{ width: ITEM_W }}>
                        <img
                            src={img.image}
                            alt={`${projectName} screenshot ${i + 1}`}
                            className={styles.stripImg}
                            draggable={false}
                        />
                        <span className={styles.imgCounter}>
                            {String(i + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                        </span>
                    </div>
                ))}
            </motion.div>
            <div className={styles.stripFadeLeft} aria-hidden="true" />
            <div className={styles.stripFadeRight} aria-hidden="true" />
        </div>
    );
}

/* ── 3D mouse-tilt screen wrapper ───────────────── */
function HologramScreen({ children, active }) {
    const ref = useRef(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const springX = useSpring(rawX, { stiffness: 80, damping: 22 });
    const springY = useSpring(rawY, { stiffness: 80, damping: 22 });
    const rotateY = useTransform(springX, [-1, 1], [-10, 10]);
    const rotateX = useTransform(springY, [-1, 1], [7, -7]);

    const onMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
        rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };
    const onLeave = () => { rawX.set(0); rawY.set(0); };

    return (
        <div className={styles.screenOuter} ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
            <motion.div
                className={styles.screen}
                style={{ rotateX, rotateY, transformPerspective: 1600 }}
            >
                {/* Scanlines */}
                <div className={styles.scanlines} aria-hidden="true" />
                {/* Edge glow ring */}
                <div className={styles.glowRing} aria-hidden="true" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        className={styles.screenContent}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
            {/* Ground shadow/reflection */}
            <div className={styles.screenShadow} aria-hidden="true" />
        </div>
    );
}

export default function PortfolioHologram() {
    const [active, setActive] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    const project = projects[active];

    return (
        <section id="portfolio" className={styles.section} ref={ref}>
            {/* Header — edge to edge */}
            <div className={styles.sectionHeader}>
                <StatusIndicator status="active" label="PROJECT ARCHIVE" />
                <div className={styles.headerLine} />
                <span className={styles.projectCount}>
                    {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
            </div>

            <motion.div
                className={styles.layout}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
            >
                {/* Left: project nav */}
                <nav className={styles.sidebar} aria-label="Project list">
                    {projects.map((p, i) => (
                        <button
                            key={p.name}
                            className={`${styles.projectItem} ${active === i ? styles.projectItemActive : ''}`}
                            onClick={() => setActive(i)}
                        >
                            <span className={styles.projectNum}>{String(i + 1).padStart(2, '0')}</span>
                            <span className={styles.projectName}>{p.name}</span>
                            <span className={styles.projectTech}>{p.tech}</span>
                        </button>
                    ))}
                </nav>

                {/* Right: screen + info */}
                <div className={styles.main}>
                    <HologramScreen active={active}>
                        <ImageStrip images={project.images} projectName={project.name} />
                    </HologramScreen>

                    {/* Info bar below screen */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active + '-info'}
                            className={styles.infoBar}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.28 }}
                        >
                            <div className={styles.infoLeft}>
                                <h3 className={styles.projectTitle}>{project.name}</h3>
                                <p className={styles.projectDesc}>{project.description}</p>
                            </div>
                            <div className={styles.infoRight}>
                                <div className={styles.techTags}>
                                    {project.tech.split(',').map((t) => (
                                        <span key={t} className={styles.tag}>{t.trim()}</span>
                                    ))}
                                </div>
                                <div className={styles.links}>
                                    {project.link && project.link !== '/' && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>LIVE SITE</a>
                                    )}
                                    {project.repo && (
                                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>REPO</a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </section>
    );
}

