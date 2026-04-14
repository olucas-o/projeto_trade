import yfinance as yf
import google.generativeai as genai
import asyncio
from typing import List, Dict, Any

class StockAnalyzer:
    def __init__(self, api_keys: List[str]):
        if not api_keys:
            raise ValueError("Pelo menos uma API key deve ser fornecida.")
        self.api_keys = api_keys
        self.current_key_idx = 0
        self._init_model()

    def _init_model(self):
        while self.current_key_idx < len(self.api_keys):
            try:
                genai.configure(api_key=self.api_keys[self.current_key_idx])
                self.modelo = self._get_model()
                return
            except Exception as e:
                error_msg = str(e).lower()
                if "429" in error_msg or "quota" in error_msg or "permission" in error_msg or "403" in error_msg:
                    print(f"Erro ao inicializar com a chave {self.current_key_idx + 1}. Tentando a próxima...")
                    self.current_key_idx += 1
                else:
                    raise e
        raise Exception("Nenhuma das chaves de API fornecidas é válida ou possui quota.")

    def _switch_key(self) -> bool:
        """Muda para a próxima chave da lista. Retorna True se conseguiu, False se esgotaram."""
        self.current_key_idx += 1
        if self.current_key_idx < len(self.api_keys):
            print(f"Chave esgotada. Trocando para a chave API {self.current_key_idx + 1}...")
            self._init_model()
            return True
        return False

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
        if trade_type == "day":
            period = "5d"
            interval = "15m"
            contexto_operacional = "Foco explícito em operações INTRADIÁRIAS (abrir e fechar no mesmo dia). Avalie a volatilidade de curtíssimo prazo e alvos curtos."
            nome_tempo_grafico = "15 Minutos"
        else: # swing
            period = "6mo"
            interval = "1d"
            contexto_operacional = "Foco explícito em SWING TRADE (carregar posições por dias ou poucas semanas). Avalie a tendência principal de curto a médio prazo."
            nome_tempo_grafico = "Diário"

        all_tech_data = []
        final_results = []

        # 1. Fetch data for ALL tickers first
        for ticker in tickers:
            try:
                acao = yf.Ticker(ticker)
                dados = acao.history(period=period, interval=interval)
                
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

                confianca = "Baixa"
                if padrao != "Nenhum padrão claro":
                    if volume > anterior['Volume']:
                        confianca = "Alta"
                    else:
                        confianca = "Média"

                all_tech_data.append({
                    "ticker": ticker,
                    "fecho": round(fecho, 2),
                    "max": round(maximo, 2),
                    "min": round(minimo, 2),
                    "vol": int(volume),
                    "direcao": tend_at,
                    "padrao": padrao,
                    "confianca": confianca
                })
            except Exception as e:
                final_results.append({"ticker": ticker, "error": str(e)})

        if not all_tech_data:
            return final_results

        # 2. Prepare the bulk prompt
        tech_summary = "\n".join([
            f"- {d['ticker']}: Fecho R${d['fecho']}, Máx R${d['max']}, Mín R${d['min']}, Vol {d['vol']:,}, Padrão: {d['padrao']}, Classe Confiança: {d['confianca']}"
            for d in all_tech_data
        ])

        prompt = f"""
        És um analista de {trade_type.upper()} TRADE especializado. 
        {contexto_operacional}
        Tempo Gráfico Base: {nome_tempo_grafico}
        Analise os seguintes ativos da B3 de uma só vez. 
        Dados Técnicos (Obrigatórios e Inquestionáveis):
        {tech_summary}

        Para CADA ativo, gera um relatório curto seguindo as teorias de Flávio Lemos e Debastiani adaptadas para este tipo de operação.
        Formato de Resposta Obrigatório para cada ativo:
        --- ATIVO: [TICKER] ---
        [Texto da análise justificando a 'Classe Confiança' e contextualizando a decisão...]
        
        REGRA RIGOROSA: Baseie sua justificativa APENAS na 'Classe Confiança' fornecida. Se for 'Baixa', explique a ineficiência do cenário no contexto de {trade_type} trade. Se for 'Média/Alta', elabore sobre a estratégia de entrada e saída.
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

        # 3. Call IA with Retry e Multiple Keys logic
        max_retries = 3
        attempt = 0
        while attempt < max_retries:
            try:
                resposta = self.modelo.generate_content(
                    prompt, 
                    generation_config=genai.types.GenerationConfig(temperature=0.0)
                )
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
                            "confianca": data['confianca'],
                            "analise": report
                        })
                    except:
                        final_results.append({
                            "ticker": data['ticker'],
                            "error": "Erro ao processar resposta da IA para este ativo."
                        })
                break # Success, exit retry loop
            except Exception as e:
                error_msg = str(e).lower()
                if "429" in error_msg or "quota" in error_msg or "exhausted" in error_msg:
                    # Esgotou quota ou tomou limite de taxa
                    if self._switch_key():
                        print(f"Chave falhou (429/quota). Tentando com nova chave...")
                        continue # Tenta de novo sem incrementar tentativa global
                    elif attempt < max_retries - 1:
                        # Todas as chaves esgotadas, mas ainda resta retry global (se for um ratelimit comum)
                        print(f"Todas as chaves falharam. Tentativa {attempt + 1} de {max_retries}. Aguardando...")
                        await asyncio.sleep(25 * (attempt + 1))
                        attempt += 1
                    else:
                        for data in all_tech_data:
                            final_results.append({"ticker": data['ticker'], "error": f"Erro na IA (limites esgotados): {str(e)}"})
                        break
                else:
                    for data in all_tech_data:
                        final_results.append({"ticker": data['ticker'], "error": f"Erro na IA: {str(e)}"})
                    break

        return final_results
