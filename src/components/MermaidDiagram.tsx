import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
    chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            securityLevel: 'loose',
            themeVariables: {
                fontFamily: 'JetBrains Mono',
                primaryColor: '#161b22',
                primaryTextColor: '#00d9ff',
                primaryBorderColor: '#00d9ff',
                lineColor: '#00d9ff',
                secondaryColor: '#0a0e27',
                tertiaryColor: '#161b22',
            },
        });

        const renderChart = async () => {
            try {
                const { svg } = await mermaid.render(`mermaid-${Math.random().toString(36).substr(2, 9)}`, chart);
                setSvg(svg);
            } catch (error) {
                console.error('Failed to render mermaid chart:', error);
            }
        };

        renderChart();
    }, [chart]);

    return (
        <div
            ref={containerRef}
            className="w-full overflow-x-auto bg-darker-gray/50 p-4 rounded-lg border border-cyan-neon/20"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
