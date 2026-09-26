# Stage 1: Build Spring Boot app with Maven
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Copy Maven POM, Wrapper, and source code
COPY pom.xml ./
COPY .mvn ./.mvn
COPY mvnw ./
COPY src ./src

# Build the application JAR
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Stage 2: Lightweight Java 21 Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy compiled JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose default port
EXPOSE 8080

# Start Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
