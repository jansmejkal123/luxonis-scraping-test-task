FROM node:slim as base
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Add package file
COPY package*.json ./

# Install deps
RUN npm ci

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY prisma ./prisma

RUN npm run build
RUN npx prisma generate
# Expose main port
EXPOSE 3000

CMD ["npm", "run", "start"]
