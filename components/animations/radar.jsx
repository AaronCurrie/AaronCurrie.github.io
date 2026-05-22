import React from 'react';
import styles from './radar.module.css';
import AnimatedBlips from './animated-blips';
import Image from 'next/image';

const Radar = () => {
    return (
        <div className={styles.radarCircle}>
            <AnimatedBlips speed={750}/>
            <Image src='/mapcompress.png' alt='Background Image' className={styles.backgroundImage} priorty='true' quality={10} fill/>
            <div className={`${styles.radarCircleInner} ${styles.inner75}`}></div>
            <div className={`${styles.radarCircleInner} ${styles.inner50}`}></div>
            <div className={`${styles.radarCircleInner} ${styles.inner25}`}></div>
            <div className={`${styles.radarLine} ${styles.left}`}></div>
            <div className={`${styles.radarLine} ${styles.right}`}></div>
            <div className={`${styles.radarLine} ${styles.up}`}></div>
            <div className={`${styles.radarLine} ${styles.down}`}></div>
            <div className={`${styles.radarLine} ${styles.spin}`}></div>
        </div>
    );
};

const DynamicRadar = () => {
    return (
        <div className={styles.DynamicRadarCircle}>
            <AnimatedBlips speed={750}/>
            <Image src='/mapcompress.png' alt='Background Image' className={styles.backgroundImage} priorty='true' quality={10} fill/>
            <div className={`${styles.radarCircleInner} ${styles.inner75}`}></div>
            <div className={`${styles.radarCircleInner} ${styles.inner50}`}></div>
            <div className={`${styles.radarCircleInner} ${styles.inner25}`}></div>
            <div className={`${styles.radarLine} ${styles.left}`}></div>
            <div className={`${styles.radarLine} ${styles.right}`}></div>
            <div className={`${styles.radarLine} ${styles.up}`}></div>
            <div className={`${styles.radarLine} ${styles.down}`}></div>
            <div className={`${styles.radarLine} ${styles.spin}`}></div>
        </div>
    );
};

export { Radar, DynamicRadar };