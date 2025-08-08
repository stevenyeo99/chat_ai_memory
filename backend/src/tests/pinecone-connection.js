const { Pinecone } = require('@pinecone-database/pinecone');
const dotenv = require('dotenv');
const path = require('path');

const env = 'production';

const envPath = path.join(__dirname, '..', 'environments', `.env.${env}`);
dotenv.config({ path: envPath });

const apiKey = process.env.PINECONE_API_KEY;

const pinecone = new Pinecone({
  apiKey
});

async function inspectIndexes() {
  try {
    const indexes = await pinecone.listIndexes(); // returns { indexes: [ ... ] }

    console.log('Indexes found:', indexes.indexes);

    for (const indexInfo of indexes.indexes) {
      const indexName = indexInfo.name;
      const index = pinecone.Index(indexName);
      const stats = await index.describeIndexStats();

      console.log(JSON.stringify(stats));
      console.log(`\n📦 Index: ${indexName}`);
      console.log(`➡️ Total Vectors: ${stats.totalVectorCount}`);
      console.log(`➡️ Vector Dimension: ${stats.dimension}`);
      console.log(`➡️ Namespaces:`, stats.namespaces ? Object.keys(stats.namespaces) : 'None');
      console.log(`➡️ Metadata Keys:`, stats.metadataConfig ? Object.keys(stats.metadataConfig) : 'Unknown');

      if (stats.totalVectorCount && stats.dimension) {
        const bytes = stats.totalVectorCount * stats.dimension * 4;
        const gb = bytes / 1_000_000_000;
        console.log(`📏 Estimated Vector Storage: ${gb.toFixed(3)} GB`);
      } else {
        console.log(`📏 Unable to calculate storage — missing vector count or dimension`);
      }
    }
  } catch (err) {
    console.error('Error inspecting indexes:', err);
  }
}

inspectIndexes();