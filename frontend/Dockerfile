FROM nginx:alpine
# WORKDIR /frontend 
COPY build /usr/share/nginx/html/
EXPOSE 80

ENTRYPOINT [ "nginx","-g","daemon off;" ]