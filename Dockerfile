FROM node:18.1.0-alpine3.14

WORKDIR /marketingar

ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_AUTH_TOKEN $NEXT_PUBLIC_API_URL

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]