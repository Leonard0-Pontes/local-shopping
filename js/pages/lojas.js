document.addEventListener('DOMContentLoaded', () => {
    carregarSessao();
    if (!getCurrentUser() || getCurrentUser().tipo !== 'artesao') {
        alert('Acesso restrito a artesãos. Faça login como artesão.');
        window.location.href = 'login.html';
        return;
    }
    renderizarProdutosLojista();
    verificarAlertas();
    document.getElementById('addProdutoBtn').addEventListener('click', () => abrirModalProduto());
    document.getElementById('logoutBtnLojas')?.addEventListener('click', () => logout());
});

function renderizarProdutosLojista() {
    const user = getCurrentUser();
    const meusProdutos = getProdutos().filter(p => p.artesaoId === user.id);
    const container = document.getElementById('produtosLojistaContainer');
    if (!container) return;
    container.innerHTML = meusProdutos.map(p => `
        <div class="card">
            <img src="${p.imagem || 'https://picsum.photos/id/20/300/200'}" alt="${p.nome}">
            <div class="card-content">
                <h3>${p.nome}</h3>
                <p>${p.descricao}</p>
                <p>Material: ${p.material}</p>
                <p>Preço: R$ ${p.preco.toFixed(2)}</p>
                <p>Status: ${p.ativo ? '✅ Ativo' : '❌ Removido (90+ dias)'}</p>
                <p>Última atualização: ${new Date(p.dataUltimaAtualizacao).toLocaleDateString()}</p>
                <button class="btn-outline editarProduto" data-id="${p.id}">✏️ Editar</button>
                <button class="btn-outline" onclick="atualizarProdutoData(${p.id})">🔄 Marcar como atualizado hoje</button>
            </div>
        </div>
    `).join('');
    document.querySelectorAll('.editarProduto').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            editarProduto(id);
        });
    });
}

function atualizarProdutoData(produtoId) {
    const produtos = getProdutos();
    const idx = produtos.findIndex(p => p.id === produtoId);
    if (idx !== -1) {
        produtos[idx].dataUltimaAtualizacao = new Date().toISOString();
        produtos[idx].ativo = true; // reativa se foi removido
        saveProdutos(produtos);
        alert('Produto atualizado! Agora a contagem de dias reinicia.');
        renderizarProdutosLojista();
        verificarAlertas();
    }
}

function editarProduto(id) {
    const produto = getProdutos().find(p => p.id === id);
    if (produto) abrirModalProduto(produto);
}

function abrirModalProduto(produto = null) {
    const modal = document.getElementById('modalProduto');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('produtoForm');
    document.getElementById('produtoId').value = produto ? produto.id : '';
    document.getElementById('prodNome').value = produto ? produto.nome : '';
    document.getElementById('prodDescricao').value = produto ? produto.descricao : '';
    document.getElementById('prodMaterial').value = produto ? produto.material : '';
    document.getElementById('prodImagem').value = produto ? produto.imagem : '';
    document.getElementById('prodPreco').value = produto ? produto.preco : '';
    title.innerText = produto ? 'Editar produto' : 'Novo produto';
    modal.style.display = 'flex';
    const closeSpan = document.querySelector('.close');
    closeSpan.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
    form.onsubmit = (e) => {
        e.preventDefault();
        const user = getCurrentUser();
        const produtos = getProdutos();
        if (produto) {
            const idx = produtos.findIndex(p => p.id === produto.id);
            if (idx !== -1) {
                produtos[idx] = { ...produtos[idx], nome: document.getElementById('prodNome').value, descricao: document.getElementById('prodDescricao').value, material: document.getElementById('prodMaterial').value, imagem: document.getElementById('prodImagem').value, preco: parseFloat(document.getElementById('prodPreco').value), dataUltimaAtualizacao: new Date().toISOString() };
                saveProdutos(produtos);
            }
        } else {
            const novoId = Date.now();
            produtos.push({
                id: novoId,
                artesaoId: user.id,
                nome: document.getElementById('prodNome').value,
                descricao: document.getElementById('prodDescricao').value,
                material: document.getElementById('prodMaterial').value,
                imagem: document.getElementById('prodImagem').value,
                preco: parseFloat(document.getElementById('prodPreco').value),
                dataUltimaAtualizacao: new Date().toISOString(),
                ativo: true
            });
            saveProdutos(produtos);
        }
        modal.style.display = 'none';
        renderizarProdutosLojista();
        verificarAlertas();
    };
}

function verificarAlertas() {
    const user = getCurrentUser();
    const produtos = getProdutos().filter(p => p.artesaoId === user.id);
    const hoje = new Date();
    const alertas = produtos.filter(p => {
        const diff = Math.floor((hoje - new Date(p.dataUltimaAtualizacao)) / (1000*60*60*24));
        return diff >= 60 && diff < 90 && p.ativo;
    });
    const containerAlertas = document.getElementById('alertasContainer');
    if (containerAlertas) {
        if (alertas.length) {
            containerAlertas.innerHTML = `<strong>⚠️ Atenção:</strong> ${alertas.map(p => `${p.nome} (${Math.floor((hoje - new Date(p.dataUltimaAtualizacao))/(1000*60*60*24))} dias sem atualizar)`).join(', ')}. Atualize para não perder a vitrine.`;
        } else {
            containerAlertas.innerHTML = '';
        }
    }
}