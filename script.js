// ===== MENU RESPONSIVO =====
// Seleciona elementos do menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Abre e fecha o menu ao clicar no hamburger
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Anima o hamburger
    hamburger.style.transform = navMenu.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
});

// Fecha o menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0)';
    });
});

// ===== VALIDAÇÃO DE FORMULÁRIO =====
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para validar nome
function isValidName(name) {
    return name.trim().length >= 3;
}

// Função para validar mensagem
function isValidMessage(message) {
    return message.trim().length >= 10;
}

// Validação em tempo real para o campo de nome
nameInput.addEventListener('blur', () => {
    if (!isValidName(nameInput.value)) {
        nameError.textContent = 'O nome deve ter pelo menos 3 caracteres.';
        nameInput.style.borderColor = '#e74c3c';
    } else {
        nameError.textContent = '';
        nameInput.style.borderColor = '#3498db';
    }
});

nameInput.addEventListener('input', () => {
    if (isValidName(nameInput.value)) {
        nameError.textContent = '';
        nameInput.style.borderColor = '#3498db';
    }
});

// Validação em tempo real para o campo de email
emailInput.addEventListener('blur', () => {
    if (!isValidEmail(emailInput.value)) {
        emailError.textContent = 'Por favor, insira um e-mail válido (ex: usuario@dominio.com).';
        emailInput.style.borderColor = '#e74c3c';
    } else {
        emailError.textContent = '';
        emailInput.style.borderColor = '#3498db';
    }
});

emailInput.addEventListener('input', () => {
    if (isValidEmail(emailInput.value)) {
        emailError.textContent = '';
        emailInput.style.borderColor = '#3498db';
    }
});

// Validação em tempo real para o campo de mensagem
messageInput.addEventListener('blur', () => {
    if (!isValidMessage(messageInput.value)) {
        messageError.textContent = 'A mensagem deve ter pelo menos 10 caracteres.';
        messageInput.style.borderColor = '#e74c3c';
    } else {
        messageError.textContent = '';
        messageInput.style.borderColor = '#3498db';
    }
});

messageInput.addEventListener('input', () => {
    if (isValidMessage(messageInput.value)) {
        messageError.textContent = '';
        messageInput.style.borderColor = '#3498db';
    }
});

// ===== ENVIO DO FORMULÁRIO =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpa mensagens de erro anteriores
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    // Reseta cores dos campos
    nameInput.style.borderColor = '#ecf0f1';
    emailInput.style.borderColor = '#ecf0f1';
    messageInput.style.borderColor = '#ecf0f1';

    // Valida todos os campos
    let isValid = true;

    if (!isValidName(nameInput.value)) {
        nameError.textContent = 'O nome deve ter pelo menos 3 caracteres.';
        nameInput.style.borderColor = '#e74c3c';
        isValid = false;
    }

    if (!isValidEmail(emailInput.value)) {
        emailError.textContent = 'Por favor, insira um e-mail válido.';
        emailInput.style.borderColor = '#e74c3c';
        isValid = false;
    }

    if (!isValidMessage(messageInput.value)) {
        messageError.textContent = 'A mensagem deve ter pelo menos 10 caracteres.';
        messageInput.style.borderColor = '#e74c3c';
        isValid = false;
    }

    // Se todos os campos são válidos, simula o envio
    if (isValid) {
        // Simula o envio (em um projeto real, isso seria uma requisição AJAX)
        console.log('Formulário enviado com sucesso!');
        console.log('Nome:', nameInput.value);
        console.log('Email:', emailInput.value);
        console.log('Mensagem:', messageInput.value);

        // Exibe modal de sucesso
        showSuccessModal();

        // Limpa o formulário
        contactForm.reset();
        nameInput.style.borderColor = '#ecf0f1';
        emailInput.style.borderColor = '#ecf0f1';
        messageInput.style.borderColor = '#ecf0f1';
    }
});

// ===== MODAL DE SUCESSO =====
// Cria o modal dinamicamente
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'successModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Mensagem Enviada!</h2>
            <p>Mensagem recebida! Te respondo assim que possível.</p>
            <button class="modal-btn" onclick="closeModal()">Fechar</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Cria o modal na primeira vez que a página carrega
createModal();

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');
    
    // Fecha o modal automaticamente após 5 segundos
    setTimeout(() => {
        closeModal();
    }, 5000);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
}

// Fecha o modal ao clicar fora dele
window.addEventListener('click', (e) => {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});

// ===== TEMA ESCURO/CLARO =====
// Verifica se há preferência salva no localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// Função para alternar tema (opcional - pode ser ativada com um botão)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
}

// ===== EFEITOS DE SCROLL =====
// Adiciona animações ao fazer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa todos os cards do portfólio
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ===== SCROLL SUAVE =====
// Já está implementado no CSS com scroll-behavior: smooth

// ===== FEEDBACK VISUAL NO FORMULÁRIO =====
// Adiciona feedback visual quando o usuário começa a digitar
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('focus', () => {
        input.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)';
    });

    input.addEventListener('blur', () => {
        input.style.boxShadow = 'none';
    });
});

// ===== INICIALIZAÇÃO =====
console.log('Portfólio carregado com sucesso!');
