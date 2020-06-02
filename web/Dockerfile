FROM node:lts-jessie

WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0"]