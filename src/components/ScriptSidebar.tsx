import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FileText, Target, Rocket, FileEdit, Mail, Menu, X, Terminal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SCRIPT_ITEMS } from '../lib/constants';

const iconMap = {
    FileText,
    Target,
    Rocket,
    FileEdit,
    Mail,
};

// Floating nav item component with 3D effects
function NavItem({
    script,
    isActive,
    onClick,
    index
}: {
    script: typeof SCRIPT_ITEMS[0];
    isActive: boolean;
    onClick: () => void;
    index: number;
}) {
    const Icon = iconMap[script.icon as keyof typeof iconMap];
    const [isHovered, setIsHovered] = useState(false);

    // 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.button
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            aria-label={`Open ${script.id} section`}
            className="relative w-full group"
        >
            {/* Glow effect behind */}
            <motion.div
                animate={{
                    opacity: isActive ? 0.6 : isHovered ? 0.3 : 0,
                    scale: isActive ? 1.1 : 1,
                }}
                className="
                    absolute -inset-1 rounded-xl
                    bg-gradient-to-r from-cyan-neon via-magenta-neon to-cyan-neon
                    blur-lg
                    animate-gradient-shift
                "
                style={{ backgroundSize: '200% 200%' }}
            />

            {/* Main button */}
            <div
                className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-xl
                    border transition-all duration-300
                    backdrop-blur-md
                    ${isActive
                        ? 'bg-gradient-to-r from-cyan-neon/20 to-magenta-neon/10 border-cyan-neon shadow-[0_0_20px_rgba(0,217,255,0.4)]'
                        : 'bg-[rgba(22,27,34,0.5)] border-white/10 hover:border-cyan-neon/50 hover:bg-[rgba(22,27,34,0.7)]'
                    }
                `}
                style={{ transform: 'translateZ(20px)' }}
            >
                {/* Icon with glow */}
                <div className="relative">
                    <Icon
                        className={`w-5 h-5 transition-all duration-300 ${isActive
                            ? 'text-cyan-neon drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]'
                            : 'text-text-secondary group-hover:text-cyan-neon'
                            }`}
                    />
                    {/* Pulse ring for active */}
                    {isActive && (
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute inset-0 rounded-full bg-cyan-neon"
                        />
                    )}
                </div>

                {/* Text */}
                <span
                    className={`font-terminal text-sm transition-all duration-300 ${isActive
                        ? 'text-cyan-neon text-glow-cyan'
                        : 'text-text-secondary group-hover:text-white'
                        }`}
                >
                    {script.name}
                </span>

                {/* Active indicator line */}
                <motion.div
                    animate={{
                        scaleX: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                    }}
                    className="
                        absolute right-0 top-1/2 -translate-y-1/2
                        w-1 h-8 rounded-l-full
                        bg-gradient-to-b from-cyan-neon to-magenta-neon
                    "
                />

                {/* Shine effect on hover */}
                <motion.div
                    animate={{
                        x: isHovered ? '150%' : '-100%',
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="
                        absolute inset-0 rounded-xl
                        bg-gradient-to-r from-transparent via-white/10 to-transparent
                        skew-x-12
                        pointer-events-none
                    "
                />
            </div>
        </motion.button>
    );
}

export default function ScriptSidebar() {
    const { currentSection, setCurrentSection, setShowModal, setAnimationType } = useApp();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleScriptClick = (script: typeof SCRIPT_ITEMS[0]) => {
        setAnimationType(script.animationType);
        setShowModal(true);
        setIsMobileMenuOpen(false);

        setTimeout(() => {
            setCurrentSection(script.id);
            setShowModal(false);
        }, 5000);
    };

    const SidebarContent = () => (
        <div className="flex flex-col gap-3">
            {SCRIPT_ITEMS.map((script, index) => (
                <NavItem
                    key={script.id}
                    script={script}
                    isActive={currentSection === script.id}
                    onClick={() => handleScriptClick(script)}
                    index={index}
                />
            ))}
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar - Fixed Left */}
            <motion.aside
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="
                    hidden md:flex md:flex-col
                    fixed left-0 top-0
                    w-[220px] h-screen
                    bg-gradient-to-b from-[rgba(22,27,34,0.7)] via-[rgba(22,27,34,0.4)] to-[rgba(22,27,34,0.7)]
                    backdrop-blur-2xl backdrop-saturate-[180%]
                    p-5
                    overflow-hidden
                    z-40
                "
            >
                {/* Decorative background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Top glow orb */}
                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                            opacity: [0.15, 0.25, 0.15],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="
                            absolute -top-20 -left-20
                            w-48 h-48
                            bg-gradient-to-br from-cyan-neon to-transparent
                            rounded-full
                            blur-3xl
                        "
                    />

                    {/* Bottom glow orb */}
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="
                            absolute -bottom-20 -right-20
                            w-48 h-48
                            bg-gradient-to-br from-magenta-neon to-transparent
                            rounded-full
                            blur-3xl
                        "
                    />

                    {/* Floating particles */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -100 - i * 20, 0],
                                x: [0, (i % 2 ? 10 : -10), 0],
                                opacity: [0, 0.6, 0],
                            }}
                            transition={{
                                duration: 8 + i * 2,
                                repeat: Infinity,
                                delay: i * 1.5,
                                ease: 'easeInOut',
                            }}
                            className="
                                absolute bottom-20 left-1/2
                                w-1 h-1
                                bg-cyan-neon
                                rounded-full
                            "
                            style={{ left: `${20 + i * 15}%` }}
                        />
                    ))}
                </div>

                {/* Header with terminal icon */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative mb-6 pb-4 border-b border-cyan-neon/20"
                >
                    <div className="flex items-center gap-3">
                        <div className="
                            p-2 rounded-lg
                            bg-gradient-to-br from-cyan-neon/20 to-magenta-neon/10
                            border border-cyan-neon/30
                        ">
                            <Terminal className="w-5 h-5 text-cyan-neon" />
                        </div>
                        <div>
                            <h3 className="font-terminal text-sm text-cyan-neon">Navigation</h3>
                            <p className="text-xs text-text-muted">Select section</p>
                        </div>
                    </div>
                </motion.div>

                {/* Navigation Items */}
                <div className="relative z-10 space-y-1 flex-1">
                    <SidebarContent />
                </div>

                {/* Bottom decoration */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative mt-auto pt-4 border-t border-cyan-neon/10"
                >
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                        <div className="w-2 h-2 bg-success-green rounded-full animate-pulse" />
                        <span className="font-mono">System Online</span>
                    </div>
                </motion.div>
            </motion.aside>

            {/* Mobile Hamburger Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="
                    md:hidden fixed top-4 left-4 z-50
                    w-12 h-12 flex items-center justify-center
                    bg-gradient-to-br from-[rgba(22,27,34,0.9)] to-[rgba(22,27,34,0.7)]
                    border border-cyan-neon/40
                    rounded-xl
                    backdrop-blur-xl
                    shadow-[0_4px_20px_rgba(0,217,255,0.2)]
                    hover:border-cyan-neon
                    hover:shadow-[0_4px_30px_rgba(0,217,255,0.4)]
                    transition-all duration-300
                "
            >
                <motion.div
                    animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isMobileMenuOpen ? (
                        <X className="w-6 h-6 text-cyan-neon" />
                    ) : (
                        <Menu className="w-6 h-6 text-cyan-neon" />
                    )}
                </motion.div>
            </motion.button>

            {/* Mobile Slide-in Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-40"
                        />

                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="
                                md:hidden fixed left-0 top-0 bottom-0
                                w-80
                                bg-gradient-to-b from-[rgba(22,27,34,0.95)] to-[rgba(22,27,34,0.9)]
                                backdrop-blur-2xl
                                border-r border-cyan-neon/30
                                z-50 p-6 pt-20
                                overflow-hidden
                            "
                        >
                            {/* Background orbs for mobile */}
                            <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan-neon/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-magenta-neon/15 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-cyan-neon/20">
                                    <div className="p-2 rounded-lg bg-cyan-neon/10 border border-cyan-neon/30">
                                        <Terminal className="w-5 h-5 text-cyan-neon" />
                                    </div>
                                    <div>
                                        <h2 className="font-terminal text-cyan-neon text-lg">Navigation</h2>
                                        <p className="text-xs text-text-muted">Select section</p>
                                    </div>
                                </div>
                                <SidebarContent />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
