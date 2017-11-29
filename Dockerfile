FROM node:8.6 as builder

WORKDIR /home/node/angular-seed

COPY . .

RUN chown -R node:node .
USER node

RUN npm install

FROM nginx:1.13
COPY --from=builder /home/node/angular-seed/app /var/www/dist/prod
COPY --from=voyageur_backend /static/ /var/www/dist/prod/static/
COPY ./nginx.conf /etc/nginx/conf.d/voyageur.conf
RUN rm /etc/nginx/conf.d/default.conf
