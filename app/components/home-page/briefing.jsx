import React from 'react';
import styles from './briefing.module.css';

const Briefing = () => {
    return (
        <div className={styles.briefing}>
            <img src='/profilepic.png' alt="Profile" className={styles.profilePic} />
            <div>
                <h3>Profile: AARON CURRIE</h3>
                <p>Welcome to the profile, your mission is to do research and reconsience on the target in question, to asses if they are what we need for the next msision. Complete the tasks to build a dossier on the target.</p>
                <p>Click the quick access button to skip the missions to assess the portfolio immediately.</p>
            </div>
        </div>
    );
};

export default Briefing;