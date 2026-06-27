# DevOps Prueba 2 — Investigación

**Autores:** Ferran Rojas & Maximo Sarno

## Parte 1 — Implementación

Todos los cambios relacionados con la parte 1 (API NestJS con PostgreSQL, Docker, CI/CD) se encuentran en la rama [`main`](https://github.com/Reistoge/DevOps-P2).

## Parte 2 — Persistencia con TypeORM

Los cambios correspondientes a la parte 2 de la evaluación se encuentran en la rama [`feat/typeorm-persistence`](https://github.com/Reistoge/DevOps-P2/tree/feat/typeorm-persistence).

## Parte 3 — Investigación

Esta rama (`docs/evaluation`) contiene el documento de investigación sobre herramientas y servicios DevOps en Microsoft Azure.

### Documentos

| Archivo | Descripción |
|---|---|
| [`docs/cloud-devops-investigation.md`](docs/cloud-devops-investigation.md) | Investigación completa en formato Markdown |
| [`docs/cloud-devops-investigation.pdf`](docs/cloud-devops-investigation.pdf) | Versión PDF del mismo documento |

### Contenido de la investigación

1. **Herramientas y Servicios DevOps en Microsoft Azure**
   - Azure Boards (planificación ágil)
   - Azure Repos / GitHub (control de versiones)
   - Azure Pipelines / GitHub Actions (CI/CD)
   - Azure Container Registry (almacenamiento de imágenes)
   - Azure App Service + Azure Database for PostgreSQL (despliegue)
   - Azure Monitor & Application Insights (observabilidad)

2. **Diagrama de Arquitectura Cloud DevOps**
   - Flujo completo desde el push del desarrollador hasta el despliegue en producción
   - Integración entre GitHub Actions, Azure Container Registry, App Service y PostgreSQL
   - Telemetría y monitoreo con Azure Monitor

3. **Cuadro Comparativo de Herramientas**
   - Comparación entre herramientas estándar de la industria y sus equivalentes en Azure
   - Cubre: GitHub vs Azure Repos, Jenkins vs Azure Pipelines, SonarQube vs Defender for Cloud, Docker vs ACR, Kubernetes vs AKS, Terraform vs ARM/Bicep, ELK vs Log Analytics, Prometheus vs Azure Monitor
