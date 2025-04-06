FROM node:22
WORKDIR /src
COPY package*.json ./
RUN npm install 
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "dev"]