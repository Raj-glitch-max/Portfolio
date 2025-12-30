import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// 2D Canvas fallback for mobile/low-end devices
function Canvas2DPods() {
    const [podsSpawned, setPodsSpawned] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPodsSpawned(prev => Math.min(prev + 1, 15));
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-5 gap-4 max-w-2xl">
            {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, rotateY: 0 }}
                    animate={{
                        scale: i < podsSpawned ? 1 : 0,
                        rotateY: i < podsSpawned ? 360 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="aspect-square bg-gradient-to-br from-cyan-neon/20 to-magenta-neon/20 border border-cyan-neon/50 rounded-lg flex items-center justify-center"
                >
                    <span className="text-xs font-mono text-cyan-neon">Pod {i + 1}</span>
                </motion.div>
            ))}
        </div>
    );
}

export default function K8sPodAnimation() {
    const [step, setStep] = useState(0);
    // Using 2D fallback if no WebGL // Fallback to 2D if no WebGL

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 500),
            setTimeout(() => setStep(2), 3500),
            setTimeout(() => setStep(3), 4000),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-8">
            {/* Grid Title */}
            <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-cyan-neon mb-6"
            >
                Kubernetes Pod Deployment
            </motion.h3>

            {/* Pod Grid */}
            {step >= 1 && <Canvas2DPods />}

            {/* Load Balancer */}
            {step >= 2 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 flex flex-col items-center gap-2"
                >
                    <div className="w-16 h-16 bg-yellow-neon/20 border-2 border-yellow-neon rounded-lg flex items-center justify-center">
                        <span className="font-mono text-yellow-neon text-sm">LB</span>
                    </div>
                    <span className="text-sm font-mono text-text-secondary">Load Balancer</span>
                </motion.div>
            )}

            {/* Success Message */}
            {step >= 3 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 flex items-center gap-2 text-success-green font-mono"
                >
                    <Check className="w-5 h-5" />
                    <span>15/15 pods running ✓</span>
                </motion.div>
            )}
        </div>
    );
}
