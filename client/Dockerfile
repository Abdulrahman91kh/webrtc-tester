# Use the official Node.js image as the base image
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app/client

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire client directory to the container
COPY . .

# Build the React app
RUN yarn run build

# Use Nginx as a lightweight server to serve the React app
FROM nginx

# Remove the default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/


COPY --from=build /app/client/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]