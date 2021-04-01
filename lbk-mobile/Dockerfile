FROM nginx:stable-alpine

COPY ./build /usr/share/nginx/html/lbk-mobile/
COPY ./default.conf /etc/nginx/conf.d/

EXPOSE 7103
# docker build -t lbk-mobile:latest .