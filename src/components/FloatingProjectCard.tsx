import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../lib/types';

interface FloatingProjectCardProps {
    project: Project;
    index: number;
    onClick: () => void;
    size: 'small' | 'medium' | 'large';
}

export default function FloatingProjectCard({
    project,
    index,
    onClick,
    size
}: FloatingProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D tilt effect on mouse move
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    // Card size classes for bento grid - responsive
    const sizeClasses = {
        small: 'col-span-1 row-span-1',
        medium: 'col-span-1 md:row-span-2',
        large: 'md:col-span-2 row-span-1'
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
                delay: index * 0.15,
                duration: 0.8,
                type: 'spring',
                stiffness: 100
            }}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={`relative ${sizeClasses[size]} cursor-pointer group`}
        >
            {/* Floating effect container */}
            <motion.div
                animate={{
                    y: isHovered ? -15 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-full h-full"
            >
                {/* Animated gradient border glow */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 0.8 : 0,
                        scale: isHovered ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="
                        absolute -inset-[2px] rounded-3xl
                        bg-gradient-to-r from-cyan-neon via-magenta-neon to-cyan-neon
                        blur-lg
                        animate-gradient-shift
                    "
                    style={{ backgroundSize: '200% 200%' }}
                />

                {/* Glass card */}
                <div
                    onClick={onClick}
                    className="
                        relative w-full h-full min-h-[320px]
                        rounded-3xl
                        bg-gradient-to-br from-[rgba(22,27,34,0.7)] via-[rgba(22,27,34,0.5)] to-[rgba(22,27,34,0.3)]
                        backdrop-blur-xl
                        border border-cyan-neon/20
                        group-hover:border-cyan-neon/50
                        transition-all duration-500
                        overflow-hidden
                        shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]
                        group-hover:shadow-[0_25px_70px_rgba(0,217,255,0.25),inset_0_1px_0_rgba(0,217,255,0.1)]
                        flex flex-col
                    "
                    style={{
                        transform: 'translateZ(50px)',
                    }}
                >
                    {/* Subtle Dot Pattern Background */}
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                            backgroundSize: '24px 24px'
                        }}
                    />

                    {/* Background gradient orb */}
                    <motion.div
                        animate={{
                            scale: isHovered ? 1.8 : 1,
                            opacity: isHovered ? 0.4 : 0.15,
                            x: isHovered ? 30 : 0,
                            y: isHovered ? -30 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className="
                            absolute -top-20 -right-20 w-64 h-64
                            bg-gradient-to-br from-cyan-neon to-magenta-neon
                            rounded-full
                            blur-3xl
                            pointer-events-none
                        "
                    />

                    {/* Second orb for depth */}
                    <motion.div
                        animate={{
                            scale: isHovered ? 1.5 : 1,
                            opacity: isHovered ? 0.3 : 0.1,
                        }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="
                            absolute -bottom-16 -left-16 w-48 h-48
                            bg-gradient-to-tr from-magenta-neon to-yellow-neon
                            rounded-full
                            blur-3xl
                            pointer-events-none
                        "
                    />

                    {/* Floating particles on hover */}
                    {isHovered && (
                        <>
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, 0.8, 0],
                                        scale: [0, 1, 0.5],
                                        x: Math.cos(i * 60 * Math.PI / 180) * 80,
                                        y: Math.sin(i * 60 * Math.PI / 180) * 80 - 40,
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                    className="
                                        absolute top-1/2 left-1/2 w-2 h-2
                                        bg-cyan-neon rounded-full
                                        pointer-events-none
                                    "
                                />
                            ))}
                        </>
                    )}

                    {/* Content Container */}
                    <div className="relative p-6 flex-1 flex flex-col z-10">
                        {/* Top section: Header */}
                        <div className="mb-4">
                            {/* Project icon/emoji */}
                            <motion.div
                                animate={{
                                    rotate: isHovered ? [0, -5, 5, 0] : 0,
                                    scale: isHovered ? 1.1 : 1,
                                }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl mb-4 inline-block"
                                style={{ transform: 'translateZ(75px)' }}
                            >
                                {project.icon || '🚀'}
                            </motion.div>

                            <motion.h3
                                className="text-xl md:text-2xl font-terminal text-white mb-2 group-hover:text-cyan-neon transition-colors duration-300"
                                style={{ transform: 'translateZ(60px)' }}
                            >
                                {project.name}
                            </motion.h3>

                            <motion.p
                                className="text-sm text-text-secondary leading-relaxed line-clamp-2"
                                style={{ transform: 'translateZ(40px)' }}
                            >
                                {project.shortDescription}
                            </motion.p>
                        </div>

                        {/* Middle section: Key Features (Fills the empty space) */}
                        <div className="flex-1 py-2">
                            <div className="space-y-2.5">
                                {project.features.slice(0, 3).map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0.6, x: -5 }}
                                        whileHover={{ opacity: 1, x: 0 }}
                                        className="flex items-start gap-2.5 group/feature"
                                        style={{ transform: 'translateZ(30px)' }}
                                    >
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-neon/40 group-hover/feature:bg-cyan-neon group-hover/feature:shadow-[0_0_8px_rgba(0,217,255,0.6)] transition-all duration-300" />
                                        <p className="text-xs md:text-sm text-text-muted group-hover/feature:text-text-secondary transition-colors line-clamp-1">
                                            {feature}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom section: Tech Stack & Actions */}
                        <div className="mt-auto pt-4 border-t border-white/5">
                            {/* Tech stack pills */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.slice(0, 3).map((tech, i) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
                                        style={{ transform: 'translateZ(30px)' }}
                                        className="
                                            px-2.5 py-1
                                            text-[10px] md:text-xs font-mono
                                            bg-cyan-neon/5
                                            border border-cyan-neon/20
                                            rounded-md
                                            text-cyan-neon/80
                                            group-hover:bg-cyan-neon/10
                                            group-hover:border-cyan-neon/40
                                            group-hover:text-cyan-neon
                                            transition-all duration-300
                                        "
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                                {project.techStack.length > 3 && (
                                    <span className="px-2 py-1 text-[10px] md:text-xs font-mono text-text-muted/60 border border-transparent">
                                        +{project.techStack.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{ transform: 'translateZ(50px)' }}
                                    className="
                                        flex-1 py-2
                                        bg-cyan-neon/10
                                        border border-cyan-neon/40
                                        rounded-lg
                                        text-cyan-neon
                                        font-mono text-xs font-bold
                                        hover:bg-cyan-neon hover:text-deep-navy
                                        transition-all duration-300
                                        flex items-center justify-center gap-2
                                        backdrop-blur-sm
                                    "
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span>Explore</span>
                                </motion.button>

                                <motion.a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{ transform: 'translateZ(50px)' }}
                                    className="
                                        p-2
                                        bg-white/5
                                        border border-white/10
                                        rounded-lg
                                        text-white/70
                                        hover:border-white/30
                                        hover:text-white
                                        hover:bg-white/10
                                        transition-all duration-300
                                        backdrop-blur-sm
                                    "
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Github className="w-4 h-4" />
                                </motion.a>
                            </div>
                        </div>
                    </div>

                    {/* Shine effect on hover */}
                    <motion.div
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            x: isHovered ? '200%' : '-100%',
                        }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="
                            absolute inset-0
                            bg-gradient-to-r from-transparent via-white/5 to-transparent
                            skew-x-12
                            pointer-events-none
                        "
                    />

                    {/* Glass reflection line */}
                    <div className="
                        absolute top-0 left-0 right-0 h-px
                        bg-gradient-to-r from-transparent via-white/10 to-transparent
                    " />
                </div>
            </motion.div>
        </motion.div>
    );
}
