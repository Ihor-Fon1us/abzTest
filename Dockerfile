FROM node:14.20.0
WORKDIR /usr/src/server/
COPY . ./
RUN npm ci
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh
EXPOSE 8080
CMD [ "npm", "run", "start" ]