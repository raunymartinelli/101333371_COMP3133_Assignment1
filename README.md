# 101333371_COMP3133_Assignment1

# Employee Management GraphQL API

## Overview
This project is a GraphQL-based API for managing employee records. It allows operations such as user authentication and CRUD functionalities for employee data, leveraging technologies like Node.js, Express, GraphQL, and MongoDB.

## Features
- User Signup and Login with JWT Authentication
- Create, Read, Update, and Delete (CRUD) operations for employees
- Query flexibility with GraphQL

## Technologies
- Node.js and Express for the server setup
- GraphQL for the API interface
- MongoDB for the database
- JWT for secure authentication

## Setup and Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Connect to MongoDB with the provided URI

## Environment Configuration
Create a `.env` file in the root directory with the following:

DB_URI="your_mongodb_uri"
JWT_SECRET="your_jwt_secret"

markdown


## Usage
The API supports various endpoints, such as:
- `/signup` for user registration
- `/login` for user authentication
- CRUD operations for `/employees` and `/users`

Use GraphQL playground at `http://localhost:4000/graphql` to interact with the API.

## Testing
Test the API endpoints using tools like Apollo Studio, ensuring all functionalities work as expected.

## Contribution
Contributions are welcome. Please ensure to follow the code of conduct and submit pull requests for review.

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Author
Rauny Martinelli
Student ID: 101333371
