const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
  }

  type Employee {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    login(username: String!, password: String!): AuthPayload
    getAllEmployees: [Employee]
    getEmployeeById(eid: ID!): Employee
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    createEmployee(firstname: String!, lastname: String!, email: String!, gender: String!, salary: Float!): Employee
    updateEmployee(eid: ID!, firstname: String, lastname: String, email: String, gender: String, salary: Float): Employee
    deleteEmployee(eid: ID!): Employee
  }
`;

module.exports = typeDefs;
