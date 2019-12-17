FROM node:10
WORKDIR /app
COPY . /app
RUN npm install --save /app
RUN npm audit fix
COPY . /app
ENV PORT 8080
EXPOSE 8080
CMD node app_web.js