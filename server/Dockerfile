FROM node:13.8.0-stretch

LABEL author="ImOverlord"
LABEL version="1.0.0"

EXPOSE 3000

ENV PORT 3000
ENV PROD true

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build
CMD npm start