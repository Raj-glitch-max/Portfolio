import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface MainContentAreaProps {
    children: ReactNode;
    key?: string;
}

export default function MainContentArea({ children, key }: MainContentAreaProps) {
    return (
        <main className="
            ml-0 md:ml-[200px]
            mr-0 md:mr-[280px]
            min-h-screen
            p-4 md:p-8
        ">
            <AnimatePresence mode="wait">
                <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="max-w-5xl mx-auto"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </main>
    );
}
