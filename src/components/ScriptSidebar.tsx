import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Target, Rocket, FileEdit, Mail, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SCRIPT_ITEMS } from '../lib/constants';

const iconMap = {
    FileText,
    Target,
    Rocket,
    FileEdit,
    Mail,
};

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
        <div className="flex flex-col gap-4">
            {SCRIPT_ITEMS.map((script) => {
                const Icon = iconMap[script.icon as keyof typeof iconMap];
                const isActive = currentSection === script.id;

                return (
                    <motion.button
                        key={script.id}
                        onClick={() => handleScriptClick(script)}
                        aria-label={`Open ${script.id} section`}
                        className={`
              group relative flex items-center gap-3 px-4 py-3 rounded-md border transition-all duration-300
              ${isActive
                                ? 'bg-cyan-neon/10 border-cyan-neon shadow-[0_0_15px_rgba(0,217,255,0.3)] opacity-100'
                                : 'bg-transparent border-transparent opacity-80 hover:opacity-100 hover:bg-cyan-neon/5 hover:border-cyan-neon/50'
                            }
            `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Icon
                            className={`w-5 h-5 transition-colors flex-shrink-0 ${isActive ? 'text-cyan-neon' : 'text-text-secondary group-hover:text-cyan-neon'
                                }`}
                        />
                        <span
                            className={`font-terminal text-sm transition-colors ${isActive ? 'text-cyan-neon' : 'text-text-secondary group-hover:text-cyan-neon'
                                }`}
                        >
                            {script.name}
                        </span>
                    </motion.button>
                );
            })}
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
                    hidden md:block
                    fixed left-0 top-0
                    w-[200px] h-screen
                    bg-[rgba(22,27,34,0.7)]
                    backdrop-blur-xl backdrop-saturate-[180%]
                    border-r border-cyan-neon/20
                    p-6
                    overflow-y-auto
                    z-40
                "
            >
                <div className="space-y-3 mt-6">
                    <SidebarContent />
                </div>
            </motion.aside>

            {/* Mobile Hamburger Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden fixed top-4 left-4 z-50 w-12 h-12 flex items-center justify-center bg-dark-gray border border-cyan-neon/50 rounded-lg shadow-card hover:shadow-glow-cyan transition-all"
            >
                {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-cyan-neon" />
                ) : (
                    <Menu className="w-6 h-6 text-cyan-neon" />
                )}
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
                            className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
                        />

                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="md:hidden fixed left-0 top-0 bottom-0 w-72 glass border-r border-cyan-neon/30 z-50 p-6 pt-24"
                        >
                            <h2 className="font-terminal text-cyan-neon text-lg mb-6">Navigation</h2>
                            <SidebarContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
