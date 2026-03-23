import "dotenv/config"
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from '@pinecone-database/pinecone'
import fs from 'fs'

// Configuration of Pinecone
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.Index("rag-implementation")

let dataBuffer = fs.readFileSync("./story.pdf");

const parser = new PDFParse({
    data: dataBuffer
})

// Creating embedding with LLM
const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})

// Parsing the pdf
const data = await parser.getText()

// Splitting text into 100 char length chunks
const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 100, chunkOverlap: 0 })
const chunks = await splitter.splitText(data.text)

const docs = await embeddings.embedDocuments(chunks)

// Code is not complete yet but setup is completed