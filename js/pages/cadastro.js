document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const usuarios = getUsuarios();
            const novoId = usuarios.length + 1;
            const novo = {
                id: novoId,
                nome: document.getElementById('cadNome').value,
                email: document.getElementById('cadEmail').value,
                senha: document.getElementById('cadSenha').value,
                tipo: 'artesao',
                experiencia: parseInt(document.getElementById('cadExperiencia').value),
                local: document.getElementById('cadLocal').value,
                whatsapp: document.getElementById('cadWhatsapp').value,
                dataCadastro: new Date().toISOString()
            };
            usuarios.push(novo);
            window.appData.usuarios = usuarios;
            alert('Cadastro realizado! Faça login.');
            window.location.href = 'login.html';
        });
    }
});