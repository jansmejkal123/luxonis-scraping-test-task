##### DEPENDENCIES

FROM --platform=linux/amd64 node:16-alpine3.17 AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat
WORKDIR /app

COPY cron/prisma ./prisma
COPY browser/package.json browser/package-lock.json ./
COPY browser/next.config.mjs ./
COPY browser/tsconfig.json ./
COPY browser/tailwind.config.ts ./
COPY browser/postcss.config.cjs ./

RUN npm ci

##### BUILDER

FROM --platform=linux/amd64 node:16-alpine3.17 AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY browser/ .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN echo ls

RUN \
  if [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

##### RUNNER

FROM --platform=linux/amd64 node:16-alpine3.17 AS runner
WORKDIR /app

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next ./

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
