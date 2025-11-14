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
5. **Formatage du rapport en Markdown** pour une meilleure visibilité
6. **Commentaires automatiques sur les PRs** avec le rapport formaté
7. Upload des rapports en artefacts

#### Rapport Spectral formaté

Le CI génère automatiquement un rapport Spectral formaté en Markdown qui est :
- **Affiché dans les commentaires PR** (limité à 3000 caractères)
- **Filtré par sévérité** : Seules les erreurs (severity 0) et avertissements (severity 1) sont affichées
- **Stocké en artefacts** : Rapport complet disponible pour analyse (rétention 30 jours)

#### Feedback LLM optionnel

Pour obtenir des explications détaillées et des corrections proposées par IA, utilisez le workflow manuel `Generate LLM Feedback` :

1. **Via GitHub Actions** :
   - Allez dans l'onglet **Actions**
   - Sélectionnez le workflow **Generate LLM Feedback**
   - Cliquez sur **Run workflow**
   - Optionnellement, fournissez un numéro de PR pour commenter automatiquement

2. **Localement** :
   ```bash
   # Générer le rapport Spectral
   npm run lint:openapi
   
   # Générer le feedback LLM (nécessite OPENAI_API_KEY dans .env)
   npm run lint:llm
   
   # Formater le rapport
   npm run format:spectral
   ```

**Configuration requise** : Ajoutez `OPENAI_API_KEY` dans vos secrets GitHub (Settings → Secrets and variables → Actions) ou dans votre fichier `.env` pour usage local.

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

# Format Spectral report to Markdown (for better visibility)
npm run format:spectral

# Generate LLM feedback (optional, requires OPENAI_API_KEY in .env)
npm run lint:llm
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
