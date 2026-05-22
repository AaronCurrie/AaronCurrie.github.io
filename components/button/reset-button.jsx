'use client';
import React, { useEffect, useState } from 'react';
import styles from './button.module.css';

const ResetButton = ({pages, updatePageStatus}) => {

    const [missionsResetable, setmissionsResetable] = useState(false);

    const resetMissions = () => {
        setmissionsResetable(false);
        pages.forEach((page) => {
            if(page.link === '/') {
                return;
            }
            if (page.completed) {
            updatePageStatus(page.link, false, false);
            }
        });
    }

    useEffect(() => {
        const oneCompleted = pages.filter((page) => page.completed).lenght > 1;
        console.log(oneCompleted, 'One Completed');
        setmissionsResetable(oneCompleted);
    }, [pages]);
    

    return (
        <button
            className={`${styles.button} ${styles.defaultButton} ${missionsResetable && styles.fadeOut}`}
            onClick={() => resetMissions()}
        >
            Reset Missions
        </button>
    );
};

export default ResetButton;