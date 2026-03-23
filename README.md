# Implementation of RAG
- Here we are using **pdf-parse** npm library for parsing pdf
- Then we are creating chunks with the help of **RecursiveCharacterTextSplitter** from langchain
- After creating chunks we pass the chunks into embedding with a LLM. Here I have used Mistral AI
- Then we make use of **Pinecone DB** as vector store for storing the embeddings.
- So now when user asks a question then that question is embedded and used for query searching in the vector store. Then we send the closest embeddings to ASP (AI Service Provider) which creates an answer out of it and provides it to user.