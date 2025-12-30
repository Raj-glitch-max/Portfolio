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
                    opacity: isActive ? 0.5 : isHovered ? 0.25 : 0,
                    scale: isActive ? 1.05 : 1,
                }}
                className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-neon via-magenta-neon to-cyan-neon blur-md animate-gradient-shift"
                style={{ backgroundSize: '200% 200%' }}
            />

            {/* Main button - glassmorphism */}
            <div
                className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-xl
                    border transition-all duration-300
                    backdrop-blur-md
                    ${isActive
                        ? 'bg-[rgba(0,217,255,0.15)] border-cyan-neon shadow-[0_0_20px_rgba(0,217,255,0.3)]'
                        : 'bg-[rgba(22,27,34,0.6)] border-white/10 hover:border-cyan-neon/50 hover:bg-[rgba(22,27,34,0.8)]'
                    }
                `}
                style={{ transform: 'translateZ(10px)' }}
            >
                {/* Icon */}
                <Icon
                    className={`w-5 h-5 transition-all duration-300 ${isActive
                            ? 'text-cyan-neon drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]'
                            : 'text-text-secondary group-hover:text-cyan-neon'
                        }`}
                />

                {/* Text */}
                <span
                    className={`font-terminal text-sm transition-all duration-300 ${isActive
                            ? 'text-cyan-neon text-glow-cyan'
                            : 'text-text-secondary group-hover:text-white'
                        }`}
                >
                    {script.name}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                    <motion.div
                        layoutId="activeIndicator"
                        className="absolute right-3 w-2 h-2 rounded-full bg-cyan-neon shadow-[0_0_10px_rgba(0,217,255,0.8)]"
                    />
                )}
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
        <div className="flex flex-col gap-2">
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
            {/* Desktop Sidebar - Fully Transparent, Floating Nav */}
            <motion.aside
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="hidden md:flex md:flex-col fixed left-0 top-0 w-[200px] h-screen p-5 z-40"
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                >
                    <div className="flex items-center gap-2 mb-1">
                        <Terminal className="w-4 h-4 text-cyan-neon" />
                        <span className="font-terminal text-xs text-cyan-neon">Navigation</span>
                    </div>
                    <p className="text-[10px] text-text-muted pl-6">Select section</p>
                </motion.div>

                {/* Navigation Items */}
                <div className="flex-1">
                    <SidebarContent />
                </div>

                {/* Status */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-2 text-xs text-text-muted mt-auto"
                >
                    <div className="w-2 h-2 bg-success-green rounded-full animate-pulse" />
                    <span className="font-mono text-[10px]">System Online</span>
                </motion.div>
            </motion.aside>

            {/* Mobile Hamburger Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden fixed top-4 left-4 z-50 w-12 h-12 flex items-center justify-center bg-[rgba(22,27,34,0.8)] border border-cyan-neon/40 rounded-xl backdrop-blur-xl shadow-[0_4px_20px_rgba(0,217,255,0.2)] hover:border-cyan-neon transition-all duration-300"
            >
                <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
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
                            className="md:hidden fixed left-0 top-0 bottom-0 w-72 bg-[rgba(22,27,34,0.95)] backdrop-blur-2xl border-r border-cyan-neon/20 z-50 p-6 pt-20"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Terminal className="w-5 h-5 text-cyan-neon" />
                                <h2 className="font-terminal text-cyan-neon">Navigation</h2>
                            </div>
                            <SidebarContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
