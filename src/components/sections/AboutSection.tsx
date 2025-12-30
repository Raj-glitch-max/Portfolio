import { motion } from 'framer-motion';
import { PERSONAL_INFO, EDUCATION } from '../../lib/constants';

const learningTopics = [
    'Kubernetes orchestration patterns',
    'GitOps with ArgoCD',
    'Terraform for IaC',
    'CI/CD pipeline design',
    'Cloud Cost Optimization',
];

const interests = [
    { icon: '☁️', label: 'Cloud infrastructure' },
    { icon: '⚙️', label: 'DevOps automation' },
    { icon: '🎵', label: 'Music' },
    { icon: '💪', label: 'Fitness Training' },
];

const timeline = [
    { year: '2020', label: '10th', description: 'CBSE - 79%' },
    { year: '2022', label: '12th', description: 'HSC - 74.5%' },
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
            className="space-y-10"
        >
            {/* Header */}
            <div>
                <h2 className="font-terminal text-3xl md:text-4xl text-cyan-neon text-glow-cyan mb-6">
                    About Raj Patil
                </h2>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Profile Photo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="w-20 h-20 rounded-full border-2 border-cyan-neon shadow-glow-cyan overflow-hidden flex-shrink-0"
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
                    <span class="text-cyan-neon font-mono text-2xl font-bold">RP</span>
                  </div>
                `;
                            }}
                        />
                    </motion.div>

                    {/* Bio */}
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="text-text-secondary leading-relaxed text-base md:text-lg flex-1"
                    >
                        {PERSONAL_INFO.bio}
                    </motion.p>
                </div>
            </div>

            {/* My Journey - Timeline */}
            <div>
                <h3 className="font-terminal text-2xl text-white mb-12">My Journey</h3>

                <div className="relative overflow-x-auto pb-12">
                    <div className="min-w-[800px] px-4">
                        {/* Timeline Line */}
                        <div className="relative h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full mb-16">
                            {timeline.map((milestone, index) => (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4 + index * 0.15, duration: 0.3 }}
                                    className="absolute top-1/2 -translate-y-1/2"
                                    style={{ left: `${(index / (timeline.length - 1)) * 100}%` }}
                                >
                                    {/* Dot Container */}
                                    <div className="relative group cursor-pointer">
                                        {/* Outer Glow */}
                                        <div className="absolute inset-0 rounded-full bg-cyan-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Main Dot */}
                                        <motion.div
                                            className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-900 to-black border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,217,255,0.5)] flex items-center justify-center z-10"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <span className="text-lg filter drop-shadow-[0_0_5px_rgba(0,217,255,0.8)]">
                                                {index === 0 ? '📚' :
                                                    index === 1 ? '🎓' :
                                                        index === 2 ? '💻' :
                                                            index === 3 ? '☁️' :
                                                                index === 4 ? '⚙️' : '🚀'}
                                            </span>
                                        </motion.div>

                                        {/* Label */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 + index * 0.15, duration: 0.2 }}
                                            className="absolute top-16 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                                        >
                                            <div className="font-mono text-cyan-neon text-lg font-bold mb-1">
                                                {milestone.year}
                                            </div>
                                            <div className="text-text-primary text-sm font-medium">
                                                {milestone.label}
                                            </div>
                                            <div className="text-text-muted text-xs mt-1">
                                                {milestone.description}
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Currently Learning */}
            <div>
                <h3 className="font-terminal text-2xl text-white mb-6">Currently Learning</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {learningTopics.map((topic, index) => (
                        <motion.div
                            key={topic}
                            initial={{ opacity: 0, x: -20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                            whileHover={{
                                scale: 1.05,
                                borderColor: '#00d9ff',
                                y: -4,
                                boxShadow: '0 10px 25px -5px rgba(0, 217, 255, 0.15), 0 8px 10px -6px rgba(0, 217, 255, 0.1)'
                            }}
                            className="
                                bg-darker-gray/80 
                                border border-text-muted/20 
                                rounded-lg p-4 
                                transition-all duration-300
                                shadow-lg shadow-black/20
                                backdrop-blur-sm
                            "
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-cyan-neon rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(0,217,255,0.8)]" />
                                <p className="text-text-secondary font-medium text-sm">{topic}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Why DevOps */}
            <div>
                <h3 className="font-terminal text-2xl text-white mb-4">Why DevOps?</h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="text-text-secondary leading-relaxed"
                >
                    {PERSONAL_INFO.whyDevOps}
                </motion.p>
            </div>

            {/* Interests & Hobbies */}
            <div>
                <h3 className="font-terminal text-2xl text-white mb-6">Interests & Hobbies</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {interests.map((interest, index) => (
                        <motion.div
                            key={interest.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9 + index * 0.05, duration: 0.3 }}
                            whileHover={{ scale: 1.1 }}
                            className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-cyan-neon/5 transition-all cursor-default"
                        >
                            <span className="text-4xl">{interest.icon}</span>
                            <span className="text-text-secondary text-sm text-center">
                                {interest.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div>
                <h3 className="font-terminal text-2xl text-white mb-6">Education</h3>

                <div className="space-y-4">
                    {EDUCATION.map((edu, index) => (
                        <motion.div
                            key={edu.degree}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 + index * 0.1, duration: 0.3 }}
                            className="border-l-2 border-cyan-neon pl-6 pb-4"
                        >
                            <h4 className="text-white font-semibold text-lg">{edu.institution}</h4>
                            <p className="text-cyan-neon text-sm mt-1">{edu.degree}</p>
                            <p className="text-text-muted text-sm mt-1">{edu.duration}</p>
                            {edu.grade && (
                                <p className="text-text-secondary text-sm mt-1">Grade: {edu.grade}</p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
