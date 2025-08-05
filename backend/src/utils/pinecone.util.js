import { Pinecone } from '@pinecone-database/pinecone';

const {
    PINECONE_API_KEY,
    PINECONE_INDEX
} = require('../configs/config');

const index = pc.Index(PINECONE_INDEX);

async function initPineconeConnection() {
    const pc = new Pinecone({
        apiKey: PINECONE_API_KEY
    });

    const existingIndexes = await pc.listIndexes();
    const isIndexExist = existingIndexes.includes(PINECONE_INDEX);

    if (!isIndexExist) {
        await pc.createIndexForModel({
            name: PINECONE_INDEX,
            cloud: 'aws',
            region: 'us-east-1',
            embed: {
                model: 'llama-text-embed-v2',
                fieldMap: { text: 'chunk_text' },
            },
            waitUntilReady: true,
        });
    }
}

async function storePineconeData(chunks, fileName, namespace) {
    const vectors = chunks.map((chunk, i) => ({
        id: `${fileName}-${Date.now()}-${i}`,
        values: {},
        metadata: {
            chunk_text: chunk,
            source: fileName
        }
    }));

    await index.upsert({
        namespace,
        vectors
    });
}

module.exports = {
    initPineconeConnection,
    storePineconeData
}