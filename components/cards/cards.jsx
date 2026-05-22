import React from 'react';
import styles from './cards.module.css';
import useInViewPort from '@/hooks/in-viewport';

const Cards = ({ children }) => {
    return (
        <div className={styles.cards}>
            {children}
        </div>
    );
};

Cards.Item = ({ children, size='md' }) => {
    const [ref, inViewPort] = useInViewPort(0)
    return (
        <div
            ref={ref}
            className={`${styles.cardItem} ${styles[size]} ${inViewPort ? 'opacity-1' : 'opacity-0'}`}
        >
            {children}
        </div>
    );
};


export default Cards;