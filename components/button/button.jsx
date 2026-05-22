import React from 'react';
import styles from './button.module.css';
import Link from 'next/link';

const Button = ({ label, action, href, type = 'button', disabled=false, recentUnlock=false}) => {
    if(type === 'a') {
        return <Link href={href} onClick={action} className={`${styles.button} ${styles.defaultButton} ${disabled && styles.disabled} ${!disabled && recentUnlock && styles.unlockAnimation}`}>{label}</Link>
    }
    return (
        <button
            className={`${styles.button} ${type === 'icon' ? styles.iconButton : styles.defaultButton} ${disabled && styles.disabled}`}
            onClick={action}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;