FROM node:12.2.0

EXPOSE 4200

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update && apt-get install -yq google-chrome-stable

# set working dir
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install \
    && npm install -g @angular/cli@7.3.9

# add app
COPY . /app
RUN chmod +x /app/run.sh

# start app
ENTRYPOINT "/app/run.sh"
