import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const connections = [
    { name: 'LinkedIn', latency: '45ms', color: '#0077b5' },
    { name: 'GitHub', status: 'Online', color: '#f0f0f0' },
    { name: 'Email', status: 'Active', color: '#00d9ff' },
    { name: 'Twitter', status: 'Online', color: '#1da1f2' },
];

export default function NetworkTopologyAnimation() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 500),
            setTimeout(() => setStep(2), 1500),
            setTimeout(() => setStep(3), 2500),
            setTimeout(() => setStep(4), 3500),
            setTimeout(() => setStep(5), 4000),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-8 relative">
            {/* Center Node */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 rounded-full bg-cyan-neon/20 border-2 border-cyan-neon flex items-center justify-center shadow-glow-cyan"
            >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-neon">
                    <img
                        src="/profile.png"
                        alt="You"
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>

            {/* Connection Nodes */}
            <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full max-w-2xl max-h-96" viewBox="0 0 400 300">
                    {connections.map((conn, i) => {
                        const angle = (i * 90 - 45) * (Math.PI / 180);
                        const x = 200 + Math.cos(angle) * 120;
                        const y = 150 + Math.sin(angle) * 100;

                        return (
                            <g key={conn.name}>
                                {/* Connection Line */}
                                {step > i && (
                                    <motion.line
                                        x1="200"
                                        y1="150"
                                        x2={x}
                                        y2={y}
                                        stroke={conn.color}
                                        strokeWidth="2"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.6 }}
                                        transition={{ duration: 0.8 }}
                                    />
                                )}

                                {/* Node Circle */}
                                {step > i && (
                                    <motion.circle
                                        cx={x}
                                        cy={y}
                                        r="20"
                                        fill={conn.color}
                                        fillOpacity="0.2"
                                        stroke={conn.color}
                                        strokeWidth="2"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5, duration: 0.3 }}
                                    />
                                )}

                                {/* Label */}
                                {step > i && (
                                    <motion.text
                                        x={x}
                                        y={y + 35}
                                        textAnchor="middle"
                                        fill="#8b949e"
                                        fontSize="12"
                                        fontFamily="monospace"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        {conn.name}
                                    </motion.text>
                                )}

                                {/* Status/Latency */}
                                {step > i && (
                                    <motion.text
                                        x={x}
                                        y={y + 48}
                                        textAnchor="middle"
                                        fill={conn.color}
                                        fontSize="10"
                                        fontFamily="monospace"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                    >
                                        {'latency' in conn ? conn.latency : conn.status}
                                    </motion.text>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Success Message */}
            {step >= 5 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-8 flex items-center gap-2 text-success-green font-mono"
                >
                    <Check className="w-5 h-5" />
                    <span>All services operational ✓</span>
                </motion.div>
            )}
        </div>
    );
}
