import React from 'react';
import styles from './button.module.css';
import Link from 'next/link';

const Button = ({ label, action, type = 'button', disabled=false, recentUnlock=false}) => {
    return (
        <button
            className={`${styles.button} ${!disabled && recentUnlock && styles.unlockAnimation}`}
            onClick={type === 'button'? action : null}
            disabled={disabled}
        >
            {type === 'a'? <Link href={action}>{label}</Link> : <span>{label}</span>}
        </button>
    );
};

export default Button;