import React from 'react';
import styles from './loading.module.css';
import AnimatedBlips from '../animations/animated-blips';
import Image from 'next/image';
import {Radar} from '../animations/radar';

const LoadingPage = ({text = 'Loading'}) => {
    return (
        <main className={`${styles.loadingPage} main-offset`}>
            <div className={styles.loadingText}>
                <h1>{text}</h1>
                <div className={styles.dot}></div><div className={styles.dot}></div><div className={styles.dot}></div>
            </div>
            
            <Radar />
        </main>
    );
};

export default LoadingPage;