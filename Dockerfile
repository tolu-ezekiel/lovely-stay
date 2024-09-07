# Step 1: Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# Step 2: Final Stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/docs ./dist/docs

COPY --from=builder /app/package*.json ./

EXPOSE ${PORT}

CMD npx prisma migrate deploy && npm run start
