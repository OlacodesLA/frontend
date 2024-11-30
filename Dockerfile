FROM node:20-slim AS base

FROM base AS builder

# Setup pnpm environment
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json  ./
RUN pnpm install && pnpm add @babel/runtime
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

ARG TABLE_NAME
ARG RECAPTCHA_SECRET
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG NEXT_PUBLIC_PLANNER_ID
ARG MAILING_LIST_ENDPOINT
ARG MAILING_LIST_PASSWORD

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

RUN pnpm run build


### Production image runner ###
FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BASE_URL_STAGING = https://uzel-api.up.railway.app
ENV NEXT_PUBLIC_NODE_ENV = development
ENV NEXT_PUBLIC_STORE_KEY = nhd7sdb78jhu8jh9783gh783b8

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

ENV PORT=8080

CMD node server.js