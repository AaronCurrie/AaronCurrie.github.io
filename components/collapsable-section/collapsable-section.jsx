'use client'
import React, { useState } from 'react';
import styles from './collapsable-section.module.css';

const CollapsableSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [arrowDown, setArrowDown] = useState(true);
    const [animating, setAnimating] = useState(false);

    const toggleSection = () => {
        if(isOpen) {
            setArrowDown(false);
            setAnimating(true);
            setTimeout(() => {
                setIsOpen(false);
            }, 300);
        } else {
            setArrowDown(true);
            setAnimating(false);
            setIsOpen(true);
        }
    };



    return (
        <div className={styles.collapsableSection}>
            <div className={styles.header} onClick={toggleSection}>
                <h2>{title}</h2>
                <button className={arrowDown? styles.rotate0 : styles.rotate180}>{'▼'}</button>
            </div>
            <div className={`flex-col ${animating? styles.hide : styles.reveal} ${isOpen? styles.vis : styles.novis}`}>{children}</div>
        </div>
    );
};

export default CollapsableSection;