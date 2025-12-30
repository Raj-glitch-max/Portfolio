import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';
import { PROJECTS } from '../../lib/constants';
import type { Project } from '../../lib/types';
import MermaidDiagram from '../MermaidDiagram';
import ArchitectureAnimation from '../ArchitectureAnimation';

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
                        Projects
                    </h2>
                    <p className="text-text-secondary">
                        Highlighting key projects showcasing DevOps, cloud infrastructure, and automation expertise
                    </p>
                </div>

                {/* Project Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PROJECTS.map((project, index) => {
                        const delay = index * 0.15;

                        return (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay, duration: 0.4, ease: 'easeOut' }}
                                whileHover={{
                                    scale: 1.02,
                                    y: -8,
                                    boxShadow: '0 8px 24px rgba(0, 217, 255, 0.25)'
                                }}
                                className="bg-darker-gray border border-text-muted/30 rounded-xl overflow-hidden hover:border-cyan-neon transition-all duration-300 cursor-pointer"
                                onClick={() => handleProjectClick(project)}
                            >
                                {/* Project Image/Gradient */}
                                <div className="relative h-48 bg-gradient-to-br from-cyan-neon/20 via-magenta-neon/10 to-dark-gray overflow-hidden group">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
                                            {project.icon || '🚀'}
                                        </div>
                                    </div>
                                </div>

                                {/* Project Content */}
                                <div className="p-6 space-y-4">
                                    {/* Title */}
                                    <h3 className="text-white font-bold text-xl group-hover:text-cyan-neon transition-colors">
                                        {project.name}
                                    </h3>

                                    {/* Short Description */}
                                    <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed">
                                        {project.shortDescription}
                                    </p>

                                    {/* Tech Stack Badges */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.slice(0, 5).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-cyan-neon/10 text-cyan-neon text-xs rounded-full border border-cyan-neon/30"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.techStack.length > 5 && (
                                            <span className="px-3 py-1 bg-text-muted/10 text-text-muted text-xs rounded-full">
                                                +{project.techStack.length - 5} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3 pt-2">
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center gap-2 px-4 py-2 border border-cyan-neon/50 rounded-md hover:bg-cyan-neon/10 hover:border-cyan-neon transition-all text-cyan-neon text-sm"
                                        >
                                            <Github className="w-4 h-4" />
                                            <span>GitHub</span>
                                        </a>

                                        <button
                                            className="flex items-center gap-2 px-4 py-2 bg-cyan-neon/10 border border-cyan-neon rounded-md hover:bg-cyan-neon hover:text-deep-navy transition-all text-cyan-neon text-sm font-medium"
                                        >
                                            <span>View Details</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
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
