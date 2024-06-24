FROM openjdk:17.0.2-jdk
WORKDIR /backend
COPY target/*.jar app.jar
EXPOSE 9093
ENTRYPOINT ["java","-jar","/backend/app.jar"]