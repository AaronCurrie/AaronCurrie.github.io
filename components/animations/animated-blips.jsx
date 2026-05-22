'use client'
import React, { useEffect, useState } from "react";
import styles from './animated-lights.module.css';

const AnimatedBlips = ({speed = 500}) => {
    const [flashingLights, setFlashingLights] = useState([]);

    useEffect(() => {
        const flashingInterval = setInterval(() => {
            setFlashingLights((prev) => [
                ...prev,
                {
                    id: Math.random(),
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%",
                },
            ]);
            setTimeout(() => {
                setFlashingLights((prev) => prev.slice(1));
            }, 1000);
        }, speed);

        return () => {
            clearInterval(flashingInterval);
        };
    }, []);

    return (
        <div aria-hidden='true' inert className={styles.animationOverlay}>
            {flashingLights.map((light) => (
                <div
                    key={light.id}
                    className={styles.flashingBlip}
                    style={{ left: light.left, top: light.top }}
                ></div>
            ))}
        </div>
    );
};

export default AnimatedBlips;
