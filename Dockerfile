FROM node:lts-alpine
LABEL authors="Sofia Vicedomini"

ENV WFM_BASE_PATH=/mnt/root
ENV WFM_HOME_PATH=/mnt/home
VOLUME /mnt/root
VOLUME /mnt/home

EXPOSE 3000

COPY . /app

WORKDIR /app

RUN npm install \
    && cd webapp \
    && npm install \
    && npm run build \
    && cd ..

RUN rm -rf /app/public/* && mv /app/webapp/dist/webapp/browser /app/public

RUN npm run build

ENTRYPOINT ["npm", "run", "start:prod"]