'use client'
import React, { useState } from 'react';
import styles from './collapsable-section.module.css';

const CollapsableSection = ({ title, children, startOpen = false }) => {
    const [isOpen, setIsOpen] = useState(startOpen);

    const toggleSection = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={styles.collapsableSection}>
            <div className={styles.header} onClick={toggleSection}>
                <h2>{title}</h2>
                <button className={isOpen ? styles.rotate0 : styles.rotate180}>{'▼'}</button>
            </div>
            <div className={`${styles.content} ${isOpen ? styles.open : styles.closed}`}>
                {children}
            </div>
        </div>
    );
};

export default CollapsableSection;