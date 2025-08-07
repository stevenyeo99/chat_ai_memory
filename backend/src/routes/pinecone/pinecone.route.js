const express = require('express');

const { uploadDocsPinecone, queryPinecone } = require('../../controllers/pinecone/pinecone.controller');

const pineconeRouter = express.Router();

pineconeRouter.get('/pinecone/query', queryPinecone);
pineconeRouter.post('/pinecone/upload', uploadDocsPinecone);

module.exports = pineconeRouter;