FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build            # Creates production build in /app/dist

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html  # Serves static files 