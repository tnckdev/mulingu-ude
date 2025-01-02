FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# CMD sh -c "npm run build && npm run preview"