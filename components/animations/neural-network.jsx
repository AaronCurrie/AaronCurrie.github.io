'use client';
import { useEffect, useRef } from 'react';
import styles from './neural-network.module.css';

const NODE_COUNT = 18;
const CONNECT_DIST = 90;     // px — max distance to draw a line between nodes
const PULSE_PERIOD = 4200;   // ms — full grow → collapse cycle

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

const NeuralNetwork = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Resize canvas to match CSS size
        const resize = () => {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        // Initialise nodes
        const nodes = Array.from({ length: NODE_COUNT }, () => ({
            x:    randomBetween(0.1, 0.9),  // fractional position (0-1)
            y:    randomBetween(0.1, 0.9),
            vx:   randomBetween(-0.00018, 0.00018),
            vy:   randomBetween(-0.00018, 0.00018),
            r:    randomBetween(2, 4),
            phase: randomBetween(0, Math.PI * 2),  // for per-node pulse offset
        }));

        let start = null;
        let rafId;

        const draw = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;

            const W = canvas.width;
            const H = canvas.height;

            ctx.clearRect(0, 0, W, H);

            // Global pulse: 0 → 1 → 0 over PULSE_PERIOD ms
            const globalT = (elapsed % PULSE_PERIOD) / PULSE_PERIOD;
            // Smooth ease-in-out triangle wave
            const pulse = globalT < 0.5
                ? globalT * 2
                : (1 - globalT) * 2;

            // Move nodes (bounce off edges)
            for (const n of nodes) {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0.05 || n.x > 0.95) n.vx *= -1;
                if (n.y < 0.05 || n.y > 0.95) n.vy *= -1;
            }

            // Draw edges
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i];
                    const b = nodes[j];
                    const dx = (a.x - b.x) * W;
                    const dy = (a.y - b.y) * H;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECT_DIST) {
                        const proximity = 1 - dist / CONNECT_DIST;
                        const alpha = proximity * pulse * 0.55;
                        ctx.beginPath();
                        ctx.moveTo(a.x * W, a.y * H);
                        ctx.lineTo(b.x * W, b.y * H);
                        ctx.strokeStyle = `rgba(0, 208, 255, ${alpha})`;
                        ctx.lineWidth = proximity * pulse * 1.2;
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            for (const n of nodes) {
                // Each node has its own phase offset so they don't all pulse in sync
                const nodePulse = 0.5 + 0.5 * Math.sin(elapsed * 0.002 + n.phase);
                const radius = n.r * (0.6 + nodePulse * pulse * 0.9);
                const alpha  = 0.35 + nodePulse * pulse * 0.65;

                // Outer glow
                const grd = ctx.createRadialGradient(
                    n.x * W, n.y * H, 0,
                    n.x * W, n.y * H, radius * 3,
                );
                grd.addColorStop(0, `rgba(0, 208, 255, ${alpha * 0.7})`);
                grd.addColorStop(1, 'rgba(0, 208, 255, 0)');
                ctx.beginPath();
                ctx.arc(n.x * W, n.y * H, radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();

                // Solid core dot
                ctx.beginPath();
                ctx.arc(n.x * W, n.y * H, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(180, 235, 255, ${alpha})`;
                ctx.fill();
            }

            rafId = requestAnimationFrame(draw);
        };

        rafId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-hidden="true"
        />
    );
};

export default NeuralNetwork;
