# 📈 Trader AI - Análise de Ações com Inteligência Artificial

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

Uma aplicação web moderna (SaaS) projetada para analisar ativos da bolsa de valores utilizando Inteligência Artificial (Google Gemini). A IA aplica de forma estrita as estratégias de validação de padrões de **Carlos Alberto Debastiani** e a gestão de risco de **Flávio Lemos**, oferecendo recomendações precisas de compra e venda (Swing e Day Trade).

---

## 🚀 Funcionalidades

- **Análise em Lote (Bulk Analysis):** Digite vários tickers de uma vez (ex: `PETR4, VALE3, WEGE3`) e receba uma análise detalhada em segundos.
- **Autenticação Segura:** Sistema de login completo utilizando Firebase Auth (Cadastro, Login e Verificação por E-mail).
- **Paywall / Freemium:** Usuários anônimos têm direito a 1 tentativa gratuita. Análises ilimitadas requerem a criação de uma conta.
- **Design Moderno:** Interface rica com animações fluídas (Framer Motion), Glassmorphism e responsividade.
- **Tipos de Operação:** Suporte para análises com foco em *Swing Trade* e *Day Trade*.

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React.js + Vite**
- **Framer Motion** (Animações)
- **Lucide React** (Ícones)
- **Firebase Authentication** (Gestão de usuários)

### Backend
- **Python + FastAPI** (API de alta performance)
- **Google Generative AI (Gemini Flash 2.5)** (Motor de análise)
- **Yahoo Finance** (Busca automatizada de dados caso necessário)

---

## ⚙️ Como rodar o projeto localmente

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/)
- [Python 3.10+](https://www.python.org/downloads/)
- Uma conta no [Firebase](https://firebase.google.com/)
- Chaves de API do [Google AI Studio](https://aistudio.google.com/)

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/olucas-o/projeto_trade
   cd projeto_trade
   ```

2. **Configuração do Backend**
   Crie um arquivo `.env` na pasta `backend/` com as suas chaves do Gemini:
   ```env
   GEMINI_API_KEY_1=sua_chave_aqui
   ```

3. **Configuração do Frontend**
   Crie um arquivo `.env` na pasta `frontend/` com as configurações do Firebase:
   ```env
   VITE_FIREBASE_API_KEY=sua_chave
   VITE_FIREBASE_AUTH_DOMAIN=seu_dominio
   VITE_FIREBASE_PROJECT_ID=seu_id
   VITE_FIREBASE_STORAGE_BUCKET=seu_storage
   VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender
   VITE_FIREBASE_APP_ID=seu_app_id
   VITE_API_URL=http://localhost:8000
   ```

4. **Inicie a aplicação (via Script Automatizado)**
   No Windows, você pode rodar o script integrado que sobe tanto o backend quanto o frontend simultaneamente:
   ```powershell
   ./dev.ps1
   ```
   *Caso prefira rodar manualmente:*
   - **Backend:** `cd backend`, crie um ambiente virtual, instale o `requirements.txt` e rode `uvicorn main:app --reload` ou `python main.py`.
   - **Frontend:** `cd frontend`, rode `npm install` e depois `npm run dev`.

---

## 🧹 Script de Limpeza

O projeto conta com um script administrativo em `scripts/cleanup_firebase_users.py` que permite excluir usuários inativos do Firebase para não estourar a cota gratuita do portfólio. Para executá-lo, você precisa adicionar as credenciais (`Service Account`) do Firebase na pasta.

---

## 📝 Aviso Legal
**Disclaimer:** Este projeto é estritamente educacional e foi desenvolvido para compor um portfólio técnico. As análises geradas pela Inteligência Artificial não configuram recomendação oficial de investimento. Opere no mercado financeiro por sua própria conta e risco.

---
Feito por [Seu Nome](https://github.com/SEU_USUARIO).
