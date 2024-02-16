const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    app.use(express.json());
    app.use(userRoutes);
    app.use(employeeRoutes);

    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app });

    mongoose.connect(process.env.MONGODB_URI)
        .then(()=> console.log('MongoDB connection established'))
        .catch(err => console.error('MongoDB connection error:', err));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
        console.log(`GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`);

    });
}

startApolloServer(typeDefs, resolvers);


