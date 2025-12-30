import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import type { ReactNode } from 'react';

interface FloatingCard3DWrapperProps {
    children: ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    delay?: number;
    tiltIntensity?: number; // 1 = normal, 0.5 = less tilt
}

export default function FloatingCard3DWrapper({
    children,
    onClick,
    className = '',
    delay = 0,
    tiltIntensity = 1
}: FloatingCard3DWrapperProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${12 * tiltIntensity}deg`, `${-12 * tiltIntensity}deg`]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`${-12 * tiltIntensity}deg`, `${12 * tiltIntensity}deg`]);

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

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`relative h-full cursor-pointer group perspective-1000 ${className} ${isHovered ? 'z-50' : 'z-0'}`}
        >
            {/* Floating content */}
            <motion.div
                animate={{
                    y: isHovered ? -10 : 0,
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-full h-full"
            >
                {/* Glow effect */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 0.6 : 0,
                    }}
                    className="absolute -inset-[1px] bg-gradient-to-r from-cyan-neon via-magenta-neon to-cyan-neon rounded-2xl blur-md opacity-0 transition-opacity duration-300"
                />

                {/* Content Container */}
                <div className="relative w-full h-full">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
}
