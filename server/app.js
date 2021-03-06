import express from 'express';

// graphQLHTTP is a function to handle GraphQL requests
import graphQLHTTP from 'express-graphql';

// graphQLHTTP() takes a schema argument, describing the structure of our endpoints
import schema from './schema/schema.js';

// ORM for MongoDB
import mongoose from 'mongoose';

// Cross-Origin Requests
import cors from 'cors';

require('dotenv').config();

const { DB_USER, DB_PASS, DB_HOST } = process.env;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/test?retryWrites=true`);
mongoose.connection.once('open', () => {
    console.log('📈 Connected to MongoDB.');
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
    console.log('📖 Welcome to the Warehouse Server!');
    console.log(`🔍 Listening on port ${port}.`);
});
