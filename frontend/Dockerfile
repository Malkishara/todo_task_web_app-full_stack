FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache xvfb
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]