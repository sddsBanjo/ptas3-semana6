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
app.get("/tarefas", (req, res) => res.json(tarefas));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));