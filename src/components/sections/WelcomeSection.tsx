import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Terminal, ChevronRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../lib/constants';

// Tech stack icons that will orbit around
const techStack = [
    { name: 'Docker', color: '#2496ED' },
    { name: 'K8s', color: '#326CE5' },
    { name: 'AWS', color: '#FF9900' },
    { name: 'Terraform', color: '#7B42BC' },
    { name: 'Python', color: '#3776AB' },
    { name: 'Git', color: '#F05032' },
];

export default function WelcomeSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse tracking for profile card
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation
    const springConfig = { stiffness: 150, damping: 20 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative flex flex-col items-center justify-center min-h-[80vh] py-16"
        >
            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="w-full h-full" style={{
                    backgroundImage: `
                        linear-gradient(rgba(0,217,255,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,217,255,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center" style={{ perspective: '1000px' }}>
                {/* Orbiting Tech Icons */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {techStack.map((tech, index) => {
                        const angle = (index * 360) / techStack.length;
                        const radius = 180;
                        return (
                            <motion.div
                                key={tech.name}
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                style={{
                                    position: 'absolute',
                                    transformOrigin: 'center center',
                                }}
                                className="w-full h-full flex items-center justify-center"
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.6 }}
                                    transition={{ delay: index * 0.2 }}
                                    style={{
                                        position: 'absolute',
                                        left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * radius}px)`,
                                        top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * radius}px)`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    className="px-3 py-1.5 rounded-full font-mono text-xs backdrop-blur-sm border"
                                    whileHover={{ scale: 1.2, opacity: 1 }}
                                >
                                    <span style={{ color: tech.color }}>{tech.name}</span>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Floating Profile Card - 3D Interactive */}
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: 'preserve-3d',
                    }}
                    className="relative"
                >
                    {/* Glow behind card */}
                    <motion.div
                        animate={{
                            opacity: isHovered ? 0.6 : 0.3,
                            scale: isHovered ? 1.1 : 1,
                        }}
                        className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-cyan-neon/30 via-transparent to-magenta-neon/20 blur-2xl"
                    />

                    {/* Main Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, type: 'spring' }}
                        className="
                            relative p-8 rounded-2xl
                            bg-[rgba(22,27,34,0.7)]
                            backdrop-blur-xl
                            border border-cyan-neon/30
                            shadow-[0_20px_50px_rgba(0,0,0,0.4)]
                        "
                        style={{ transform: 'translateZ(50px)' }}
                    >
                        {/* Top gradient line */}
                        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-neon/50 to-transparent" />

                        {/* Profile Avatar */}
                        <motion.div
                            animate={{ y: isHovered ? -5 : 0 }}
                            className="relative w-24 h-24 mx-auto mb-6"
                        >
                            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-cyan-neon to-magenta-neon opacity-50 blur-md animate-pulse" />
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
                                                <span class="text-cyan-neon font-mono text-2xl font-bold">RP</span>
                                            </div>
                                        `;
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Terminal-style greeting */}
                        <div className="text-center mb-4">
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
                                className="font-terminal text-2xl md:text-3xl text-white mb-2"
                            >
                                {PERSONAL_INFO.name}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-cyan-neon font-mono text-sm"
                            >
                                {PERSONAL_INFO.title}
                            </motion.p>
                        </div>

                        {/* Status indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center justify-center gap-2 mt-4"
                        >
                            <div className="w-2 h-2 bg-success-green rounded-full animate-pulse" />
                            <span className="text-success-green text-xs font-mono">{PERSONAL_INFO.status}</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom hint */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-16 flex flex-col items-center gap-4"
            >
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 text-text-muted text-sm"
                >
                    <ChevronRight className="w-4 h-4 text-cyan-neon" />
                    <span className="font-mono">Select a section to explore</span>
                </motion.div>

                {/* Quick nav hint */}
                <div className="flex gap-4">
                    {['about', 'skills', 'projects'].map((section, idx) => (
                        <motion.span
                            key={section}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 1.2 + idx * 0.1 }}
                            className="text-xs font-mono text-text-muted/50"
                        >
                            ./{section}.sh
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Floating sparkle decorations */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/4 right-1/4 text-cyan-neon/20"
            >
                <Sparkles className="w-4 h-4" />
            </motion.div>
            <motion.div
                animate={{
                    rotate: [360, 0],
                }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-1/3 left-1/4 text-magenta-neon/20"
            >
                <Sparkles className="w-3 h-3" />
            </motion.div>
        </div>
    );
}
