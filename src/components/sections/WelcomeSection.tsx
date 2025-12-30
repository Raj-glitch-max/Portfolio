import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../../lib/constants';

// Tech stack with SVG icons
const TechIcon = ({ name, color }: { name: string; color: string }) => {
    const icons: Record<string, React.ReactNode> = {
        Docker: (
            <svg viewBox="0 0 24 24" fill={color} className="w-6 h-6">
                <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
            </svg>
        ),
        Kubernetes: (
            <svg viewBox="0 0 24 24" fill={color} className="w-6 h-6">
                <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.778zm1.5-3.095a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
            </svg>
        ),
        AWS: (
            <svg viewBox="0 0 24 24" fill={color} className="w-6 h-6">
                <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586z" />
            </svg>
        ),
        Terraform: (
            <svg viewBox="0 0 24 24" fill={color} className="w-6 h-6">
                <path d="M1.44 0v7.575l6.561 3.79V3.789zm7.59 4.227v7.578l6.558 3.787V8.015zM22.56 8.015v7.577l-6.558-3.787V4.227zM9.03 12.74v7.575l6.558 3.788v-7.578z" />
            </svg>
        ),
        Python: (
            <svg viewBox="0 0 24 24" fill={color} className="w-6 h-6">
                <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05z" />
            </svg>
        ),
        Git: (
            <svg viewBox="0 0 24 24" fill={color} className="w-6 h-6">
                <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
            </svg>
        ),
        PostgreSQL: (
            <svg viewBox="0 0 24 24" fill={color} className="w-6 h-6">
                <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.827 2.865.305 4.482.415 6.682c.03.607.203 1.597.49 2.879s.69 2.783 1.193 4.152c.503 1.37 1.054 2.6 1.915 3.436.43.419 1.022.771 1.72.742.49-.02.933-.235 1.315-.552.186.245.385.352.566.451.228.125.45.21.68.266.413.103 1.12.241 1.948.1.282-.047.579-.058.882-.02.274-.31.57-.563.885-.76a4.468 4.468 0 0 1-.336-1.03c-.266-1.18-.678-3.29.086-4.604l.015-.026c-.572-.32-1.085-.794-1.498-1.438-.617-.962-.755-2.308-.327-3.948l.065-.246c.088-.33.17-.616.266-.875.095-.259.19-.479.308-.67.118-.19.27-.372.473-.508.203-.137.477-.226.785-.18.308.045.57.195.782.392.213.198.38.44.534.677.153.238.295.475.452.7.22.315.45.605.694.84-.087-.353-.134-.743-.14-1.17a4.303 4.303 0 0 1 .472-2.07 3.248 3.248 0 0 1 1.203-1.2c.463-.27.998-.42 1.587-.42h.043c.643.01 1.269.178 1.803.426 1.022.476 1.78 1.263 2.31 2.156a8.627 8.627 0 0 1 .834 2.027c.238-.186.458-.263.66-.305l.004-.001c.282-.042.46.043.618.1.203.06.42.127.67.127.25 0 .467-.067.67-.127.157-.047.335-.122.617-.1.233.032.498.125.756.34.258.216.477.53.606.977.129.446.143.95.01 1.539-.135.59-.424 1.267-.93 2.072-.285.453-.594.863-.918 1.228.1.245.178.504.23.78.1.555.073 1.135-.068 1.704A3.95 3.95 0 0 1 22 13.18c.243.254.428.522.554.8.258.565.325 1.154.337 1.72.006.252-.01.5-.038.74l-.02.192c-.02.164-.046.325-.08.483a4.995 4.995 0 0 1-.245.84 5.908 5.908 0 0 1-.406.79 3.78 3.78 0 0 1-.56.672 3.2 3.2 0 0 1-.72.5c-.525.283-1.153.457-1.86.523-.26.024-.527.04-.8.04-.527 0-1.006-.063-1.425-.18.14.333.247.685.317 1.054.23 1.204.126 2.45-.186 3.572-.312 1.12-.834 2.1-1.52 2.762-.347.334-.758.59-1.224.718-.466.128-.957.115-1.37-.023-.826-.276-1.372-.923-1.772-1.7a9.056 9.056 0 0 1-.63-1.746c-.16-.57-.29-1.2-.467-1.932l-.128-.53c-.324-1.348-.695-2.865-1.382-3.973-.343-.553-.746-1.015-1.238-1.328-.492-.314-1.07-.485-1.74-.515-.265-.012-.44-.11-.548-.234-.109-.124-.166-.29-.182-.47-.015-.18.008-.375.058-.565.05-.19.125-.367.197-.493h-.023c-.69-.118-1.316-.392-1.815-.767-.5-.375-.88-.862-1.117-1.413-.19-.442-.307-.944-.34-1.52-.03-.575.03-1.213.186-1.93" /></svg>
        ),
        Redis: (
            <svg viewBox="0 0 24 24" fill={color} className="w-6 h-6">
                <path d="M10.5 2.661l.54.997-1.797.644 2.409.218.748 1.246.467-1.155 2.209-.218-1.653-.61.604-1.123-1.856.726zm-6.04 3.373l8.836 3.693L24 6.034l-8.836-3.694zM0 17.965l8.836 3.694 10.736-4.493L8.836 13.47zm0-5.965l8.836 3.694 10.736-4.493-10.736-4.486z" />
            </svg>
        ),
    };
    return icons[name] || <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color }} />;
};

