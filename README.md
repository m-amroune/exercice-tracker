#  Project : Exercise Tracker Microservice

##  About the Project

**Objective** : Build an API that allows users to create exercise logs and retrieve their workout history.  
This project is part of FreeCodeCamp’s Back End Development and APIs Certification and is completed using Node.js and Express in a cloud-based development environment.

##  Project Tasks

- Create a Node.js project using Express
- Define a MongoDB model for users and exercises
- Create a route `/api/users` that:
  - Accepts a POST request to create a new user
  - Returns the created user object
- Create a route `/api/users/:_id/exercises` that:
  - Accepts a POST request with `description`, `duration`, and optional `date`
  - Adds the exercise to the user’s log
- Create a route `/api/users/:_id/logs` that:
  - Returns the user’s exercise log
  - Supports optional query parameters `from`, `to`, and `limit` to filter results
- Pass all automated tests provided by FreeCodeCamp
- Deploy the project to a cloud platform (Replit)

## Langages and Technologies  
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat)  
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat)  
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=flat)  
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=flat)

## Environment  
![Replit](https://img.shields.io/badge/Replit-667881?logo=replit&logoColor=white&style=flat)

##  Installation

This project runs on Replit and is validated through FreeCodeCamp’s testing suite.

1. Go to the [FreeCodeCamp project page](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/exercise-tracker)  
2. Fork or import the project into [Replit](https://replit.com/)  
3. Ensure the server is running and accessible via the provided URL  
4. Submit your Replit URL to run the automated tests

