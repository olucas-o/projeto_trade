import yfinance as yf
import pandas as pd
import google.generativeai as genai
import asyncio
import os
from typing import List, Dict, Any, Optional

class StockAnalyzer:
    def __init__(self, api_key: str):
        self.api_key = api_key
        genai.configure(api_key=self.api_key)
        self.modelo = self._get_model()

    def _get_model(self):
        modelo_valido = None
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                if 'flash' in m.name or 'pro' in m.name:
                    modelo_valido = m.name
                    break
        if not modelo_valido:
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    modelo_valido = m.name
                    break
        if modelo_valido:
            return genai.GenerativeModel(modelo_valido)
        else:
            raise Exception("Nenhum modelo compatível encontrado na sua conta.")

    async def analyze_stocks_bulk(self, tickers: List[str], trade_type: str = "swing") -> List[Dict[str, Any]]:
        """
        Analyses multiple stock tickers in ONE single IA request to save quota.
        """
        period = "6mo" if trade_type == "swing" else "2mo"
        all_tech_data = []
        final_results = []

        # 1. Fetch data for ALL tickers first
        for ticker in tickers:
            try:
                acao = yf.Ticker(ticker)
                dados = acao.history(period=period, interval="1d")
                
                if dados.empty or len(dados) < 2:
                    final_results.append({"ticker": ticker, "error": f"Dados insuficientes para {ticker}."})
                    continue

                dados = dados[['Open', 'High', 'Low', 'Close', 'Volume']].dropna()
                atual = dados.iloc[-1]
                anterior = dados.iloc[-2]

                # Basic technical calculations (same as before)
                abertura, fecho = atual['Open'], atual['Close']
                maximo, minimo = atual['High'], atual['Low']
                volume = atual['Volume']
                
                corpo = abs(fecho - abertura)
                s_sup = maximo - max(abertura, fecho)
                s_inf = min(abertura, fecho) - minimo
                total = maximo - minimo
                tend_at = "Alta" if fecho > abertura else "Baixa"
                tend_ant = "Alta" if anterior['Close'] > anterior['Open'] else "Baixa"

                padrao = "Nenhum padrão claro"
                if s_inf >= (2 * corpo) and s_sup <= (total * 0.1): 
                    padrao = "Martelo (Alta)"
                elif tend_ant == "Baixa" and tend_at == "Alta" and fecho > anterior['Open'] and abertura < anterior['Close']:
                    padrao = "Engolfo de Alta"
                elif s_sup >= (2 * corpo) and s_inf <= (total * 0.1):
                    padrao = "Estrela Cadente (Baixa)"
                elif tend_ant == "Alta" and tend_at == "Baixa" and abertura > anterior['Close'] and fecho < anterior['Open']:
                    padrao = "Engolfo de Baixa"

                all_tech_data.append({
                    "ticker": ticker,
                    "fecho": round(fecho, 2),
                    "max": round(maximo, 2),
                    "min": round(minimo, 2),
                    "vol": int(volume),
                    "direcao": tend_at,
                    "padrao": padrao
                })
            except Exception as e:
                final_results.append({"ticker": ticker, "error": str(e)})

        if not all_tech_data:
            return final_results

        # 2. Prepare the bulk prompt
        tech_summary = "\n".join([
            f"- {d['ticker']}: Fecho R${d['fecho']}, Máx R${d['max']}, Mín R${d['min']}, Vol {d['vol']:,}, Padrão: {d['padrao']}"
            for d in all_tech_data
        ])

        prompt = f"""
        És um analista de {trade_type.capitalize()} Trade especializado. 
        Analisa os seguintes ativos da B3 de uma só vez. 
        Dados Técnicos:
        {tech_summary}

        Para CADA ativo, gera um relatório curto seguindo as teorias de Flávio Lemos e Debastiani.
        Formato de Resposta Obrigatório para cada ativo:
        --- ATIVO: [TICKER] ---
        [Texto da análise aqui...]
        
        Se a confiança for Média ou Alta:
        [[STOP_MOVEL_DATA]]
        Ativo: [TickerF]
        Quantidade: (Sua Qtde)
        Preço Disparo: R$ [Valor]
        Preço Limite: R$ [Valor]
        Início: R$ [Valor]
        Ajuste: R$ [Valor]
        [[END_STOP_MOVEL_DATA]]
        --- FIM [TICKER] ---

        Regras de Stop Móvel: Usar Mínima para Stop Loss de Compra e Máxima para Venda. 10 centavos de folga para o Prç Limite. O 'Início' é Entrada + Risco (Compra) ou Entrada - Risco (Venda). O 'Ajuste' é Risco / 2.
        """

        # 3. Call IA with Retry logic (just in case even the single request 429s)
        max_retries = 3
        for attempt in range(max_retries):
            try:
                resposta = self.modelo.generate_content(prompt)
                full_text = resposta.text
                
                # 4. Parse the bulk response back into the results list
                for data in all_tech_data:
                    # Look for content between tags
                    start_tag = f"--- ATIVO: {data['ticker']} ---"
                    end_tag = f"--- FIM {data['ticker']} ---"
                    
                    try:
                        report = full_text.split(start_tag)[1].split(end_tag)[0].strip()
                        final_results.append({
                            "ticker": data['ticker'],
                            "fecho": data['fecho'],
                            "volume": data['vol'],
                            "padrao": data['padrao'],
                            "analise": report
                        })
                    except:
                        final_results.append({
                            "ticker": data['ticker'],
                            "error": "Erro ao processar resposta da IA para este ativo."
                        })
                break # Success, exit retry loop
            except Exception as e:
                if "429" in str(e) and attempt < max_retries - 1:
                    await asyncio.sleep(25 * (attempt + 1)) # Wait and retry
                else:
                    for data in all_tech_data:
                        final_results.append({"ticker": data['ticker'], "error": f"Erro na IA: {str(e)}"})
                    break

        return final_results
