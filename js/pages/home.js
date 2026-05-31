document.addEventListener('DOMContentLoaded', () => {
    carregarSessao();
    renderizarVitrine();

    document.getElementById('aplicarFiltros')?.addEventListener('click', () => {
        renderizarVitrine();
    });

    if (document.getElementById('logoutBtn')) {
        document.getElementById('logoutBtn').addEventListener('click', () => logout());
    }
});

function renderizarVitrine() {
    const nomeFiltro = document.getElementById('filterNome')?.value.toLowerCase() || '';
    const expFiltro = document.getElementById('filterExperiencia')?.value;
    const localFiltro = document.getElementById('filterLocal')?.value;

    const artesaos = getUsuarios().filter(u => u.tipo === 'artesao');
    let filtrados = artesaos.filter(a => a.nome.toLowerCase().includes(nomeFiltro));
    if (expFiltro) {
        if (expFiltro === '0-2') filtrados = filtrados.filter(a => a.experiencia <= 2);
        else if (expFiltro === '3-5') filtrados = filtrados.filter(a => a.experiencia >=3 && a.experiencia <=5);
        else if (expFiltro === '6+') filtrados = filtrados.filter(a => a.experiencia >=6);
    }
    if (localFiltro) filtrados = filtrados.filter(a => a.local === localFiltro);

    const container = document.getElementById('artesaosContainer');
    if (!container) return;
    container.innerHTML = '';
    filtrados.forEach(artesao => {
        const produtos = getProdutos().filter(p => p.artesaoId === artesao.id && p.ativo === true);
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-content">
                <h3>🎨 ${artesao.nome}</h3>
                <p>⭐ Experiência: ${artesao.experiencia} anos</p>
                <p>📍 Local: ${artesao.local}</p>
                <p>📦 Produtos:</p>
                <div class="produtos-mini">
                    ${produtos.map(p => `
                        <div style="border-top:1px solid #eee; margin-top:8px; padding-top:6px;">
                            <strong>${p.nome}</strong><br>
                            <small>${p.descricao} | Material: ${p.material}</small><br>
                            <strong>R$ ${p.preco.toFixed(2)}</strong>
                            <button class="whatsapp-btn" data-artesao-whats="${artesao.whatsapp}" data-produto="${p.nome}">📱 Encomendar via WhatsApp</button>
                        </div>
                    `).join('') || '<em>Nenhum produto ativo</em>'}
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll('.whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const telefone = btn.getAttribute('data-artesao-whats');
            const produtoNome = btn.getAttribute('data-produto');
            const msg = `Olá! Gostaria de encomendar o produto ${produtoNome}. Como funcionam as opções de envio seguro para o meu endereço?`;
            const url = `https://wa.me/${telefone}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
        });
    });
}