# Etapa 1: Construcción (Builder)
FROM node:24-alpine AS builder
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar el código fuente y compilar NestJS
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:24-alpine
WORKDIR /app

# Instalar SOLO dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar el código compilado desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Exponer el puerto (interno del contenedor)
EXPOSE 3000

# Comando de inicio (el mismo que configuramos en Azure)
CMD ["node", "dist/main.js"]