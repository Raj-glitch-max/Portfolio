import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function GitMergeAnimation() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 500),
            setTimeout(() => setStep(2), 2000),
            setTimeout(() => setStep(3), 2500),
            setTimeout(() => setStep(4), 3000),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-8">
            {/* Git Branches */}
            <svg className="w-full max-w-md h-64 mb-8" viewBox="0 0 400 200">
                {/* Left Branch (dev) */}
                <motion.path
                    d="M 100 50 Q 100 100 150 150"
                    stroke="#00d9ff"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: step >= 1 ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                />

                {/* Right Branch (main) */}
                <motion.path
                    d="M 300 50 Q 300 100 250 150"
                    stroke="#00ff41"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: step >= 1 ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                />

                {/* Merge Point */}
                {step >= 2 && (
                    <motion.circle
                        cx="200"
                        cy="150"
                        r="15"
                        fill="#00ff41"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}

                {/* Branch Labels */}
                <text x="80" y="40" fill="#8b949e" fontSize="14" fontFamily="monospace">dev</text>
                <text x="280" y="40" fill="#8b949e" fontSize="14" fontFamily="monospace">main</text>

                {/* Commits */}
                {[1, 2, 3].map((i) => (
                    <motion.circle
                        key={`left-${i}`}
                        cx={100 + i * 15}
                        cy={50 + i * 30}
                        r="5"
                        fill="#00d9ff"
                        initial={{ scale: 0 }}
                        animate={{ scale: step >= 1 ? 1 : 0 }}
                        transition={{ delay: i * 0.2 }}
                    />
                ))}
                {[1, 2, 3].map((i) => (
                    <motion.circle
                        key={`right-${i}`}
                        cx={300 - i * 15}
                        cy={50 + i * 30}
                        r="5"
                        fill="#00ff41"
                        initial={{ scale: 0 }}
                        animate={{ scale: step >= 1 ? 1 : 0 }}
                        transition={{ delay: i * 0.2 }}
                    />
                ))}
            </svg>

            {/* Success Message */}
            {step >= 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-success-green font-mono"
                >
                    <Check className="w-5 h-5" />
                    <span>Merged successfully ✓</span>
                </motion.div>
            )}

            {/* Timeline */}
            {step >= 4 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 flex gap-6 text-sm flex-wrap justify-center"
                >
                    {['Birth', 'Education', 'Learning', 'DevOps'].map((milestone, i) => (
                        <motion.div
                            key={milestone}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-3 h-3 rounded-full bg-cyan-neon" />
                            <span className="font-mono text-text-secondary">{milestone}</span>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
