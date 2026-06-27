# DevOps Prueba 2

**Authors:** Ferran Rojas & Maximo Sarno

NestJS REST API for managing people with preferences, backed by PostgreSQL and deployed to Azure via GitHub Actions CI/CD.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 24, TypeScript |
| Framework | NestJS 11 |
| Database | PostgreSQL 15 (Alpine) |
| ORM | TypeORM |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions → Azure Web Apps |
| DB Viewer | pgAdmin 4 |

## Architecture

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client   │────▶│  NestJS  │────▶│PostgreSQL│
│  :3000    │     │  :3000   │     │  :5432   │
└──────────┘     └──────────┘     └──────────┘
                        │
                        ▼
                   ┌──────────┐
                   │  pgAdmin │
                   │  :5050   │
                   └──────────┘
```

```
src/persona/
├── entities/persona.entity.ts   # TypeORM entity
├── persona.controller.ts        # REST routes (/personas)
├── persona.service.ts           # Business logic + DB access
├── persona.module.ts            # Feature module
├── persona.interface.ts         # TypeScript interfaces
├── personas.stubs.ts            # Seed data
├── persona.controller.spec.ts   # Controller tests
└── persona.service.spec.ts      # Service tests
```

## Prerequisites

- Docker & Docker Compose
- Node.js 24 (for local dev without Docker)

## Quick Start (Docker Compose)

```bash
# 1. Clone and enter the project
git clone https://github.com/Reistoge/DevOps-P2.git
cd DevOps-P2

# 2. Create environment file
cat > .env << EOF
DB_USER=devops_user
DB_PASSWORD=secret_password_123
DB_NAME=devops_db
PGADMIN_EMAIL=admin@devops.com
PGADMIN_PASSWORD=admin_secret
EOF

# 3. Start everything
docker compose up --build -d

# 4. Verify
curl http://localhost:3000/personas
```

The stack will be available at:

| Service | URL |
|---|---|
| API | http://localhost:3000 |
| pgAdmin | http://localhost:5050 |

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | NestJS server port |
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_USER` | `devops_user` | PostgreSQL user |
| `DB_PASSWORD` | `secret_password_123` | PostgreSQL password |
| `DB_NAME` | `devops_db` | PostgreSQL database name |
| `PGADMIN_EMAIL` | — | pgAdmin login email |
| `PGADMIN_PASSWORD` | — | pgAdmin login password |

## API Endpoints

### `GET /personas`

Returns all registered people with their preferences.

```bash
curl http://localhost:3000/personas
```

Response:
```json
[
  {
    "nombre": "Ferran Rojas",
    "rut": "11111111-1",
    "fechaNacimiento": "1990-01-01",
    "ciudad": "Santiago",
    "preferences": {
      "food": ["Pizza", "Sushi"],
      "books": ["1984", "Dune"],
      "games": ["Chess", "Zelda"]
    }
  }
]
```

### `POST /personas`

Creates a new person with preferences.

```bash
curl -X POST http://localhost:3000/personas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana Perez",
    "rut": "33333333-3",
    "fechaNacimiento": "1995-10-20",
    "ciudad": "Valparaiso",
    "preferences": {
      "food": ["Pasta", "Ice Cream"],
      "books": ["The Hobbit"],
      "games": ["Mario Kart"]
    }
  }'
```

### `DELETE /personas/:rut`

Deletes a person by RUT.

```bash
curl -X DELETE http://localhost:3000/personas/11111111-1
# Returns: true
```

## Development (without Docker)

```bash
cd backend

# Install dependencies
npm install

# Start PostgreSQL (or use docker only for DB)
docker run -d --name devops-pg \
  -e POSTGRES_USER=devops_user \
  -e POSTGRES_PASSWORD=secret_password_123 \
  -e POSTGRES_DB=devops_db \
  -p 5432:5432 \
  postgres:15-alpine

# Start the app in watch mode
npm run start:dev
```

## Running Tests

```bash
cd backend
npm test
```

## CI/CD Pipeline

The `.github/workflows/main_devopsprueba2.yml` workflow:

1. **Trigger:** Push or PR to `main`
2. **Build stage:** Install deps → `npm run build` → `npm test` → upload artifact
3. **Deploy stage:** Download artifact → Azure login → Deploy to Azure Web App

## Project Structure

```
.
├── .github/workflows/          # GitHub Actions CI/CD
├── backend/
│   ├── src/
│   │   ├── persona/            # Feature module
│   │   │   ├── entities/       # TypeORM entities
│   │   │   ├── persona.controller.ts
│   │   │   ├── persona.service.ts
│   │   │   ├── persona.module.ts
│   │   │   ├── persona.interface.ts
│   │   │   ├── personas.stubs.ts
│   │   │   ├── persona.controller.spec.ts
│   │   │   └── persona.service.spec.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test/                   # E2E tests
│   ├── Dockerfile
│   ├── .env                    # Local env vars (gitignored)
│   └── package.json
├── docker-compose.yml
├── .env                        # Compose env vars (gitignored)
├── .gitignore
└── README.md
```

## Branch Strategy

This project follows **Trunk-Based Development** with short-lived feature branches:

- Branches are based on `main` and merged via squash merge
- Each branch represents a single atomic change
- CI runs on every PR before merge
- Long-running work is hidden behind feature flags (not branches)
