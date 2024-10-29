# Start from a lightweight Node.js image
FROM node:alpine

# Set working directory
WORKDIR /minet

# Copy package.json and package-lock.json separately
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port (default for React is 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

# FROM node:alpine
# WORKDIR minet
# COPY package.json  ./
# COPY . ./
# RUN npm install
# CMD ["npm","start"]
# FROM nginx:alpine
# # WORKDIR /frontend 

# COPY nginx.conf ./etc/nginx/conf.d/default.conf
# RUN rm -rf /usr/share/nginx/html/*
# COPY build /usr/share/nginx/html/
# EXPOSE 80

# ENTRYPOINT [ "nginx",A"-g","daemon off;" ]