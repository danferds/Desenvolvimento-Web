const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); 


const listaDeProdutos = [
  { id: 1, nome: "Smartphone Samsung Galaxy S22", tipo: "Smartphone", preco: 4299.90 },
  { id: 2, nome: "Notebook Dell Inspiron 15", tipo: "Notebook", preco: 5299.00 },
  { id: 3, nome: "Smart TV LG 50'' 4K", tipo: "Televisão", preco: 2999.99 },
  { id: 4, nome: "Fone de Ouvido JBL Tune 510BT", tipo: "Acessório", preco: 249.90 },
  { id: 5, nome: "Tablet Apple iPad 9ª Geração", tipo: "Tablet", preco: 3899.00 },
  { id: 6, nome: "Console PlayStation 5", tipo: "Console", preco: 4499.00 },
  { id: 7, nome: "Câmera GoPro HERO11", tipo: "Câmera", preco: 2699.00 },
  { id: 8, nome: "Monitor Gamer Samsung 27''", tipo: "Monitor", preco: 1499.90 },
  { id: 9, nome: "Caixa de Som Bluetooth Anker Soundcore", tipo: "Acessório", preco: 399.99 },
  { id: 10, nome: "Relógio Smartwatch Xiaomi Redmi Watch 3", tipo: "Smartwatch", preco: 749.00 }
];

const sortearNumero = () => {
  return new Promise((resolve, reject) => {
    const numeroSorteado = Math.floor(Math.random() * 101);
    
    setTimeout(() => {
      if (numeroSorteado % 2 === 0) {
        resolve(listaDeProdutos);
      } else {
        reject(new Error(`Erro no sistema, o número sorteado (${numeroSorteado}) não é par.`));
      }
    }, 4000);
  });
};


app.get('/sortear', async (req, res) => {
  try {
    const resultado = await sortearNumero();
    res.json(resultado);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
});

app.listen(PORT, () => {
});