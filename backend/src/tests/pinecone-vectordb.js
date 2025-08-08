const { Pinecone } = require('@pinecone-database/pinecone');
const dotenv = require('dotenv');
const path = require('path');

const envPath = path.join(__dirname, '..', 'environments', `.env.production`);
dotenv.config({ path: envPath });

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pc.index("internal");

async function embedQuery(text) {
    const model = 'multilingual-e5-large'; // or list available models via pc.inference.listModels()
    const params = { inputType: 'query', truncate: 'END' };
    const res = await pc.inference.embed(model, [text], params);
    // console.log(JSON.stringify(res));
    return res.data[0].values;               // float[] vector
}

async function queryDB() {
    // const vector = await embedQuery('how do you know FM clinic?');
const vector = Array.from({ length: 1536 }, () => Math.random() * 2 - 1);
    console.log(vector.length);
    const results = await index.namespace('Documents').query({
        vector,
        topK: 5,
        includeMetadata: true
    });

    console.log(JSON.stringify(results, null, 2));
}
queryDB();