'use client';
import React, { useEffect, useState } from 'react';
import styles from './button.module.css';

const QuickAccessButton = ({pages, updatePageStatus, inText}) => {

    const [allUnlocked, setAllUnlocked] = useState(false);

    const quickAccess = () => {
        setAllUnlocked(true);
        pages.filter((page) => !page.completed).forEach((page) => {
          updatePageStatus(page.link, true, true);
        });
    }

    useEffect(() => {
        const allCompleted = pages.every((page) => page.completed);
        setAllUnlocked(allCompleted);
    }, [pages]);
    

    return (
        <button
            className={`${styles.button} ${styles.defaultButton} ${inText && styles.inText} ${(allUnlocked && !inText) && styles.fadeOut}`}
            onClick={quickAccess}
        >
            Quick Access
        </button>
    );
};

export default QuickAccessButton;