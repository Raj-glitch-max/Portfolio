// Single source of truth for every claim on this site.
// Star counts verified against the GitHub API on 2026-09-27.
// Rule: if a number appears on a page, it must be checkable by the reader.

export const PROFILE = {
  name: 'Raj Patil',
  title: 'Backend / AI-Infrastructure Engineer',
  location: 'Pune, India',
  email: 'rpdinkar92260@gmail.com',
  domain: 'rajpatil.dev',
  thesis:
    'I build the control plane for AI agents: what they are allowed to do, and whether you can trust what they concluded.',
  summary:
    'Backend engineer building the control plane for AI agents — authorization, evaluation, and incident response — in Go and Python. Shipped a live capability-delegation service bound to SPIFFE workload identity, and a Kubernetes benchmark that surfaced a named LLM diagnosis failure mode. AWS Solutions Architect Associate; ships own CI/CD and deploys.',
  status: 'Open to backend / AI-infrastructure / platform roles',
  graduated: 'B.Tech, May 2026',
  links: {
    github: 'https://github.com/Raj-glitch-max',
    linkedin: 'https://www.linkedin.com/in/raj-patil-311b6b259/',
    twitter: 'https://x.com/RAJPATIL901',
    resume: '/raj-patil-resume.pdf',
  },
} as const;

export const EDUCATION = {
  institution: 'MIT ADT University, Pune',
  degree: 'B.Tech, Electronics & Computer Engineering',
  duration: 'Aug 2022 – May 2026',
  cgpa: '7.71 / 10',
} as const;

export const CERTIFICATIONS = [
  'AWS Certified Solutions Architect – Associate',
  'AWS Certified AI Practitioner',
  'AWS Certified Cloud Practitioner',
  'GitHub Copilot Certified',
  'Redis Certified Developer (Python)',
] as const;

export const SKILLS = [
  { group: 'Languages', items: ['Go', 'Python', 'SQL', 'Bash'] },
  {
    group: 'AI / agent infrastructure',
    items: ['Model Context Protocol (MCP)', 'agent authorization', 'LLM evaluation harnesses', 'tool & function calling', 'structured outputs', 'RAG'],
  },
  { group: 'Backend', items: ['gRPC', 'REST', 'JSON-RPC', 'FastAPI', 'Flask', 'PostgreSQL', 'Go concurrency'] },
  { group: 'Cloud & infra', items: ['AWS (EC2, IAM, S3, CloudWatch)', 'Docker', 'Kubernetes', 'GitHub Actions', 'Nginx', 'Linux'] },
  { group: 'Security', items: ['SPIFFE/SPIRE workload identity', 'capability-based authorization', 'mTLS', 'JWT', 'least-privilege design'] },
] as const;

export type Plane = 'authorize' | 'act' | 'evaluate' | 'attribute';

