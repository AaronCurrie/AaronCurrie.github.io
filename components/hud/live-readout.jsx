'use client';
import { useState, useEffect } from 'react';
import styles from './live-readout.module.css';

const METRICS = [
    { label: 'SYS.UPTIME',  min: 99.1, max: 99.9, unit: '%',    fixed: 1 },
    { label: 'CONNECTIONS', min: 8,    max: 47,   unit: '',     fixed: 0 },
    { label: 'DATA.RATE',   min: 1.2,  max: 9.8,  unit: 'TB/s', fixed: 1 },
    { label: 'THREAT.LVL',  min: 0,    max: 2,    unit: '/10',  fixed: 1 },
];

function randomValue(m) {
    return (Math.random() * (m.max - m.min) + m.min).toFixed(m.fixed);
}

const LiveReadout = () => {
    const [values, setValues] = useState(() => METRICS.map(randomValue));

    useEffect(() => {
        const interval = setInterval(() => {
            setValues((prev) =>
                prev.map((v, i) => (Math.random() > 0.65 ? randomValue(METRICS[i]) : v))
            );
        }, 900);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.readout}>
            <div className={styles.header}>
                <span>TELEMETRY</span>
                <span className={styles.sineWrapper} aria-hidden="true">
                    <svg
                        className={styles.sineSvg}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 120 16"
                    >
                        <path
                            d="M 0,8 C 8,2 22,2 30,8 C 38,14 52,14 60,8 C 68,2 82,2 90,8 C 98,14 112,14 120,8"
                            fill="none"
                            stroke="rgba(0, 208, 255, 0.75)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </span>
            </div>
            {METRICS.map((m, i) => (
                <div key={m.label} className={styles.row}>
                    <span className={styles.metricLabel}>{m.label}</span>
                    <span className={styles.value}>
                        {values[i]}
                        {m.unit}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default LiveReadout;
