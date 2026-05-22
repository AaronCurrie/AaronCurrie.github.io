import React, { useState } from 'react';
import styles from './tabs.module.css';
import LoadingScan from '../loading/loading-scan';

const Tabs = ({ tabs }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animationState, setAnimationState] = useState('');

    const handleClick = (index) => {
        setAnimationState('scanning');
        setTimeout(() => {
            setTimeout(() => {
                setAnimationState('')
            }, 900);
            setActiveIndex(index);
        }, 900);
    }

    if (!tabs || tabs.length === 0) return null;


    return (
        <div className={`${styles.tabs}`}>
            <div className={styles.tabsContainer}>
                {tabs.map((tab, index) => (
                    <button
                        disabled={animationState === 'scanning'}
                        key={tab.title}
                        onClick={() => handleClick(index)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className={styles.tabsContent}>
            {animationState === 'scanning' && (
                <LoadingScan />
            )}
                    <h2>{tabs[activeIndex].title}</h2>
                    <h3>{tabs[activeIndex].tech}</h3>
                    <p>{tabs[activeIndex].content}</p>
            </div>
        </div>
    );
};

export default Tabs;