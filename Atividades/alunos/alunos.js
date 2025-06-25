const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.static('alunos'));


let alunos = [
    {
        nome: "Daniel Fernandes",
        curso: "Engenharia de Software",
        ira: 9.2
    },
    {
        nome: "Rebeca Alves",
        curso: "Ciência da Computação",
        ira: 6.8
    },
    {
        nome: "Alexandre Carvalho",
        curso: "Sistemas de Informação",
        ira: 7.3
    }
];

app.get('/alunos', (req, res) => {
    res.json(alunos);
});

app.post('/alunos', (req, res) => {
  const novoAluno = req.body;       
  alunos.push(novoAluno);            
  res.status(201).json(novoAluno);
});

app.put('/alunos/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  const alunoEditado = req.body;
  alunos[index] = alunoEditado;
  res.json(alunoEditado);
});

app.delete('/alunos/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  const alunoRemovido = alunos.splice(index, 1)[0];
  res.json(alunoRemovido);
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/alunos`);
});