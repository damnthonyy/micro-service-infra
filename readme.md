# Microservices Infrastructure Boilerplate

> Complete microservices architecture with CI/CD pipelines and API quality automation.

## 📋 Description

This project is a microservices infrastructure boilerplate that provides a solid foundation for developing distributed applications. It includes a NestJS backend, PostgreSQL database, Docker orchestration, and automation tools for API quality and documentation.

## 🏗️ Architecture

The project is organized into microservices with the following components:

- **Backend** (`backend/`) : NestJS microservice with TypeORM for database management
- **Database** : PostgreSQL 15 in a Docker container
- **Orchestration** : Docker Compose to manage all services
- **API Documentation** : Automatic generation of OpenAPI 3.0 specifications
- **Quality** : Automatic linting with Spectral to validate OpenAPI specifications
- **CI/CD** : GitHub Actions pipeline for automatic validation

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd microservices-infra
   ```

2. **Create the `.env` file**
   ```bash
   cp .env.example .env
   # Edit the .env file with your configurations
   ```

3. **Start services with Docker Compose**
   ```bash
   docker compose up --build
   ```

4. **Access the services**
   - API Backend : http://localhost:3000
   - Swagger UI : http://localhost:3000/docs
   - PostgreSQL : localhost:5432

## 📁 Project Structure

```
microservices-infra/
├── backend/                 # NestJS microservice
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml       # Service orchestration
├── openapi.yaml            # Automatically generated OpenAPI specification
├── .spectral.yaml          # Linting rules for OpenAPI
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline
└── readme.md
```

## 🔧 Features

### Automatic OpenAPI Generation

The backend automatically generates the OpenAPI 3.0 specification on startup. The `openapi.yaml` file is created at the project root and is synchronized via a Docker volume.

### Validation with Spectral

OpenAPI specifications are automatically validated with [Spectral](https://stoplight.io/open-source/spectral) according to the rules defined in `.spectral.yaml`:

- Kebab-case format verification for paths
- Description presence validation
- Tags and servers verification

### CI/CD Pipeline

The GitHub Actions pipeline (`ci.yml`) automatically performs:

1. Dependency installation with npm cache
2. PostgreSQL startup
3. Build and OpenAPI specification generation
4. Linting with Spectral
5. **LLM-powered feedback generation** (for PRs to main)
6. Automatic PR comments with detailed explanations
7. Linting report upload

#### Configuration requise pour le feedback LLM

Pour activer le feedback LLM dans les PRs, vous devez configurer le secret GitHub suivant :

1. Allez dans **Settings** → **Secrets and variables** → **Actions** de votre repository GitHub
2. Cliquez sur **New repository secret**
3. Ajoutez un secret nommé `OPENAI_API_KEY` avec votre clé API OpenAI
4. Le workflow utilisera automatiquement ce secret pour générer des explications détaillées des erreurs Spectral

**Note :** Le feedback LLM ne s'affiche que sur les Pull Requests vers la branche `main`.

#### Optimisations du rapport

- **Filtrage par sévérité** : Seules les erreurs (severity 0) et avertissements (severity 1) sont traités. Les informations (info) et suggestions (hint) sont exclues pour se concentrer sur les problèmes importants.
- **Limitation de taille** : Les commentaires PR sont limités à 3000 caractères pour respecter les limites GitHub. Le rapport complet est disponible dans les artefacts.
- **Artefacts** : Tous les rapports (JSON complet, markdown complet et tronqué) sont stockés en artefacts GitHub avec une rétention de 30 jours pour analyse ultérieure.

### Swagger Documentation

Interactive API documentation is accessible via Swagger UI at `/docs` once the backend is started.

## 🛠️ Technologies Used

- **Backend** : NestJS, TypeScript, TypeORM
- **Database** : PostgreSQL 15
- **Containerization** : Docker, Docker Compose
- **API Documentation** : Swagger/OpenAPI 3.0
- **Linting** : Spectral
- **CI/CD** : GitHub Actions
- **Node.js** : Version 18

## 📝 Environment Variables

The project uses a `.env` file for configuration. Main variables:

```env
# PostgreSQL
POSTGRES_USER=app
POSTGRES_PASSWORD=app
POSTGRES_DB=appdb
POSTGRES_PORT=5432

# Backend
API_PORT=3000
DB_HOST=db-microservice-infra-boilerplate
DB_PORT=5432
DB_USER=app
DB_PASS=app
DB_NAME=appdb
```

## 🔍 Useful Commands

```bash
# Start all services
docker compose up

# Start in background
docker compose up -d

# Rebuild images
docker compose up --build

# Stop services
docker compose down

# View logs
docker compose logs -f backend-microservice-infra-boilerplate

# Lint OpenAPI specification locally
npx @stoplight/spectral-cli lint openapi.yaml

# Generate report JSON
npx @stoplight/spectral-cli lint openapi.yaml -f json -o spectral-report.json

# Generate LLM feedback (requires OPENAI_API_KEY in .env)
npm run lint:llm

# Format LLM report for PR comments
node tools/formatReport.js
```

## 🧪 Tests

```bash
# Unit tests
cd backend
npm run test

# E2E tests
npm run test:e2e
```

## 📚 Documentation

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Spectral Documentation](https://meta.stoplight.io/docs/spectral/)

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is an open source boilerplate. See the LICENSE file for more details.

## 👥 Authors

- ### Antoine Mahassadi

---
