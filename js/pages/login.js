document.addEventListener('DOMContentLoaded', () => {
    carregarSessao();
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const senha = document.getElementById('loginSenha').value;
            if (login(email, senha)) {
                alert('Login bem-sucedido!');
                window.location.href = 'index.html';
            } else {
                alert('E-mail ou senha inválidos.');
            }
        });
    }
});