# ---------- build ----------
FROM node:20-bookworm AS builder
WORKDIR /app

RUN npm config set registry https://package-mirror.liara.ir/repository/npm/ --global

COPY package*.json ./
RUN npm ci

COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=production

RUN npm run build

# ---------- runtime ----------
FROM node:20-bookworm-slim
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# فقط یک بار package‌ها را کپی کن تا وابستگی‌های prod نصب شود
COPY package*.json ./
RUN npm ci --omit=dev

# فایل‌های build شده را کپی کن
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["npm", "start"]
