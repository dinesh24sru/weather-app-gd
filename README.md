
# Weather App Server - Enterprise Scaffold

This repository is a scaffold of a production-ready, TypeScript-based Express server for a weather API.
Features included:
- Layered architecture (domain / infra / presentation / core)
- Redis caching (ioredis)
- Resilient HTTP client with timeout + retries
- Structured logging (pino)
- Prometheus metrics
- Input validation (Zod / Joi example)
- Dockerfile + docker-compose
- Jest + Supertest tests
- GitHub Actions CI workflow (example)

Files are scaffolded to showcase enterprise-level patterns. Replace environment variables in `.env.example` before running.
