import React from 'react';
import styles from './failed-overlay.module.css';
import Button from '@/components/button/button';


const Failure = ({reset}) => {
    return (
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <h2>Mission Failed!</h2>
                    <Button label='Reset Mission' action={reset}/>
                </div>
            </div>
    );
};

export default Failure;