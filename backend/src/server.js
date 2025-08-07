const http = require('http');

const app = require('./app');
const { NODE_PORT } = require('./configs/config');
const { initPineconeConnection } = require('./utils/pinecone.util');

const PORT = NODE_PORT || 3000;

const server = http.createServer(app);

async function startServer() {
    await initPineconeConnection();

    server.listen(PORT, () => {
        console.log(`chat_ai_memory backend server listening under port: ${PORT}`);
    })
}
startServer();