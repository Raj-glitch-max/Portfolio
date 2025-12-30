import { motion } from 'framer-motion';
import { useState } from 'react';
import { SKILLS } from '../../lib/constants';

const proficiencyColors = {
    Expert: '#00ff41',
    Advanced: '#00d9ff',
    Intermediate: '#00d9ff',
    Beginner: '#ffbe0b',
};

const proficiencyPercentages = {
    Expert: 90,
    Advanced: 75,
    Intermediate: 60,
    Beginner: 30,
};

export default function SkillsSection() {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    // Group skills by category
    const skillsByCategory = SKILLS.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof SKILLS>);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-12"
        >
            {/* Header */}
            <div>
                <h2 className="font-terminal text-3xl md:text-4xl text-cyan-neon text-glow-cyan mb-4">
                    Skills & Technologies
                </h2>
                <p className="text-text-secondary">
                    Technical skills and proficiency levels across various domains
                </p>
            </div>

            {/* Skills by Category */}
            {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
                <div key={category}>
                    <h3 className="font-terminal text-xl text-white mb-6 border-b border-cyan-neon/30 pb-2">
                        {category}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {skills.map((skill, skillIndex) => {
                            const percentage = proficiencyPercentages[skill.proficiency];
                            const color = proficiencyColors[skill.proficiency];
                            const delay = categoryIndex * 0.1 + skillIndex * 0.05;

                            return (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay, duration: 0.4, ease: 'easeOut' }}
                                    onMouseEnter={() => setHoveredSkill(skill.name)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                    className="relative bg-darker-gray border border-text-muted/30 rounded-lg p-4 hover:border-cyan-neon hover:shadow-glow-cyan transition-all duration-200 cursor-default group"
                                    whileHover={{ scale: 1.05, y: -4 }}
                                >
                                    {/* Skill Icon/Emoji */}
                                    <div className="text-3xl mb-3">
                                        {skill.icon || '🔧'}
                                    </div>

                                    {/* Skill Name */}
                                    <h4 className="text-white font-semibold text-base mb-2 group-hover:text-cyan-neon transition-colors">
                                        {skill.name}
                                    </h4>

                                    {/* Proficiency Level */}
                                    <p className="text-text-muted text-xs uppercase mb-3">
                                        {skill.proficiency}
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="relative h-1 bg-dark-gray rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ delay: delay + 0.3, duration: 0.8, ease: 'easeOut' }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: color }}
                                        />
                                    </div>

                                    {/* Tooltip */}
                                    {hoveredSkill === skill.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 px-3 py-2 rounded-md text-xs text-white whitespace-nowrap z-10"
                                        >
                                            Proficiency: {skill.proficiency} ({percentage}%)
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45" />
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </motion.div>
    );
}