export interface Project {
  slug: string;
  name: string;
  plane: Plane;
  planeLabel: string;
  oneLine: string;          // what it does, for a stranger
  stars: number;            // verified via GitHub API
  repo: string;
  live?: string;
  stack: string[];
  /** The interesting engineering, written as evidence rather than adjectives. */
  bullets: string[];
  /** Honest scope statement. What this is NOT. */
  scope: string;
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: 'atlas',
    name: 'Atlas',
    plane: 'authorize',
    planeLabel: 'Authorize',
    oneLine:
      'Replaces the shared API key an AI agent uses with a scoped, attenuable token bound to its workload identity — verified offline, with no network hop on the authorization path.',
    stars: 40,
    repo: 'https://github.com/Raj-glitch-max/atlas',
    stack: ['Go', 'SPIFFE/SPIRE', 'gRPC', 'MCP', 'Railway', 'Cloudflare Pages'],
    bullets: [
      'Each delegation token is bound to a SPIFFE workload identity issued by SPIRE, and verified fully offline — authorization adds no network round-trip.',
      'Tokens are attenuable: a caller can narrow a capability it holds before passing it on, but never widen it.',
      'Passed a 28-vector conformance suite, 18 of them adversarial — replay, scope escalation, clock skew, stale trust bundle.',
      'That suite exists because an audit found 12 deployment-phase defects that a fully passing unit-test suite had hidden. Unit tests proved the logic; nothing proved the deployment.',
      'Two of those were the interesting kind: a signature time-unit defect (seconds compared against nanoseconds) and a trust-bundle refresh failure that silently rejected all traffic. Hardened with fail-closed revocation on short-TTL refresh.',
      'Ships an MCP server plus SDKs in Go, Python and TypeScript. Deployed live, and now enforces least privilege on every tool call inside AISRE.',
    ],
    scope:
      'A working service with a conformance suite and three SDKs, deployed and in use by my own agent pipeline. It has not been through an external security audit or run in production at another organisation.',
    featured: true,
  },
  {
    slug: 'aisre',
    name: 'AISRE',
    plane: 'act',
    planeLabel: 'Act',
    oneLine:
      'An agentic incident-response pipeline: it detects a live service failure, investigates it with a three-tool orchestrator, and proposes a root cause — but cannot touch anything until a human approves.',
    stars: 1,
    repo: 'https://github.com/Raj-glitch-max/AISRE',
    stack: ['Python', 'Flask', 'NVIDIA NIM (Nemotron)', 'Docker', 'Atlas', 'KLRB'],
    bullets: [
      'End-to-end loop: detect a live failure, investigate with a three-tool orchestrator agent, and emit a structured-JSON root cause before any fix is applied.',
      'Every remediation is gated behind human approval, then automatically health-re-verified after the fix lands.',
      'A hard zero-financial-API-exposure boundary on all agent tool calls — the agent physically cannot reach a billing surface, rather than being asked not to.',
      'Seven phases verified end-to-end in a live session: detection, investigation, approval, remediation, re-verification.',
      'Atlas gates what the agent is allowed to call. KLRB is designed in as the evaluator of its root-cause output. This is the project the other two exist to make trustworthy.',
    ],
    scope:
      'Newest of the three and the least battle-tested — a verified end-to-end pipeline, not something that has carried real on-call load. The approval gate and the capability boundary are the parts I would defend; the detection heuristics are not novel.',
    featured: true,
  },
  {
    slug: 'klrb',
    name: 'KLRB',
    plane: 'evaluate',
    planeLabel: 'Evaluate',
    oneLine:
      'A Kubernetes benchmark that measures whether an LLM actually read the cluster evidence before diagnosing an incident — or just guessed confidently from metadata.',
    stars: 96,
    repo: 'https://github.com/Raj-glitch-max/kubernetes-llm-incident-response-benchmark',
    stack: ['Python', 'Kubernetes', 'Chaos engineering', 'Multi-provider LLM runner'],
    bullets: [
      'Injects reproducible chaos faults into live Kubernetes clusters, then scores how faithfully an LLM agent diagnoses root cause from the real evidence: events, logs and metrics.',
      'The measurement is an ablation, not a vibe check. Run the same scenario with the causal evidence present, then with it removed, and compare the conclusions.',
      'That ablation surfaces what I call the Confident Liar effect: a model that keeps its conclusion unchanged after the evidence that justified it is taken away was never reading the evidence. It was guessing, fluently.',
      'A multi-provider runner behind one adapter interface, with deterministic scenario replay — so cross-model scores are comparable instead of run-to-run noise.',
      'This is the most-starred thing I have built, and the reason is the metric rather than the code: "did it read the logs" turns out to be measurable.',
    ],
    scope:
      'A benchmark harness and a reproducible effect, not a peer-reviewed result. Scores are comparable within the harness. I would not yet quote an absolute number as a property of a model in general — the honest claim is the direction and the method.',
    featured: true,
  },
  {
    slug: 'tf-why',
    name: 'tf.why',
    plane: 'attribute',
    planeLabel: 'Attribute',
    oneLine:
      'Terraform tells you what drifted. This tells you who changed it, when, and from where — by correlating the plan against CloudTrail.',
    stars: 33,
    repo: 'https://github.com/Raj-glitch-max/tf.why',
    stack: ['Python', 'Terraform', 'AWS CloudTrail', 'IAM'],
    bullets: [
      'Pipe a terraform plan JSON in; it queries CloudTrail in parallel and attributes each drifted resource to a specific IAM identity, API call and timestamp.',
      'Distinguishes a change made in the Console from one made by the CLI, an SDK, or an automation role — which is usually the actual question during an incident.',
      'A strict mapper relates each Terraform resource type to the CloudTrail event sources that can change it, then narrows using the plan before/after state. Generic CloudTrail searching produces false positives; this does not.',
      'Covers 27+ AWS resource types: VPC, security groups, S3, RDS, EKS, Lambda, IAM, DynamoDB.',
      'Read-only by design: needs cloudtrail:LookupEvents and nothing else. Plans are parsed locally, no state leaves the machine, no database.',
    ],
    scope:
      'Packaged (pyproject.toml, tests, docs) and installable from source. Not yet on PyPI — see the note on the project page.',
    featured: true,
  },
  {
    slug: 'self-healing-cicd',
    name: 'Self-Healing CI/CD',
    plane: 'act',
    planeLabel: 'Act',
    oneLine:
      'When a test fails, an agent reads the failure, writes a fix, and opens a pull request — inside the same pipeline run that caught it.',
    stars: 41,
    repo: 'https://github.com/Raj-glitch-max/AI-DRIVEN-self-healing-CICD',
    stack: ['Python', 'Jenkins', 'Flask', 'Docker', 'GitHub API', 'Prometheus', 'Grafana'],
    bullets: [
      'Parses the failure log, fetches the relevant source for context, generates a fix, commits to a branch and opens a PR. A human still merges — the loop ends at review, deliberately.',
      'Handles pytest, unittest and generic build errors rather than one framework.',
      'Prometheus metrics on fix rate, acceptance rate and time-to-repair, because an agent you cannot measure is an agent you cannot trust.',
      'The earlier, blunter ancestor of AISRE: same instinct, no capability boundary and no evaluator. Building it is what made the case for Atlas and KLRB.',
    ],
    scope:
      'A working Jenkins integration. The fix quality is bounded by the model behind it — which is precisely the problem KLRB was built to measure.',
    featured: false,
  },
  {
    slug: 'autostack',
    name: 'AutoStack',
    plane: 'act',
    planeLabel: 'Act',
    oneLine: 'Go and Svelte tooling for standing up an application stack without hand-wiring it.',
    stars: 28,
    repo: 'https://github.com/Raj-glitch-max/AutoStack-GO-Svelte',
    stack: ['Go', 'Svelte', 'Docker'],
    bullets: [
      'Go backend with a Svelte console for provisioning and wiring an application stack.',
      'Included because 28 people starred it, which is worth more than my own opinion of it.',
    ],
    scope: 'Earlier work, not part of the control-plane thesis. Listed for completeness.',
    featured: false,
  },
];

export const FEATURED = PROJECTS.filter((p) => p.featured);
export const OTHER = PROJECTS.filter((p) => !p.featured);
export const TOTAL_STARS = PROJECTS.reduce((n, p) => n + p.stars, 0);

export const PLANE_COLOR: Record<Plane, string> = {
  authorize: 'var(--authorize)',
  act: 'var(--act)',
  evaluate: 'var(--evaluate)',
  attribute: 'var(--attribute)',
};
