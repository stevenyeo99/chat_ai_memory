import { Pinecone } from '@pinecone-database/pinecone';

const indexName = 'gpt';
const index = pc.Index(indexName);

async function initPineconeConnection() {
    const pc = new Pinecone({
        apiKey: 'pcsk_4M7Do6_Do176CWueVpaBHkGm9W4uXRoQ862BAmNVLQUwU6ZfPfiyxZYDQN6d8LwSgbpFao'
    });

    const existingIndexes = await pc.listIndexes();
    const isIndexExist = existingIndexes.includes(indexName);

    if (!isIndexExist) {
        await pc.createIndexForModel({
            name: indexName,
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