import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = [
    'FROM devops-engineer:latest',
    'COPY projects /portfolio',
    'RUN initialize-projects',
    'EXPOSE 3000',
    'CMD ["serve"]',
];

export default function DockerBuildAnimation() {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const stepDuration = 800;
        const interval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < 4) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, stepDuration);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + 2, 100));
        }, 80);
        return () => clearInterval(progressInterval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-2xl space-y-4"
            >
                {/* Build Title */}
                <div className="font-mono text-cyan-neon mb-6">
                    Building image: projects:latest
                </div>

                {/* Build Steps */}
                <div className="space-y-3">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                                opacity: i <= currentStep ? 1 : 0.3,
                                x: i <= currentStep ? 0 : -20,
                            }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-3 font-code text-sm"
                        >
                            <span className="text-text-muted">Step {i + 1}/5:</span>
                            <span className="text-cyan-neon">{step}</span>
                            {i < currentStep && (
                                <Check className="w-4 h-4 text-success-green ml-auto" />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                    <div className="flex justify-between text-sm font-mono text-text-secondary mb-2">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-dark-gray rounded-full h-2">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-neon to-magenta-neon rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Success Message */}
                {currentStep >= 4 && progress === 100 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-success-green font-mono mt-6"
                    >
                        <Check className="w-5 h-5" />
                        <span>Successfully built: projects:v1.0 ✓</span>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
