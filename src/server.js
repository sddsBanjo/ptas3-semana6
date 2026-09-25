import express from "express";

const app = express();
const port = 3000;

const tarefas = [
    { "id": 1, "titulo": "Trabalhar no meu projeto", "concluida": false },
    { "id": 2, "titulo": "Ouvir um álbum novo", "concluida": true },
    { "id": 3, "titulo": "Correr 5km", "concluida": false }
];

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

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));