let carrinho = [];
const taxaEntrega = 5.00; // << MUDE AQUI O VALOR DA ENTREGA
const numeroWhatsApp = "5521993282079"; // << SEU WHATSAPP COM DDD E 55

// ADICIONAR ITEM AO CARRINHO
function adicionarCarrinho(nome, preco) {
  const itemExistente = carrinho.find(i => i.nome === nome);
  if (itemExistente) {
    itemExistente.qtd++;
  } else {
    carrinho.push({ nome, preco, qtd: 1 });
  }
  atualizarCarrinho();
}

// REMOVER ITEM DO CARRINHO
function removerItem(nome) {
  carrinho = carrinho.filter(i => i.nome !== nome);
  atualizarCarrinho();
}

// ATUALIZAR TELA DO CARRINHO
function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  lista.innerHTML = "";
  let subtotal = 0;

  if (carrinho.length === 0) {
    lista.innerHTML = "<li>Seu carrinho está vazio</li>";
  } else {
    carrinho.forEach(item => {
      subtotal += item.preco * item.qtd;
      lista.innerHTML += `
        <li>
          <span>${item.qtd}x ${item.nome}</span>
          <span>
            R$ ${(item.preco * item.qtd).toFixed(2)}
            <button onclick="removerItem('${item.nome}')">X</button>
          </span>
        </li>`;
    });
  }

  const totalComEntrega = subtotal + taxaEntrega;
  document.getElementById('total').innerText = totalComEntrega.toFixed(2);
}

// ENVIAR PEDIDO VIA WHATSAPP
document.getElementById('btn-whatsapp').addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio! Adicione algo primeiro 🍟");
    return;
  }

  const endereco = document.getElementById('endereco').value;
  const pagamento = document.getElementById('pagamento').value;
  const troco = document.getElementById('troco').value;
  
  if (endereco.trim() === "") {
    alert("Por favor, preencha o endereço de entrega.");
    return;
  }

  let mensagem = "🍟 *NOVO PEDIDO - Frank Batatas* 🍟%0A%0A";
  mensagem += "*ITENS:*%0A";
  
  carrinho.forEach(item => {
    mensagem += `• *${item.qtd}x* ${item.nome} - R$ ${(item.preco * item.qtd).toFixed(2)}%0A`;
  });

  const subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0);
  
  mensagem += `%0A*Subtotal:* R$ ${subtotal.toFixed(2)}`;
  mensagem += `%0A*Taxa de Entrega:* R$ ${taxaEntrega.toFixed(2)}`;
  mensagem += `%0A*TOTAL GERAL:* R$ ${(subtotal + taxaEntrega).toFixed(2)}`;
  
  mensagem += `%0A%0A*DADOS DE ENTREGA:*`;
  mensagem += `%0A*Endereço:* ${endereco}`;
  mensagem += `%0A*Pagamento:* ${pagamento}`;
  if (pagamento === "Dinheiro" && troco.trim() !== "") {
    mensagem += ` - Troco para R$ ${troco}`;
  }

  const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
  window.open(url, '_blank');
});

// ATUALIZA O CARRINHO AO CARREGAR A PÁGINA
document.addEventListener('DOMContentLoaded', atualizarCarrinho);
