# 🎓 3ª Avaliação Prática – Gerenciamento de Alunos

---

## 📌 Tema
O servidor simula um **sistema de gerenciamento de alunos**, permitindo o gerenciamento completo de informações acadêmicas através de operações **CRUD** (Create, Read, Update, Delete) com autenticação **JWT**.

---

## 🎯 Funcionalidades Implementadas
- ✅ **Registro**: Criação de usuários no sistema.
- ✅ **Login**: Autenticação e geração de token JWT.
- ✅ **Listar Alunos**: Listagem de todos os alunos cadastrados.
- ✅ **Buscar Aluno**: Visualização de um aluno específico por ID.
- ✅ **Médias**: Listagem de nomes e médias de todos os alunos.
- ✅ **Aprovados**: Listagem de nomes e status de aprovação (média ≥ 6).
- ✅ **Criar**: Cadastro de novos alunos.
- ✅ **Alterar**: Edição de alunos existentes por ID.
- ✅ **Apagar**: Remoção de alunos por ID.
- ✅ Sistema de **autenticação** com tokens JWT.
- ✅ Todas as respostas em formato **JSON**.

---

## 📊 Estrutura de Dados

### Aluno
- 🆔 **id**: Identificador único (inteiro)
- 👤 **nome**: Nome do aluno (String)
- 🎫 **ra**: Registro Acadêmico (String)
- 📝 **nota1**: Primeira nota (Real)
- 📝 **nota2**: Segunda nota (Real)

### Usuário
- 👤 **username**: Nome de usuário (String)
- 🔐 **password**: Senha criptografada com bcrypt (String)

---

## 🛣️ Rotas da API

### Rotas Públicas (sem autenticação)
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/register` | Cria usuário no sistema |
| POST | `/login` | Autentica e retorna token JWT |

### Rotas Protegidas (requer token)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/alunos` | Retorna todos os alunos |
| GET | `/alunos/medias` | Retorna nomes e médias |
| GET | `/alunos/aprovados` | Retorna nomes e status |
| GET | `/alunos/:id` | Retorna aluno específico |
| POST | `/alunos` | Cria novo aluno |
| PUT | `/alunos/:id` | Atualiza aluno |
| DELETE | `/alunos/:id` | Remove aluno |

---

## 🚀 Como Executar

1️⃣ **Instale as dependências**
```bash
npm install
```

2️⃣ **Execute o servidor**
```bash
node server.js
```

3️⃣ **O servidor estará disponível em**
```
http://localhost:3000
```

---

## 🧪 Como Testar (Thunder Client / Postman)

### 1. Registrar usuário
```
POST http://localhost:3000/register
Body: { "username": "admin", "password": "123456" }
```

### 2. Fazer login
```
POST http://localhost:3000/login
Body: { "username": "admin", "password": "123456" }
```

### 3. Usar token nas rotas protegidas
```
Header: Authorization: Bearer <seu_token>
```

---

## 📦 Dependências
- **express**: Framework web
- **jsonwebtoken**: Geração e validação de tokens JWT
- **bcryptjs**: Criptografia de senhas
- **dotenv**: Variáveis de ambiente

---

## 📁 Estrutura do Projeto
```
prw2_avaliacao3/
├── server.js       # Servidor principal
├── .env            # Variáveis de ambiente (JWT_SECRET)
├── .gitignore      # Ignora node_modules
├── package.json    # Configurações e dependências
├── faca.txt        # Instruções detalhadas
└── README.md       # Este arquivo
```

---
