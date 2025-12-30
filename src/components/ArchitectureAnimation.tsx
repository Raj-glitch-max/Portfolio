import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { PROJECT_ARCHITECTURES, type ArchitectureConfig } from '../lib/projectArchitectures';

// Tech stack icon components with recognizable logos
import { TechIcon } from './TechIcon';

// Tech stack icon components with recognizable logos
// Replaced by TechIcon component


interface ArchitectureAnimationProps {
    projectName: string;
    onComplete: () => void;
}

export default function ArchitectureAnimation({ projectName, onComplete }: ArchitectureAnimationProps) {
    const [currentTime, setCurrentTime] = useState(0);
    const [terminalLineIndex, setTerminalLineIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Get architecture config for this project
    const config: ArchitectureConfig | undefined = useMemo(() => {
        return PROJECT_ARCHITECTURES[projectName];
    }, [projectName]);

    // Check for reduced motion preference
    const prefersReducedMotion = useMemo(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    // Animation timer
    useEffect(() => {
        if (!config || prefersReducedMotion) {
            // Skip animation for reduced motion or missing config
            const timer = setTimeout(() => onComplete(), 500);
            return () => clearTimeout(timer);
        }

        const startTime = Date.now();

        const timer = setInterval(() => {
            const elapsed = (Date.now() - startTime) / 1000;
            setCurrentTime(elapsed);

            if (elapsed >= config.duration) {
                setIsComplete(true);
                clearInterval(timer);
                setTimeout(onComplete, 800);
            }
        }, 50);

        return () => clearInterval(timer);
    }, [config, onComplete, prefersReducedMotion]);

    // Terminal text animation
    useEffect(() => {
        if (!config) return;

        const interval = setInterval(() => {
            setTerminalLineIndex(prev => {
                if (prev < config.terminalCommands.length - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, 800);

        return () => clearInterval(interval);
    }, [config]);

    if (!config) {
        // Fallback if no architecture defined
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            >
                <div className="text-cyan-neon font-mono">Loading architecture...</div>
            </motion.div>
        );
    }

    // Calculate SVG viewBox dimensions - account for larger 80px blocks
    const maxX = Math.max(...config.nodes.map(n => n.x)) + 120;
    const maxY = Math.max(...config.nodes.map(n => n.y)) + 100;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            >
                <div className="relative w-full max-w-5xl p-4 md:p-8">
                    {/* Main Animation Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="
                            bg-darker-gray/95
                            backdrop-blur-xl
                            border border-cyan-neon/40
                            rounded-2xl
                            p-4 md:p-8
                            shadow-[0_0_60px_rgba(0,217,255,0.25)]
                        "
                    >
                        {/* Header */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-4 md:mb-6"
                        >
                            <h3 className="text-xl md:text-2xl font-terminal text-cyan-neon text-glow-cyan">
                                {projectName}
                            </h3>
                            <p className="text-sm text-text-muted mt-1 font-mono">
                                Architecture Deployment Sequence
                            </p>
                        </motion.div>

                        {/* SVG Architecture Diagram */}
                        <div className="relative w-full aspect-[16/9] min-h-[300px] bg-deep-navy/50 rounded-xl border border-cyan-neon/20 overflow-hidden">
                            <svg
                                viewBox={`0 0 ${maxX} ${maxY}`}
                                className="w-full h-full"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                {/* Gradient definitions */}
                                <defs>
                                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.3" />
                                        <stop offset="50%" stopColor="#00d9ff" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.3" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Connections */}
                                {config.connections.map((conn, i) => {
                                    const fromNode = config.nodes.find(n => n.id === conn.from);
                                    const toNode = config.nodes.find(n => n.id === conn.to);
                                    if (!fromNode || !toNode) return null;

                                    const isVisible = currentTime >= conn.delay;
                                    const progress = Math.min(1, (currentTime - conn.delay) / 0.5);

                                    return (
                                        <g key={`conn-${i}`}>
                                            {/* Connection line */}
                                            <motion.line
                                                x1={fromNode.x}
                                                y1={fromNode.y}
                                                x2={toNode.x}
                                                y2={toNode.y}
                                                stroke="rgba(0, 217, 255, 0.3)"
                                                strokeWidth="2"
                                                strokeDasharray="5,5"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{
                                                    pathLength: isVisible ? progress : 0,
                                                    opacity: isVisible ? 1 : 0
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />

                                            {/* Animated data flow particle */}
                                            {isVisible && progress >= 0.5 && (
                                                <motion.circle
                                                    r="4"
                                                    fill="#00d9ff"
                                                    filter="url(#glow)"
                                                    initial={{
                                                        cx: fromNode.x,
                                                        cy: fromNode.y,
                                                        opacity: 0
                                                    }}
                                                    animate={{
                                                        cx: [fromNode.x, toNode.x],
                                                        cy: [fromNode.y, toNode.y],
                                                        opacity: [1, 1, 0]
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        repeatDelay: 1,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            )}
                                        </g>
                                    );
                                })}

                                {/* Nodes */}
                                {config.nodes.map((node) => {
                                    const isVisible = currentTime >= node.delay;

                                    return (
                                        <motion.g
                                            key={node.id}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{
                                                scale: isVisible ? 1 : 0,
                                                opacity: isVisible ? 1 : 0
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 15
                                            }}
                                            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                                        >
                                            {/* Node background - larger block */}
                                            <rect
                                                x={node.x - 40}
                                                y={node.y - 40}
                                                width="80"
                                                height="80"
                                                rx="14"
                                                fill="rgba(22, 27, 34, 0.95)"
                                                stroke="#00d9ff"
                                                strokeWidth="2"
                                                filter="url(#glow)"
                                            />

                                            {/* Icon - much larger to fill the block */}
                                            <foreignObject
                                                x={node.x - 24}
                                                y={node.y - 24}
                                                width="48"
                                                height="48"
                                            >
                                                <TechIcon name={node.icon} className="w-12 h-12" />
                                            </foreignObject>

                                            {/* Label - positioned below larger block */}
                                            <text
                                                x={node.x}
                                                y={node.y + 55}
                                                textAnchor="middle"
                                                className="fill-cyan-neon font-mono"
                                                style={{ fontSize: '12px', fontWeight: 500 }}
                                            >
                                                {node.label}
                                            </text>
                                        </motion.g>
                                    );
                                })}
                            </svg>
                        </div>

                        {/* Terminal Output */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 md:mt-6 bg-deep-navy/80 rounded-lg border border-cyan-neon/20 p-4 font-mono text-sm"
                        >
                            {config.terminalCommands.slice(0, terminalLineIndex + 1).map((cmd, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={cmd.startsWith('$') ? 'text-cyan-neon' : 'text-text-muted'}
                                >
                                    {cmd}
                                </motion.div>
                            ))}
                            {!isComplete && (
                                <span className="inline-block w-2 h-4 bg-cyan-neon animate-pulse ml-1" />
                            )}
                        </motion.div>

                        {/* Progress indicator */}
                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex-1 h-1 bg-dark-gray rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-cyan-neon to-magenta-neon"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, (currentTime / config.duration) * 100)}%` }}
                                />
                            </div>
                            <span className="text-xs text-text-muted font-mono">
                                {Math.min(100, Math.round((currentTime / config.duration) * 100))}%
                            </span>
                        </div>
                    </motion.div>

                    {/* Skip Button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={onComplete}
                        className="
                            absolute top-2 right-2 md:top-6 md:right-6
                            text-text-muted hover:text-cyan-neon
                            transition-colors
                            text-sm font-mono
                            px-3 py-1
                            border border-text-muted/30 hover:border-cyan-neon/50
                            rounded-md
                            bg-darker-gray/50
                        "
                    >
                        Skip →
                    </motion.button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
