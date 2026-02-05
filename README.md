Dockerized Nginx Load Balancer with CI/CD on AWS

Overview

This project implements a production-style load-balanced backend system using Docker, Nginx, AWS EC2, and GitHub Actions CI/CD.

Multiple backend containers run simultaneously, and an Nginx load balancer distributes traffic between them using a round-robin strategy. The system is deployed on AWS EC2, secured with HTTPS using Let’s Encrypt (Certbot), and updated automatically via an image-based CI/CD pipeline.

The goal of this project was to understand real-world DevOps deployment workflows, not just container basics.


Architecture

Client
  ↓
DuckDNS (Domain → EC2 Elastic IP)
  ↓
Host Nginx (HTTPS termination)
  ↓
Dockerized Nginx Load Balancer
  ↓
Multiple Backend Containers (Round Robin)


Technology Stack

Backend: Node.js (Express)  
Containerization: Docker (multi-stage builds)  
Load Balancer: Nginx (Dockerized)  
Orchestration: Docker Compose  
Cloud Platform: AWS EC2  
CI/CD: GitHub Actions  
Container Registry: Docker Hub  
DNS: DuckDNS  
SSL/TLS: Let’s Encrypt (Certbot)


Key Features

- Round-robin load balancing using Nginx  
- Multiple backend containers running in parallel  
- Multi-stage Docker builds for smaller, secure images  
- Non-root user inside containers for better security  
- Health checks at Docker and application level  
- Image-based CI/CD deployment (no source code on server)  
- Automatic HTTPS with enforced HTTP → HTTPS redirect  
- Zero manual deployment after initial setup  


Project Structure

loadbalancer/
├── back-end/
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
├── nginx/
│   └── nginx.conf
├── docker-compose.yml
├── deploy.sh
└── .github/workflows/
    ├── ci.yml
    └── cd.yml


Docker & Docker Compose

- Two backend containers are created from the same Docker image  
- One Nginx container acts as the internal load balancer  
- Services communicate via a custom Docker bridge network  
- Health checks ensure traffic is sent only to healthy containers  


CI/CD Workflow

Continuous Integration (CI)

Triggered on every push to the main branch:

1. Checkout source code  
2. Build Docker image using multi-stage Dockerfile  
3. Tag image using commit hash  
4. Push image to Docker Hub  


Continuous Deployment (CD)

Triggered only after CI completes successfully:

1. Connects to AWS EC2 via SSH  
2. Pulls the new Docker image from Docker Hub  
3. Recreates containers using Docker Compose  
4. Old containers are replaced automatically  

This ensures traceable and immutable deployments.


HTTPS & Domain Configuration

- DuckDNS maps the domain to the EC2 Elastic IP  
- Certbot automatically:
  - Issues SSL certificates  
  - Configures Nginx for HTTPS  
  - Enforces HTTP → HTTPS redirection  
  - Handles certificate auto-renewal  

No manual SSL configuration is required.


Health Check Example

Endpoint  
GET /health  

Response  
{
  "status": "ok",
  "container": "backend-1"
}


What This Project Demonstrates

- Real-world Docker networking and orchestration  
- Nginx reverse proxy and load balancing concepts  
- Image-based CI/CD deployment strategy  
- Secure deployments using non-root containers and HTTPS  
- Practical debugging of production-style issues  


Why This Is Not a Toy Project

This project reflects real DevOps practices, including:

- Cloud deployment on AWS  
- Automated CI/CD pipelines  
- SSL-secured production traffic  
- Image immutability and traceability  
- Health-aware service routing  
- Zero manual intervention during deployments  


Author

Faisal Rasheed  
Aspiring DevOps / Cloud Engineer  
GitHub: https://github.com/faisalrasheed-dev


Status

✔ Project completed  
✔ CI/CD working end-to-end  
✔ HTTPS enabled  
✔ Production-style deployment
