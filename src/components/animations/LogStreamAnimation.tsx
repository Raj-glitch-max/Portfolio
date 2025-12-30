import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const logs = [
    { time: '13:24:15', type: 'INFO', message: 'Fetching blog posts from database...' },
    { time: '13:24:16', type: 'INFO', message: 'Building search index...' },
    { time: '13:24:17', type: 'INFO', message: 'Compiling markdown to HTML...' },
    { time: '13:24:18', type: 'SUCCESS', message: '8 blog posts loaded ✓' },
    { time: '13:24:19', type: 'SUCCESS', message: 'Blog service ready ✓' },
];

export default function LogStreamAnimation() {
    const [visibleLogs, setVisibleLogs] = useState<number>(0);

    useEffect(() => {
        const intervals = logs.map((_, i) =>
            setTimeout(() => setVisibleLogs(i + 1), i * 600)
        );
        return () => intervals.forEach(clearTimeout);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-8">
            <div className="w-full max-w-2xl bg-darker-gray border border-cyan-neon/30 rounded-lg p-6 font-code text-sm">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-text-muted/20">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-error-red" />
                        <div className="w-3 h-3 rounded-full bg-yellow-neon" />
                        <div className="w-3 h-3 rounded-full bg-success-green" />
                    </div>
                    <span className="ml-4 text-text-muted">blog-service.log</span>
                </div>

                {/* Log Lines */}
                <div className="space-y-2">
                    {logs.slice(0, visibleLogs).map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex gap-3"
                        >
                            <span className="text-text-muted">[{log.time}]</span>
                            <span
                                className={
                                    log.type === 'SUCCESS'
                                        ? 'text-success-green font-semibold'
                                        : 'text-loading-blue'
                                }
                            >
                                [{log.type}]
                            </span>
                            <span className="text-text-secondary">{log.message}</span>
                        </motion.div>
                    ))}

                    {/* Cursor */}
                    {visibleLogs < logs.length && (
                        <div className="flex items-center">
                            <span className="cursor-blink text-cyan-neon">_</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
