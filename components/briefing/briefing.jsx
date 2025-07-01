import React from 'react';
import styles from './briefing.module.css';

const Briefing = ({handleClick, briefing, children}) => {
    if (!briefing) {
        return <button onClick={handleClick}>Briefing</button>
    }
    return (
        <div onClick={handleClick} className={styles.briefingOverlay}>
            <div onClick={(e) => e.stopPropagation()} className={styles.briefing}>
                <div className={styles.briefingHeader}>
                    <img src='/profilepic.png' alt="Profile" className={styles.profilePic} />
                    <button onClick={handleClick}>Close</button>
                </div>
                <div className={styles.briefingContent}>
                    {children}
                </div>
            </div>
        </div>

    );
};

export default Briefing;