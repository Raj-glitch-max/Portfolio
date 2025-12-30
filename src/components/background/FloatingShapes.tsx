export default function FloatingShapes() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Top-Left: Triangle (Magenta) */}
            <svg
                className="absolute -top-16 -left-16 w-[150px] h-[150px] opacity-15"
                viewBox="0 0 100 100"
                style={{
                    animation: 'spin 20s linear infinite',
                }}
            >
                <polygon
                    points="50,10 90,90 10,90"
                    fill="#ff006e"
                    filter="blur(2px)"
                />
            </svg>

            {/* Top-Right: Square (Cyan) */}
            <svg
                className="absolute -top-12 -right-12 w-[120px] h-[120px] opacity-15"
                viewBox="0 0 100 100"
                style={{
                    animation: 'spin 20s linear infinite, pulse 4s ease-in-out infinite',
                }}
            >
                <rect
                    x="10"
                    y="10"
                    width="80"
                    height="80"
                    fill="#00d9ff"
                    filter="blur(2px)"
                />
            </svg>

            {/* Bottom-Left: Hexagon (Yellow) */}
            <svg
                className="absolute -bottom-10 -left-10 w-[100px] h-[100px] opacity-15"
                viewBox="0 0 100 100"
                style={{
                    animation: 'spin 20s linear infinite reverse, fade-pulse 3s ease-in-out infinite',
                }}
            >
                <polygon
                    points="50,5 93,25 93,75 50,95 7,75 7,25"
                    fill="#ffbe0b"
                    filter="blur(2px)"
                />
            </svg>

            {/* Bottom-Right: Star/Spiky Circle (Green) */}
            <svg
                className="absolute -bottom-14 -right-14 w-[130px] h-[130px] opacity-15"
                viewBox="0 0 100 100"
                style={{
                    animation: 'spin 20s linear infinite',
                }}
            >
                <path
                    d="M50,10 L55,40 L85,45 L60,60 L65,90 L50,75 L35,90 L40,60 L15,45 L45,40 Z"
                    fill="#00ff41"
                    filter="blur(2px)"
                />
            </svg>

            {/* Add keyframes for animations */}
            <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes fade-pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.15;
          }
        }
      `}</style>
        </div>
    );
}
