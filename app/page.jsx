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
            <img className={styles.backgroundimage} src='/backgrounds/planet.png' alt='Background Planet' />
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
                            <p>
                                I’m a developer who enjoys building interactive, well-crafted web experiences.
                                This portfolio is designed to show my skills in action rather than just list them.
                            </p>
                            <p>
                                Instead of just repeating my resume, I am hoping I have created a way for you to explore my work through a short interactive game experience.
                                The game consists of missions, each mission unlocks a section of my portfolio, including projects, skills,
                                and experience. 
                                Each mission only takes a few minutes to complete, and I hope it gives you a better sense of my capabilities as a developer.
                            </p>
                            <p>
                                If you’re short on time, you can skip the game and view my quick portfolio by clicking the 
                                <strong> Quick Portfolio</strong> button.
                            </p>
                        </div>
                </div>
            </div>
            <AnimatedLights/>
        </main>
    );
}