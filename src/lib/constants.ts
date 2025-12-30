import type { PersonalInfo, Skill, Project, Education, SocialLink, ScriptItem } from './types';

// ========================================
// DESIGN SYSTEM CONSTANTS
// ========================================

export const COLORS = {
    // Primary Colors (Neon)
    CYAN: '#00d9ff',
    MAGENTA: '#ff006e',
    YELLOW: '#ffbe0b',

    // Background Colors
    DEEP_NAVY: '#0a0e27',
    DARK_GRAY: '#161b22',
    DARKER_GRAY: '#21262d',

    // Text Colors
    WHITE: '#f0f0f0',
    LIGHT_GRAY: '#8b949e',
    MUTED_GRAY: '#6e7681',

    // Status Colors
    SUCCESS: '#00ff41',
    ERROR: '#ff4444',
    LOADING: '#0066ff',
} as const;

export const SPACING = {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
    XXL: 48,
} as const;

export const ANIMATION_DURATION = {
    QUICK: 200,
    NORMAL: 300,
    SLOW: 500,
    LOADING: 4000,
    GLITCH_INTERVAL_MIN: 8000,
    GLITCH_INTERVAL_MAX: 12000,
    GLITCH_DURATION: 150,
} as const;

// ========================================
// PERSONAL INFORMATION
// ========================================

export const PERSONAL_INFO: PersonalInfo = {
    name: 'Raj Patil',
    title: 'DevOps | SRE | Cloud Engineer',
    email: 'rpdinkar92260@gmail.com',
    location: 'Pune, Maharashtra, India',
    bio: 'DevOps engineer passionate about building scalable infrastructure and automating complex deployments. I focus on containerization, orchestration, and CI/CD pipelines to help teams ship faster and operate reliably. Currently exploring advanced Kubernetes patterns and cloud cost optimization while contributing to open-source infrastructure projects.',
    whyDevOps: "I chose DevOps because I'm fascinated by the intersection of development and infrastructure—where automation meets reliability at scale. There's a real satisfaction in designing systems that enable teams to deploy confidently, reduce operational friction, and focus on building features instead of fighting infrastructure issues. I'm driven by solving real problems through elegant automation and building the infrastructure that powers modern applications.",
    learningGoals: 'Kubernetes advanced patterns, GitOps (ArgoCD/Flux), Terraform IaC, Cloud FinOps, Platform Engineering, and Microservices CI/CD.',
    status: 'Available for Projects',
};

// ========================================
// SKILLS DATA
// ========================================

export const SKILLS: Skill[] = [
    // Cloud & Infrastructure
    { name: 'AWS (EC2, S3, Lambda, IAM, VPC, CloudWatch)', category: 'Cloud & Infrastructure', proficiency: 'Intermediate' },
    { name: 'AWS (ECR, EKS)', category: 'Cloud & Infrastructure', proficiency: 'Beginner' },
    { name: 'Linux System Administration', category: 'Cloud & Infrastructure', proficiency: 'Intermediate' },
    { name: 'Terraform', category: 'Cloud & Infrastructure', proficiency: 'Beginner' },
    { name: 'Networking & Security', category: 'Cloud & Infrastructure', proficiency: 'Beginner' },

    // DevOps & CI/CD
    { name: 'Docker', category: 'DevOps & CI/CD', proficiency: 'Intermediate' },
    { name: 'Kubernetes', category: 'DevOps & CI/CD', proficiency: 'Beginner' },
    { name: 'Helm', category: 'DevOps & CI/CD', proficiency: 'Beginner' },
    { name: 'GitHub Actions', category: 'DevOps & CI/CD', proficiency: 'Intermediate' },
    { name: 'Jenkins', category: 'DevOps & CI/CD', proficiency: 'Beginner' },
    { name: 'CI/CD Pipelines', category: 'DevOps & CI/CD', proficiency: 'Intermediate' },

    // Databases
    { name: 'PostgreSQL', category: 'Databases', proficiency: 'Beginner' },
    { name: 'DynamoDB', category: 'Databases', proficiency: 'Beginner' },
    { name: 'MongoDB', category: 'Databases', proficiency: 'Beginner' },
    { name: 'Redis', category: 'Databases', proficiency: 'Beginner' },

    // Programming & Scripting
    { name: 'Bash/Shell Scripting', category: 'Programming & Scripting', proficiency: 'Intermediate' },
    { name: 'Python', category: 'Programming & Scripting', proficiency: 'Beginner' },
    { name: 'Java', category: 'Programming & Scripting', proficiency: 'Beginner' },
    { name: 'YAML', category: 'Programming & Scripting', proficiency: 'Intermediate' },

    // Version Control & IaC
    { name: 'Git & GitHub', category: 'Version Control & IaC', proficiency: 'Intermediate' },
    { name: 'Docker Compose', category: 'Version Control & IaC', proficiency: 'Intermediate' },
    { name: 'Infrastructure as Code (Terraform)', category: 'Version Control & IaC', proficiency: 'Beginner' },
];

