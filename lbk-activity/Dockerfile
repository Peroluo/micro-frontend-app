FROM nginx:stable-alpine

COPY ./build /usr/share/nginx/html/lbk-activity/
COPY ./default.conf /etc/nginx/conf.d/

EXPOSE 7102
# docker build -t lbk-activity:latest .