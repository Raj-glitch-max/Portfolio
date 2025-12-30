import { useEffect, useRef } from 'react';
import { randomElement, randomInt, random } from '../../lib/utils';
import { DEVOPS_COMMANDS, COLORS } from '../../lib/constants';

interface RainDrop {
    x: number;
    y: number;
    opacity: number;
    command: string;
    speed: number;
}

export default function CodeRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dropsRef = useRef<RainDrop[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const lastSpawnRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Spawn new drop every 3-4 seconds
        const spawnDrop = (now: number) => {
            if (now - lastSpawnRef.current > randomInt(3000, 4000)) {
                dropsRef.current.push({
                    x: randomInt(0, canvas.width),
                    y: -50,
                    opacity: 0,
                    command: randomElement(DEVOPS_COMMANDS),
                    speed: random(0.3, 0.6),
                });
                lastSpawnRef.current = now;
            }
        };

        // Animation loop
        const animate = (now: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Spawn new drops
            spawnDrop(now);

            // Update and draw each drop
            dropsRef.current = dropsRef.current.filter((drop) => {
                // Update position
                drop.y += drop.speed;

                // Fade in at top
                if (drop.y < 100 && drop.opacity < 0.05) {
                    drop.opacity += 0.001;
                }

                // Fade out at bottom
                if (drop.y > canvas.height - 100) {
                    drop.opacity -= 0.001;
                }

                // Remove if off screen or fully faded
                if (drop.y > canvas.height + 100 || drop.opacity <= 0) {
                    return false;
                }

                // Draw command
                ctx.font = '12px "Fira Code", monospace';
                ctx.fillStyle = COLORS.CYAN;
                ctx.globalAlpha = Math.min(drop.opacity, 0.05); // Very faint (max 5%)
                ctx.fillText(drop.command, drop.x, drop.y);
                ctx.globalAlpha = 1;

                return true;
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            window.removeEventListener('resize', resize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
        />
    );
}
