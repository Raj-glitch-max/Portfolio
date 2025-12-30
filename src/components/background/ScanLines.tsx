export default function ScanLines() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <div
                className="absolute w-full h-[2px] opacity-5"
                style={{
                    background: '#00d9ff',
                    animation: 'scan 8s linear infinite',
                    boxShadow: '0 0 10px rgba(0, 217, 255, 0.3)',
                }}
            />
            <div
                className="absolute w-full h-[2px] opacity-5"
                style={{
                    background: '#00d9ff',
                    animation: 'scan 8s linear infinite 2s',
                    boxShadow: '0 0 10px rgba(0, 217, 255, 0.3)',
                }}
            />
            <div
                className="absolute w-full h-[2px] opacity-5"
                style={{
                    background: '#00d9ff',
                    animation: 'scan 8s linear infinite 4s',
                    boxShadow: '0 0 10px rgba(0, 217, 255, 0.3)',
                }}
            />
            <div
                className="absolute w-full h-[2px] opacity-5"
                style={{
                    background: '#00d9ff',
                    animation: 'scan 8s linear infinite 6s',
                    boxShadow: '0 0 10px rgba(0, 217, 255, 0.3)',
                }}
            />
        </div>
    );
}
