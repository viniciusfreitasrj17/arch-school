FROM nginx

WORKDIR /app
COPY ./nginx.conf /app/nginx.conf

CMD ["/bin/sh" , "-c" , "envsubst < /app/nginx.conf > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
