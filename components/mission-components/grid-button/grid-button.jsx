import React, { useState } from 'react';
import styles from './grid-button.module.css';

const GridButton = ({ item, setCounter, setEnergy, energy }) => {
    const [state, setState] = useState(null);

    const classSelector = () => {
        if (state === 'correct') {
            return styles.correct;
        } else if (state === 'incorrect') {
            return styles.incorrect;
        } 
    }

    const handleClick = () => {
        if (item === 'filled') {
            setState('correct');
            setCounter(prev => prev + 1);
        } else {
            setEnergy(prev => prev - 10);
            setState('incorrect');
        }
    }

    return (
        <button disabled={state !== null || energy === 0} onClick={handleClick} className={`${styles.gridButton} ${classSelector()} ${energy <= 0 && styles.locked}`}>
        </button>
    );
};

export default GridButton;