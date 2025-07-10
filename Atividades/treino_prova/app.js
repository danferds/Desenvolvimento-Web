const url = 'http://localhost:3000/sortear';

const tabela = document.getElementById('corpo-tabela');


const carregarProdutos = async (url) => {
    tabela.innerHTML = '';

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      const erroServidor = await resposta.json();
      throw new Error(erroServidor.mensagem);
    }
    const dados = await resposta.json();
    
    const precos = dados.map(produto => produto.preco);
    const menorPreco = Math.min(...precos);
    const maiorPreco = Math.max(...precos);

    dados.forEach(produto => {
        const linha = document.createElement('tr');

        if(produto.preco === menorPreco) {
            linha.style.backgroundColor = '#e6ffed'
            
        }

        if(produto.preco === maiorPreco) {
            linha.style.backgroundColor = 'red'
            
        }
        
        const id = document.createElement('td');
        id.textContent = produto.id;

        const nome = document.createElement('td');
        nome.textContent = produto.nome;

        const tipo = document.createElement('td');
        tipo.textContent = produto.tipo;

        const preco = document.createElement('td');
        preco.textContent = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        linha.appendChild(id);
        linha.appendChild(nome);
        linha.appendChild(tipo);
        linha.appendChild(preco);
        
        tabela.appendChild(linha);
    });

  } catch (erro) {
    console.error('Ocorreu um erro ao buscar os dados:', erro.message);
    tabela.innerHTML = `<tr><td colspan="4">Erro ao carregar os produtos: ${erro.message}</td></tr>`;
  }
};

carregarProdutos(url);