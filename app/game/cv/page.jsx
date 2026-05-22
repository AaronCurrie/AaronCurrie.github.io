'use client';
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ContentFirst, ContentSecond, ContentThird } from "./content";
import LoadingScan from "@/components/loading/loading-scan";

const CVPage = () => {
    const content = [ContentFirst(), ContentSecond(), ContentThird()];
    const [imageSRC, setImageSRC] = useState('/profilepic.png');
    const [analyzierContent, setAnalyzierContent] = useState(content[0]);
    const [animation, setAnimation] = useState(false);
    const [contentIndex, setContentIndex] = useState(0);

    const handleDownload = () => {
        // TODO replace with actual CV file path once updated
        const link = document.createElement("a");
        link.href = "/cv.pdf";
        link.download = "My_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const tempClick = () => {
        alert("This feature is under construction. Please check back later!");
    };

    useEffect(() => {
        setTimeout(() => {
            setAnimation(true);
        }, 19000);
        setTimeout(() => {
            setImageSRC('/agents/agent6.png');
            setTimeout(() => {
                setAnimation(false);
            }, 600);
        }, 20000);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setContentIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % content.length;
                setAnalyzierContent(content[nextIndex]);
                return nextIndex;
            });
        }, 20000);
        return () => clearInterval(interval);
    }, [content]);

    return (
        <main className={'main-offset'}>
            <div className={styles.screenContainer}>
                <div className={styles.screen}>
                    <div className={styles.opacity}>
                        <div style={{top: '60%', left: '50%'}} className={`${styles.positioner} ${styles.cv}`}>
                            <img className={styles.cvImage} src='/cv-image.png'/>
                        </div>
                    </div>
                    <div style={{top: '2.5%', left: '2.5%'}} className={` ${styles.analyiser}`}>
                        <h2>Analysing Data</h2>
                        <div className={styles.profileContainer}>
                            <div className={styles.profileImageContainer}>
                                {animation && <LoadingScan />}
                                <img className={styles.profilePic} src={imageSRC}/>
                            </div>
                                <div className={styles.details}>
                                {analyzierContent}
                            </div>
                        </div>
                    </div>
                    <div className={styles.scannerContainer}>
                        <div className={`${styles.scannerBox} ${styles.scannerAnimationDown}`}></div>
                        <div className={`${styles.scannerBox} ${styles.scannerAnimationUp}`}></div>
                    </div>
                    <div style={{bottom: '5%', left: '50%'}} className={`${styles.positioner}`}>
                        <button className={styles.downloadButton} onClick={tempClick}>Download CV</button>
                    </div>
                </div>
            </div>
            
        </main>
    );
};

export default CVPage;