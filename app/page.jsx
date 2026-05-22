"use client";
import styles from './page.module.css';
import AnimatedLights from '@/components/animations/animated-lights';
import DataStreams from '@/components/animations/data-streams';
import NeuralNetwork from '@/components/animations/neural-network';
import { DynamicRadar } from '@/components/animations/radar';
import { useUserContext } from '@/context/user';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MenuCard from '@/components/button/menu-card';
import DataTicker from '@/components/hud/data-ticker';
import LiveReadout from '@/components/hud/live-readout';
import HudFrame from '@/components/hud/hud-frame';

const BOOT_MESSAGES = [
    'INITIALISING SYSTEM...',
    'LOADING AGENT DATABASE...',
    'ESTABLISHING SECURE CONNECTION...',
    'DECRYPTING MISSION FILES...',
    'ACCESS GRANTED. WELCOME, AGENT.',
];

export default function MenuPage() {
    const { pages, updatePageStatus } = useUserContext();
    const router = useRouter();
    const bgRef = useRef(null);

    const hasAnyCompletedPage = () => pages.some((page) => page.completed === true);

    const startNewGame = () => {
        pages.forEach((page) => updatePageStatus(page.link, false, false));
        router.push('/game');
    };

    const [gameStarted, setGameStarted] = useState(false);
    const [booting, setBooting]         = useState(true);
    const [bootPhase, setBootPhase]     = useState(0);

    useEffect(() => {
        setGameStarted(hasAnyCompletedPage());
    }, [pages]);

    // Boot sequence — shown once per browser session
    useEffect(() => {
        if (sessionStorage.getItem('sys_init')) {
            setBooting(false);
            return;
        }
        let phase = 0;
        const id = setInterval(() => {
            phase++;
            setBootPhase(phase);
            if (phase >= BOOT_MESSAGES.length) {
                clearInterval(id);
                setTimeout(() => {
                    setBooting(false);
                    sessionStorage.setItem('sys_init', '1');
                }, 700);
            }
        }, 620);
        return () => clearInterval(id);
    }, []);

    // Subtle whole-page parallax tilt — background image responds to mouse
    const handlePageMouseMove = (e) => {        if (!bgRef.current) return;
        const cx = window.innerWidth  / 2;
        const cy = window.innerHeight / 2;
        const x = (e.clientX - cx) / cx;  // -1 → 1
        const y = (e.clientY - cy) / cy;
        // Shift the background image slightly opposite to mouse (parallax feel)
        const shiftX = x * -12;
        const shiftY = y * -8;
        bgRef.current.style.transform =
            `scale(1.2) translate(${shiftX}px, ${shiftY}px)`;
    };
    const handlePageMouseLeave = () => {
        if (!bgRef.current) return;
        bgRef.current.style.transform = 'scale(1.2) translate(0px, 0px)';
    };

    const menuItems = [
        {
            callsign: 'OP-01',
            label:    'New Game',
            subtitle: 'Begin your agent mission briefing',
            type:     'button',
            action:   startNewGame,
            disabled: false,
        },
        {
            callsign: 'OP-02',
            label:    'Continue Game',
            subtitle: gameStarted ? 'Resume your active mission' : 'No active mission found',
            type:     'a',
            href:     '/game',
            disabled: !gameStarted,
        },
        {
            callsign: 'OP-03',
            label:    'Quick Portfolio',
            subtitle: 'View all sections without the game',
            type:     'a',
            href:     '/quick-portfolio',
            disabled: false,
        },
    ];

    return (
        <main
            className={styles.main}
            onMouseMove={handlePageMouseMove}
            onMouseLeave={handlePageMouseLeave}
        >
            <img
                ref={bgRef}
                className={styles.backgroundimage}
                src='/backgrounds/planet.png'
                alt='Background Planet'
            />
            <AnimatedLights />
            <DataStreams />

            {/* ── Boot overlay ── */}
            <AnimatePresence>
                {booting && (
                    <motion.div
                        className={styles.bootOverlay}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.55 }}
                    >
                        <div className={styles.bootContent}>
                            {BOOT_MESSAGES.slice(0, bootPhase).map((msg, i) => (
                                <motion.p
                                    key={i}
                                    className={`${styles.bootLine} ${i === bootPhase - 1 ? styles.bootActive : styles.bootDone}`}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <span className={styles.bootPrompt}>&gt;</span> {msg}
                                </motion.p>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Main HUD content ── */}
            <motion.div
                className={styles.container}
                animate={{ opacity: booting ? 0 : 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                style={{ opacity: 0 }}
            >
                {/* Menu panel */}
                <div className={styles.menu}>
                    <div className={styles.menuHeader}>
                        <span className={styles.menuHeaderLabel}>SELECT OPERATION</span>
                    </div>

                    <div className={styles.menuCards}>
                        {menuItems.map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -28 }}
                                animate={{ opacity: booting ? 0 : 1, x: booting ? -28 : 0 }}
                                transition={{ delay: 0.2 + i * 0.18, duration: 0.45, ease: 'easeOut' }}
                            >
                                <MenuCard {...item} />
                            </motion.div>
                        ))}
                    </div>

                    <LiveReadout />
                </div>

                {/* Agent profile + briefing panel */}
                <div className={styles.intro}>
                    {!booting && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, x: 32 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
                            >
                                <HudFrame entrance delay={0} label="AGENT PROFILE">
                                    <div className={styles.profileHeader}>
                                        <h3 className={styles.glitchText}>AARON CURRIE</h3>
                                        <p>Full-Stack Software Engineer | React &amp; Next.js | Google Cloud Certified</p>
                                    </div>
                                </HudFrame>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 32 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.45, delay: 0.28, ease: 'easeOut' }}
                            >
                                <div className={styles.dataContainer}>
                                    <div className={styles.circle}><DynamicRadar /></div>
                                    <div className={styles.circle}>
                                        <img className={styles.profilePic} src='/agents/agent1.png' alt='Agent' />
                                    </div>
                                    <div className={styles.circle}><NeuralNetwork /></div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 32 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.45, delay: 0.46, ease: 'easeOut' }}
                            >
                                <HudFrame entrance delay={0.12} label="MISSION BRIEFING">
                                    <div className={styles.introText}>
                                        <h2>Welcome to my Portfolio</h2>
                                        <p>
                                            I&apos;m a developer who enjoys building interactive,
                                            well-crafted web experiences. This portfolio is designed
                                            to show my skills in action rather than just list them.
                                        </p>
                                        <p>
                                            Each mission unlocks a section of my portfolio — projects,
                                            skills, and experience — and only takes a few minutes.
                                        </p>
                                        <p>
                                            Short on time? Hit <strong>Quick Portfolio</strong> to view everything at once.
                                        </p>
                                    </div>
                                </HudFrame>
                            </motion.div>
                        </>
                    )}
                </div>
            </motion.div>

            <DataTicker />
        </main>
    );
}