// ========================================
// PROJECTS DATA
// ========================================

export const PROJECTS: Project[] = [
    {
        name: 'FullStack-MicroServices',
        shortDescription: 'Production-style microservices application with end-to-end CI/CD, observability, and scalable Kubernetes infrastructure for real-world workloads.',
        fullDescription: 'A complete microservices architecture implementing independent services for core domains (auth, orders, payments, inventory) with full observability and GitOps-driven deployments.',
        techStack: ['Node.js', 'Java', 'Docker', 'Kubernetes', 'Helm', 'PostgreSQL', 'MongoDB', 'Prometheus', 'Grafana', 'GitHub Actions', 'Argo CD', 'NGINX'],
        features: [
            'Independent microservices for core domains (auth, orders, payments, inventory)',
            'Containerized services using Docker with separate Dockerfiles per service',
            'Kubernetes manifests/Helm charts for deployment, HPA, and service discovery',
            'Full CI/CD pipeline: build, test, image push, deploy to K8s on every merge',
            'Blue-green / rolling deployments with automatic rollback on failure',
            'Centralized logging with ELK/Loki for all services',
            'Metrics via Prometheus and dashboards in Grafana for latency, error rate, and throughput',
            'Health checks, liveness/readiness probes, and graceful shutdown for each service',
            'Secrets and config managed via K8s Secrets/ConfigMaps and GitOps',
            'Rate limiting and request tracing through API gateway + OpenTelemetry',
        ],
        achievements: [
            'Cut deployment time from manual 30-40 minutes to under 5 minutes per release via automated CI/CD',
            'Achieved zero-downtime releases using rolling/blue-green deployments on Kubernetes',
            'Improved incident resolution by 40-50% using centralized logs and Grafana dashboards',
        ],
        learningOutcomes: [
            'Designed and operated microservices with real production constraints (scaling, failures, observability)',
            'Implemented a complete CI/CD pipeline targeting Kubernetes, including automated testing and rollback',
            'Learned how to model DB-per-service and handle communication patterns between microservices',
        ],
        useCases: [
            'E-commerce platform (orders, payments, inventory)',
            'SaaS backend needing independent deployable services',
            'Any system where continuous delivery and fast iteration are critical',
        ],
        githubUrl: 'https://github.com/Raj-glitch-max/FullStack-MicroServices',
        liveUrl: '',
        architecture: `graph TD
    Client[Client] -->|HTTPS| Ingress[NGINX Ingress]
    Ingress -->|Route| Auth[Auth Service]
    Ingress -->|Route| Orders[Orders Service]
    Ingress -->|Route| Pay[Payments Service]
    Ingress -->|Route| Inv[Inventory Service]
    
    Auth -->|AuthZ| Orders
    Orders -->|Async| Kafka[Kafka Message Broker]
    Kafka -->|Consume| Pay
    Kafka -->|Consume| Inv
    
    Auth -->|Read/Write| DB1[(PostgreSQL)]
    Orders -->|Read/Write| DB2[(MongoDB)]
    Pay -->|Read/Write| DB3[(PostgreSQL)]
    Inv -->|Read/Write| DB4[(Redis)]
    
    subgraph Observability
        Prom[Prometheus] -->|Scrape| Auth
        Prom -->|Scrape| Orders
        Grafana[Grafana] -->|Query| Prom
    end`,
    },
    {
        name: 'terraform-ATLAS',
        shortDescription: 'A curated library of 25+ reusable Terraform modules for secure, production-ready, multi-cloud infrastructure (AWS, GCP, Azure).',
        fullDescription: 'A comprehensive Infrastructure-as-Code library providing battle-tested Terraform modules for rapidly provisioning secure, compliant cloud infrastructure across multiple providers.',
        techStack: ['Terraform', 'Terragrunt', 'AWS', 'GCP', 'Azure', 'Terratest', 'GitHub Actions', 'OPA'],
        features: [
            '25+ parameterized Terraform modules for VPC/VNet, EKS/GKE/AKS, RDS/Cloud SQL, S3/GCS/Blob, IAM, security groups, and observability stacks',
            'Multi-cloud patterns with provider-specific modules and common interfaces',
            'Security-first defaults: encryption at rest, restricted security groups, least-privilege IAM, and logging enabled',
            'Environment support (dev/stage/prod) through workspace/folder pattern',
            '95%+ test coverage using Terratest for module behaviour and regression safety',
            'Opinionated tagging, naming, and structure standards for all resources',
            'Built-in support for remote state backends and locking (S3/GCS + DynamoDB, etc.)',
            'Example stacks showing how to compose modules into full environments',
            'Pre-configured monitoring/logging resources (CloudWatch/Stackdriver/Azure Monitor)',
            'CI pipeline that validates, plans, and tests modules on every PR',
        ],
        achievements: [
            'Reduced infra provisioning time from days to under 1 hour for new environments by reusing modules',
            'Achieved >95% module test coverage, minimizing production breakage from IaC changes',
            'Enforced consistent security/compliance across all environments using reusable governance modules',
        ],
        learningOutcomes: [
            'Deep understanding of Terraform module design, composition, and versioning strategies',
            'Practical experience with multi-cloud abstractions and provider differences',
            'Implemented test-driven infrastructure with CI-validated Terraform',
        ],
        useCases: [
            'Bootstrapping production-ready infra for startups or side-projects in minutes',
            'Standardizing infra across teams/regions/clouds using a single module catalog',
            'Enforcing governance and compliance policies as code',
        ],
        githubUrl: 'https://github.com/Raj-glitch-max/terraform-ATLAS',
        liveUrl: '',
        architecture: `graph TD
    User[DevOps Engineer] -->|Git Push| Repo[GitHub Repo]
    Repo -->|Trigger| CI[GitHub Actions]
    
    subgraph CI Pipeline
        CI -->|1. Fmt/Validate| Lint[Terraform Lint]
        CI -->|2. Security| OPA[OPA Policies]
        CI -->|3. Test| Test[Terratest]
    end
    
    Test -->|Deploy Ephemeral| AWS[AWS Sandbox]
    Test -->|Verify| Verify[Assertions]
    Test -->|Destroy| Clean[Cleanup]
    
    CI -->|Success| Registry[Module Registry]
    Registry -->|Consume| Prod[Production Infra]`,
    },
    {
        name: 'AuroraLink-Forge',
        shortDescription: 'A GitOps-driven CI/CD orchestration platform with React frontend and Python backend for multi-environment, policy-driven deployments.',
        fullDescription: 'An internal developer platform that centralizes multi-environment deployments with approval workflows, policy enforcement, and comprehensive audit trails.',
        techStack: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Argo CD', 'Flux', 'GitHub Actions', 'Docker', 'Kubernetes'],
        features: [
            'Single dashboard to view pipeline runs, environments, and deployment history',
            'GitOps integration: deploys based on Git PR merges, using Git as source of truth',
            'Multi-environment model (Dev, Staging, Prod, DR) with promotion workflows',
            'Approval workflows: deployments to higher environments require reviewer sign-off',
            'Policy checks (lint, tests, security scans) enforced before allowing promotion',
            'Rollback support to previous releases using Git history and tags',
            'Real-time deployment status and logs streaming from GitOps tools',
            'RBAC for teams, services, and environments',
            'Notification hooks (Slack/Email/Webhooks) for pipeline outcomes',
            'Audit trail for who approved, who deployed, and what changed',
        ],
        achievements: [
            'Reduced deployment coordination effort by centralizing multi-environment releases in one platform',
            'Decreased failed production deployments by enforcing approval + policy gates',
            'Improved traceability of changes and ownership via full audit trails',
        ],
        learningOutcomes: [
            'Built a GitOps-first deployment workflow integrating Git, CI, and CD tools',
            'Learned to design multi-environment promotion models (branch-per-env / folder-per-env)',
            'Implemented complex stateful UI around deployments, logs, and approvals',
        ],
        useCases: [
            'Teams managing multiple Kubernetes environments with GitOps',
            'Organizations needing strict approvals and audit for production releases',
            'Platform engineering teams building an internal delivery portal',
        ],
        githubUrl: 'https://github.com/Raj-glitch-max/AuroraLink-Forge',
        liveUrl: '',
        architecture: `graph LR
    Dev[Developer] -->|Push| Git[Git Repo]
    Git -->|Webhook| API[FastAPI Backend]
    
    subgraph Platform
        API -->|Store State| DB[(PostgreSQL)]
        API -->|Cache| Redis[(Redis)]
        API -->|Trigger| Argo[Argo CD]
    end
    
    Argo -->|Sync| K8sDev[K8s Dev]
    Argo -->|Sync| K8sProd[K8s Prod]
    
    UI[React Dashboard] -->|View/Approve| API
    K8sProd -->|Status| API`,
    },
    {
        name: 'CloudDrift Guardian',
        shortDescription: 'A multi-cloud FinOps and compliance platform that detects infrastructure drift, optimizes cloud costs, and enforces policies across AWS/GCP/Azure.',
        fullDescription: 'A comprehensive cloud governance platform providing continuous drift detection, cost optimization recommendations, and policy-as-code enforcement across multi-cloud environments.',
        techStack: ['Go', 'Python', 'Terraform', 'CloudFormation', 'AWS', 'GCP', 'Azure', 'React', 'Next.js', 'PostgreSQL', 'ClickHouse', 'Kafka', 'Prometheus'],
        features: [
            'Drift detection by comparing live cloud resources against IaC definitions',
            'Cloud cost ingestion from billing exports and APIs for AWS/GCP/Azure',
            'Optimization recommendations: rightsizing, idle resource detection, and scheduling shutdowns',
            'Policy-as-code engine to enforce tagging, security, and compliance rules',
            'Alerting for high-risk drifts (public S3 buckets, open security groups, etc.)',
            'Multi-cloud inventory view with filters by account, region, environment, and service',
            'Integration with Terraform runs to block non-compliant plans',
            'Dashboards for monthly spend, top offenders, and savings opportunities',
            'Webhooks/Slack integration for drift and cost alerts',
            'Historical trend analysis to track improvements over time',
        ],
        achievements: [
            'Identified potential cost savings of 20-30% by rightsizing and removing idle resources',
            'Detected and surfaced multiple high-risk misconfigurations (public storage, overly broad security groups)',
            'Enabled continuous drift monitoring instead of ad-hoc manual checks',
        ],
        learningOutcomes: [
            'Understood FinOps fundamentals: cost visibility, allocation, and optimization in multi-cloud',
            'Built drift-detection logic by reconciling live cloud state with IaC definitions',
            'Designed alerting and policy-as-code workflows tightly integrated with infrastructure tooling',
        ],
        useCases: [
            'Startups and teams wanting automated cloud cost monitoring and optimization',
            'Enterprises enforcing security/compliance across many accounts and clouds',
            'Platform/FinOps teams needing a single pane of glass for drift + cost + policy',
        ],
        githubUrl: 'https://github.com/Raj-glitch-max/CloudDrift-Guardian',
        liveUrl: '',
        architecture: `graph TD
    Cloud[AWS/GCP/Azure] -->|Read| Scanner[Drift Scanner]
    IaC[Terraform State] -->|Read| Scanner
    
    Scanner -->|Compare| Engine[Drift Engine]
    Engine -->|Results| DB[(PostgreSQL)]
    
    Billing[Billing APIs] -->|Ingest| Cost[Cost Engine]
    Cost -->|Analyze| ClickHouse[(ClickHouse)]
    
    Engine -->|Alert| Notify[Notification Service]
    Cost -->|Report| Dashboard[React Dashboard]
    
    Notify -->|Slack/Email| User[User]`,
    },
];

