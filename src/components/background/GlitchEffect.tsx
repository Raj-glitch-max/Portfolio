import { useEffect, useState } from 'react';
import { randomInt } from '../../lib/utils';
import { ANIMATION_DURATION } from '../../lib/constants';

export default function GlitchEffect() {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const scheduleGlitch = () => {
            const delay = randomInt(
                ANIMATION_DURATION.GLITCH_INTERVAL_MIN,
                ANIMATION_DURATION.GLITCH_INTERVAL_MAX
            );

            setTimeout(() => {
                setIsGlitching(true);

                setTimeout(() => {
                    setIsGlitching(false);
                    scheduleGlitch();
                }, ANIMATION_DURATION.GLITCH_DURATION);
            }, delay);
        };

        scheduleGlitch();
    }, []);

    if (!isGlitching) return null;

    return (
        <>
            {/* Red channel shift */}
            <div
                className="fixed inset-0 pointer-events-none z-50"
                style={{
                    background: 'transparent',
                    backdropFilter: 'none',
                    mixBlendMode: 'screen',
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'rgba(255, 0, 0, 0.1)',
                        transform: 'translateX(2px)',
                        animation: 'glitch 0.15s ease-in-out',
                    }}
                />
            </div>

            {/* Blue channel shift */}
            <div
                className="fixed inset-0 pointer-events-none z-50"
                style={{
                    background: 'transparent',
                    backdropFilter: 'none',
                    mixBlendMode: 'screen',
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'rgba(0, 255, 255, 0.1)',
                        transform: 'translateX(-2px)',
                        animation: 'glitch 0.15s ease-in-out',
                    }}
                />
            </div>

            {/* Horizontal distortion lines */}
            <div className="fixed inset-0 pointer-events-none z-50">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-full h-[2px] bg-white opacity-30"
                        style={{
                            top: `${randomInt(0, 100)}%`,
                            animation: 'glitch 0.15s ease-in-out',
                        }}
                    />
                ))}
            </div>
        </>
    );
}
