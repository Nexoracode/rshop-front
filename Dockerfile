# ---------- build ----------
FROM node:20-bookworm AS builder
WORKDIR /app

# تنظیم میرور NPM لیارا برای دسترسی آفلاین
RUN npm config set registry https://package-mirror.liara.ir/repository/npm/ --global

# نصب وابستگی‌ها
COPY package*.json ./
RUN npm ci

# کد پروژه
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=production

# مطمئن شوید که next.config.js شما output: 'standalone' نداشته باشد
RUN npm run build

# ---------- runtime ----------
FROM node:20-bookworm-slim
WORKDIR /app

# تنظیمات محیط اجرا
ENV NODE_ENV=production
ENV PORT=3000

# === نصب وابستگی‌های production در محیط runtime ===
# این تضمین می کند که همه وابستگی ها، از جمله 'next'، در runtime موجود هستند
COPY package*.json ./
RUN npm ci --omit=dev

# === کپی کردن فایل‌های بیلد ===
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# فایل next.config.js برای اجرای سرور next start نیاز است
COPY --from=builder /app/next.config.mjs ./next.config.mjs
# همچنین نیاز است که package.json را کپی کنیم تا npm start کار کند
COPY --from=builder /app/package.json ./package.json


EXPOSE 3000

# === اجرای برنامه ===
CMD ["npm", "start"]
