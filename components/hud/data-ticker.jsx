'use client';
import styles from './data-ticker.module.css';

const TICKER_TEXT =
    'AGENT: AARON CURRIE \u25c8 STATUS: ACTIVE \u25c8 CLEARANCE: LEVEL 5 \u25c8 SYSTEM: ONLINE \u25c8 ' +
    'LOCATION: UNITED KINGDOM \u25c8 SPECIALIZATION: FULL-STACK ENGINEERING \u25c8 ' +
    'FRAMEWORK: REACT / NEXT.JS \u25c8 CLOUD: GOOGLE CLOUD CERTIFIED \u25c8 ' +
    'MISSIONS: AVAILABLE \u25c8 CONNECTIONS: SECURE \u25c8 THREAT LEVEL: NOMINAL \u25c8 ';

const DataTicker = () => (
    <div className={styles.wrapper}>
        <span className={styles.liveLabel}>LIVE</span>
        <div className={styles.track}>
            {/* Three copies so the scroll loop is seamless */}
            <span className={styles.content}>
                {TICKER_TEXT.repeat(3)}
            </span>
        </div>
    </div>
);

export default DataTicker;
