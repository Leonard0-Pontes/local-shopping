// Dados iniciais em memória (simula localStorage/bd)
window.appData = {
    usuarios: [
        { id: 1, nome: "Ana Cerâmica", email: "ana@arte.com", senha: "123", tipo: "artesao", experiencia: 5, local: "SP", whatsapp: "11999999999", dataCadastro: new Date().toISOString() },
        { id: 2, nome: "João Madeira", email: "joao@madeira.com", senha: "123", tipo: "artesao", experiencia: 12, local: "MG", whatsapp: "31988888888", dataCadastro: new Date().toISOString() }
    ],
    produtos: [
        { id: 101, artesaoId: 1, nome: "Vaso de Cerâmica", descricao: "Vaso rústico queimado a lenha", material: "Argila", imagem: "https://picsum.photos/id/146/300/200", preco: 89.90, dataUltimaAtualizacao: new Date(Date.now() - 50 * 86400000).toISOString(), ativo: true },
        { id: 102, artesaoId: 1, nome: "Caneca Artesanal", descricao: "Caneca esmaltada à mão", material: "Cerâmica", imagem: "https://picsum.photos/id/30/300/200", preco: 45.00, dataUltimaAtualizacao: new Date(Date.now() - 70 * 86400000).toISOString(), ativo: true },
        { id: 103, artesaoId: 2, nome: "Tábua de Corte", descricao: "Madeira de demolição", material: "Carvalho", imagem: "https://picsum.photos/id/158/300/200", preco: 120.00, dataUltimaAtualizacao: new Date(Date.now() - 95 * 86400000).toISOString(), ativo: false } // exemplo >90 dias
    ]
};

// Funções auxiliares de storage (simulação)
function getUsuarios() { return window.appData.usuarios; }
function getProdutos() { return window.appData.produtos; }
function saveProdutos(produtos) { window.appData.produtos = produtos; notificarProdutosDesatualizados(); }

function notificarProdutosDesatualizados() {
    const hoje = new Date();
    const produtos = getProdutos();
    produtos.forEach(p => {
        const ultimaAtualizacao = new Date(p.dataUltimaAtualizacao);
        const diffDias = Math.floor((hoje - ultimaAtualizacao) / (1000 * 60 * 60 * 24));
        const artesao = getUsuarios().find(u => u.id === p.artesaoId);
        if (diffDias >= 60 && diffDias < 90 && p.ativo) {
            console.log(`ALERTA: Produto "${p.nome}" do artesão ${artesao?.nome} está há ${diffDias} dias sem atualização.`);
            mostrarNotificacao(`⚠️ Produto "${p.nome}" sem atualização há ${diffDias} dias. Atualize ou será removido.`);
        }
        if (diffDias >= 90 && p.ativo) {
            p.ativo = false;
            console.log(`REMOVER: Produto "${p.nome}" removido da vitrine por +90 dias sem atualização.`);
            mostrarNotificacao(`❌ Produto "${p.nome}" foi removido da vitrine por inatividade.`);
        }
    });
    saveProdutos(produtos);
}

function mostrarNotificacao(msg) {
    const toast = document.getElementById('toastNotification');
    if (toast) {
        toast.innerText = msg;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 4000);
    } else alert(msg);
}