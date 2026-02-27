function setStatus(type, message) {
    const box = document.getElementById('authStatus');
    if (!box) return;
    box.className = `auth-status ${type} active`;
    box.textContent = message;
}

function getResetRedirectUrl() {
    const url = new URL(window.location.href);
    url.pathname = url.pathname.replace(/forgot-password\.html$/i, 'reset-password.html');
    url.search = '';
    url.hash = '';
    return url.toString();
}

document.addEventListener('DOMContentLoaded', async () => {
    if (window.AuthGuard) {
        const redirected = await window.AuthGuard.redirectIfAuthenticated({ destination: '../../index.html' });
        if (redirected) return;
    }

    const form = document.getElementById('forgotPasswordForm');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = String(document.getElementById('email')?.value || '').trim();

        if (!email) {
            setStatus('error', 'Email wajib diisi.');
            return;
        }

        try {
            setStatus('info', 'Mengirim email reset password...');
            await window.AuthService.sendResetPassword(email, getResetRedirectUrl());
            setStatus('success', 'Link reset password sudah dikirim. Silakan cek email Anda.');
        } catch (error) {
            setStatus('error', error.message || 'Gagal mengirim email reset password.');
        }
    });
});