// Solar system orbits configuration
const orbits = [
    { radius: 160, icons: ['Docker', 'Kubernetes'], duration: 25, colors: ['#2496ED', '#326CE5'] },
    { radius: 240, icons: ['AWS', 'Terraform', 'Python'], duration: 35, colors: ['#FF9900', '#7B42BC', '#3776AB'] },
    { radius: 320, icons: ['Git', 'PostgreSQL', 'Redis'], duration: 45, colors: ['#F05032', '#336791', '#DC382D'] },
];

export default function WelcomeSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse tracking for profile card
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation
    const springConfig = { stiffness: 150, damping: 20 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center justify-center min-h-[85vh]"
        >
            {/* Orbit rings (decorative) */}
            {orbits.map((orbit, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ delay: idx * 0.2, duration: 0.8 }}
                    className="absolute rounded-full border border-cyan-neon/30"
                    style={{
                        width: orbit.radius * 2,
                        height: orbit.radius * 2,
                    }}
                />
            ))}

            {/* Orbiting Tech Icons */}
            {orbits.map((orbit, orbitIdx) => (
                <motion.div
                    key={orbitIdx}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: orbit.duration,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute"
                    style={{
                        width: orbit.radius * 2,
                        height: orbit.radius * 2,
                    }}
                >
                    {orbit.icons.map((iconName, iconIdx) => {
                        const angle = (iconIdx * 360) / orbit.icons.length;
                        const x = Math.cos((angle * Math.PI) / 180) * orbit.radius;
                        const y = Math.sin((angle * Math.PI) / 180) * orbit.radius;
                        return (
                            <motion.div
                                key={iconName}
                                initial={{ opacity: 0, rotate: 0 }}
                                animate={{ opacity: 1, rotate: -360 }}
                                transition={{
                                    opacity: { delay: 0.5 + orbitIdx * 0.2 + iconIdx * 0.1, duration: 0.5 },
                                    rotate: { duration: orbit.duration, repeat: Infinity, ease: 'linear' }
                                }}
                                className="absolute p-3 rounded-xl bg-[rgba(22,27,34,0.8)] border border-white/10 backdrop-blur-sm shadow-lg hover:border-cyan-neon/50 hover:scale-110 transition-all cursor-pointer"
                                style={{
                                    left: `calc(50% + ${x}px - 24px)`,
                                    top: `calc(50% + ${y}px - 24px)`,
                                }}
                                whileHover={{ scale: 1.2 }}
                            >
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <TechIcon name={iconName} color={orbit.colors[iconIdx]} />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            ))}

            {/* Central Profile Card - 3D Interactive */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                className="relative z-10"
            >
                {/* Glow behind card */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 0.5 : 0.25,
                        scale: isHovered ? 1.15 : 1,
                    }}
                    className="absolute -inset-12 rounded-full bg-gradient-to-br from-cyan-neon/40 via-transparent to-magenta-neon/30 blur-3xl"
                />

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className="
                        relative p-12 rounded-3xl
                        bg-[rgba(22,27,34,0.85)]
                        backdrop-blur-xl
                        border border-cyan-neon/30
                        shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                        min-w-[320px]
                    "
                    style={{ transform: 'translateZ(30px)' }}
                >
                    {/* Top gradient line */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-neon/60 to-transparent" />

                    {/* Profile Avatar */}
                    <motion.div
                        animate={{ y: isHovered ? -8 : 0 }}
                        className="relative w-32 h-32 mx-auto mb-6"
                    >
                        <motion.div
                            animate={{
                                boxShadow: isHovered
                                    ? '0 0 40px rgba(0,217,255,0.6)'
                                    : '0 0 20px rgba(0,217,255,0.3)',
                            }}
                            className="absolute -inset-2 rounded-full bg-gradient-to-br from-cyan-neon to-magenta-neon opacity-60"
                        />
                        <div className="relative w-full h-full rounded-full border-2 border-cyan-neon/50 overflow-hidden">
                            <img
                                src="/profile.png"
                                alt={PERSONAL_INFO.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement!.innerHTML = `
                                        <div class="w-full h-full bg-gradient-to-br from-cyan-neon/30 to-magenta-neon/20 flex items-center justify-center">
                                            <span class="text-cyan-neon font-mono text-3xl font-bold">RP</span>
                                        </div>
                                    `;
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Terminal greeting */}
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center justify-center gap-2 mb-3"
                        >
                            <Terminal className="w-4 h-4 text-cyan-neon" />
                            <span className="font-mono text-xs text-cyan-neon/70">~/portfolio</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="font-terminal text-2xl text-white mb-2"
                        >
                            {PERSONAL_INFO.name}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-cyan-neon font-mono text-sm mb-4"
                        >
                            {PERSONAL_INFO.title}
                        </motion.p>

                        {/* Status */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center justify-center gap-2"
                        >
                            <div className="w-2 h-2 bg-success-green rounded-full animate-pulse" />
                            <span className="text-success-green text-xs font-mono">{PERSONAL_INFO.status}</span>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
