import { motion } from 'framer-motion';
import { Mail, MapPin, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../lib/constants';

export default function ProfileSidebar() {
    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Raj_Patil_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.aside
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="
                fixed right-0 top-0
                w-full md:w-[280px]
                h-screen
                bg-[rgba(22,27,34,0.7)]
                backdrop-blur-xl backdrop-saturate-[180%]
                border-l border-cyan-neon/20
                p-6
                overflow-y-auto
                z-40
                translate-x-full md:translate-x-0
                transition-transform duration-300
            "
        >
            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full border-2 border-cyan-neon shadow-glow-cyan overflow-hidden mb-4">
                    <img
                        src="/profile.png"
                        alt="Raj Patil"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = `
                                <div class="w-full h-full bg-cyan-neon/20 flex items-center justify-center">
                                    <span class="text-cyan-neon font-mono text-2xl font-bold">RP</span>
                                </div>
                            `;
                        }}
                    />
                </div>

                <h2 className="text-xl font-terminal text-white font-semibold text-center mb-1">
                    {PERSONAL_INFO.name}
                </h2>
                <p className="text-sm text-text-secondary text-center mb-6">
                    {PERSONAL_INFO.title}
                </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-cyan-neon/20 mb-6" />

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
                {/* Email */}
                <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-cyan-neon flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-text-muted mb-1">Email</p>
                        <a
                            href={`mailto:${PERSONAL_INFO.email}`}
                            className="text-sm text-text-primary hover:text-cyan-neon transition-colors break-all"
                        >
                            {PERSONAL_INFO.email}
                        </a>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-cyan-neon flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-xs text-text-muted mb-1">Location</p>
                        <p className="text-sm text-text-primary">{PERSONAL_INFO.location}</p>
                    </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-3 h-3 rounded-full bg-success-green animate-pulse" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-text-muted mb-1">Status</p>
                        <p className="text-sm text-success-green font-medium">{PERSONAL_INFO.status}</p>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-cyan-neon/20 mb-6" />

            {/* Download CV Button */}
            <button
                onClick={handleDownloadCV}
                aria-label="Download CV / Resume"
                className="
                    w-full py-3 px-4
                    bg-cyan-neon/10
                    border border-cyan-neon/50
                    rounded-lg
                    text-cyan-neon font-mono text-sm
                    hover:bg-cyan-neon/20 hover:border-cyan-neon
                    transition-all duration-300
                    flex items-center justify-center gap-2
                "
            >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
            </button>
        </motion.aside>
    );
}
