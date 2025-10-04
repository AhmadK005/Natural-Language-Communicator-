# 🗣 Natural Language Communicator (NNC)

A full-stack LLM communicator deployed on AWS.  
**Stack:** FastAPI · PostgreSQL (pgvector) · Redis · Docker · Terraform (EC2, IAM, VPC) · GitHub Actions (CI/CD)

![Build](https://github.com/AhmadK005/Natural-Language-Communicator/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-green)

> ✨ Purpose: make it easy to interact with LLMs over a cloud-hosted, scalable backend with caching and infrastructure-as-code.

---

## 📐 Architecture

```mermaid
flowchart LR
  U[User] --> FE[Frontend (React JS)]
  FE --> API[FastAPI Backend]
  API <--> REDIS[(Redis Cache)]
  API <--> PG[(PostgreSQL and pgvector)]

  subgraph AWS
    API --- LB[ALB or NLB]
    LB --- EC2[EC2 Instance(s)]
    EC2 -.docker.-> API
  end

  subgraph IaC
    TF[Terraform] -->|provisions| EC2
    TF -->|provisions| PG
    TF -->|provisions| VPC(VPC Networking)
    TF -->|IAM roles| API
  end

```

---
## 🚀 Quickstart (Local Dev)

```bash
# 1) Clone
git clone https://github.com/AhmadK005/Natural-Language-Communicator.git
cd Natural-Language-Communicator

# 2) Setup environment
cp .env.example .env   # fill in secrets

# 3) Run with Docker
docker compose up --build
```

---
## 🗂 Repo Layout

.
├─ backend/           # FastAPI app (routes, services, models)
├─ infra/             # Terraform (EC2, IAM, VPC, RDS)
├─ frontend/          # React chat UI (optional)
├─ docker/            # Dockerfiles / compose configs
├─ .github/workflows/ # CI/CD pipelines
├─ docs/              # diagrams, benchmarks, screenshots
└─ README.md





