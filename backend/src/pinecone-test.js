const { Pinecone } = require('@pinecone-database/pinecone');

const apiKey = process.env.PINECONE_API_KEY;

const pinecone = new Pinecone({
  apiKey
});

async function inspectIndexes() {
  try {
    const indexes = await pinecone.listIndexes();

    console.log('Indexes found:', indexes);

    for (const indexName of indexes) {
      const index = pinecone.Index(indexName);
      const stats = await index.describeIndexStats();

      console.log(`\n📦 Index: ${indexName}`);
      console.log(`➡️ Total Vectors: ${stats.totalVectorCount}`);
      console.log(`➡️ Namespaces:`, stats.namespaces ? Object.keys(stats.namespaces) : 'None');
      console.log(`➡️ Metadata Keys:`, stats.metadataConfig ? Object.keys(stats.metadataConfig) : 'Unknown');
    }
  } catch (err) {
    console.error('Error inspecting indexes:', err);
  }
}

// inspectIndexes();