# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "dev"]
