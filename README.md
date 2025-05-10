# Todo Task Full Stack Web Application - Spring Boot, React, MySQL, Docker

This is a full-stack web application built using:


- **Backend**: Spring Boot
- **Frontend**: React
- **Database**: MySQL
- **Containerization**: Docker + Docker Compose
- **Testing**:
  - Backend: Unit and Integration Tests (JUnit, Mockito)
  - Frontend: Unit Tests (Jest) and E2E Tests (Cypress)
 
 ## Prerequisites

- Docker & Docker Compose installed
- Git installed
- Optional: Java 17+, Node.js 18+, Maven, MySQL (for local dev outside Docker)


## Setup Instructions

### 1. Clone the repository

Run following command in git bash: 

git clone https://github.com/Malkishara/todo_task_web_app-full_stack.git 


### Build & Run with Docker
Start docker engine. Go to the project directory and run following command in terminal.

docker-compose up --build

You can see the app in your browser at: http://localhost:3000

Backend API is available at: http://localhost:8080

MySQL is running on: localhost:3306

### Running Tests

Backend (Spring Boot) : Unit tests and integration tests

Run 'cd backend' command on terminal for go to the backend directory. 

Run following command:


./mvnw test


Frontend (React)

Unit Tests:

Run 'cd frontend' command on terminal for go to the frontend directory. 
Run 'npm install' command.
Run 'npm test'

E2E Tests (Cypress):

Run 'npx cypress open' command
