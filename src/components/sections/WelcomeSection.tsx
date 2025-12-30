/* eslint-disable */
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../../lib/constants';

import { TechIcon } from '../TechIcon';

// Solar system orbits configuration
const orbits = [
    { radius: 160, icons: ['Docker', 'Kubernetes'], duration: 25, colors: ['#2496ED', '#326CE5'] },
    { radius: 240, icons: ['AWS', 'Terraform', 'Python'], duration: 35, colors: ['#FF9900', '#7B42BC', '#3776AB'] },
    { radius: 320, icons: ['Git', 'PostgreSQL', 'Redis'], duration: 45, colors: ['#F05032', '#336791', '#DC382D'] },
];

// Floating terminal commands
const commands = [
    "docker build -t app .",
    "kubectl get pods",
    "terraform apply",
    "git commit -m 'feat: init'",
    "npm run build",
    "aws s3 ls",
    "python3 main.py",
    "cargo build --release"
];

export default function WelcomeSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Mouse tracking for profile card
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation
    const springConfig = { stiffness: 150, damping: 20 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    // Generate stable random values for commands
    const commandPositions = useMemo(() => {
        return commands.map(() => ({
            initialX: Math.random() * 100 - 50,
            initialY: Math.random() * 100 - 50,
            moveX1: Math.random() * 200 - 100,
            moveX2: Math.random() * 200 - 100,
            moveY1: Math.random() * 200 - 100,
            moveY2: Math.random() * 200 - 100,
            duration: 10 + Math.random() * 10,
            left: 10 + Math.random() * 80,
            top: 10 + Math.random() * 80,
        }));
    }, []);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center justify-center min-h-[85dvh] overflow-hidden px-4"
        >
            {/* Interactive Grid Background */}
            <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full opacity-20">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" fill="rgba(0, 217, 255, 0.5)" />
                        </pattern>
                        <radialGradient id="maskGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="white" stopOpacity="1" />
                            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </radialGradient>
                        <mask id="mask">
                            <circle cx={mousePos.x} cy={mousePos.y} r="300" fill="url(#maskGradient)" />
                        </mask>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" mask="url(#mask)" />
                </svg>
            </div>

            {/* Floating Terminal Commands - Hidden on Mobile */}
            {commands.map((cmd, i) => {
                const pos = commandPositions[i];
                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: pos.initialX, y: pos.initialY }}
                        animate={{
                            opacity: [0, 0.4, 0],
                            x: [pos.moveX1, pos.moveX2],
                            y: [pos.moveY1, pos.moveY2],
                        }}
                        transition={{
                            duration: pos.duration,
                            repeat: Infinity,
                            delay: i * 2,
                            ease: "linear"
                        }}
                        className="absolute font-mono text-xs text-cyan-neon/30 pointer-events-none whitespace-nowrap hidden md:block"
                        style={{
                            left: `${pos.left}%`,
                            top: `${pos.top}%`,
                        }}
                    >
                        $ {cmd}
                    </motion.div>
                );
            })}

            {/* Solar System Container - Scaled for mobile */}
            <div className="absolute inset-0 flex items-center justify-center scale-[0.55] md:scale-100 transition-transform duration-500 pointer-events-none">
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Orbit rings (decorative) */}
                    {orbits.map((orbit, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.15, scale: 1 }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            className="absolute rounded-full border border-cyan-neon/30"
                            style={{
                                width: orbit.radius * 2,
                                height: orbit.radius * 2,
                            }}
                        />
                    ))}

                    {/* Orbiting Tech Icons */}
                    {orbits.map((orbit, orbitIdx) => (
                        <motion.div
                            key={orbitIdx}
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: orbit.duration,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                            className="absolute"
                            style={{
                                width: orbit.radius * 2,
                                height: orbit.radius * 2,
                            }}
                        >
                            {orbit.icons.map((iconName, iconIdx) => {
                                const angle = (iconIdx * 360) / orbit.icons.length;
                                const x = Math.cos((angle * Math.PI) / 180) * orbit.radius;
                                const y = Math.sin((angle * Math.PI) / 180) * orbit.radius;
                                return (
                                    <motion.div
                                        key={iconName}
                                        initial={{ opacity: 0, rotate: 0 }}
                                        animate={{ opacity: 1, rotate: -360 }}
                                        transition={{
                                            opacity: { delay: 0.5 + orbitIdx * 0.2 + iconIdx * 0.1, duration: 0.5 },
                                            rotate: { duration: orbit.duration, repeat: Infinity, ease: 'linear' }
                                        }}
                                        className="absolute p-4 rounded-2xl bg-[rgba(22,27,34,0.9)] border border-white/10 backdrop-blur-md shadow-xl hover:border-cyan-neon/50 hover:scale-110 transition-all cursor-pointer group pointer-events-auto"
                                        style={{
                                            left: `calc(50% + ${x}px - 32px)`,
                                            top: `calc(50% + ${y}px - 32px)`,
                                        }}
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        <div className="w-10 h-10 flex items-center justify-center">
                                            <TechIcon name={iconName} color={orbit.colors[iconIdx]} />
                                        </div>
                                        {/* Tooltip */}
                                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-cyan-neon whitespace-nowrap bg-black/80 px-2 py-1 rounded">
                                            {iconName}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Central Profile Card - 3D Interactive */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                className="relative z-10 w-full max-w-[340px]"
            >
                {/* Glow behind card */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 0.5 : 0.25,
                        scale: isHovered ? 1.15 : 1,
                    }}
                    className="absolute -inset-12 rounded-full bg-gradient-to-br from-cyan-neon/40 via-transparent to-magenta-neon/30 blur-3xl"
                />

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className="
                        relative p-8 md:p-12 rounded-3xl
                        bg-[rgba(22,27,34,0.85)]
                        backdrop-blur-xl
                        border border-cyan-neon/30
                        shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                        w-full
                    "
                    style={{ transform: 'translateZ(30px)' }}
                >
                    {/* Top gradient line */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-neon/60 to-transparent" />

                    {/* Profile Avatar */}
                    <motion.div
                        animate={{ y: isHovered ? -8 : 0 }}
                        className="relative w-32 h-32 mx-auto mb-6"
                    >
                        <motion.div
                            animate={{
                                boxShadow: isHovered
                                    ? '0 0 40px rgba(0,217,255,0.6)'
                                    : '0 0 20px rgba(0,217,255,0.3)',
                            }}
                            className="absolute -inset-2 rounded-full bg-gradient-to-br from-cyan-neon to-magenta-neon opacity-60"
                        />
                        <div className="relative w-full h-full rounded-full border-2 border-cyan-neon/50 overflow-hidden">
                            <img
                                src="/profile.png"
                                alt={PERSONAL_INFO.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement!.innerHTML = `
                                        <div class="w-full h-full bg-gradient-to-br from-cyan-neon/30 to-magenta-neon/20 flex items-center justify-center">
                                            <span class="text-cyan-neon font-mono text-3xl font-bold">RP</span>
                                        </div>
                                    `;
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Terminal greeting */}
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center justify-center gap-2 mb-3"
                        >
                            <Terminal className="w-4 h-4 text-cyan-neon" />
                            <span className="font-mono text-xs text-cyan-neon/70">~/portfolio</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="font-terminal text-2xl text-white mb-2"
                        >
                            {PERSONAL_INFO.name}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-cyan-neon font-mono text-sm mb-4"
                        >
                            {PERSONAL_INFO.title}
                        </motion.p>

                        {/* Status */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center justify-center gap-2"
                        >
                            <div className="w-2 h-2 bg-success-green rounded-full animate-pulse" />
                            <span className="text-success-green text-xs font-mono">{PERSONAL_INFO.status}</span>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
