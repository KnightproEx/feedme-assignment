FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build

FROM base AS final
WORKDIR /app
COPY --from=build /app/build/index.js index.js
CMD ["node", "index.js"]

EXPOSE 3000
