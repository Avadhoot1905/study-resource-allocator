FROM node:22

WORKDIR /src

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy prisma files and generate client
COPY prisma ./prisma
COPY .env .env
RUN npx prisma generate

# Copy rest of the source code
COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "dev"]
