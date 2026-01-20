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
    'Terraform Multi-Cloud Infrastructure': {
        nodes: [
            { id: 'github', label: 'GitHub', icon: 'github', x: 100, y: 200, delay: 0 },
            { id: 'jenkins', label: 'Jenkins', icon: 'docker', x: 250, y: 200, delay: 0.8 },
            { id: 'security', label: 'Security Scan', icon: 'security', x: 400, y: 100, delay: 1.6 },
            { id: 'terraform', label: 'Terraform', icon: 'terraform', x: 400, y: 300, delay: 1.6 },
            { id: 'aws', label: 'AWS', icon: 'cloud', x: 600, y: 100, delay: 2.8 },
            { id: 'azure', label: 'Azure', icon: 'cloud', x: 600, y: 200, delay: 3.2 },
            { id: 'gcp', label: 'GCP', icon: 'cloud', x: 600, y: 300, delay: 3.6 },
        ],
        connections: [
            { from: 'github', to: 'jenkins', delay: 0.4 },
            { from: 'jenkins', to: 'security', delay: 1.2 },
            { from: 'jenkins', to: 'terraform', delay: 1.2 },
            { from: 'terraform', to: 'aws', delay: 2.2 },
            { from: 'terraform', to: 'azure', delay: 2.4 },
            { from: 'terraform', to: 'gcp', delay: 2.6 },
        ],
        duration: 5,
        terminalCommands: [
            '$ git push origin main',
            '$ docker-compose up -d jenkins',
            '$ terraform fmt -recursive',
            '$ tfsec .',
            '$ terraform plan -out=tfplan',
            '$ terraform apply tfplan',
        ],
    },
    'HostMaster': {
        nodes: [
            { id: 'frontend', label: 'Next.js UI', icon: 'react', x: 100, y: 200, delay: 0 },
            { id: 'api', label: 'Express API', icon: 'api', x: 250, y: 200, delay: 0.8 },
            { id: 'db', label: 'PostgreSQL', icon: 'database', x: 400, y: 100, delay: 1.6 },
            { id: 'redis', label: 'Redis Queue', icon: 'redis', x: 400, y: 300, delay: 1.6 },
            { id: 'worker', label: 'Bull Worker', icon: 'server', x: 550, y: 300, delay: 2.4 },
            { id: 'aws', label: 'AWS SDK', icon: 'cloud', x: 700, y: 300, delay: 3.2 },
        ],
        connections: [
            { from: 'frontend', to: 'api', delay: 0.4 },
            { from: 'api', to: 'db', delay: 1.2 },
            { from: 'api', to: 'redis', delay: 1.2 },
            { from: 'redis', to: 'worker', delay: 2.0 },
            { from: 'worker', to: 'aws', delay: 2.8 },
        ],
        duration: 5,
        terminalCommands: [
            '$ npm run dev',
            '$ docker-compose up -d',
            'Starting worker process...',
            '$ terraform apply',
            'Scanning AWS resources...',
        ],
    },
    'AI-Driven CI/CD Pipeline': {
        nodes: [
            { id: 'github', label: 'GitHub', icon: 'github', x: 80, y: 200, delay: 0 },
            { id: 'jenkins', label: 'Jenkins', icon: 'server', x: 220, y: 200, delay: 0.8 },
            { id: 'docker', label: 'Docker Build', icon: 'docker', x: 360, y: 100, delay: 1.6 },
            { id: 'ai', label: 'AI Analysis', icon: 'api', x: 360, y: 300, delay: 1.6 },
            { id: 'db', label: 'DB', icon: 'database', x: 500, y: 300, delay: 2.4 },
            { id: 'argocd', label: 'ArgoCD', icon: 'argocd', x: 500, y: 100, delay: 3.2 },
            { id: 'k8s', label: 'K8s Cluster', icon: 'kubernetes', x: 640, y: 100, delay: 4.0 },
            { id: 'dashboard', label: 'Dashboard', icon: 'react', x: 640, y: 300, delay: 4.8 },
        ],
        connections: [
            { from: 'github', to: 'jenkins', delay: 0.4 },
            { from: 'jenkins', to: 'docker', delay: 1.2 },
            { from: 'jenkins', to: 'ai', delay: 1.2 },
            { from: 'ai', to: 'db', delay: 2.0 },
            { from: 'jenkins', to: 'argocd', delay: 2.8 },
            { from: 'argocd', to: 'k8s', delay: 3.6 },
            { from: 'db', to: 'dashboard', delay: 4.4 },
        ],
        duration: 6,
        terminalCommands: [
            '$ git push origin feature/ai-optimization',
            '$ docker build -t ai-cicd:v2.0 .',
            '$ python analyze_logs.py --scan-level deep',
            'AI Suggestion: Optimize Dockerfile layer caching',
            '$ terraform apply -auto-approve',
            '$ kubectl get pods -n production --watch',
        ],
    },
    'FullStack-MicroServices': {
        nodes: [
            { id: 'user', label: 'User', icon: 'git', x: 80, y: 150, delay: 0 },
            { id: 'alb', label: 'ALB Ingress', icon: 'cloud', x: 250, y: 150, delay: 0.5 },
            { id: 'frontend', label: 'Frontend', icon: 'react', x: 400, y: 100, delay: 1.2 },
            { id: 'backend', label: 'Backend', icon: 'server', x: 400, y: 200, delay: 1.5 },
            { id: 'postgres', label: 'PostgreSQL', icon: 'database', x: 550, y: 150, delay: 2.2 },
            { id: 'redis', label: 'Redis', icon: 'redis', x: 550, y: 250, delay: 2.5 },
            { id: 'argocd', label: 'ArgoCD', icon: 'argocd', x: 250, y: 300, delay: 3.0 },
            { id: 'k8s', label: 'EKS Cluster', icon: 'kubernetes', x: 400, y: 300, delay: 3.5 },
            { id: 'prometheus', label: 'Prometheus', icon: 'monitoring', x: 550, y: 350, delay: 4.2 },
            { id: 'velero', label: 'Velero', icon: 'server', x: 700, y: 300, delay: 4.8 },
        ],
        connections: [
            { from: 'user', to: 'alb', delay: 0.8 },
            { from: 'alb', to: 'frontend', delay: 1.8 },
            { from: 'frontend', to: 'backend', delay: 2.0 },
            { from: 'backend', to: 'postgres', delay: 2.8 },
            { from: 'backend', to: 'redis', delay: 3.0 },
            { from: 'argocd', to: 'k8s', delay: 3.8 },
            { from: 'k8s', to: 'prometheus', delay: 4.5 },
            { from: 'k8s', to: 'velero', delay: 5.0 },
        ],
        duration: 7,
        terminalCommands: [
            '$ argocd app sync production',
            'Syncing manifests to EKS...',
            '$ kubectl get pods -n prod',
            'frontend-7d8b9c-x2z1  Running',
            'backend-5f4a1d-q9p3   Running',
        ],
    },
    'terraform-ATLAS': {
        nodes: [
            { id: 'internet', label: 'Internet', icon: 'cloud', x: 80, y: 200, delay: 0 },
            { id: 'alb', label: 'ALB (Public)', icon: 'server', x: 250, y: 200, delay: 0.8 },
            { id: 'asg', label: 'ASG (Private)', icon: 'server', x: 450, y: 200, delay: 1.6 },
            { id: 'rds', label: 'RDS (Private)', icon: 'database', x: 650, y: 200, delay: 2.4 },
            { id: 'cloudwatch', label: 'CloudWatch', icon: 'monitoring', x: 450, y: 320, delay: 3.2 },
            { id: 's3', label: 'S3 State', icon: 'database', x: 250, y: 80, delay: 4.0 },
            { id: 'terraform', label: 'Terraform', icon: 'terraform', x: 450, y: 80, delay: 4.5 },
        ],
        connections: [
            { from: 'internet', to: 'alb', delay: 1.0 },
            { from: 'alb', to: 'asg', delay: 1.8 },
            { from: 'asg', to: 'rds', delay: 2.6 },
            { from: 'asg', to: 'cloudwatch', delay: 3.4 },
            { from: 'terraform', to: 's3', delay: 4.8 },
            { from: 'terraform', to: 'asg', delay: 5.0 },
        ],
        duration: 6,
        terminalCommands: [
            '$ terraform plan',
            'Plan: 12 to add, 0 to change',
            '$ terraform apply -auto-approve',
            'Apply complete! Resources: 12 added',
        ],
    },
    'AuroraLink-Forge': {
        nodes: [
            { id: 'user', label: 'User', icon: 'git', x: 80, y: 200, delay: 0 },
            { id: 'api', label: 'API Gateway', icon: 'api', x: 250, y: 200, delay: 0.6 },
            { id: 'create', label: 'Lambda: Create', icon: 'server', x: 450, y: 120, delay: 1.4 },
            { id: 'resolve', label: 'Lambda: Resolve', icon: 'server', x: 450, y: 280, delay: 1.8 },
            { id: 'ddb', label: 'DynamoDB', icon: 'database', x: 650, y: 200, delay: 2.6 },
            { id: 'eventbridge', label: 'EventBridge', icon: 'cloud', x: 450, y: 380, delay: 3.4 },
            { id: 'cleanup', label: 'Lambda: Cleanup', icon: 'server', x: 650, y: 380, delay: 4.0 },
        ],
        connections: [
            { from: 'user', to: 'api', delay: 0.8 },
            { from: 'api', to: 'create', delay: 1.6 },
            { from: 'api', to: 'resolve', delay: 2.0 },
            { from: 'create', to: 'ddb', delay: 2.8 },
            { from: 'resolve', to: 'ddb', delay: 3.0 },
            { from: 'eventbridge', to: 'cleanup', delay: 4.2 },
            { from: 'cleanup', to: 'ddb', delay: 4.5 },
        ],
        duration: 6,
        terminalCommands: [
            '$ sam deploy --guided',
            'Deploying stack AuroraLink-Forge...',
            'Successfully created/updated stack',
            'API Gateway Endpoint: https://api...',
        ],
    },
    'CloudDrift Guardian': {
        nodes: [
            { id: 'clouds', label: 'AWS/GCP/Azure', icon: 'cloud', x: 100, y: 200, delay: 0 },
            { id: 'scanner', label: 'Drift Scanner', icon: 'security', x: 280, y: 200, delay: 1.0 },
            { id: 'mq', label: 'RabbitMQ', icon: 'kafka', x: 460, y: 200, delay: 1.8 },
            { id: 'engine', label: 'Drift/Cost Engine', icon: 'server', x: 640, y: 200, delay: 2.6 },
            { id: 'opa', label: 'Policy Engine', icon: 'security', x: 640, y: 80, delay: 3.4 },
            { id: 'clickhouse', label: 'ClickHouse', icon: 'database', x: 820, y: 150, delay: 4.0 },
            { id: 'postgres', label: 'Postgres', icon: 'database', x: 820, y: 250, delay: 4.4 },
            { id: 'api', label: 'FastAPI', icon: 'api', x: 640, y: 350, delay: 5.0 },
            { id: 'ui', label: 'Dashboard', icon: 'react', x: 460, y: 350, delay: 5.6 },
        ],
        connections: [
            { from: 'clouds', to: 'scanner', delay: 1.2 },
            { from: 'scanner', to: 'mq', delay: 2.0 },
            { from: 'mq', to: 'engine', delay: 2.8 },
            { from: 'engine', to: 'opa', delay: 3.6 },
            { from: 'engine', to: 'clickhouse', delay: 4.2 },
            { from: 'engine', to: 'postgres', delay: 4.6 },
            { from: 'postgres', to: 'api', delay: 5.2 },
            { from: 'api', to: 'ui', delay: 5.8 },
        ],
        duration: 7,
        terminalCommands: [
            '$ guardian scan --all-clouds',
            'Scanning infrastructure...',
            'Drift detected: 3 resources',
            'Cost optimization: $450/mo potential savings',
        ],
    },
};
