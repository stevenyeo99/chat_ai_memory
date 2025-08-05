const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const xlsx = require('xlsx');
const fs = require('fs');

async function extractText(file) {
    const { mimetype, path } = file;
    let text = '';

    if (mimetype === 'application/pdf') {
        const data = fs.readFileSync(path);
        const result = await pdfParse(data);
        text = result.text;
    } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const data = fs.readFileSync(path);
        const result = await mammoth.extractRawText({ buffer: data });
        text = result.value;
    } else if (mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const workbook = xlsx.readFile(path);
        workbook.sheetNames.forEach(sheet => {
            text += xlsx.utils.sheet_to_csv(workbook.Sheets[sheet]) + '\n';
        });
    } else {
        throw new Error('Unsupported file type.');
    }

    fs.unlinkSync(path);
    return text;
}

module.exports = {
    extractText
};