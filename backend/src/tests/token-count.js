const { encoding_for_model } = require('@dqbd/tiktoken');

const enc = encoding_for_model("gpt-4");
const chunks = [
  "how does you know FM Clinic?",
];

let total = 0;
chunks.forEach(c => {
  const tokens = enc.encode(c);
  total += tokens.length;
});

console.log(`Total tokens: ${total}`);
console.log(`price: ${total / 1}`)


// {
//   id: '000000000000000066b08620d42c92ba',
//   finishReason: 'stop',
//   message: {
//     role: 'assistant',
//     content: 'Ulink works closely with FM Clinic in Indonesia to assess and prepare patients for overseas care. They coordinate with partner hospitals and doctors in Malaysia and Singapore to ensure seamless referrals, appointments, and follow-up. After receiving treatment, Ulink and FM Clinic will work together to provide continuation of care for the patient, including follow-up visits or teleconsultations to support recovery.'
//   },
//   model: 'gpt-4o-2024-11-20',
//   citations: [ { position: 416, references: [Array] } ],
//   usage: { promptTokens: 6332, completionTokens: 76, totalTokens: 6408 }
// }