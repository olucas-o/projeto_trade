from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from analyzer import StockAnalyzer
from pydantic import BaseModel
from typing import List
import os
import asyncio

app = FastAPI(title="SaaS Trade Analyzer API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Harcoded API Key for now or use environment
API_KEY = "AIzaSyDrXVO0DE6tBf65itjLRuevKQz4W1f6Up4"
analyzer = StockAnalyzer(api_key=API_KEY)

class AnalysisRequest(BaseModel):
    tickers: str
    trade_type: str # "swing" or "day"

@app.get("/")
def read_root():
    return {"status": "online", "message": "API de Análise Financeira"}

@app.post("/analyze")
async def analyze(request: AnalysisRequest):
    # Split tickers by comma and clean whitespace
    ticker_list = [t.strip().upper() for t in request.tickers.split(",") if t.strip()]
    ticker_list = ticker_list[:10] # Hard limit to 10 tickers to avoid context bloat
    
    if not ticker_list:
        raise HTTPException(status_code=400, detail="Nenhum ticker fornecido.")

    # Format tickers for Yahoo (add .SA if missing)
    full_tickers = [t if "." in t else f"{t}.SA" for t in ticker_list]
    
    # NEW: Call Bulk Analysis (Sends ONE request to IA)
    results = await analyzer.analyze_stocks_bulk(full_tickers, request.trade_type)
    
    return {"results": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
