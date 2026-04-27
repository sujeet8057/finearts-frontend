/*=============== AUTH MODAL ===============*/

const API_BASE = "https://finearts-backend-production.up.railway.app/api";

/*-- Open / Close --*/
function openAuthModal(tab = 'login') {
    document.getElementById('auth-modal').classList.add('active');
    document.getElementById('auth-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    switchTab(tab);
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('active');
    document.getElementById('auth-overlay').classList.remove('active');
    document.body.style.overflow = '';
    clearErrors();
}

/*-- Tab switching --*/
function switchTab(tab) {
    const loginForm  = document.getElementById('form-login');
    const signupForm = document.getElementById('form-signup');
    const tabLogin   = document.getElementById('tab-login');
    const tabSignup  = document.getElementById('tab-signup');

    if (tab === 'login') {
        loginForm.style.display  = 'block';
        signupForm.style.display = 'none';
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
    } else {
        loginForm.style.display  = 'none';
        signupForm.style.display = 'block';
        tabLogin.classList.remove('active');
        tabSignup.classList.add('active');
    }
    clearErrors();
}

/*-- Toggle password visibility --*/
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon  = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'ri-eye-line';
    } else {
        input.type = 'password';
        icon.className = 'ri-eye-off-line';
    }
}

/*-- Clear error messages --*/
function clearErrors() {
    const errs = document.querySelectorAll('.auth-error');
    errs.forEach(e => { e.textContent = ''; e.style.display = 'none'; });
}

function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.style.display = 'block'; }
}

/*-- Set loading state on button --*/
function setLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    if (loading) {
        btn.disabled = true;
        btn.querySelector('span').textContent = 'Please wait…';
    } else {
        btn.disabled = false;
    }
}

/*=============== LOGIN ===============*/
async function handleLogin(e) {
    e.preventDefault();
    clearErrors();

    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    setLoading('login-btn', true);

    try {
        const res = await fetch(`${API_BASE}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok) {
            // Expect { token, role, name } from backend
            const token = data.token || data.authToken || '';
            const role  = data.role  || 'USER';
            const name  = data.name  || data.username || email.split('@')[0];

            localStorage.setItem('authToken', token);
            localStorage.setItem('role',      role);
            localStorage.setItem('userName',  name);

            closeAuthModal();
            updateNavForLoggedInUser(name);
            checkAdminAccess();
            showToast(`Welcome back, ${name}!`, 'success');
        } else {
            const msg = data.message || data.error || 'Invalid email or password.';
            showError('login-error', msg);
        }
    } catch (err) {
        showError('login-error', 'Unable to connect. Please try again.');
    } finally {
        const btn = document.getElementById('login-btn');
        if (btn) { btn.disabled = false; btn.querySelector('span').textContent = 'Sign In'; }
    }
}

/*=============== SIGNUP ===============*/
async function handleSignup(e) {
    e.preventDefault();
    clearErrors();

    const name     = document.getElementById('signup-name').value.trim();
    const email    = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirm  = document.getElementById('signup-confirm').value;

    if (password !== confirm) {
        showError('signup-error', 'Passwords do not match.');
        return;
    }
    if (password.length < 6) {
        showError('signup-error', 'Password must be at least 6 characters.');
        return;
    }

    setLoading('signup-btn', true);

    try {
        const res = await fetch(`${API_BASE}/admin/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok) {
            // Auto-login after signup if token returned, else switch to login tab
            if (data.token || data.authToken) {
                const token = data.token || data.authToken;
                const role  = data.role || 'USER';
                const uname = data.name || name;

                localStorage.setItem('authToken', token);
                localStorage.setItem('role',      role);
                localStorage.setItem('userName',  uname);

                closeAuthModal();
                updateNavForLoggedInUser(uname);
                checkAdminAccess();
                showToast(`Welcome to Soni Finearts, ${uname}!`, 'success');
            } else {
                // Backend registered but didn't return token — ask user to login
                closeAuthModal();
                showToast('Account created! Please log in.', 'success');
                setTimeout(() => openAuthModal('login'), 500);
            }
        } else {
            const msg = data.message || data.error || 'Registration failed. Please try again.';
            showError('signup-error', msg);
        }
    } catch (err) {
        showError('signup-error', 'Unable to connect. Please try again.');
    } finally {
        const btn = document.getElementById('signup-btn');
        if (btn) { btn.disabled = false; btn.querySelector('span').textContent = 'Create Account'; }
    }
}

/*=============== LOGOUT ===============*/
function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    updateNavForLoggedOutUser();
    checkAdminAccess();
    showToast('You have been logged out.', 'success');
}

/*=============== NAV STATE ===============*/
function updateNavForLoggedInUser(name) {
    const loginBtn   = document.getElementById('open-login-btn');
    const userInfo   = document.getElementById('user-nav-info');
    const greeting   = document.getElementById('user-greeting');

    if (loginBtn)  loginBtn.style.display = 'none';
    if (userInfo)  userInfo.style.display = 'flex';
    if (greeting)  greeting.textContent   = `Hi, ${name}`;
}

function updateNavForLoggedOutUser() {
    const loginBtn = document.getElementById('open-login-btn');
    const userInfo = document.getElementById('user-nav-info');

    if (loginBtn) loginBtn.style.display = '';
    if (userInfo) userInfo.style.display = 'none';
}

/*-- Restore session on page load --*/
(function restoreSession() {
    const token = localStorage.getItem('authToken');
    const name  = localStorage.getItem('userName');
    if (token && name) {
        updateNavForLoggedInUser(name);
    }
})();

/*-- Close modal on Escape key --*/
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAuthModal();
});