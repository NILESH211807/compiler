# Use Node base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Expose port (Render expects this)
EXPOSE 5000

# Start your server
CMD ["npm", "start"]
