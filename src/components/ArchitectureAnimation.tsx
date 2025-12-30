import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { PROJECT_ARCHITECTURES, type ArchitectureConfig } from '../lib/projectArchitectures';

// Tech stack icon components with recognizable logos
const icons: Record<string, React.FC<{ className?: string }>> = {
    // GitHub - Octocat logo
    github: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    ),
    // Docker - Whale with containers
    docker: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185zM23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
        </svg>
    ),
    // Kubernetes - Helm wheel
    kubernetes: ({ className }) => (
        <svg className={className} viewBox="0 0 32 32" fill="currentColor">
            <path d="M15.9.476a2.14 2.14 0 0 0-.823.218L3.932 6.01c-.582.277-1.005.804-1.15 1.432L.054 19.373c-.13.56.017 1.151.402 1.606l7.662 9.683c.401.506 1.012.81 1.657.826h.09l12.128-.205a2.14 2.14 0 0 0 1.608-.886l7.29-9.88c.353-.48.468-1.09.313-1.66l-3.18-11.805a2.14 2.14 0 0 0-1.218-1.396L15.91.478zM16 7.348c.263 0 .527.068.76.206l4.907 2.888c.46.27.75.762.774 1.303l.063 5.716a1.55 1.55 0 0 1-.755 1.33l-4.97 2.95a1.55 1.55 0 0 1-1.558 0l-4.97-2.95a1.55 1.55 0 0 1-.755-1.33l.063-5.716c.023-.54.314-1.033.774-1.303l4.907-2.888c.233-.137.497-.206.76-.206z" />
        </svg>
    ),
    // PostgreSQL - Elephant head
    database: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.463.39 9.705.65c-.372.127-.718.29-1.03.494-.476-.17-1.108-.262-1.888-.262-.502 0-1.059.053-1.677.156-.165.028-.334.068-.547.129a.587.587 0 0 0-.202.082c-.206.088-.4.206-.585.358l-.005.004c-.333.268-.6.604-.78.988-.18.383-.281.818-.281 1.287 0 .2.028.395.074.636.045.238.114.513.204.823.122.422.278.882.464 1.376.016.041.03.083.047.124-.066.135-.127.275-.173.42-.1.32-.158.663-.173 1.02-.007.167-.005.341.006.518.03.467.117.936.325 1.363.173.357.422.67.743.921a.627.627 0 0 0 .065.043c-.057.168-.106.342-.144.52-.097.45-.127.93-.064 1.408.127.967.613 1.893 1.437 2.627.116.103.234.2.355.291l.042.032.044.03c-.014.136-.026.27-.021.406.014.378.082.755.23 1.1.15.347.38.66.693.906.343.27.74.478 1.18.617.427.135.9.21 1.428.242.238.014.483.016.762.019h1.98c.082 0 .164.001.248-.005a5.57 5.57 0 0 0 2.043-.579 4.052 4.052 0 0 0 1.592-1.469c.158.022.317.035.48.041a4.63 4.63 0 0 0 1.92-.38 3.032 3.032 0 0 0 1.333-1.107 2.68 2.68 0 0 0 .334-.67c.093-.27.145-.558.161-.856.015-.273-.001-.554-.045-.839a6.36 6.36 0 0 0-.163-.732c.063-.226.114-.461.152-.705a7.43 7.43 0 0 0 .072-1.643c-.046-.504-.151-.997-.34-1.456l-.008-.021.013-.021c.127-.21.24-.432.332-.665.162-.414.264-.87.275-1.356l.001-.064c.005-.188.005-.39-.005-.61a8.563 8.563 0 0 0-.153-1.232 8.43 8.43 0 0 0-.363-1.235 6.748 6.748 0 0 0-.565-1.094 4.835 4.835 0 0 0-.819-.954 3.558 3.558 0 0 0-.583-.421 10.787 10.787 0 0 0-4.175-1.678A11.45 11.45 0 0 0 17.127 0z" />
        </svg>
    ),
    // Server / Microservice
    server: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <circle cx="6" cy="6" r="1.5" />
            <circle cx="6" cy="18" r="1.5" />
            <line x1="10" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    // AWS Cloud
    cloud: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.64 16.36c-.536.216-1.092.328-1.668.328-1.888 0-3.512-1.084-4.164-2.664l1.616-1.48c.376.912 1.272 1.544 2.332 1.544.356 0 .696-.076 1.012-.22l.872 2.492zM12 4c2.076 0 3.872 1.188 4.748 2.916l1.82-.924A7.98 7.98 0 0 0 12 2a7.98 7.98 0 0 0-6.568 3.452l1.668 1.32A5.98 5.98 0 0 1 12 4zm6.36 12.36c.536-.216 1.092-.328 1.668-.328.944 0 1.816.324 2.508.868l-.82 1.78a3.96 3.96 0 0 0-2.032-.548A3.97 3.97 0 0 0 16 20c0 .508.096.996.272 1.444l-1.752.88A5.96 5.96 0 0 1 14 20c0-1.472.532-2.82 1.412-3.864l.948.224zm-3.172 2.452l1.624-1.624A5.96 5.96 0 0 1 18 20c0 .34-.028.672-.084 1l-2.312-.58a3.96 3.96 0 0 0-.416-1.608zM5.972 7.436l-1.82.924A7.98 7.98 0 0 0 4 12c0 2.076 1.188 3.872 2.916 4.748l.924-1.82A5.98 5.98 0 0 1 6 12c0-1.732.736-3.296 1.912-4.388l-1.94-.176z" />
            <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
        </svg>
    ),
    // Git branch
    git: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <circle cx="18" cy="6" r="3" />
            <path d="M18 9v2c0 1.1-.9 2-2 2h-4v2" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M6 9v8" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
    ),
    // Terraform
    terraform: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 0v8.5l7.5 4.3V4.3L1 0zm8.5 13.4l7.5 4.3V9.2L9.5 4.9v8.5zM17.5 9.2v8.5L25 13.4V4.9l-7.5 4.3zm0 9.2l-7.5-4.3v8.5L17.5 27v-8.6z" />
        </svg>
    ),
    // React
    react: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="2.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
        </svg>
    ),
    // FastAPI / API
    api: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12 6.626 0 12-5.373 12-12 0-6.625-5.373-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z" />
        </svg>
    ),
    // Prometheus / Monitoring
    monitoring: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.628-5.373-12-12-12zm0 22.46c-1.885 0-3.414-1.455-3.414-3.25h6.828c0 1.795-1.529 3.25-3.414 3.25zm5.64-4.357H6.36v-1.76h11.28v1.76zm-.057-2.857H6.418c-.045-.053-.088-.108-.133-.162-.906-1.097-1.418-2.05-1.71-2.74-.146-.343-.24-.628-.296-.846a3.9 3.9 0 0 1-.074-.39c-.073-.46-.108-.936-.108-1.42 0-2.95 2.39-5.34 5.34-5.34 2.95 0 5.34 2.39 5.34 5.34 0 .484-.035.96-.108 1.42a3.9 3.9 0 0 1-.074.39c-.056.218-.15.503-.295.846-.293.69-.805 1.643-1.711 2.74-.045.054-.088.109-.133.162z" />
        </svg>
    ),
    // Redis
    redis: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.99 14.33c-.02.41-.28.78-.79 1.1-1.02.64-6.24 2.68-7.35 3.26-1.11.58-1.73.54-2.6.09-1.11-.57-6.43-2.66-7.46-3.18-.51-.26-.77-.52-.77-.79v-2.42s7.24-1.57 8.42-2.03c1.17-.46 1.58-.47 2.57-.05 1 .42 7 1.44 7.98 1.71v2.31z" />
            <path d="M23.99 11.03c-.02.41-.28.78-.79 1.1-1.02.64-6.24 2.68-7.35 3.26-1.11.58-1.73.54-2.6.09-1.11-.57-6.43-2.66-7.46-3.18C5.28 12.04 5 11.78 5 11.51V9.09s7.24-1.57 8.42-2.03c1.17-.46 1.58-.47 2.57-.05 1 .42 7 1.44 7.98 1.71v2.31z" />
            <path d="M23.99 7.73c.02.41-.24.79-.75 1.11-1.02.64-6.24 2.68-7.35 3.26-1.11.58-1.73.54-2.6.09-1.11-.57-6.43-2.66-7.46-3.18-.52-.26-.83-.58-.83-.93 0-.35.31-.68.83-.94 1.03-.52 6.35-2.44 7.46-2.89s1.49-.43 2.6.05c1.11.48 6.33 2.49 7.35 2.98.51.24.77.53.75.88v-.43z" />
        </svg>
    ),
    // ArgoCD / GitOps
    argocd: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L2 6v12l10 6 10-6V6L12 0zm0 3.3l6.5 3.8L12 10.9l-6.5-3.8L12 3.3zM4.5 8.3L11 12v7.9l-6.5-3.9V8.3zm15 0v7.7l-6.5 3.9V12l6.5-3.7z" />
        </svg>
    ),
    // Security / Shield
    security: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.75-2.11 7.06-5 8.67-2.89-1.61-5-4.92-5-8.67V7.18L12 5z" />
            <path d="M12 7c-1.1 0-2 .9-2 2v2H9v5h6v-5h-1V9c0-1.1-.9-2-2-2zm0 1c.55 0 1 .45 1 1v2h-2V9c0-.55.45-1 1-1z" />
        </svg>
    ),
    // Kafka / Message Queue
    kafka: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="9" r="2.5" />
            <circle cx="9" cy="15" r="2.5" />
            <circle cx="15" cy="6" r="2" />
            <circle cx="15" cy="12" r="2" />
            <circle cx="15" cy="18" r="2" />
            <path d="M11 8.5l2.5-1.5M11 9.5l2.5 1.5M11 14.5l2.5-1.5M11 15.5l2.5 1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
    ),
};

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
                                    const IconComponent = icons[node.icon];

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
                                                {IconComponent && (
                                                    <IconComponent className="w-12 h-12 text-cyan-neon" />
                                                )}
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
