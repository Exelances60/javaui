# 1. Aşama: Node.js ile Build Etme
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# 2. Aşama: Nginx ile Servis Etme
FROM nginx:alpine

# Nginx config ekleme
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Statik dosyaları kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
