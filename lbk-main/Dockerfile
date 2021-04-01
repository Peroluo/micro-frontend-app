FROM nginx:stable-alpine

COPY ./build /usr/share/nginx/html/
COPY ./default.conf /etc/nginx/conf.d/

EXPOSE 7101
# docker build -t lbk-main:latest .