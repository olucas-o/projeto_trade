# Script para iniciar o ambiente de desenvolvimento (Backend + Frontend)
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   Iniciando Trade Analyzer Environment   " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Limpar processos antigos (opcional, evita erro de porta ocupada)
Write-Host "`n[1/3] Limpando portas antigas (8000)..." -ForegroundColor Yellow
$process = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($process) {
    Write-Host "Fechando processo ID $process..." -ForegroundColor Gray
    Stop-Process -Id $process -Force
}

# 2. Iniciar Backend (Detectar Venv)
Write-Host "[2/3] Iniciando Backend..." -ForegroundColor Green
$pythonExec = "python"
if (Test-Path ".venv\Scripts\python.exe") {
    $pythonExec = "..\.venv\Scripts\python.exe"
    Write-Host "   -> Usando ambiente virtual (.venv) encontrado." -ForegroundColor Gray
}

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; Write-Host '--- BACKEND ---' -ForegroundColor Cyan; & '$pythonExec' -m pip install -r requirements.txt; & '$pythonExec' main.py"

# 3. Iniciar Frontend
Write-Host "[3/3] Iniciando Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; Write-Host '--- FRONTEND ---' -ForegroundColor Cyan; npm install; npm run dev"

Write-Host "`nPronto! O sistema está subindo em janelas separadas." -ForegroundColor Cyan
Write-Host "Acesse o Frontend no link que aparecer na janela do Vite." -ForegroundColor Gray
