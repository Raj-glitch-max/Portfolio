import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../../lib/constants';

export default function BlogSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center min-h-[500px] space-y-8 text-center"
        >
            {/* Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                className="text-6xl md:text-8xl"
            >
                📝
            </motion.div>

            {/* Title */}
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="font-terminal text-2xl md:text-3xl text-cyan-neon"
            >
                Blog posts coming soon!
            </motion.h2>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="text-text-secondary max-w-md"
            >
                Follow me for DevOps insights, cloud infrastructure tutorials, and automation best practices
            </motion.p>

            {/* Social Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="flex flex-wrap gap-4 justify-center"
            >
                {SOCIAL_LINKS.filter(link => ['LinkedIn', 'GitHub'].includes(link.platform)).map((link) => (
                    <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 border border-cyan-neon/50 rounded-lg hover:bg-cyan-neon/10 hover:border-cyan-neon hover:shadow-glow-cyan transition-all text-cyan-neon font-medium"
                    >
                        <span>{link.platform}</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                ))}
            </motion.div>

            {/* Links */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.3 }}
                className="space-y-2 text-text-muted text-sm"
            >
                <p>Connect with me:</p>
                {SOCIAL_LINKS.map((link) => (
                    <div key={link.platform}>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-cyan-neon transition-colors"
                        >
                            • {link.platform}: {link.url.replace('https://', '')}
                        </a>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
}
