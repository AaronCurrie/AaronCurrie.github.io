import React from 'react';
import styles from './briefing.module.css';
import Button from '../button/button';

const Briefing = ({handleClick, briefing, children}) => {
    if (!briefing) {
        return <div className={styles.briefingButton}><Button action={handleClick} label={'i'} type='icon' /></div>
    }
    return (
        <div onClick={handleClick} className={styles.briefingOverlay}>
            <div onClick={(e) => e.stopPropagation()} className={styles.briefing}>
                <div className={styles.briefingHeader}>
                    <img src='/profilepic.png' alt="Profile" className={styles.profilePic} />
                    <Button action={handleClick} label={'×'} type='icon' />
                </div>
                <div className={styles.briefingContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Briefing;