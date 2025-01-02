FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# CMD sh -c "npx prisma generate && npm run build && npm run start"