import styles from './status-indicator.module.css';

/**
 * A blinking coloured dot with an optional text label.
 * status: 'active' | 'locked' | 'warning'
 */
const StatusIndicator = ({ status = 'active', label }) => (
    <div className={styles.indicator}>
        <span className={`${styles.dot} ${styles[status]}`} />
        {label && <span className={styles.label}>{label}</span>}
    </div>
);

export default StatusIndicator;
