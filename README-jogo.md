# Jogo de Adivinhação com Flask, React e Docker Compose

Este é um projeto full stack que implementa um simples jogo de adivinhação usando Flask no backend, React no frontend, PostgreSQL para persistência e NGINX como proxy reverso com balanceamento de carga. Toda a infraestrutura é orquestrada com Docker Compose.

## 🎯 Objetivo do Jogo

O jogador deve adivinhar uma senha secreta gerada ou fornecida, e receberá dicas com base em letras corretas e suas posições.

## ⚙️ Tecnologias Utilizadas

- Python 3.11 + Flask
- React com Vite
- PostgreSQL
- NGINX (proxy reverso e balanceador de carga)
- Docker e Docker Compose

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Lonso10/guess_game-main.git
cd guess_game
```

### 2. Subir os containers

```bash
docker-compose up --build
```

Após o build:

- Frontend: http://localhost:3000
- Backend: http://localhost:3000/api (via NGINX)
- Banco: localhost:5432 (usuário: postgres / senha: secretpass)

## 🧪 Como Jogar

### Etapa 1 – Criar um novo jogo
1. Acesse o frontend em `http://localhost:3000`
2. Digite uma senha secreta para iniciar um novo jogo
3. O sistema irá gerar um `game_id` que deve ser salvo

### Etapa 2 – Tentar adivinhar
1. Vá para a tela de quebra (`breaker`)
2. Digite o `game_id`
3. Insira suas tentativas de adivinhação
4. Receba dicas indicando letras corretas e/ou posições corretas

## 🧱 Estrutura do Projeto

```
📁 backend/
│   ├── run.py
│   ├── requirements.txt
│   └── Dockerfile.backend
📁 frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── nginx.conf
│   └── Dockerfile.frontend
📄 docker-compose.yml
📄 README.md
```

## 🔁 Balanceamento de Carga

O NGINX distribui as requisições entre duas instâncias Flask (`backend1` e `backend2`) para melhorar desempenho e simular escalabilidade.

## 🔐 Lógica Interna

- Rota `/create`: recebe uma senha e retorna um `game_id`
- Rota `/guess/<game_id>`: permite enviar uma tentativa e retorna se acertou ou não
- As senhas são armazenadas em Base64 no banco
- As respostas incluem dicas sobre letras corretas e posições

## 🛠️ Configuração Avançada (opcional)

Para rodar sem Docker:

1. Configure variáveis de ambiente no `start-backend.sh` para SQLite, PostgreSQL ou DynamoDB
2. Inicie o backend com:

```bash
./start-backend.sh
```

3. No diretório `frontend`, rode:

```bash
corepack enable
npm install
export REACT_APP_BACKEND_URL=http://localhost:5000
yarn start
```

## 💡 Possíveis Melhorias

- Autenticação de usuários
- Salvamento de tentativas
- Limite de tentativas por jogo
- Interface mais interativa

## 📄 Licença

Este projeto está licenciado sob a MIT License.