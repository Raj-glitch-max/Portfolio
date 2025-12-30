import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Detect if device is mobile
export function isMobile(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
}

// Detect WebGL support
export function hasWebGLSupport(): boolean {
    if (typeof window === 'undefined') return false;
    try {
        const canvas = document.createElement('canvas');
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch (e) {
        return false;
    }
}

// Random number between min and max
export function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

// Random integer between min and max (inclusive)
export function randomInt(min: number, max: number): number {
    return Math.floor(random(min, max + 1));
}

// Random element from array
export function randomElement<T>(array: T[]): T {
    return array[randomInt(0, array.length - 1)];
}

// Delay/sleep function
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Measure FPS
export class FPSMeter {
    private frames = 0;
    private lastTime = performance.now();
    private fps = 60;

    measure(): number {
        this.frames++;
        const now = performance.now();
        const delta = now - this.lastTime;

        if (delta >= 1000) {
            this.fps = Math.round((this.frames * 1000) / delta);
            this.frames = 0;
            this.lastTime = now;
        }

        return this.fps;
    }

    get currentFPS(): number {
        return this.fps;
    }
}

// Download file
export function downloadFile(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Open URL in new tab
export function openInNewTab(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return function (this: any, ...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: number | null = null;
    return function (this: any, ...args: Parameters<T>) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
