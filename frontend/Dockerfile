# Frontend Dockerfile

# Step 1: Use official Node.js image for building React app
FROM node:22-alpine as build

# Step 2: Set the working directory for the build stage
WORKDIR /usr/src/app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the React app source code
COPY . .

# Step 5: Build the React app for production
RUN npm run build

# Step 8: Expose port 80 for the frontend
EXPOSE 3000

# Step 9: Start nginx server to serve the React app
CMD ["npm", "start"]
