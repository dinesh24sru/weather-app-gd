# Weather API Server

## Overview

This is an Weather API server built using Node.js, TypeScript, and Express. The API provides short-term weather forecasts for given latitude and longitude coordinates, including a characterization of temperature as `cold`, `moderate`, or `hot`.

It integrates caching via Redis, structured error handling, type-safe DTOs using Zod, metrics collection via Prometheus, and Swagger/OpenAPI documentation.

---

## Features & Concepts Implemented

### Core Concepts

* **TypeScript + OOP**: Classes like `WeatherService`, `Coordinates`, and `Result` ensure modular, type-safe design.
* **DTOs with Zod**: Input validation and type inference.
* **Result pattern**: Standardized error/success responses.
* **Structured error handling**: Custom error classes and global error management.
* **Redis caching**: To cache weather data for 5 minutes to reduce API calls.
* **Prometheus metrics**: Default and custom metrics collection.
* **Swagger / OpenAPI**: Interactive API documentation.
* **Logging**: Centralized logging using a logger abstraction.
* **Rate Limiting**: Using rate limiting to avoid abusing the API.
* **Observability**: Correlate request IDs across services, structured logging.
* **API versioning**: Currently using v1 version `/v2/weather` for future improvements without breaking clients.
  

### System Design Concepts

* **Separation of concerns**: Controller, Service, Domain, and Infrastructure layers.
* **Idempotent request handling**: Request ID middleware for tracing.
* **Cache-first architecture**: Redis cache used before calling external APIs.
* **External API integration**: NWS API client wrapped in a service layer.
* **Scalable and testable design**: Layered architecture allows unit, integration, and E2E testing.

---

## API Endpoints

### GET /api/v1/weather

Retrieve the short forecast for today based on coordinates.

**Query Parameters:**

* `lat` (number, required): Latitude (-90 to 90)
* `lon` (number, required): Longitude (-180 to 180)

**Response:**

```json
{
  "summary": "Partly Cloudy",
  "temperature": 68,
  "characterization": "moderate"
}
```

**Error Responses:**

* 400: Invalid query parameters
* 502: External API error
* 500: Internal server error

**Swagger UI:** `http://localhost:3000/api-docs`

---

## Running the Server

### Prerequisites

* Node.js >= 18
* npm or yarn
* Docker (for Redis)

### Steps

1. **Clone the repository:**

```bash
git clone <repo-url>
cd weather-app-server
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run Redis via Docker:**

```bash
docker run --name weather-redis -p 6379:6379 -d redis
```

4. **Create `.env` file:**

```env
PORT=3000
REDIS_URL=redis://localhost:6379
```

5. **Run the server:**

```bash
npm run dev
```

6. **Access API:**

```
http://localhost:3000/v1/weather?lat=37.7749&lon=-122.4194
```

7. **Run Linter:**

```bash
npm run lint
```

8. **Run Tests & Coverage:**

```bash
npm run test:coverage
```

---

## Future Improvements & Cloud Integration

### Deployment

* Containerize the app using Docker and deploy to AWS ECS, GCP Cloud Run, or Azure App Service.
* Use Kubernetes for orchestration if scaling is needed.
* Integrate CI/CD pipelines for automated testing, linting, and deployment.

### Advanced System Design Concepts

* **Circuit breaker pattern** when calling NWS API to handle failures gracefully.
* **Monitoring & Alerting**: Prometheus + Grafana dashboards, alerting on failed forecasts or high latency.
* **Authentication & Authorization**: JWT or OAuth 2.0 for user-based access control.
* **Cloud storage caching**: Optionally store forecasts in S3/GCS for historical queries.
* **Type-safe OpenAPI generation** from Zod DTOs to ensure contract compliance.

---

## Tech Stack

* Node.js, TypeScript
* Express.js
* Redis
* Jest for unit and integration testing
* Swagger/OpenAPI for documentation
* Prometheus for metrics
* Zod for DTO validation
* ESLint + Prettier for code quality

---

## Author

* Dinesh Ganesan

---
