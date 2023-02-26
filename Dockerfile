FROM node:18

WORKDIR /app

COPY package*.json ./
COPY app .

RUN npm install -f

CMD ["npm", "run", "dev"]
