function setStatus(type, message) {
    const box = document.getElementById('authStatus');
    if (!box) return;
    box.className = `auth-status ${type} active`;
    box.textContent = message;
}

document.addEventListener('DOMContentLoaded', async () => {
    if (window.AuthGuard) {
        const redirected = await window.AuthGuard.redirectIfAuthenticated({ destination: '../../index.html' });
        if (redirected) return;
    }

    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = String(document.getElementById('email')?.value || '').trim();
        const password = String(document.getElementById('password')?.value || '');

        if (!email || !password) {
            setStatus('error', 'Email dan password wajib diisi.');
            return;
        }

        try {
            setStatus('info', 'Memproses login...');
            await window.AuthService.signInWithPassword(email, password);
            setStatus('success', 'Login berhasil. Mengalihkan...');
            window.location.href = '../../index.html';
        } catch (error) {
            const message = String(error && error.message ? error.message : 'Login gagal.');
            setStatus('error', message);
            if (message.toLowerCase().includes('tidak dapat terhubung ke supabase')) {
                console.error('[AUTH][CONFIG] Periksa supabase-config.js -> SAMS_SUPABASE_URL dan SAMS_SUPABASE_ANON_KEY');
            }
        }
    });
});

