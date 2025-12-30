import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, Download, Github, Linkedin, Twitter } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../lib/constants';

export default function ProfileSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Raj_Patil_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            {/* Mobile Toggle Button (Profile Icon) */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 right-4 z-[60] w-12 h-12 rounded-full border-2 border-cyan-neon/50 overflow-hidden shadow-[0_0_15px_rgba(0,217,255,0.3)] bg-black/50 backdrop-blur-sm"
            >
                <img
                    src="/profile.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </motion.button>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <motion.aside
                initial={{ opacity: 0, x: 100 }}
                animate={{
                    opacity: 1,
                    x: 0,
                    // On mobile, use isOpen to toggle transform
                    translateX: window.innerWidth < 768 ? (isOpen ? 0 : '100%') : 0
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onClick={() => setIsOpen(false)} // Close when clicking on the aside container (padding area)
                className={`
                    fixed right-0 top-0
                    w-full md:w-[280px]
                    h-screen
                    p-6
                    overflow-y-auto
                    z-50
                    md:bg-transparent
                    md:backdrop-blur-none
                    md:border-none
                    ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
                    transition-transform duration-300
                `}
            >
                {/* Profile Card - Glassmorphism */}
                <motion.div
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="
                        relative rounded-2xl p-6
                        bg-[rgba(22,27,34,0.75)]
                        backdrop-blur-xl
                        border border-white/10
                        shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                        mt-16 md:mt-0
                    "
                >
                    {/* Subtle glow */}
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-cyan-neon/20 via-transparent to-magenta-neon/10 opacity-50 pointer-events-none" />

                    {/* Profile Photo */}
                    <div className="relative flex flex-col items-center mb-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative w-20 h-20 rounded-full overflow-hidden mb-4"
                        >
                            {/* Glow ring */}
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-neon to-magenta-neon opacity-60 blur-sm" />
                            <div className="relative w-full h-full rounded-full border-2 border-cyan-neon/50 overflow-hidden">
                                <img
                                    src="/profile.png"
                                    alt="Raj Patil"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.parentElement!.innerHTML = `
                                            <div class="w-full h-full bg-gradient-to-br from-cyan-neon/30 to-magenta-neon/20 flex items-center justify-center">
                                                <span class="text-cyan-neon font-mono text-xl font-bold">RP</span>
                                            </div>
                                        `;
                                    }}
                                />
                            </div>
                        </motion.div>

                        <h2 className="text-lg font-terminal text-white font-semibold text-center">
                            {PERSONAL_INFO.name}
                        </h2>
                        <p className="text-xs text-cyan-neon/80 text-center font-mono">
                            {PERSONAL_INFO.title}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-neon/30 to-transparent mb-5" />

                    {/* Contact Info */}
                    <div className="space-y-5 mb-6">
                        {/* Email */}
                        <motion.div
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-4 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-cyan-neon/10 flex items-center justify-center flex-shrink-0 border border-cyan-neon/20 group-hover:border-cyan-neon/50 transition-colors">
                                <Mail className="w-5 h-5 text-cyan-neon" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-0.5">Email</p>
                                <a
                                    href={`mailto:${PERSONAL_INFO.email}`}
                                    className="text-xs text-text-primary hover:text-cyan-neon transition-colors break-words font-medium"
                                >
                                    {PERSONAL_INFO.email}
                                </a>
                            </div>
                        </motion.div>

                        {/* Location */}
                        <motion.div
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-4 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-cyan-neon/10 flex items-center justify-center flex-shrink-0 border border-cyan-neon/20 group-hover:border-cyan-neon/50 transition-colors">
                                <MapPin className="w-5 h-5 text-cyan-neon" />
                            </div>
                            <div className="flex-1">
                                <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-0.5">Location</p>
                                <p className="text-xs text-text-primary font-medium">{PERSONAL_INFO.location}</p>
                            </div>
                        </motion.div>

                        {/* Status */}
                        <motion.div
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-4 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-success-green/10 flex items-center justify-center flex-shrink-0 border border-success-green/20 group-hover:border-success-green/50 transition-colors">
                                <div className="w-3 h-3 rounded-full bg-success-green animate-pulse" />
                            </div>
                            <div className="flex-1">
                                <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-0.5">Status</p>
                                <p className="text-xs text-success-green font-bold">{PERSONAL_INFO.status}</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-neon/30 to-transparent mb-5" />

                    {/* Download CV Button */}
                    <motion.button
                        onClick={handleDownloadCV}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Download CV / Resume"
                        className="
                            w-full py-3 px-4
                            bg-gradient-to-r from-cyan-neon/20 to-magenta-neon/10
                            border border-cyan-neon/50
                            rounded-xl
                            text-cyan-neon font-mono text-sm
                            hover:border-cyan-neon
                            hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]
                            transition-all duration-300
                            flex items-center justify-center gap-2
                        "
                    >
                        <Download className="w-4 h-4" />
                        <span>Download CV</span>
                    </motion.button>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3 mt-4">
                        {SOCIAL_LINKS.map((link) => {
                            const Icon = link.platform === 'GitHub' ? Github : link.platform === 'LinkedIn' ? Linkedin : link.platform === 'Twitter' ? Twitter : Mail;
                            return (
                                <motion.a
                                    key={link.platform}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-neon/50 hover:bg-cyan-neon/10 transition-all"
                                >
                                    <Icon className="w-5 h-5 text-text-secondary hover:text-cyan-neon" />
                                </motion.a>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.aside>
        </>
    );
}
