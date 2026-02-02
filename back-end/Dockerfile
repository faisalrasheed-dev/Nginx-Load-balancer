FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci  
COPY . .

FROM node:22-slim
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app ./
ENV NODE_ENV=production
RUN npm prune --production || true
RUN chown -R node:node /app
USER node
EXPOSE 3000
CMD ["node","server.js"]