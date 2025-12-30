// Architecture animation configurations for each project
// Defines the components and connections to animate

export interface ArchitectureNode {
    id: string;
    label: string;
    icon: 'github' | 'docker' | 'kubernetes' | 'database' | 'server' | 'cloud' | 'git' | 'terraform' | 'react' | 'api' | 'monitoring' | 'redis' | 'argocd' | 'security' | 'kafka';
    x: number;
    y: number;
    delay: number; // Delay in seconds before this node appears
}

export interface ArchitectureConnection {
    from: string;
    to: string;
    delay: number; // Delay in seconds before this connection animates
}

export interface ArchitectureConfig {
    nodes: ArchitectureNode[];
    connections: ArchitectureConnection[];
    duration: number; // Total animation duration in seconds
    terminalCommands: string[];
}

export const PROJECT_ARCHITECTURES: Record<string, ArchitectureConfig> = {
    'FullStack-MicroServices': {
        nodes: [
            { id: 'github', label: 'GitHub', icon: 'github', x: 100, y: 200, delay: 0 },
            { id: 'docker', label: 'Docker', icon: 'docker', x: 280, y: 200, delay: 1.0 },
            { id: 'k8s', label: 'Kubernetes', icon: 'kubernetes', x: 460, y: 200, delay: 2.0 },
            { id: 'auth', label: 'Auth Service', icon: 'server', x: 640, y: 100, delay: 3.0 },
            { id: 'orders', label: 'Orders', icon: 'server', x: 640, y: 200, delay: 3.4 },
            { id: 'payments', label: 'Payments', icon: 'server', x: 640, y: 300, delay: 3.8 },
            { id: 'postgres', label: 'PostgreSQL', icon: 'database', x: 460, y: 350, delay: 4.6 },
            { id: 'kafka', label: 'Kafka', icon: 'kafka', x: 280, y: 350, delay: 5.0 },
            { id: 'prometheus', label: 'Prometheus', icon: 'monitoring', x: 100, y: 350, delay: 6.0 },
        ],
        connections: [
            { from: 'github', to: 'docker', delay: 0.6 },
            { from: 'docker', to: 'k8s', delay: 1.6 },
            { from: 'k8s', to: 'auth', delay: 2.6 },
            { from: 'k8s', to: 'orders', delay: 2.8 },
            { from: 'k8s', to: 'payments', delay: 3.0 },
            { from: 'orders', to: 'kafka', delay: 4.2 },
            { from: 'payments', to: 'postgres', delay: 4.2 },
            { from: 'prometheus', to: 'k8s', delay: 6.4 },
        ],
        duration: 8,
        terminalCommands: [
            '$ kubectl apply -f deployment.yaml',
            'deployment.apps/microservices created',
            '$ kubectl get pods',
            'All pods running ✓',
        ],
    },
    'terraform-ATLAS': {
        nodes: [
            { id: 'user', label: 'DevOps', icon: 'git', x: 100, y: 200, delay: 0 },
            { id: 'repo', label: 'Git Repo', icon: 'github', x: 250, y: 200, delay: 0.6 },
            { id: 'ci', label: 'CI/CD', icon: 'argocd', x: 400, y: 200, delay: 1.4 },
            { id: 'terraform', label: 'Terraform', icon: 'terraform', x: 550, y: 200, delay: 2.2 },
            { id: 'aws', label: 'AWS', icon: 'cloud', x: 400, y: 80, delay: 3.2 },
            { id: 'gcp', label: 'GCP', icon: 'cloud', x: 550, y: 80, delay: 3.6 },
            { id: 'azure', label: 'Azure', icon: 'cloud', x: 700, y: 80, delay: 4.0 },
            { id: 'security', label: 'OPA Policies', icon: 'security', x: 400, y: 320, delay: 4.6 },
            { id: 'registry', label: 'Registry', icon: 'docker', x: 700, y: 200, delay: 5.2 },
        ],
        connections: [
            { from: 'user', to: 'repo', delay: 0.3 },
            { from: 'repo', to: 'ci', delay: 1.0 },
            { from: 'ci', to: 'terraform', delay: 1.8 },
            { from: 'terraform', to: 'aws', delay: 2.8 },
            { from: 'terraform', to: 'gcp', delay: 3.0 },
            { from: 'terraform', to: 'azure', delay: 3.2 },
            { from: 'ci', to: 'security', delay: 4.2 },
            { from: 'terraform', to: 'registry', delay: 4.8 },
        ],
        duration: 7,
        terminalCommands: [
            '$ terraform init',
            'Initializing provider plugins...',
            '$ terraform apply -auto-approve',
            'Apply complete! ✓',
        ],
    },
    'AuroraLink-Forge': {
        nodes: [
            { id: 'dev', label: 'Developer', icon: 'git', x: 100, y: 200, delay: 0 },
            { id: 'git', label: 'Git Repo', icon: 'github', x: 250, y: 200, delay: 0.6 },
            { id: 'api', label: 'FastAPI', icon: 'api', x: 400, y: 200, delay: 1.4 },
            { id: 'postgres', label: 'PostgreSQL', icon: 'database', x: 400, y: 320, delay: 2.0 },
            { id: 'redis', label: 'Redis', icon: 'redis', x: 550, y: 320, delay: 2.4 },
            { id: 'argo', label: 'ArgoCD', icon: 'argocd', x: 550, y: 200, delay: 3.0 },
            { id: 'k8sdev', label: 'K8s Dev', icon: 'kubernetes', x: 700, y: 140, delay: 4.0 },
            { id: 'k8sprod', label: 'K8s Prod', icon: 'kubernetes', x: 700, y: 260, delay: 4.4 },
            { id: 'ui', label: 'React UI', icon: 'react', x: 250, y: 80, delay: 5.0 },
        ],
        connections: [
            { from: 'dev', to: 'git', delay: 0.3 },
            { from: 'git', to: 'api', delay: 1.0 },
            { from: 'api', to: 'postgres', delay: 1.7 },
            { from: 'api', to: 'redis', delay: 1.9 },
            { from: 'api', to: 'argo', delay: 2.6 },
            { from: 'argo', to: 'k8sdev', delay: 3.6 },
            { from: 'argo', to: 'k8sprod', delay: 3.8 },
            { from: 'ui', to: 'api', delay: 5.4 },
        ],
        duration: 7,
        terminalCommands: [
            '$ git push origin main',
            'Triggering ArgoCD sync...',
            '$ argocd app sync forge',
            'Sync complete ✓',
        ],
    },
    'CloudDrift Guardian': {
        nodes: [
            { id: 'aws', label: 'AWS', icon: 'cloud', x: 100, y: 100, delay: 0 },
            { id: 'gcp', label: 'GCP', icon: 'cloud', x: 100, y: 200, delay: 0.4 },
            { id: 'azure', label: 'Azure', icon: 'cloud', x: 100, y: 300, delay: 0.8 },
            { id: 'scanner', label: 'Drift Scanner', icon: 'security', x: 280, y: 200, delay: 1.6 },
            { id: 'iac', label: 'Terraform State', icon: 'terraform', x: 280, y: 320, delay: 2.0 },
            { id: 'engine', label: 'Drift Engine', icon: 'server', x: 460, y: 200, delay: 2.8 },
            { id: 'cost', label: 'Cost Engine', icon: 'monitoring', x: 460, y: 320, delay: 3.4 },
            { id: 'db', label: 'PostgreSQL', icon: 'database', x: 640, y: 260, delay: 4.0 },
            { id: 'dashboard', label: 'Dashboard', icon: 'react', x: 640, y: 120, delay: 4.8 },
            { id: 'notify', label: 'Alerts', icon: 'kafka', x: 640, y: 380, delay: 5.4 },
        ],
        connections: [
            { from: 'aws', to: 'scanner', delay: 1.2 },
            { from: 'gcp', to: 'scanner', delay: 1.4 },
            { from: 'azure', to: 'scanner', delay: 1.6 },
            { from: 'iac', to: 'scanner', delay: 2.2 },
            { from: 'scanner', to: 'engine', delay: 2.6 },
            { from: 'engine', to: 'cost', delay: 3.2 },
            { from: 'engine', to: 'db', delay: 3.8 },
            { from: 'cost', to: 'db', delay: 4.2 },
            { from: 'db', to: 'dashboard', delay: 4.6 },
            { from: 'engine', to: 'notify', delay: 5.0 },
        ],
        duration: 7,
        terminalCommands: [
            '$ guardian scan --all-clouds',
            'Scanning infrastructure...',
            '$ guardian report',
            'Drift detected: 3 resources ⚠',
        ],
    },
};