// ========================================
// EDUCATION DATA
// ========================================

export const EDUCATION: Education[] = [
    {
        institution: 'MIT ADT University',
        degree: 'B.Tech',
        duration: 'Aug 2022 – May 2026',
        grade: '7.56/10',
    },
    {
        institution: 'Azam Campus',
        degree: 'HSC (12th Standard)',
        duration: '2022',
        grade: '74.5%',
    },
    {
        institution: 'Tapti Public School',
        degree: 'CBSE (10th Standard)',
        duration: '2020',
        grade: '79%',
    },
];

// ========================================
// SOCIAL LINKS
// ========================================

export const SOCIAL_LINKS: SocialLink[] = [
    {
        platform: 'GitHub',
        url: 'https://github.com/Raj-glitch-max',
    },
    {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/raj-patil-311b6b259/',
    },
    {
        platform: 'Twitter',
        url: 'https://x.com/RAJPATIL901',
    },
    {
        platform: 'Email',
        url: `mailto:${PERSONAL_INFO.email}`,
    },
];

// ========================================
// SCRIPT ITEMS (Navigation)
// ========================================

export const SCRIPT_ITEMS: ScriptItem[] = [
    {
        id: 'about',
        name: './about.sh',
        icon: 'FileText',
        animationType: 'git',
    },
    {
        id: 'skills',
        name: './skills.sh',
        icon: 'Target',
        animationType: 'k8s',
    },
    {
        id: 'projects',
        name: './projects.sh',
        icon: 'Rocket',
        animationType: 'docker',
    },
    {
        id: 'blog',
        name: './blog.sh',
        icon: 'FileEdit',
        animationType: 'logs',
    },
    {
        id: 'contact',
        name: './contact.sh',
        icon: 'Mail',
        animationType: 'network',
    },
];

// ========================================
// DEVOPS COMMANDS (for Code Rain)
// ========================================

export const DEVOPS_COMMANDS = [
    '$ docker pull raj/portfolio:latest',
    '$ kubectl apply -f deployment.yaml',
    '$ terraform init',
    '$ git push origin main',
    '$ sudo systemctl restart devops-agent',
    '$ helm upgrade --install myapp ./chart',
    '$ docker-compose up -d',
    '$ kubectl get pods --all-namespaces',
    '$ terraform plan -out=tfplan',
    '$ git commit -m "feat: add feature"',
    '$ npm run build',
    '$ aws s3 sync ./build s3://bucket',
    '$ kubectl logs -f deployment/app',
    '$ docker build -t app:v1.0 .',
    '$ terraform apply -auto-approve',
];
