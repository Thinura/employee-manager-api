FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
# For development use only
CMD [ "npm", "run", "start" ]
###
# For production use only
#CMD [ "npm", "run", "start:prod" ]
