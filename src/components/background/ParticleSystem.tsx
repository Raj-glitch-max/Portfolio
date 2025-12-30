import { useEffect, useRef } from 'react';
import { random, isMobile, FPSMeter, throttle } from '../../lib/utils';
import { COLORS } from '../../lib/constants';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

export default function ParticleSystem() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | null>(null);
    const fpsMeterRef = useRef(new FPSMeter());

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

        // Initialize particles
        const particleCount = isMobile() ? 15 : 25;
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: random(0, canvas.width),
            y: random(0, canvas.height),
            vx: random(-0.5, 0.5),
            vy: random(-0.5, 0.5),
            size: random(3, 5),
        }));

        // Mouse move handler (throttled)
        const handleMouseMove = throttle((e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        }, 50);
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            // Measure FPS
            const fps = fpsMeterRef.current.measure();

            // Reduce particle count if FPS drops below 30
            if (fps < 30 && particlesRef.current.length > 10) {
                particlesRef.current = particlesRef.current.slice(0, -2);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Apply mouse attraction
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    particle.vx += (dx / distance) * force * 0.015;
                    particle.vy += (dy / distance) * force * 0.015;
                }

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Add slight friction
                particle.vx *= 0.995;
                particle.vy *= 0.995;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.fillStyle = COLORS.CYAN;
                ctx.globalAlpha = 0.4;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Draw subtle trail
                ctx.globalAlpha = 0.05;
                ctx.fillRect(particle.x - 1, particle.y - 1, 2, 2);
                ctx.globalAlpha = 1;
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
