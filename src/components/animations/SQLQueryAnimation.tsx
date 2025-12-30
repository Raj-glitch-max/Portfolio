import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export default function SQLQueryAnimation() {
    const [step, setStep] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [progress, setProgress] = useState(0);

    const queryText = "SELECT * FROM portfolio WHERE status = 'active' LIMIT 1;";

    useEffect(() => {
        // Step 1: Type out query (0-1.5s)
        if (step === 0) {
            let index = 0;
            const typeInterval = setInterval(() => {
                if (index <= queryText.length) {
                    setTypedText(queryText.slice(0, index));
                    index++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => setStep(1), 200);
                }
            }, 30);
            return () => clearInterval(typeInterval);
        }

        // Step 2: Show loading and progress bar (1.5s-3.5s)
        if (step === 1) {
            let prog = 0;
            const progressInterval = setInterval(() => {
                prog += 2;
                setProgress(Math.min(prog, 100));
                if (prog >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => setStep(2), 300);
                }
            }, 30);
            return () => clearInterval(progressInterval);
        }

        // Step 3: Show success (3.5s-4.5s)
        if (step === 2) {
            setTimeout(() => setStep(3), 1000);
        }
    }, [step]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-8">
            {/* Query Text */}
            <div className="w-full max-w-2xl mb-8">
                <pre className="font-code text-cyan-neon text-base md:text-lg whitespace-pre-wrap break-words">
                    {typedText}
                    {step === 0 && <span className="cursor-blink">_</span>}
                </pre>
            </div>

            {/* Loading State */}
            <AnimatePresence>
                {step >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-lg space-y-4"
                    >
                        {/* Loading Spinner */}
                        {step < 2 && (
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 border-2 border-cyan-neon/30 border-t-cyan-neon rounded-full animate-spin" />
                                <span className="font-mono text-text-secondary">
                                    {progress < 50 ? 'Executing query...' :
                                        progress < 90 ? 'Parsing results...' :
                                            'Complete'}
                                </span>
                            </div>
                        )}

                        {/* Progress Bar */}
                        {step >= 1 && step < 3 && (
                            <div className="w-full bg-dark-gray rounded-full h-2 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-cyan-neon to-loading-blue"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                        )}

                        {/* Success Message */}
                        {step >= 2 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-3 text-success-green"
                            >
                                <div className="w-8 h-8 rounded-full bg-success-green/20 flex items-center justify-center">
                                    <Check className="w-5 h-5" />
                                </div>
                                <span className="font-mono text-lg">1 row returned ✓</span>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
