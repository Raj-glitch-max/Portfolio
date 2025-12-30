// Mapping of skills to specific terminal commands for the explosion effect

export const SKILL_COMMANDS: Record<string, string[]> = {
    // Cloud & Infrastructure
    'AWS': [
        'aws s3 ls',
        'aws ec2 run-instances --image-id ami-123',
        'aws lambda invoke --function-name my-func',
        'aws iam create-user --user-name devops',
        'aws eks update-kubeconfig --name cluster',
        'aws cloudfront create-distribution',
        'aws rds create-db-instance',
        'aws dynamodb create-table',
        'aws route53 list-hosted-zones',
        'aws cloudwatch put-metric-data'
    ],
    'Terraform': [
        'terraform init',
        'terraform plan -out=tfplan',
        'terraform apply -auto-approve',
        'terraform destroy',
        'terraform validate',
        'terraform fmt -recursive',
        'terraform state list',
        'terraform import aws_s3_bucket.main bucket-name',
        'terraform output',
        'terraform workspace new dev'
    ],
    'Linux': [
        'sudo systemctl restart nginx',
        'chmod +x script.sh',
        'grep -r "error" /var/log/syslog',
        'top -b -n 1',
        'netstat -tulpn',
        'ssh-keygen -t rsa',
        'tar -czvf archive.tar.gz /data',
        'crontab -e',
        'df -h',
        'ps aux | grep node'
    ],
    'Networking': [
        'ping 8.8.8.8',
        'traceroute google.com',
        'curl -v https://api.example.com',
        'nslookup domain.com',
        'ip addr show',
        'tcpdump -i eth0 port 80',
        'nmap -sV localhost',
        'telnet localhost 5432',
        'dig +short A google.com',
        'route -n'
    ],

    // DevOps & CI/CD
    'Docker': [
        'docker build -t app:latest .',
        'docker run -d -p 8080:80 app',
        'docker ps -a',
        'docker-compose up -d',
        'docker logs -f container_id',
        'docker exec -it container_id sh',
        'docker pull node:alpine',
        'docker network create my-net',
        'docker volume prune',
        'docker image ls'
    ],
    'Kubernetes': [
        'kubectl get pods -A',
        'kubectl apply -f deployment.yaml',
        'kubectl logs -f deployment/api',
        'kubectl describe pod my-pod',
        'kubectl port-forward svc/api 8080:80',
        'kubectl scale deployment/api --replicas=3',
        'kubectl exec -it my-pod -- /bin/bash',
        'kubectl get nodes -o wide',
        'kubectl create secret generic db-pass',
        'helm install my-release ./chart'
    ],
    'Helm': [
        'helm install my-app ./chart',
        'helm upgrade my-app ./chart',
        'helm list --all-namespaces',
        'helm repo add stable https://charts.helm.sh/stable',
        'helm dependency update',
        'helm template .',
        'helm rollback my-app 1',
        'helm create my-chart',
        'helm lint ./chart',
        'helm package ./chart'
    ],
    'GitHub Actions': [
        'uses: actions/checkout@v3',
        'run: npm ci',
        'run: npm test',
        'uses: docker/build-push-action@v4',
        'on: push: branches: [main]',
        'env: NODE_ENV: production',
        'needs: [build, test]',
        'runs-on: ubuntu-latest',
        'strategy: matrix: node: [16, 18]',
        'if: github.ref == "refs/heads/main"'
    ],
    'Jenkins': [
        'pipeline { agent any ... }',
        'sh "npm install"',
        'stage("Build") { ... }',
        'archiveArtifacts artifacts: "dist/**"',
        'junit "test-results.xml"',
        'git branch: "main", url: "repo.git"',
        'docker.image("node").inside { ... }',
        'input message: "Deploy to Prod?"',
        'post { always { cleanWs() } }',
        'triggers { cron("H 4 * * *") }'
    ],

    // Databases
    'PostgreSQL': [
        'SELECT * FROM users;',
        'CREATE TABLE orders (id SERIAL PRIMARY KEY);',
        'INSERT INTO logs VALUES (NOW(), "error");',
        'pg_dump dbname > dump.sql',
        'psql -U postgres -d mydb',
        'ALTER TABLE users ADD COLUMN age INT;',
        'CREATE INDEX idx_email ON users(email);',
        'VACUUM FULL;',
        'EXPLAIN ANALYZE SELECT * FROM large_table;',
        '\\dt'
    ],
    'MongoDB': [
        'db.users.find({ active: true })',
        'db.orders.aggregate([ { $match: ... } ])',
        'db.products.insertOne({ name: "item" })',
        'db.stats()',
        'show dbs',
        'use mydatabase',
        'db.collection.createIndex({ email: 1 })',
        'db.users.updateMany({}, { $set: ... })',
        'mongodump --db mydb',
        'db.currentOp()'
    ],
    'Redis': [
        'SET user:1 "Raj"',
        'GET user:1',
        'HSET config timeout 100',
        'LPUSH queue "job1"',
        'SUBSCRIBE channel',
        'FLUSHALL',
        'KEYS user:*',
        'EXPIRE session:123 3600',
        'INFO memory',
        'MONITOR'
    ],

    // Languages
    'Python': [
        'pip install requests',
        'python3 main.py',
        'import pandas as pd',
        'def process_data(df):',
        'pytest tests/',
        'venv/bin/activate',
        'pip freeze > requirements.txt',
        'flask run',
        'uvicorn main:app --reload',
        'print("Hello World")'
    ],
    'Bash': [
        '#!/bin/bash',
        'echo "Starting script..."',
        'if [ -f "$FILE" ]; then',
        'for i in {1..5}; do',
        'awk \'{print $1}\' file.txt',
        'sed -i "s/foo/bar/g" config.conf',
        'find . -name "*.log" -delete',
        'xargs -I {} echo {}',
        'curl -sL https://git.io/vQhTU | bash',
        'history | grep docker'
    ],
    'Java': [
        'javac Main.java',
        'java -jar app.jar',
        'mvn clean install',
        'gradle build',
        'System.out.println("Debug");',
        'public static void main(String[] args)',
        'import java.util.*;',
        'List<String> list = new ArrayList<>();',
        'throw new RuntimeException("Error");',
        '@SpringBootApplication'
    ],
    'Git': [
        'git commit -m "feat: initial commit"',
        'git push origin main',
        'git checkout -b feature/new-ui',
        'git merge develop',
        'git rebase -i HEAD~3',
        'git stash pop',
        'git log --oneline --graph',
        'git remote add origin url',
        'git clone https://github.com/repo.git',
        'git diff --stat'
    ],
    'YAML': [
        'version: "3.8"',
        'services:',
        '  app:',
        '    image: node:18',
        '    ports: ["80:80"]',
        '    volumes: ["./:/app"]',
        'kind: Deployment',
        'metadata:',
        '  name: my-app',
        'spec: replicas: 3'
    ]
};

export const DEFAULT_COMMANDS = [
    'echo "Hello World"',
    'ls -la',
    'cd /home/user',
    'mkdir projects',
    'touch README.md',
    'cat config.json',
    'ping localhost',
    'whoami',
    'date',
    'uptime'
];
