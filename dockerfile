# Use official Node.js image
FROM node:22-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies (skip postinstall)
COPY package*.json ./
RUN npm install --ignore-scripts

# Copy all project files (including prisma folder)
COPY . .

# Now manually generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "dist/index.js"]
