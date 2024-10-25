# Sistema de Reservas de Salas de Reunião

Este projeto permite gerenciar reservas de salas de reunião, garantindo que não haja sobreposição de horários. Ele é composto por um backend em Laravel e um frontend em React.

---

## Requisitos

### Backend
- **PHP**: 8.0 ou superior
- **Composer**: 2.0 ou superior
- **Laravel**: 10.x
- **PostgreSQL**: 14.x ou superior

### Frontend
- **Node.js**: 18.x ou superior
- **NPM**: 9.x ou superior
- **React**: 18.x

---

## Instalação

### Backend

1. Clone o repositório e navegue para o diretório do backend:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd backend

2. Instale as dependências:
     ```bash
     composer install

3. Crie o arquivo .env ou altere se já tiver
    ```bash
     cp .env.example .env

  ### Frontend
1. Navegue para o diretório do frontend:
   ```bash
    cd frontend

2. Instale as dependências:
    ```bash
    npm install

### Configuração Banco de dados

  obs: Laravel usa por padrão banco SQLite

1. Acesse o Postgres e crie a database:
    ```bash
   CREATE DATABASE nome_do_seu_banco;

2. No arquivo .env do backend, configure as credenciais do banco de dados:
    ```bash
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=banco_de_sua_escolha
    DB_USERNAME=seu_usuario
    DB_PASSWORD=sua_senha

3. Execute as migrações para criar as tabelas:
    ```bash
    php artisan migrate

4.  Execute o seeder para popular as tabelas criadas com alguns exemplos:
     ```bash
     php artisan db:seed

### Execução do sistema
  Backend
- Para iniciar o servidor do backend Laravel, execute:
  ```bash
  php artisan serve
- O backend estará disponível em http://localhost:8000.

  Frontend
- Para iniciar o frontend React, execute:
  ```bash
  npm run dev
- O frontend estará disponível em http://localhost:5173/

### APi REST
1. Endpoints Principais
   - URL: POST /api/reservations
   - Exemplo de cURL:
     ```bash
     curl -X POST http://localhost:8000/api/reservations \
     -H "Content-Type: application/json" \
     -d '{
     "room_id": 1,
     "start_time": "2023-10-30T10:00:00",
     "end_time": "2023-10-30T11:00:00",
      "responsible_person": "João"
     }'

2. Listar Reservas
   - URL: GET /api/reservations
   - Exemplo:
     ```bash
     curl -X GET http://localhost:8000/api/reservations

