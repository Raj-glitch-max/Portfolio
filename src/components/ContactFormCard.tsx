import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Mail } from 'lucide-react';
import FloatingCard3DWrapper from './FloatingCard3DWrapper';

interface ContactFormCardProps {
    delay?: number;
    className?: string;
}

export default function ContactFormCard({ delay = 0, className = '' }: ContactFormCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Portfolio Contact from ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        window.location.href = `mailto:rpdinkar92260@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <FloatingCard3DWrapper
            delay={delay}
            className={`min-h-[300px] cursor-default ${className}`}
            tiltIntensity={0}
        >
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="
                    relative w-full h-full
                    bg-darker-gray/95 backdrop-blur-xl
                    border border-white/10
                    rounded-2xl
                    p-6
                    flex flex-col
                    gap-4
                    overflow-hidden
                    group-hover:border-cyan-neon/30
                    transition-colors duration-300
                "
            >
                {/* Background Orbs */}
                <motion.div
                    animate={{
                        scale: isHovered ? 1.2 : 1,
                        opacity: isHovered ? 0.15 : 0.05,
                    }}
                    className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-neon rounded-full blur-3xl pointer-events-none"
                />

                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-cyan-neon/10 flex items-center justify-center border border-cyan-neon/20">
                        <Mail className="w-5 h-5 text-cyan-neon" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Send a Message</h3>
                        <p className="text-xs text-text-muted">Directly to my inbox</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-text-muted uppercase font-mono">Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-neon focus:outline-none transition-colors"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-text-muted uppercase font-mono">Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-neon focus:outline-none transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>
                    <div className="space-y-1 flex-grow">
                        <label className="text-xs text-text-muted uppercase font-mono">Message</label>
                        <textarea
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full min-h-[120px] bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-neon focus:outline-none transition-colors resize-none"
                            placeholder="What's on your mind?"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-cyan-neon/10 border border-cyan-neon/50 text-cyan-neon hover:bg-cyan-neon hover:text-black font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-2"
                    >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                    </motion.button>
                </form>
            </div>
        </FloatingCard3DWrapper>
    );
}
