import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Section } from '../lib/types';

interface AppContextType {
    currentSection: Section;
    setCurrentSection: (section: Section) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    isInitialized: boolean;
    setIsInitialized: (initialized: boolean) => void;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    animationType: string;
    setAnimationType: (type: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [currentSection, setCurrentSection] = useState<Section>('home');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [animationType, setAnimationType] = useState('sql');

    const value = {
        currentSection,
        setCurrentSection,
        isLoading,
        setIsLoading,
        isInitialized,
        setIsInitialized,
        showModal,
        setShowModal,
        animationType,
        setAnimationType,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
