# Mini Blog app with Microservices Architecture

This project implements a microservices architecture using Skaffold for development and deployment, with Ingress Nginx for handling routing and external access. Each microservice handles a specific functionality, making the application scalable and maintainable.

## Project Structure

The project structure is organized as follows:

- **client:** Frontend client application.
- **comments:** Microservice for handling comments functionality.
- **moderation:** Microservice responsible for moderating content.
- **posts:** Microservice handling posts-related functionality.
- **query:** Microservice for querying and fetching data.

## Messaging System with RabbitMQ

The project utilize RabbitMQ as the messaging system,it facilitates communication between microservices by enabling message queues and exchanges.

rabbitmq-service: Provides the messaging backbone for inter-service communication.
comments, moderation, posts, query: These microservices utilize RabbitMQ for sending and receiving messages to coordinate their actions and maintain data consistency
