FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json source.config.ts ./
RUN npm ci --legacy-peer-deps

FROM base AS builder
WORKDIR /app
ARG NEXT_PUBLIC_WEB_URL=https://nylon-legs-manhua.lol
ARG NEXT_PUBLIC_PROJECT_NAME=nylon-legs-manhua
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
ARG NEXT_PUBLIC_CLARITY_PROJECT_ID=wazw1tamcn
ARG NEXT_PUBLIC_AUTH_DISABLED=true
ENV NEXT_PUBLIC_WEB_URL=$NEXT_PUBLIC_WEB_URL \
    NEXT_PUBLIC_PROJECT_NAME=$NEXT_PUBLIC_PROJECT_NAME \
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=$NEXT_PUBLIC_GOOGLE_ANALYTICS_ID \
    NEXT_PUBLIC_CLARITY_PROJECT_ID=$NEXT_PUBLIC_CLARITY_PROJECT_ID \
    NEXT_PUBLIC_AUTH_DISABLED=$NEXT_PUBLIC_AUTH_DISABLED
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ARG NEXT_PUBLIC_WEB_URL=https://nylon-legs-manhua.lol
ARG NEXT_PUBLIC_PROJECT_NAME=nylon-legs-manhua
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
ARG NEXT_PUBLIC_CLARITY_PROJECT_ID=wazw1tamcn
ARG NEXT_PUBLIC_AUTH_DISABLED=true

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p .next/build && \
    chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/build/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/build/server ./.next/build/server
COPY --from=builder --chown=nextjs:nodejs /app/.next/build/static ./.next/build/static

USER nextjs

EXPOSE 3000

ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV NEXT_PUBLIC_WEB_URL=$NEXT_PUBLIC_WEB_URL \
    NEXT_PUBLIC_PROJECT_NAME=$NEXT_PUBLIC_PROJECT_NAME \
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=$NEXT_PUBLIC_GOOGLE_ANALYTICS_ID \
    NEXT_PUBLIC_CLARITY_PROJECT_ID=$NEXT_PUBLIC_CLARITY_PROJECT_ID \
    NEXT_PUBLIC_AUTH_DISABLED=$NEXT_PUBLIC_AUTH_DISABLED

# server.js is created by next build from the standalone output
CMD ["node", "server.js"]
