// TypeScript types for the portfolio

export interface Skill {
    name: string;
    category: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    icon?: string;
}

export interface Project {
    name: string;
    shortDescription: string;
    fullDescription: string;
    techStack: string[];
    features: string[];
    achievements?: string[];
    learningOutcomes?: string[];
    useCases?: string[];
    githubUrl: string;
    liveUrl?: string;
    architecture?: string;
    icon?: string;
}

export interface Education {
    institution: string;
    degree: string;
    duration: string;
    grade?: string;
}

export interface SocialLink {
    platform: string;
    url: string;
}

export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    location: string;
    bio: string;
    whyDevOps: string;
    learningGoals: string;
    status: string;
}

export type Section = 'home' | 'about' | 'skills' | 'projects' | 'blog' | 'contact';

export interface ScriptItem {
    id: Section;
    name: string;
    icon: string;
    animationType: 'sql' | 'git' | 'k8s' | 'docker' | 'logs' | 'network';
}
