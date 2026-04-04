# ---------- build ----------
FROM node:20-bookworm AS builder
WORKDIR /app

RUN npm config set registry https://package-mirror.liara.ir/repository/npm/

COPY package*.json ./
RUN npm ci

COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=production

RUN npm run build

# ---------- runtime ----------
FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# فقط فایل‌های لازم برای اجرای standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
