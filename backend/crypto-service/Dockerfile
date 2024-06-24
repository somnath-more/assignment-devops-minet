FROM openjdk:17.0.2-jdk
WORKDIR /backend 
COPY /target/*.jar crypto.jar
EXPOSE 9092
ENTRYPOINT [ "java","-jar","/backend/crypto.jar" ]