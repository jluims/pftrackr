FROM node:20-alpine AS frontend

WORKDIR /app/frontend

COPY frontend/package.json frontend/yarn.lock .

RUN yarn install --prod=false && yarn cache clean
RUN ls

COPY frontend .

RUN yarn build

FROM node:20-alpine AS backend
WORKDIR /app/backend

COPY backend/package.json backend/yarn.lock .

RUN yarn install --prod=false && yarn cache clean

COPY backend .

COPY --from=frontend /app/frontend/dist /app/backend/dist/web

RUN yarn build

# Stage 3: Production image
FROM node:20-alpine

# Set working directory
WORKDIR /app
ENV NODE_ENV=production

COPY --from=backend /app/backend/dist ./dist

COPY backend/package.json backend/yarn.lock .

RUN yarn install --prod=true && yarn cache clean

EXPOSE 4000

CMD ["node", "dist/index.js"]