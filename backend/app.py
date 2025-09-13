import os
from flask import Flask, request, jsonify, Response
from dotenv import load_dotenv
from flask_cors import CORS
import json

# --- LangChain Imports ---
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from langchain_core.output_parsers import StrOutputParser
from langchain.retrievers.multi_query import MultiQueryRetriever

# --- Global Variables ---
rag_chain_with_source = None

# --- Application Setup ---
app = Flask(__name__)
CORS(app)
load_dotenv()

def setup_rag_pipeline():
    global rag_chain_with_source
    
    # Load Documents
    print("Loading documents...")
    loader = DirectoryLoader("knowledge_base", glob="**/*.txt")
    docs = loader.load()

    # Split Documents
    print("Splitting documents...")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=200)
    splits = text_splitter.split_documents(docs)

    # Create Embeddings and Store
    print("Creating embeddings and storing...")
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = Chroma.from_documents(documents=splits, embedding=embeddings)
    
    # Create a Multi-Query Retriever that fetches more documents (k=5)
    print("Creating Multi-Query Retriever...")
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash-latest", temperature=0)
    base_retriever = vector_store.as_retriever(search_kwargs={"k": 5})
    vector_store_retriever = MultiQueryRetriever.from_llm(retriever=base_retriever, llm=llm)

    # RAG Prompt Template
    prompt_template = """
    You are Lawmate, an AI legal assistant for India. 
    Your goal is to answer the user's question based ONLY on the following context provided.
    Do not use any external knowledge. If the context does not contain the answer, say "I cannot answer this question based on the provided information."
    Be concise and clear in your answer.

    CONTEXT:
    {context}

    QUESTION:
    {question}

    ANSWER:
    """
    prompt = ChatPromptTemplate.from_template(prompt_template)
    
    # The chain that generates the answer
    rag_chain = (
        {"context": vector_store_retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    
    # This parallel chain gets the sources AND the answer at the same time
    rag_chain_with_source = RunnableParallel(
        {"context": vector_store_retriever, "question": RunnablePassthrough()}
    ).assign(answer=rag_chain)

    print("RAG pipeline setup complete! API is ready.")


# --- API Endpoints ---
@app.route('/')
def home():
    return "LawMate RAG API is running!"

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    if not data or 'question' not in data:
        return jsonify({"error": "No question provided"}), 400

    question = data['question']

    if rag_chain_with_source is None:
        return jsonify({"error": "RAG pipeline not initialized"}), 500

    def stream_response():
        try:
            # Use invoke to get the full result with context first
            full_response = rag_chain_with_source.invoke(question)
            answer_text = full_response.get("answer", "")
            source_docs = full_response.get("context", [])

            # First, stream the answer token by token for the live typing effect
            for char in answer_text:
                 yield f"data: {json.dumps({'token': char})}\n\n"
            
            # Then, send a final, single payload containing the source documents
            final_payload = {
                "sources": [
                    {
                        "page_content": doc.page_content,
                        "metadata": doc.metadata
                    } for doc in source_docs
                ]
            }
            yield f"data: {json.dumps(final_payload)}\n\n"

        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return Response(stream_response(), mimetype='text/event-stream')

# --- Main Execution ---
if __name__ == '__main__':
    setup_rag_pipeline()
    app.run(host="0.0.0.0", port=5000, debug=True)