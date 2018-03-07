# stage 1 we need an image with the build tools (yarn)
FROM node:9.4-alpine AS build-env

# set the working directory in the image as "moltin"
WORKDIR /moltin

# copy in our package.json to restore our dependencies
COPY ./package.json .

# install the app dependencies
RUN yarn install

# install forever
RUN yarn --global add forever

# copy the rest of our code into the image
COPY . .

# run the app
CMD ["yarn", "start-docker"]

