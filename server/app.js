import express from 'express';

// graphQLHTTP is a function to handle GraphQL requests
import graphQLHTTP from 'express-graphql';

// graphQLHTTP() takes a schema argument, describing the structure of our endpoints
import schema from './schema/schema.js';

// ORM for MongoDB
import mongoose from 'mongoose';

// Cross-Origin Requests
import cors from 'cors';

mongoose.connect('mongodb+srv://warehouse-app:test123@cluster0-hoevu.mongodb.net/test?retryWrites=true');
mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
});

const port = 4000;

// New Express app
const app = express();

// Allow other servers to access this server's endpoints
app.use(cors());

// Add middleware on the /graphql endpoint
app.use('/graphql', graphQLHTTP({
    schema,
    graphiql: true // Enable dev mode graphiql UI 
}))

// Set app to listen and act with a callback function
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
