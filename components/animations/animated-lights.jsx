'use client'
import React, { useEffect, useState } from "react";
import styles from "./animated-lights.module.css";

const AnimatedLights = () => {
    const [flashingLights, setFlashingLights] = useState([]);
    const [zippingLightPosition, setZippingLightPosition] = useState({
        left: "50%",
        top: "50%",
    });

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
        }, 2000);

        const zippingInterval = setInterval(() => {
            setZippingLightPosition({
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
            });
        }, 2500);

        return () => {
            clearInterval(flashingInterval);
            clearInterval(zippingInterval);
        };
    }, []);

    return (
        <div aria-hidden='true' inert className={styles.animationOverlay}>
            {flashingLights.map((light) => (
                <div
                    key={light.id}
                    className={styles.flashingLight}
                    style={{ left: light.left, top: light.top }}
                ></div>
            ))}
            <div
                className={styles.zippingLightRight}
                style={{
                    left: zippingLightPosition.left,
                    top: zippingLightPosition.top,
                }}
            ></div>
            <div
                className={styles.zippingLightLeft}
                style={{
                    left: zippingLightPosition.left,
                    top: zippingLightPosition.top,
                }}
            ></div>
        </div>
    );
};

export default AnimatedLights;