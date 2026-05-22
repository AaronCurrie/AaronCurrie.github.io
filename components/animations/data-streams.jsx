import styles from './animated-lights.module.css';

const STREAM_CONFIGS = [
    { left: '4%',  delay: '0s',    duration: '4.2s' },
    { left: '11%', delay: '1.3s',  duration: '5.1s' },
    { left: '19%', delay: '0.6s',  duration: '3.7s' },
    { left: '28%', delay: '2.2s',  duration: '4.8s' },
    { left: '38%', delay: '0.9s',  duration: '6.0s' },
    { left: '49%', delay: '1.8s',  duration: '3.9s' },
    { left: '59%', delay: '0.3s',  duration: '5.3s' },
    { left: '68%', delay: '2.6s',  duration: '4.4s' },
    { left: '78%', delay: '1.1s',  duration: '3.6s' },
    { left: '87%', delay: '2.0s',  duration: '4.9s' },
    { left: '94%', delay: '0.7s',  duration: '5.6s' },
];

const DataStreams = () => (
    <div aria-hidden='true' inert className={styles.animationOverlay}>
        {STREAM_CONFIGS.map((stream, i) => (
            <div
                key={i}
                className={styles.dataStream}
                style={{
                    left: stream.left,
                    animationDelay: stream.delay,
                    animationDuration: stream.duration,
                }}
            />
        ))}
    </div>
);

export default DataStreams;
