import "dotenv/config"
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from '@pinecone-database/pinecone'
import fs from 'fs'

// Configuration of Pinecone
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.Index("rag-implementation")

// let dataBuffer = fs.readFileSync("./story.pdf");

// const parser = new PDFParse({
//     data: dataBuffer
// })

// Creating embedding with LLM
const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})

// Parsing the pdf
// const data = await parser.getText()

// Splitting text into 500 char length chunks
// const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 0 })
// const chunks = await splitter.splitText(data.text)

// const docs = await Promise.all(chunks.map(async (chunk) => {
//     const embedding = await embeddings.embedQuery(chunk)
//     return {
//         text: chunk,
//         embedding
//     }
// }))

// Updating + Inserting in the index 
// const result = await index.upsert({
//     records: docs.map((doc, i) => ({
//         id: `doc-${i}`,
//         values: doc.embedding,
//         metadata: {
//             text: doc.text
//         }
//     }))
// })

// Querying to DB by imbedding our questions

const queryEmbedding = await embeddings.embedQuery("how was the internship experience?");

console.log(queryEmbedding)

const result = await index.query({
    vector: queryEmbedding,
    topK: 2,
    includeMetadata: true
})


console.log(JSON.stringify(result))