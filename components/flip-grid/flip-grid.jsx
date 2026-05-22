'use client';
import React, { useState } from 'react';
import styles from './flip-grid.module.css';

const FlipGrid = ({ children }) => {
    return (
        <div className={styles.logoGrid}>
            {children}
        </div>
    );
};

FlipGrid.Item = ({ children }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className={`${styles.logoGridItem} ${isFlipped ? styles.flipped : ''}`}
            onClick={handleFlip}
        >
            {children}
        </div>
    );
};

FlipGrid.ItemFront = ({ children }) => {
    return (
        <div className={styles.logoGridItemFront}>
            {children}
        </div>
    );
};

FlipGrid.ItemBack = ({ children }) => {
    return (
        <div className={styles.logoGridItemBack}>
            {children}
        </div>
    );
};

export default FlipGrid;