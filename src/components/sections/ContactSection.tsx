import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, Linkedin, Github, Twitter, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../lib/constants';

interface ContactCard {
    icon: any;
    label: string;
    value: string;
    action: string;
    onClick: () => void;
}

export default function ContactSection() {
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            setCopiedField(null);
        }, 2000);
    };

    const contactCards: ContactCard[] = [
        {
            icon: Mail,
            label: 'EMAIL',
            value: PERSONAL_INFO.email,
            action: 'Copy',
            onClick: () => copyToClipboard(PERSONAL_INFO.email, 'email'),
        },
        {
            icon: MapPin,
            label: 'LOCATION',
            value: PERSONAL_INFO.location,
            action: 'View Map',
            onClick: () => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PERSONAL_INFO.location)}`),
        },
        {
            icon: Linkedin,
            label: 'LINKEDIN',
            value: 'raj-patil-311b6b259',
            action: 'Connect',
            onClick: () => window.open(SOCIAL_LINKS.find(l => l.platform === 'LinkedIn')?.url, '_blank'),
        },
        {
            icon: Github,
            label: 'GITHUB',
            value: 'Raj-glitch-max',
            action: 'View Profile',
            onClick: () => window.open(SOCIAL_LINKS.find(l => l.platform === 'GitHub')?.url, '_blank'),
        },
        {
            icon: Twitter,
            label: 'TWITTER',
            value: '@RAJPATIL901',
            action: 'Follow',
            onClick: () => window.open(SOCIAL_LINKS.find(l => l.platform === 'Twitter')?.url, '_blank'),
        },
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-8"
            >
                {/* Header */}
                <div>
                    <h2 className="font-terminal text-3xl md:text-4xl text-cyan-neon text-glow-cyan mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-text-secondary">
                        Feel free to reach out for collaborations, opportunities, or just to connect
                    </p>
                </div>

                {/* Contact Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contactCards.map((card, index) => {
                        const Icon = card.icon;
                        const delay = index * 0.1;

                        return (
                            <motion.div
                                key={card.label}
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ delay, duration: 0.4, ease: 'easeOut' }}
                                whileHover={{
                                    y: -8,
                                    boxShadow: '0 8px 24px rgba(0, 217, 255, 0.3)',
                                    borderColor: '#00d9ff'
                                }}
                                className="bg-darker-gray border border-text-muted/30 rounded-xl p-6 text-center space-y-4 hover:border-cyan-neon transition-all duration-200"
                            >
                                {/* Icon */}
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="flex justify-center"
                                >
                                    <div className="w-12 h-12 bg-cyan-neon/10 rounded-full flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-cyan-neon" />
                                    </div>
                                </motion.div>

                                {/* Label */}
                                <div className="space-y-2">
                                    <p className="text-text-muted text-xs uppercase font-medium tracking-wider">
                                        {card.label}
                                    </p>
                                    <p className="text-white text-sm font-medium break-words">
                                        {card.value}
                                    </p>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={card.onClick}
                                    className="w-full px-4 py-2 border border-cyan-neon/50 rounded-lg hover:bg-cyan-neon/10 hover:border-cyan-neon transition-all text-cyan-neon text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    {copiedField === card.label.toLowerCase() ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            {card.action === 'Copy' && <Copy className="w-4 h-4" />}
                                            <span>{card.action}</span>
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="text-center text-text-muted text-sm pt-8 border-t border-text-muted/20"
                >
                    <p>Currently based in {PERSONAL_INFO.location}</p>
                    <p className="mt-2">
                        Status: <span className="text-success-green">{PERSONAL_INFO.status}</span>
                    </p>
                </motion.div>
            </motion.div>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 right-8 z-[300] bg-success-green text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
                    >
                        <Check className="w-5 h-5" />
                        <span className="font-medium">✓ Copied to clipboard!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
