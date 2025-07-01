import React from 'react';
import styles from './button.module.css';
import Link from 'next/link';

const Button = ({ label, action, type = 'button', disabled=false}) => {
    return (
        <button
            className={styles.button}
            onClick={type === 'button'? action : null}
            disabled={disabled}
        >
            {type === 'a'? <Link href={action}>{label}</Link> : label}
        </button>
    );
};

export default Button;