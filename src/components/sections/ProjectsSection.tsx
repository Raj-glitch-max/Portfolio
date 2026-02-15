import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, X } from 'lucide-react';
import { PROJECTS } from '../../lib/constants';
import type { Project } from '../../lib/types';
import MermaidDiagram from '../MermaidDiagram';
import ArchitectureAnimation from '../ArchitectureAnimation';
import FloatingProjectCard from '../FloatingProjectCard';

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showAnimation, setShowAnimation] = useState(false);

    // Handle project card click - show animation first
    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setShowAnimation(true);
    };

    // Handle animation complete - transition to details modal
    const handleAnimationComplete = () => {
        setShowAnimation(false);
    };

    // Handle closing everything
    const handleClose = () => {
        setSelectedProject(null);
        setShowAnimation(false);
    };

    // Handle Escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedProject) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [selectedProject]);

    // Define card sizes for bento grid layout
    const cardSizes: ('small' | 'medium' | 'large')[] = ['large', 'large', 'medium', 'medium', 'large', 'small', 'small', 'small'];

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative min-h-screen"
            >
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Cyan orb - top left */}
                    <motion.div
                        animate={{
                            x: [0, 50, -30, 0],
                            y: [0, -40, 20, 0],
                            scale: [1, 1.2, 0.9, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        className="
                            absolute -top-32 -left-32
                            w-[500px] h-[500px]
                            bg-gradient-to-br from-cyan-neon/30 to-transparent
                            rounded-full
                            blur-3xl
                            animate-liquid-morph
                        "
                    />

                    {/* Magenta orb - bottom right */}
                    <motion.div
                        animate={{
                            x: [0, -60, 40, 0],
                            y: [0, 50, -30, 0],
                            scale: [1, 1.3, 0.85, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        className="
                            absolute -bottom-32 -right-32
                            w-[600px] h-[600px]
                            bg-gradient-to-br from-magenta-neon/25 to-transparent
                            rounded-full
                            blur-3xl
                            animate-liquid-morph
                        "
                        style={{ animationDelay: '2s' }}
                    />

                    {/* Yellow accent orb */}
                    <motion.div
                        animate={{
                            x: [0, 30, -20, 0],
                            y: [0, -30, 40, 0],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        className="
                            absolute top-1/3 right-1/4
                            w-[300px] h-[300px]
                            bg-gradient-to-br from-yellow-neon/15 to-transparent
                            rounded-full
                            blur-3xl
                        "
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-10">
                    {/* Header with glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center md:text-left"
                    >
                        <h2 className="font-terminal text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-neon via-white to-magenta-neon mb-4">
                            Projects
                        </h2>
                        <p className="text-text-secondary text-lg max-w-2xl">
                            Showcasing DevOps expertise, cloud infrastructure mastery, and automation innovation
                        </p>
                    </motion.div>

                    {/* Bento Grid with Floating Cards */}
                    <div
                        className="bento-grid perspective-1500"
                        style={{ perspective: '1500px' }}
                    >
                        {PROJECTS.map((project, index) => (
                            <FloatingProjectCard
                                key={project.name}
                                project={project}
                                index={index}
                                onClick={() => handleProjectClick(project)}
                                size={cardSizes[index] || 'small'}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Architecture Animation Modal */}
            <AnimatePresence>
                {selectedProject && showAnimation && (
                    <ArchitectureAnimation
                        projectName={selectedProject.name}
                        onComplete={handleAnimationComplete}
                    />
                )}
            </AnimatePresence>

            {/* Project Detail Modal - shows after animation */}
            <AnimatePresence>
                {selectedProject && !showAnimation && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[201] flex items-center justify-center p-4 overflow-y-auto"
                        >
                            <div className="bg-darker-gray border border-cyan-neon rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                                {/* Header */}
                                <div className="sticky top-0 bg-darker-gray border-b border-cyan-neon/30 p-6 flex items-start justify-between z-10">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-cyan-neon">
                                            {selectedProject.name}
                                        </h2>
                                        <p className="text-text-secondary mt-2">
                                            {selectedProject.shortDescription}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="text-text-muted hover:text-cyan-neon transition-colors p-2"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-8">
                                    {/* Full Description */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                                        <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                                            {selectedProject.fullDescription}
                                        </p>
                                    </motion.div>

                                    {/* Architecture Diagram */}
                                    {selectedProject.architecture && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 }}
                                        >
                                            <h3 className="text-xl font-semibold text-white mb-4">System Architecture</h3>
                                            <MermaidDiagram chart={selectedProject.architecture} />
                                        </motion.div>
                                    )}

                                    {/* Key Features */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {selectedProject.features.map((feature, index) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <div className="w-6 h-6 bg-success-green/20 text-success-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        ✓
                                                    </div>
                                                    <p className="text-text-secondary text-sm">{feature}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Tech Stack */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <h3 className="text-xl font-semibold text-white mb-4">Tech Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-4 py-2 bg-cyan-neon/10 text-cyan-neon text-sm rounded-lg border border-cyan-neon/30"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Achievements */}
                                    {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <h3 className="text-xl font-semibold text-white mb-4">Achievements</h3>
                                            <div className="space-y-2">
                                                {selectedProject.achievements.map((achievement, index) => (
                                                    <div key={index} className="flex items-start gap-3">
                                                        <div className="text-yellow-neon text-xl mt-0.5">★</div>
                                                        <p className="text-text-secondary">{achievement}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Learning Outcomes */}
                                    {selectedProject.learningOutcomes && selectedProject.learningOutcomes.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <h3 className="text-xl font-semibold text-white mb-4">Learning Outcomes</h3>
                                            <div className="space-y-2">
                                                {selectedProject.learningOutcomes.map((outcome, index) => (
                                                    <div key={index} className="flex items-start gap-3">
                                                        <div className="w-2 h-2 bg-cyan-neon rounded-full mt-2" />
                                                        <p className="text-text-secondary">{outcome}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Actions */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="flex gap-4 pt-4"
                                    >
                                        <a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 bg-cyan-neon text-deep-navy rounded-lg hover:bg-cyan-neon/90 transition-all font-medium"
                                        >
                                            <Github className="w-5 h-5" />
                                            <span>View on GitHub</span>
                                        </a>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
