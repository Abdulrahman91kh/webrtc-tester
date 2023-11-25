
FROM node:18-alpine as server-build

# Set the working directory in the container
WORKDIR /app/server

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN yarn run build

# Command to run the application
CMD ["yarn", "start"]
