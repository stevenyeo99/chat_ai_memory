function splitText(text, chunkSize = 500) {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
    let chunks = [], current = '';

    for (let sentence of sentences) {
        if ((current + sentence).length < chunkSize) {
            current += sentence;
        } else {
            chunks.push(current.trim());
            current = sentence;
        }
    }

    if (current) chunks.push(current.trim());
    return chunks;
}

module.exports = {
    splitText
}