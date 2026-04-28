import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
import sys

# Para rodar este script, você precisará:
# 1. Instalar o firebase-admin: pip install firebase-admin
# 2. Ir no Console do Firebase > Configurações do Projeto > Contas de Serviço
# 3. Clicar em "Gerar nova chave privada" e salvar o arquivo JSON gerado.
# 4. Colocar o caminho do arquivo JSON na variável abaixo:

SERVICE_ACCOUNT_KEY_PATH = "caminho/para/seu/arquivo-firebase-adminsdk.json"

def delete_all_users():
    try:
        cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
        firebase_admin.initialize_app(cred)
    except FileNotFoundError:
        print(f"ERRO: Arquivo de credenciais não encontrado em: {SERVICE_ACCOUNT_KEY_PATH}")
        print("Por favor, baixe a chave privada no Console do Firebase (Configurações do Projeto > Contas de Serviço).")
        sys.exit(1)
    except Exception as e:
        print(f"Erro ao inicializar Firebase: {e}")
        sys.exit(1)

    print("Buscando usuários...")
    try:
        # Pega a lista de todos os usuários (limitado a 1000 por vez)
        page = auth.list_users()
        users = page.users
        
        while page.has_next_page:
            page = page.get_next_page()
            users.extend(page.users)

        if not users:
            print("Nenhum usuário encontrado. O banco já está limpo.")
            return

        print(f"Foram encontrados {len(users)} usuários. Iniciando exclusão...")
        
        # Deletando usuários em lote (máximo de 1000 por requisição no Firebase)
        uids = [user.uid for user in users]
        
        # Como é para portfólio, podemos apenas iterar ou usar delete_users
        result = auth.delete_users(uids)
        
        print(f"Limpeza concluída! {result.success_count} usuários deletados com sucesso.")
        if result.failure_count > 0:
            print(f"Falha ao deletar {result.failure_count} usuários.")
            for err in result.errors:
                print(f"Erro: {err.reason}")

    except Exception as e:
        print(f"Ocorreu um erro durante a limpeza: {e}")

if __name__ == "__main__":
    print("Iniciando varredura de limpeza de usuários do Firebase...")
    delete_all_users()
