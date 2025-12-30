import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import SQLQueryAnimation from './animations/SQLQueryAnimation';
import GitMergeAnimation from './animations/GitMergeAnimation';
import K8sPodAnimation from './animations/K8sPodAnimation';
import DockerBuildAnimation from './animations/DockerBuildAnimation';
import LogStreamAnimation from './animations/LogStreamAnimation';
import NetworkTopologyAnimation from './animations/NetworkTopologyAnimation';

export default function LoadingModal() {
    const { showModal, animationType } = useApp();

    const renderAnimation = () => {
        switch (animationType) {
            case 'sql':
                return <SQLQueryAnimation />;
            case 'git':
                return <GitMergeAnimation />;
            case 'k8s':
                return <K8sPodAnimation />;
            case 'docker':
                return <DockerBuildAnimation />;
            case 'logs':
                return <LogStreamAnimation />;
            case 'network':
                return <NetworkTopologyAnimation />;
            default:
                return <SQLQueryAnimation />;
        }
    };

    return (
        <AnimatePresence>
            {showModal && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    >
                        <div className="glass border border-cyan-neon rounded-xl shadow-modal max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                            {renderAnimation()}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
