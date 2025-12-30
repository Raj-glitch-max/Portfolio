/* eslint-disable */
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { SKILL_COMMANDS, DEFAULT_COMMANDS } from '../../lib/skillCommands';
import { TechIcon } from '../TechIcon';
import { X, RefreshCw } from 'lucide-react';

interface SkillExplosionProps {
    skillName: string;
    onComplete: () => void;
    color: string;
}

// Physics State (Mutable, outside React render cycle)
interface PhysicsParticle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    scale: number;
    radius: number; // For collision
    isDragging: boolean;
}

interface RenderParticle {
    id: number;
    cmd: string;
    scale: number;
    color: string;
}

const TEASE_MESSAGES = [
    "Is that all you got?",
    "My grandma clicks faster.",
    "I optimized this for SPEED!",
    "Server load: 0%. Try harder.",
    "Are you even trying?",
    "Spam it like you mean it!",
    "Too slow! 🐢",
    "My terminal is yawning."
];

export default function SkillExplosion({ skillName, onComplete, color }: SkillExplosionProps) {
    // React State
    const [particles, setParticles] = useState<RenderParticle[]>([]);
    const [isClosing, setIsClosing] = useState(false);
    const [tease, setTease] = useState<{ msg: string; id: number } | null>(null);

    // Refs for Physics Engine
    const physicsRef = useRef<Map<number, PhysicsParticle>>(new Map());
    const domRefs = useRef<Map<number, HTMLDivElement>>(new Map());
    const requestRef = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
    const nextIdRef = useRef(0);
    const commandsRef = useRef<string[]>([]);

    // Tease Logic Refs
    const clickTimesRef = useRef<number[]>([]);
    const lastTeaseTimeRef = useRef(0);

    // Constants
    const CENTER_RADIUS = 100; // Increased radius (visual size w-44 is 176px / 2 = 88px) + buffer
    const MAX_PARTICLES = 60;

    // Initialize
    useEffect(() => {
        commandsRef.current = SKILL_COMMANDS[skillName] || DEFAULT_COMMANDS;

        // Spawn initial 5 particles
        for (let i = 0; i < 5; i++) {
            spawnParticle(true);
        }

        // Start Loop
        requestRef.current = requestAnimationFrame(updatePhysics);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [skillName]);

    const spawnParticle = (randomPos: boolean = false) => {
        const id = nextIdRef.current++;
        const cmd = commandsRef.current[id % commandsRef.current.length];
        const angleDeg = Math.random() * 360;
        const angleRad = angleDeg * Math.PI / 180;
        const speed = 8 + Math.random() * 12;

        const width = window.innerWidth;
        const height = window.innerHeight;
        const centerX = width / 2;
        const centerY = height / 2;

        let startX, startY;

        if (randomPos) {
            startX = centerX + (Math.cos(angleRad) * 250);
            startY = centerY + (Math.sin(angleRad) * 250);
        } else {
            startX = centerX + (Math.cos(angleRad) * (CENTER_RADIUS + 10));
            startY = centerY + (Math.sin(angleRad) * (CENTER_RADIUS + 10));
        }

        physicsRef.current.set(id, {
            id,
            x: startX,
            y: startY,
            vx: Math.cos(angleRad) * speed,
            vy: Math.sin(angleRad) * speed,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2,
            scale: 0.8 + Math.random() * 0.4,
            radius: 30,
            isDragging: false
        });

        setParticles(prev => {
            const next = [...prev, { id, cmd, scale: 0.8 + Math.random() * 0.4, color }];
            if (next.length > MAX_PARTICLES) {
                const oldestId = next[0].id;
                physicsRef.current.delete(oldestId);
                domRefs.current.delete(oldestId);
                return next.slice(1);
            }
            return next;
        });
    };

    const updatePhysics = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const friction = 0.99;
        const repulsionRadius = 150;
        const repulsionForce = 1.5;
        const centerX = width / 2;
        const centerY = height / 2;

        physicsRef.current.forEach(p => {
            if (p.isDragging) return;

            // 1. Mouse Repulsion
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < repulsionRadius) {
                const force = (1 - dist / repulsionRadius) * repulsionForce;
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
            }

            // 2. Central Cannon Collision
            const cdx = p.x - centerX;
            const cdy = p.y - centerY;
            const cDist = Math.sqrt(cdx * cdx + cdy * cdy);
            const minDist = CENTER_RADIUS + p.radius;

            if (cDist < minDist) {
                const angle = Math.atan2(cdy, cdx);
                const targetX = centerX + Math.cos(angle) * minDist;
                const targetY = centerY + Math.sin(angle) * minDist;

                p.x = targetX;
                p.y = targetY;

                p.vx += Math.cos(angle) * 2;
                p.vy += Math.sin(angle) * 2;
            }

            // 3. Move
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;

            p.vx *= friction;
            p.vy *= friction;

            // 4. Wall Bounce
            const margin = 50;
            if (p.x < margin) { p.x = margin; p.vx *= -0.8; }
            if (p.x > width - margin) { p.x = width - margin; p.vx *= -0.8; }
            if (p.y < margin) { p.y = margin; p.vy *= -0.8; }
            if (p.y > height - margin) { p.y = height - margin; p.vy *= -0.8; }

            // 5. Zero-G Drift
            if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.1;
            if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.1;

            // 6. Update DOM
            const el = domRefs.current.get(p.id);
            if (el) {
                el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg) scale(${p.scale})`;
            }
        });

        requestRef.current = requestAnimationFrame(updatePhysics);
    };

    // Interaction Handlers
    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent, id: number) => {
        e.stopPropagation();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

        const p = physicsRef.current.get(id);
        if (p) {
            p.isDragging = true;
            activeDragRef.current = { id, offsetX: p.x - clientX, offsetY: p.y - clientY };
        }
    };

    const activeDragRef = useRef<{ id: number; offsetX: number; offsetY: number } | null>(null);

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

        mouseRef.current = { x: clientX, y: clientY };

        if (activeDragRef.current) {
            const { id, offsetX, offsetY } = activeDragRef.current;
            const p = physicsRef.current.get(id);
            if (p) {
                const newX = clientX + offsetX;
                const newY = clientY + offsetY;

                p.vx = (newX - p.x) * 0.5;
                p.vy = (newY - p.y) * 0.5;

                p.x = newX;
                p.y = newY;

                const el = domRefs.current.get(id);
                if (el) {
                    el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg) scale(${p.scale})`;
                }
            }
        }
    };

    const handleMouseUp = () => {
        if (activeDragRef.current) {
            const p = physicsRef.current.get(activeDragRef.current.id);
            if (p) p.isDragging = false;
            activeDragRef.current = null;
        }
    };

    const handleCannonClick = () => {
        spawnParticle();

        // Visual feedback
        const cannon = document.getElementById('cannon-core');
        if (cannon) {
            cannon.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(0.9)' },
                { transform: 'scale(1.1)' },
                { transform: 'scale(1)' }
            ], { duration: 100 });
        }

        // --- TEASE LOGIC ---
        const now = Date.now();
        clickTimesRef.current.push(now);

        // Keep last 5 clicks
        if (clickTimesRef.current.length > 5) {
            clickTimesRef.current.shift();
        }

        // Check speed if we have enough data
        if (clickTimesRef.current.length >= 3) {
            const first = clickTimesRef.current[0];
            const last = clickTimesRef.current[clickTimesRef.current.length - 1];
            const durationSeconds = (last - first) / 1000;
            const cps = clickTimesRef.current.length / durationSeconds;

            // If slow (< 4 CPS) and cooldown passed (2s)
            if (cps < 4 && now - lastTeaseTimeRef.current > 2000) {
                const randomMsg = TEASE_MESSAGES[Math.floor(Math.random() * TEASE_MESSAGES.length)];
                setTease({ msg: randomMsg, id: now });
                lastTeaseTimeRef.current = now;
            } else if (cps > 6) {
                // Clear tease if they speed up
                setTease(null);
            }
        }
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onComplete, 500);
    };

    // Stars
    const [stars] = useState(() => Array.from({ length: 100 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3,
        opacity: 0.2 + Math.random() * 0.8
    })));

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-hidden cursor-crosshair touch-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            onMouseLeave={() => { mouseRef.current = { x: -1000, y: -1000 }; }}
        >
            {/* Space Background */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md pointer-events-none">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{ background: `radial-gradient(circle at center, ${color}20 0%, #000000 90%)` }}
                />
                {stars.map((star, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            opacity: star.opacity
                        }}
                    />
                ))}
            </div>

            {/* Controls */}
            <div className="absolute top-8 right-8 z-50 flex gap-4">
                <button
                    onClick={() => {
                        physicsRef.current.forEach(p => {
                            p.vx = (Math.random() - 0.5) * 50;
                            p.vy = (Math.random() - 0.5) * 50;
                        });
                    }}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                >
                    <RefreshCw className="w-6 h-6" />
                </button>
                <button
                    onClick={handleClose}
                    className="p-3 rounded-full bg-red-500/10 hover:bg-red-500/30 text-red-400 transition-colors border border-red-500/20"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* CENTRAL CANNON CORE */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                <div
                    id="cannon-core"
                    onClick={handleCannonClick}
                    className="relative w-44 h-44 rounded-full flex items-center justify-center cursor-pointer pointer-events-auto transition-transform active:scale-95 group"
                    style={{
                        background: `radial-gradient(circle, ${color}40 0%, #000000 100%)`,
                        border: `2px solid ${color}`,
                        boxShadow: `0 0 30px ${color}40`
                    }}
                >
                    <TechIcon name={skillName} className="w-24 h-24 relative z-10" />

                    {/* Pulse Ring */}
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: color }} />

                    {/* Hint */}
                    <div className="absolute -bottom-12 text-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <span className="text-xs font-mono text-white/60 bg-black/50 px-2 py-1 rounded">
                            CLICK TO SHOOT
                        </span>
                    </div>
                </div>
            </div>

            {/* TEASE MESSAGE */}
            <AnimatePresence>
                {tease && (
                    <motion.div
                        key={tease.id}
                        initial={{ opacity: 0, y: 0, scale: 0.8 }}
                        animate={{ opacity: 1, y: -120, scale: 1.1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[60]"
                    >
                        <div
                            className="bg-red-500/90 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg border-2 border-white/20 backdrop-blur-xl"
                            style={{
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                transform: `rotate(${Math.random() * 10 - 5}deg)`
                            }}
                        >
                            {tease.msg}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Particles (Direct DOM) */}
            {particles.map((p) => (
                <div
                    key={p.id}
                    ref={el => { if (el) domRefs.current.set(p.id, el); }}
                    onMouseDown={(e) => handleMouseDown(e, p.id)}
                    onTouchStart={(e) => handleMouseDown(e, p.id)}
                    className="absolute left-0 top-0 flex items-center justify-center cursor-grab active:cursor-grabbing select-none will-change-transform z-40"
                    style={{
                        transform: 'translate(-100px, -100px)'
                    }}
                >
                    <span
                        className="font-mono font-bold text-lg md:text-xl whitespace-nowrap transition-colors hover:text-white"
                        style={{
                            color: p.color,
                            textShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}`,
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                        }}
                    >
                        $ {p.cmd}
                    </span>
                </div>
            ))}
        </motion.div>
    );
}
