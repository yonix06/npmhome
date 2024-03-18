# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install http-server
CMD ["npx", "http-server", "-p 1234"]
EXPOSE 1234
