const path = require('path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';

const envPath = path.join(__dirname, 'environments', `.env.${env}`);

console.log(envPath);

dotenv.config({ path: envPath });

console.log(process.env);

const {
    NODE_PORT,
    NODE_ENV,
    PINECONE_API_KEY,
    PINECONE_INDEX
} = process.env;

module.exports = {
    NODE_PORT,
    NODE_ENV,
    PINECONE_API_KEY,
    PINECONE_INDEX
}