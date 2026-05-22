'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './menu-card.module.css';
import StatusIndicator from '@/components/hud/status-indicator';

/**
 * Full-height HUD-style card for the main menu.
 * Features:
 *  - Spinning conic-gradient border on hover (CSS @property --angle)
 *  - Status indicator dot (green = ready, red = locked)
 *  - Callsign, label, subtitle layout
 *  - Corner bracket accents
 *  - Framer Motion spring hover/tap
 */
const MenuCard = ({
    label,
    subtitle,
    callsign,
    action,
    href,
    type = 'button',
    disabled = false,
}) => {
    const inner = (
        <div className={styles.inner}>
            <div className={styles.topRow}>
                <span className={styles.callsign}>{callsign}</span>
                <StatusIndicator
                    status={disabled ? 'locked' : 'active'}
                    label={disabled ? 'LOCKED' : 'READY'}
                />
            </div>
            <span className={styles.cardLabel}>{label}</span>
            <p className={styles.subtitle}>{subtitle}</p>
            <div className={styles.scanline} />
            {/* Corner bracket accents */}
            <span className={`${styles.corner} ${styles.tl}`} />
            <span className={`${styles.corner} ${styles.tr}`} />
            <span className={`${styles.corner} ${styles.bl}`} />
            <span className={`${styles.corner} ${styles.br}`} />
        </div>
    );

    const cardClass = `${styles.card} ${disabled ? styles.disabled : ''}`;
    const motionProps = {
        whileHover: disabled ? {} : { scale: 1.02, y: -4 },
        whileTap:   disabled ? {} : { scale: 0.97 },
        transition: { type: 'spring', stiffness: 320, damping: 22 },
    };

    if (type === 'a' && !disabled) {
        return (
            <motion.div className={cardClass} {...motionProps}>
                <Link href={href} onClick={action} className={styles.linkFill}>
                    {inner}
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.button
            className={cardClass}
            onClick={disabled ? undefined : action}
            disabled={disabled}
            {...motionProps}
        >
            {inner}
        </motion.button>
    );
};

export default MenuCard;
