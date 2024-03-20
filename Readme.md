# Mini Blog app with Microservices Architecture

This project implements a microservices architecture using Skaffold for development and deployment, with Ingress Nginx for handling routing and external access. Each microservice handles a specific functionality, making the application scalable and maintainable.

## Project Structure

The project structure is organized as follows:

- **client:** Frontend client application.
- **comments:** Microservice for handling comments functionality.
- **event-bus:** Event bus microservice for managing communication between services.
- **moderation:** Microservice responsible for moderating content.
- **posts:** Microservice handling posts-related functionality.
- **query:** Microservice for querying and fetching data.
