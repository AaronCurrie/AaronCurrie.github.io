'use client';
import { motion } from 'framer-motion';
import styles from './hud-frame.module.css';

const SPRING = { type: 'spring', stiffness: 280, damping: 22 };

/**
 * Wraps children in Iron-Man-style targeting-reticle corner brackets.
 * Pass entrance=true + delay (seconds) to animate the brackets opening on mount.
 */
const HudFrame = ({ children, className = '', label = '', entrance = false, delay = 0 }) => {
    if (!entrance) {
        return (
            <div className={`${styles.frame} ${className}`}>
                <span className={`${styles.corner} ${styles.tl}`} />
                <span className={`${styles.corner} ${styles.tr}`} />
                <span className={`${styles.corner} ${styles.bl}`} />
                <span className={`${styles.corner} ${styles.br}`} />
                {label && <span className={styles.label}>{label}</span>}
                {children}
            </div>
        );
    }

    return (
        <div className={`${styles.frame} ${className}`}>
            {['tl', 'tr', 'bl', 'br'].map((pos) => (
                <motion.span
                    key={pos}
                    className={`${styles.corner} ${styles[pos]}`}
                    initial={{ width: 0, height: 0, opacity: 0 }}
                    animate={{ width: 18, height: 18, opacity: 0.65 }}
                    transition={{ ...SPRING, delay }}
                />
            ))}
            {label && (
                <motion.span
                    className={styles.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + 0.22 }}
                >
                    {label}
                </motion.span>
            )}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: delay + 0.38 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default HudFrame;

