import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const users = [];

const alunos = [
    {
        id: 1,
        nome: "Ana Silva",
        ra: "123456",
        nota1: 8.5,
        nota2: 7.0
    },
    {
        id: 2,
        nome: "Carlos Santos",
        ra: "234567",
        nota1: 5.0,
        nota2: 4.5
    },
    {
        id: 3,
        nome: "Maria Oliveira",
        ra: "345678",
        nota1: 9.0,
        nota2: 8.5
    }
];

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    console.log(users);
    res.status(201).json({ message: "Usuario registrado com sucesso" });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Login incorreto" });
    }
    const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h', algorithm: 'HS256' }
    );
    res.json({ token });
    console.log('Login efetuado pelo usuario ' + user.username);
});

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Authorization: ' + authHeader);
    let token;
    if (authHeader) {
        const parts = authHeader.split(' ');
        if (parts.length === 2) {
            token = parts[1];
        }
    }
    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token nao fornecido." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Acesso negado. Token expirado." });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: "Acesso negado. Token invalido." });
            } else {
                return res.status(403).json({ message: "Acesso negado. Erro na verificacao do token." });
            }
        }
        req.user = user;
        const issuedAtISO = new Date(user.iat * 1000).toISOString();
        const expiresAtISO = new Date(user.exp * 1000).toISOString();
        console.log(`Token validado para usuario: ${user.username}
Emitido em: ${issuedAtISO}
Expira em: ${expiresAtISO}
`);
        next();
    });
};

app.use(authenticateJWT);

app.get('/alunos', (req, res) => {
    res.status(200).json(alunos);
});

app.get('/alunos/medias', (req, res) => {
    const medias = alunos.map(aluno => {
        const media = (aluno.nota1 + aluno.nota2) / 2;
        return {
            nome: aluno.nome,
            media: media
        };
    });
    res.status(200).json(medias);
});

app.get('/alunos/aprovados', (req, res) => {
    const aprovados = alunos.map(aluno => {
        const media = (aluno.nota1 + aluno.nota2) / 2;
        return {
            nome: aluno.nome,
            status: media >= 6 ? "aprovado" : "reprovado"
        };
    });
    res.status(200).json(aprovados);
});

app.get('/alunos/:id', (req, res) => {
    const id = Number(req.params.id);
    const aluno = alunos.find(aluno => aluno.id === id);
    if (!aluno) {
        return res.status(404).json({ message: "Aluno nao encontrado" });
    }
    res.status(200).json(aluno);
});

app.post('/alunos', (req, res) => {
    const novoAluno = req.body;
    alunos.push(novoAluno);
    console.log(alunos);
    res.status(201).json({ message: "Aluno cadastrado com sucesso", aluno: novoAluno });
});

app.put('/alunos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = alunos.findIndex(aluno => aluno.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Aluno nao encontrado" });
    }
    alunos[index] = { ...alunos[index], ...req.body };
    res.status(200).json({ message: "Aluno atualizado com sucesso", aluno: alunos[index] });
});

app.delete('/alunos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = alunos.findIndex(aluno => aluno.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Aluno nao encontrado" });
    }
    alunos.splice(index, 1);
    res.status(200).json({ message: "Aluno removido com sucesso" });
});

app.listen(3000, () => {
    console.log("Servidor ativo e aguardando requisicoes...");
});
