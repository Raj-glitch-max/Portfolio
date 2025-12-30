import { motion } from 'framer-motion';
import { FileText, Target, Rocket, FileEdit, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SCRIPT_ITEMS } from '../lib/constants';

const iconMap = {
    FileText,
    Target,
    Rocket,
    FileEdit,
    Mail,
};

export default function Homepage() {
    const { setCurrentSection, setShowModal, setAnimationType, setIsInitialized } = useApp();

    const handleScriptClick = (script: typeof SCRIPT_ITEMS[0]) => {
        setAnimationType(script.animationType);
        setShowModal(true);

        // After animation completes, show content
        setTimeout(() => {
            setCurrentSection(script.id);
            setShowModal(false);
            setIsInitialized(true);
        }, 5000);
    };

    const handleTitleClick = () => {
        setAnimationType('sql');
        setShowModal(true);

        // After SQL animation, initialize the portfolio
        setTimeout(() => {
            setShowModal(false);
            setIsInitialized(true);
        }, 5000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4">
            {/* Main Title */}
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="font-terminal text-5xl md:text-6xl text-cyan-neon text-glow-cyan mb-16 cursor-pointer hover:scale-105 transition-transform"
                onClick={handleTitleClick}
            >
                $ ls /portfolio/
            </motion.h1>

            {/* Script Buttons */}
            <div className="flex flex-col gap-4 w-full max-w-md">
                {SCRIPT_ITEMS.map((script, index) => {
                    const Icon = iconMap[script.icon as keyof typeof iconMap];

                    return (
                        <motion.button
                            key={script.id}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: 'easeOut',
                            }}
                            onClick={() => handleScriptClick(script)}
                            className="group relative flex items-center gap-4 px-6 py-4 rounded-md border border-cyan-neon/30 bg-dark-gray/50 hover:bg-cyan-neon/10 hover:border-cyan-neon hover:shadow-glow-cyan transition-all duration-300"
                            style={{
                                animation: `breathe 2s ease-in-out infinite ${index * 0.2}s`,
                            }}
                        >
                            {/* Icon */}
                            <Icon className="w-6 h-6 text-text-secondary group-hover:text-cyan-neon transition-colors" />

                            {/* Script Name */}
                            <span className="font-terminal text-lg text-text-secondary group-hover:text-cyan-neon transition-colors">
                                {script.name}
                            </span>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 rounded-md bg-cyan-neon/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.button>
                    );
                })}
            </div>

            {/* Bottom Hint */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 text-text-muted font-mono text-sm"
            >
                click any script to initialize deployment
            </motion.p>
        </div>
    );
}
