let currentUser = null;

function getCurrentUser() { return currentUser; }
function setCurrentUser(user) { currentUser = user; updateHeaderUI(); }

function login(email, senha) {
    const users = getUsuarios();
    const user = users.find(u => u.email === email && u.senha === senha);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateHeaderUI();
        return true;
    }
    return false;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateHeaderUI();
    window.location.href = 'index.html';
}

function updateHeaderUI() {
    const loginLink = document.getElementById('loginLink');
    const userGreeting = document.getElementById('userGreeting');
    const logoutBtn = document.getElementById('logoutBtn');
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (currentUser) {
        if (loginLink) loginLink.style.display = 'none';
        if (userGreeting) { userGreeting.style.display = 'inline'; userGreeting.innerText = `Olá, ${currentUser.nome}`; }
        if (logoutBtn) logoutBtn.style.display = 'inline';
        if (userNameDisplay) userNameDisplay.innerText = `👤 ${currentUser.nome}`;
    } else {
        if (loginLink) loginLink.style.display = 'inline';
        if (userGreeting) userGreeting.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userNameDisplay) userNameDisplay.innerText = '';
    }
}

function carregarSessao() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
        try {
            currentUser = JSON.parse(saved);
            updateHeaderUI();
        } catch(e) { console.error(e); }
    }
}