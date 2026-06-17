'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionTemplate } from 'framer-motion';
import Typewriter from '@/components/animations/typewriter';
import HudFrame from '@/components/hud/hud-frame';
import DataTicker from '@/components/hud/data-ticker';
import LiveReadout from '@/components/hud/live-readout';
import StatusIndicator from '@/components/hud/status-indicator';
import styles from './hero-section.module.css';

/* ── Particle canvas: mouse-reactive light rays ── */
function ParticleField() {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: 0.5, y: 0.5 });
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current.x = (e.clientX - rect.left) / rect.width;
            mouse.current.y = (e.clientY - rect.top) / rect.height;
        };
        window.addEventListener('mousemove', onMove);

        // Particles
        const COUNT = 90;
        const particles = Array.from({ length: COUNT }, () => ({
            x: Math.random(),
            y: Math.random(),
            vx: (Math.random() - 0.5) * 0.00022,
            vy: (Math.random() - 0.5) * 0.00022,
            size: Math.random() * 1.6 + 0.4,
            alpha: Math.random() * 0.5 + 0.15,
            pulse: Math.random() * Math.PI * 2,
        }));

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            // Particles
            for (const p of particles) {
                // Gentle attraction toward mouse
                const dx = mouse.current.x - p.x;
                const dy = mouse.current.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 0.28) {
                    p.vx += dx * 0.000012;
                    p.vy += dy * 0.000012;
                }

                p.x += p.vx;
                p.y += p.vy;
                // Bounce
                if (p.x < 0 || p.x > 1) p.vx *= -1;
                if (p.y < 0 || p.y > 1) p.vy *= -1;
                p.x = Math.max(0, Math.min(1, p.x));
                p.y = Math.max(0, Math.min(1, p.y));

                p.pulse += 0.018;
                const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

                const px = p.x * W;
                const py = p.y * H;

                // Connect nearby particles
                for (const q of particles) {
                    const ex = q.x * W - px;
                    const ey = q.y * H - py;
                    const d = Math.sqrt(ex * ex + ey * ey);
                    if (d < 90) {
                        ctx.beginPath();
                        ctx.moveTo(px, py);
                        ctx.lineTo(q.x * W, q.y * H);
                        ctx.strokeStyle = `rgba(0,208,255,${0.06 * (1 - d / 90)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                ctx.beginPath();
                ctx.arc(px, py, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0,208,255,${alpha})`;
                ctx.fill();
            }

            rafRef.current = requestAnimationFrame(draw);
        };
        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
            window.removeEventListener('mousemove', onMove);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.particleCanvas} aria-hidden="true" />;
}

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18 } },
};

const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function HeroSection() {
    const sectionRef = useRef(null);

    // Scroll-driven image exit
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const imageOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.0]);

    // Mouse parallax for content block
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
    const springY = useSpring(rawY, { stiffness: 60, damping: 20 });
    const rotateX = useTransform(springY, [-1, 1], [6, -6]);
    const rotateY = useTransform(springX, [-1, 1], [-6, 6]);

    // Spotlight: use raw (unsprung) values so it tracks the cursor with zero lag
    const spotX = useTransform(rawX, [-1, 1], [0, 100]);
    const spotY = useTransform(rawY, [-1, 1], [0, 100]);
    const spotMask = useMotionTemplate`radial-gradient(320px circle at ${spotX}% ${spotY}%, black 0%, black 30%, transparent 80%)`;

    const handleMouseMove = (e) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
        rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    const handleMouseLeave = () => {
        rawX.set(0);
        rawY.set(0);
    };

    return (
        <section
            className={styles.hero}
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Interactive particle field */}
            <motion.div
                className={styles.heroImageWrapper}
                style={{ opacity: imageOpacity, y: imageY, scale: imageScale }}
            >
                {/* Dim desaturated base layer */}
                <img src='/backgrounds/leeds-skyline-v2.png' className={styles.heroImage} alt="" />
                {/* Full-colour spotlight layer, revealed under mouse */}
                <motion.img
                    src='/backgrounds/leeds-skyline-v2.png'
                    className={styles.heroImageSpotlight}
                    alt=""
                    style={{ maskImage: spotMask, WebkitMaskImage: spotMask }}
                />
            </motion.div>
            <ParticleField />

            {/* Scanline overlay */}
            {/* <div className={styles.scanlines} aria-hidden="true" /> */}

            {/* Vignette */}
            {/* <div className={styles.vignette} aria-hidden="true" /> */}

            {/* Top-right live readout */}
            <div className={styles.readout}>
                <LiveReadout />
            </div>

            {/* Top-left status */}
            <div className={styles.topLeft}>
                <StatusIndicator status="active" label="SYSTEM ONLINE" />
            </div>

            {/* Main centred content — 3D parallax card */}
            <motion.div
                className={styles.content}
                variants={stagger}
                initial="hidden"
                animate="show"
            >
                <motion.p variants={item} className={styles.label}>
                    FULL-STACK ENGINEER
                </motion.p>

                <motion.div variants={item} className={styles.nameRow}>
                        <h1 className={styles.name}>Aaron Currie</h1>
                </motion.div>

                <motion.div variants={item} className={styles.dividerLine} />
                <motion.div variants={item} className={styles.nameRow}>
                    <p className={styles.subtitle}>
                        Software Engineer · Sky · Leeds UK
                    </p>
                </motion.div>

                <motion.div variants={item} className={styles.ctas}>
                    <a href="#about" className={styles.ctaPrimary}>
                        VIEW DOSSIER
                    </a>
                    <a
                        href="mailto:aaroncurrie34@gmail.com"
                        className={styles.ctaSecondary}
                    >
                        OPEN CHANNEL
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
