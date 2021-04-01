FROM nginx:stable-alpine

COPY ./default.conf /etc/nginx/conf.d/

EXPOSE 7100
# docker build -t lbk-app:latest .