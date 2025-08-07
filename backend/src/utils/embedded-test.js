const { Pinecone } = require('@pinecone-database/pinecone');
const dotenv = require('dotenv');

dotenv.config({ path: envPath });

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const assistant = pc.assistant('id-medical-assist');

console.log(assistant);

async function callAssistant() {
    const response = await assistant.chat({
    messages: [
            {
                role: 'user', content: 'how does you know FM clinic?'
            }
        ]
    });
    console.log(response);
}
callAssistant();