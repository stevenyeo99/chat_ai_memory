const path = require('path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';

const envPath = path.join(__dirname, `.env.${env}`);

dotenv.config({ path: envPath });

const {
    NODE_ENV,
    PINECONE_API_KEY,
    PINECONE_INDEX
} = process.env;

module.exports = {
    NODE_ENV,
    PINECONE_API_KEY,
    PINECONE_INDEX
}