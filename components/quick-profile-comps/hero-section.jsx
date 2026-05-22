'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

        // Light rays emanating from mouse
        const RAYS = 6;

        let tick = 0;
        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);
            tick++;

            const mx = mouse.current.x * W;
            const my = mouse.current.y * H;

            // Radial ambient glow at mouse
            const radGrad = ctx.createRadialGradient(mx, my, 0, mx, my, W * 0.45);
            radGrad.addColorStop(0, 'rgba(0,208,255,0.07)');
            radGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = radGrad;
            ctx.fillRect(0, 0, W, H);

            // Light rays
            for (let r = 0; r < RAYS; r++) {
                const angle = (r / RAYS) * Math.PI * 2 + tick * 0.004;
                const len = W * (0.4 + Math.sin(tick * 0.012 + r) * 0.12);
                const ex = mx + Math.cos(angle) * len;
                const ey = my + Math.sin(angle) * len;
                const ray = ctx.createLinearGradient(mx, my, ex, ey);
                ray.addColorStop(0, 'rgba(0,208,255,0.09)');
                ray.addColorStop(1, 'transparent');
                ctx.beginPath();
                ctx.moveTo(mx, my);
                ctx.lineTo(ex, ey);
                ctx.strokeStyle = ray;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            }

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

    // Mouse parallax for content block
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
    const springY = useSpring(rawY, { stiffness: 60, damping: 20 });
    const rotateX = useTransform(springY, [-1, 1], [6, -6]);
    const rotateY = useTransform(springX, [-1, 1], [-6, 6]);

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
            <ParticleField />

            {/* Scanline overlay */}
            <div className={styles.scanlines} aria-hidden="true" />

            {/* Vignette */}
            <div className={styles.vignette} aria-hidden="true" />

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
                style={{ rotateX, rotateY, transformPerspective: 1200 }}
            >
                <motion.p variants={item} className={styles.label}>
                    AGENT DOSSIER // FULL-STACK ENGINEER
                </motion.p>

                <motion.div variants={item} className={styles.nameRow}>
                    <Typewriter speed={65} pause={500}>
                        <h1 className={styles.name}>Aaron Currie</h1>
                    </Typewriter>
                </motion.div>

                <motion.div variants={item} className={styles.subtitleWrapper}>
                    <Typewriter speed={38} pause={800}>
                        <p className={styles.subtitle}>
                            Software Engineer · Sky · Leeds UK
                        </p>
                    </Typewriter>
                </motion.div>

                <motion.div variants={item} className={styles.dividerLine} />

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

            {/* Bottom scrolling ticker */}
            <div className={styles.ticker}>
                <DataTicker />
            </div>
        </section>
    );
}
