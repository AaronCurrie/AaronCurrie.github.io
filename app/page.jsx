"use client";
import Button from '@/components/button/button';
import styles from './page.module.css';
import AnimatedLights from '@/components/animations/animated-lights';
import { DynamicRadar } from '@/components/animations/radar';
import { useUserContext } from '@/context/user';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';




export default function MenuPage() {
    const { pages, updatePageStatus } = useUserContext();
    const router = useRouter();
    const hasAnyCompletedPage = () => {
        return pages.some((page) => page.completed === true);
    };
    const startNewGame = () => {
        pages.forEach((page) => {
            updatePageStatus(page.link, false, false);
        });
        router.push('/game');
    };
    const [gameStarted, setGameStarted] = useState(false);
    useEffect(() => {
        setGameStarted(hasAnyCompletedPage())
    }, [pages]);


    return (
        <main className={styles.main}>
            <div className={styles.backgroundimage}>
                {/* <img src="/svg/planet2.png" className={styles.planet} /> */}
            </div>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <Button label="New Game" type='button' action={startNewGame} />
                    <Button label="Continue Game" type='a' href='/game' disabled={!gameStarted}/>
                    <Button label="Quick Portfolio" type='a' href='/quick-portfolio' />
                </div>
                <div className={styles.intro}>
                        <div className={styles.profileHeader}>
                            <h3>Profile: AARON CURRIE</h3>
                            <p>Full-Stack Software Engineer | React & Next.js | Google Cloud Certified</p>
                        </div>
                        <div className={styles.dataContainer}>
                            <div className={styles.circle}><DynamicRadar/></div>
                            <div className={styles.circle}><img className={styles.profilePic} src='/agents/agent1.png' alt='Agent 1' /></div>
                            <div className={styles.circle}></div>
                        </div>
                        <div className={styles.introText}>
                            <h2>Welcome to my Portfolio,</h2>
                            <p>My aim with this interactive experience is to show (not just tell), my skills, creativity, and technical ability through an engaging experience.</p>
                            <p>Your objective: investigate the disappearance of Agent AC1178 (that’s me). Complete each mission on the map below, each mission you complete will unlock the corresponding page of my portfolio.</p>
                        </div>
                </div>
            </div>
            <AnimatedLights/>
        </main>
    );
}