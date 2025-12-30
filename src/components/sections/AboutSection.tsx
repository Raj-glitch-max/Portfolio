import { motion } from 'framer-motion';
import { PERSONAL_INFO, EDUCATION } from '../../lib/constants';
import FloatingCard3DWrapper from '../FloatingCard3DWrapper';
import { Server, Cloud, Zap, Shield } from 'lucide-react';

const interests = [
    { icon: '☁️', label: 'Cloud infrastructure' },
    { icon: '⚙️', label: 'DevOps automation' },
    { icon: '🎵', label: 'Music' },
    { icon: '💪', label: 'Fitness Training' },
];

const timeline = [
    { year: '2020', label: '10th', description: 'CBSE' },
    { year: '2022', label: '12th', description: 'HSC' },
    { year: '2022', label: 'B.Tech Start', description: 'MIT ADT University' },
    { year: '2024', label: 'AWS Projects', description: 'Cloud exploration' },
    { year: '2025', label: 'DevOps Focus', description: 'Current learning' },
    { year: '2026', label: 'Graduate', description: 'Expected completion' },
];

export default function AboutSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-32 pb-32 pt-32 md:pt-40"
        >
            {/* Header */}
            <div className="space-y-16">
                <h2 className="font-terminal text-4xl md:text-5xl text-cyan-neon text-glow-cyan">
                    About Raj Patil
                </h2>

                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                    {/* Profile Photo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="w-48 h-48 rounded-full border-2 border-cyan-neon shadow-glow-cyan overflow-hidden flex-shrink-0"
                    >
                        <img
                            src="/profile.png"
                            alt="Raj Patil"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = `
                  <div class="w-full h-full bg-cyan-neon/20 flex items-center justify-center">
                    <span class="text-cyan-neon font-mono text-3xl font-bold">RP</span>
                  </div>
                `;
                            }}
                        />
                    </motion.div>

                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="flex-1 w-full"
                    >
                        <div className="bg-darker-gray/50 backdrop-blur-sm border border-cyan-neon/20 rounded-2xl p-10 shadow-lg">
                            <p className="text-text-secondary leading-relaxed text-lg md:text-xl font-light">
                                {PERSONAL_INFO.bio}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* My Journey - Clean Horizontal Timeline */}
            <div>
                <h3 className="font-terminal text-3xl text-white mb-20">My Journey</h3>

                {/* Desktop/Tablet Horizontal Timeline */}
                <div className="hidden md:block relative px-4">
                    {/* Horizontal Line */}
                    <div className="absolute top-[18px] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-neon/50 to-transparent" />

                    <div className="grid grid-cols-6 gap-4 relative">
                        {timeline.map((milestone) => (
                            <div key={milestone.year} className="flex flex-col items-center group relative">
                                {/* Dot */}
                                <div className="w-9 h-9 rounded-full bg-darker-gray border-2 border-cyan-neon z-10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,217,255,0.6)] transition-all duration-300 mb-8">
                                    <div className="w-3 h-3 bg-cyan-neon rounded-full" />
                                </div>

                                {/* Content - Always Below */}
                                <div className="text-center space-y-3 w-full">
                                    <div className="font-mono text-cyan-neon font-bold text-xl tracking-wider">{milestone.year}</div>
                                    <div className="text-white text-base font-semibold">{milestone.label}</div>
                                    <div className="text-text-muted text-sm leading-tight opacity-70 group-hover:opacity-100 transition-opacity">
                                        {milestone.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Vertical Timeline */}
                <div className="md:hidden relative pl-4 border-l-2 border-cyan-neon/20 ml-6 space-y-12 py-4">
                    {timeline.map((milestone) => (
                        <div key={milestone.year} className="relative pl-8">
                            {/* Dot */}
                            <div className="absolute -left-[25px] top-1 w-5 h-5 rounded-full bg-darker-gray border-2 border-cyan-neon flex items-center justify-center">
                                <div className="w-2 h-2 bg-cyan-neon rounded-full" />
                            </div>

                            <div className="space-y-2">
                                <span className="font-mono text-cyan-neon font-bold text-lg inline-block bg-cyan-neon/10 px-3 py-0.5 rounded">
                                    {milestone.year}
                                </span>
                                <h4 className="text-white font-bold text-lg">{milestone.label}</h4>
                                <p className="text-text-muted text-base">{milestone.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Currently Building - AutoStack */}
            <div>
                <h3 className="font-terminal text-3xl text-white mb-12">Currently Building</h3>

                <FloatingCard3DWrapper className="min-h-[300px]" tiltIntensity={0.2}>
                    <div className="
                        relative w-full h-full
                        bg-darker-gray/80 backdrop-blur-xl
                        border border-white/10
                        rounded-2xl p-8 md:p-12
                        overflow-hidden
                        group
                        hover:border-cyan-neon/30
                        transition-colors duration-500
                    ">
                        {/* Subtle Background Glow */}
                        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-neon/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                            {/* Icon/Visual */}
                            <div className="w-28 h-28 rounded-3xl bg-black/40 border border-cyan-neon/20 flex items-center justify-center shadow-lg group-hover:shadow-cyan-neon/10 transition-shadow flex-shrink-0">
                                <Cloud className="w-14 h-14 text-cyan-neon" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center md:text-left space-y-6">
                                <div className="flex flex-col md:flex-row items-center md:items-baseline gap-4">
                                    <h4 className="text-4xl font-bold text-white tracking-tight">
                                        AutoStack
                                    </h4>
                                    <span className="px-4 py-1.5 text-xs font-mono bg-cyan-neon/10 text-cyan-neon rounded-full border border-cyan-neon/20 tracking-wider font-bold">
                                        IN DEVELOPMENT
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-cyan-neon font-mono text-sm tracking-widest uppercase opacity-90">
                                        One-Click AWS Infrastructure Deployment
                                    </p>

                                    <p className="text-text-secondary text-lg leading-relaxed max-w-3xl font-light">
                                        I'm currently building a DevOps tool to streamline cloud deployments.
                                        AutoStack will enable developers to deploy full-stack applications to AWS with a single click,
                                        automatically provisioning best-practice infrastructure without writing Terraform.
                                    </p>
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                                        <Zap className="w-4 h-4 text-yellow-400" />
                                        <span className="text-sm text-text-muted font-medium">Instant Provisioning</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                                        <Shield className="w-4 h-4 text-green-400" />
                                        <span className="text-sm text-text-muted font-medium">Security Best Practices</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                                        <Server className="w-4 h-4 text-blue-400" />
                                        <span className="text-sm text-text-muted font-medium">Auto-Scaling</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FloatingCard3DWrapper>
            </div>

            {/* Why DevOps */}
            <div>
                <h3 className="font-terminal text-3xl text-white mb-10">Why DevOps?</h3>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="bg-gradient-to-r from-cyan-neon/5 to-transparent border-l-4 border-cyan-neon p-10 rounded-r-2xl"
                >
                    <p className="text-text-secondary leading-relaxed italic text-xl md:text-2xl font-light">
                        "{PERSONAL_INFO.whyDevOps}"
                    </p>
                </motion.div>
            </div>

            {/* Interests & Hobbies */}
            <div>
                <h3 className="font-terminal text-3xl text-white mb-12">Interests & Hobbies</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {interests.map((interest, index) => (
                        <FloatingCard3DWrapper
                            key={interest.label}
                            delay={0.9 + index * 0.1}
                            className="min-h-[180px]"
                        >
                            <div className="
                                h-full flex flex-col items-center justify-center gap-6 p-8
                                bg-darker-gray/50 border border-white/5 rounded-2xl
                                hover:border-cyan-neon/30
                                transition-all duration-300
                            ">
                                <span className="text-5xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">{interest.icon}</span>
                                <span className="text-text-secondary text-base text-center font-medium tracking-wide">
                                    {interest.label}
                                </span>
                            </div>
                        </FloatingCard3DWrapper>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div>
                <h3 className="font-terminal text-3xl text-white mb-12">Education</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {EDUCATION.map((edu, index) => (
                        <motion.div
                            key={edu.degree}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 + index * 0.1, duration: 0.3 }}
                            whileHover={{ y: -5 }}
                            className="
                                h-full
                                bg-darker-gray/40 backdrop-blur-sm
                                border border-cyan-neon/20 hover:border-cyan-neon
                                rounded-2xl p-8
                                transition-all duration-300
                                group
                                flex flex-col justify-between
                            "
                        >
                            <div>
                                <h4 className="text-white font-bold text-xl group-hover:text-cyan-neon transition-colors mb-3">
                                    {edu.institution}
                                </h4>
                                <p className="text-cyan-neon text-base font-mono font-medium">{edu.degree}</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5">
                                <p className="text-text-muted text-sm font-medium tracking-wide">{edu.duration}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
