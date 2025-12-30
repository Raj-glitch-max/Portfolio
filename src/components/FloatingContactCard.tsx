import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import FloatingCard3DWrapper from './FloatingCard3DWrapper';

interface FloatingContactCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    action: string;
    onClick: () => void;
    delay?: number;
    isCopied?: boolean;
}

export default function FloatingContactCard({
    icon: Icon,
    label,
    value,
    action,
    onClick,
    delay = 0,
    isCopied = false
}: FloatingContactCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <FloatingCard3DWrapper
            delay={delay}
            onClick={onClick}
            className="min-h-[180px]"
        >
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="
                    relative w-full h-full
                    bg-darker-gray/90 backdrop-blur-xl
                    border border-white/10
                    rounded-2xl
                    p-6
                    flex flex-col items-center justify-center
                    gap-6
                    overflow-hidden
                    group-hover:border-cyan-neon/30
                    transition-colors duration-300
                "
            >
                {/* Background Orbs */}
                <motion.div
                    animate={{
                        scale: isHovered ? 1.5 : 1,
                        opacity: isHovered ? 0.2 : 0.05,
                    }}
                    className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-neon rounded-full blur-3xl pointer-events-none"
                />
                <motion.div
                    animate={{
                        scale: isHovered ? 1.5 : 1,
                        opacity: isHovered ? 0.2 : 0.05,
                    }}
                    className="absolute -bottom-10 -left-10 w-32 h-32 bg-magenta-neon rounded-full blur-3xl pointer-events-none"
                />

                {/* Icon */}
                <motion.div
                    animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? [0, -10, 10, 0] : 0,
                    }}
                    className="w-20 h-20 rounded-full bg-cyan-neon/10 flex items-center justify-center border border-cyan-neon/20 group-hover:border-cyan-neon/50 transition-colors"
                >
                    <Icon className="w-10 h-10 text-cyan-neon" />
                </motion.div>

                {/* Text */}
                <div className="text-center space-y-2 z-10">
                    <p className="text-xs font-mono text-text-muted uppercase tracking-wider">
                        {label}
                    </p>
                    <p className="text-white font-medium break-all">
                        {value}
                    </p>
                </div>

                {/* Action Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                        w-full py-2 px-4 rounded-lg
                        flex items-center justify-center gap-2
                        text-sm font-medium
                        transition-all duration-300
                        ${isCopied
                            ? 'bg-success-green/20 text-success-green border border-success-green/50'
                            : 'bg-white/5 text-cyan-neon border border-cyan-neon/30 hover:bg-cyan-neon/10 hover:border-cyan-neon'
                        }
                    `}
                >
                    {isCopied ? (
                        <>
                            <Check className="w-4 h-4" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            {action === 'Copy' ? <Copy className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                            <span>{action}</span>
                        </>
                    )}
                </motion.button>
            </div>
        </FloatingCard3DWrapper>
    );
}
