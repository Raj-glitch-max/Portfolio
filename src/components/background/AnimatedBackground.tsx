import ParticleSystem from './ParticleSystem';
import CodeRain from './CodeRain';
import ScanLines from './ScanLines';
import GlitchEffect from './GlitchEffect';
import FloatingShapes from './FloatingShapes';

export default function AnimatedBackground() {
    return (
        <>
            <FloatingShapes />
            <ScanLines />
            <CodeRain />
            <ParticleSystem />
            <GlitchEffect />
        </>
    );
}
