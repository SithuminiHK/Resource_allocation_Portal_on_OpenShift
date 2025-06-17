# Start from Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependencies first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Now copy the rest of the files
COPY . .

# Then build
RUN npm run build

# Expose if needed
EXPOSE 5173

# Optional: specify CMD or ENTRYPOINT
CMD ["npm", "run", "dev"]
