import express from "express";

const app = express();
const port = 3000;
const chaveAutorizada = "Banjo-Kazooie.29/04";
app.use(express.json());

function autenticador(req, res, next) {
    const chaveApi = req.headers["x-api-key"];

    if (!chaveApi) return res.status(401).json({ erro: "Acesso negado. Cabeçalho 'x-api-key' não fornecido." });
    if (chaveApi !== chaveAutorizada) return res.status(401).json({ erro: "Acesso negado. Chave de API inválida." });

    next();
}

function logger(req, res, next) {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
}
app.use(logger);

const tarefas = [
    { "id": 1, "titulo": "Trabalhar no meu projeto", "concluida": false },
    { "id": 2, "titulo": "Ouvir um álbum novo", "concluida": true },
    { "id": 3, "titulo": "Correr 5km", "concluida": false }
];
let proximoId = tarefas.length + 1;

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.get("/", (req, res) => res.send("API de Tarefas no ar"));
app.get("/tarefas", (req, res) => {
    const { concluida } = req.query;

    if (concluida === undefined) return res.json(tarefas);

    const filtro = concluida === "true";
    const tarefasFiltradas = tarefas.filter(tarefa => tarefa.concluida === filtro);
    
    res.json(tarefasFiltradas);
});
app.get("/tarefas/:id", (req, res) => {
    const id = Number(req.params.id);

    const resultado = tarefas.find((tarefa) => tarefa.id === id);
    if (!resultado) return res.status(404).json({ erro: `Tarefa de ID ${id} não encontrada.` });

    res.json(resultado);
});
app.post("/tarefas", [autenticador], (req, res) => {
    const { titulo, concluida } = req.body;

    const novaTarefa = {
        id: proximoId++,
        titulo,
        concluida,
    };
    tarefas.push(novaTarefa);
    
    res.status(201).json(novaTarefa);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));