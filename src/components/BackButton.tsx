import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BackButton({ className = "" }: { className?: string }) {
    const { currentSection, setCurrentSection, isInitialized, setIsInitialized } = useApp();

    if (!isInitialized) return null;

    const handleBack = () => {
        if (currentSection !== 'home') {
            setCurrentSection('home');
        } else {
            setIsInitialized(false);
        }
    };

    return (
        <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className={`flex items-center justify-center gap-3 px-6 py-4 bg-darker-gray/90 backdrop-blur-xl border border-cyan-neon/40 rounded-xl text-cyan-neon hover:bg-cyan-neon/10 hover:border-cyan-neon hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all duration-300 group ${className}`}
        >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <div className="flex flex-col items-start leading-none gap-1">
                <span className="font-terminal text-lg font-bold tracking-wide">cd ..</span>
                <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">Return Home</span>
            </div>
        </motion.button>
    );
}
