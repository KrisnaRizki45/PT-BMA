function setStatus(type, message) {
    const box = document.getElementById('authStatus');
    if (!box) return;
    box.className = `auth-status ${type} active`;
    box.textContent = message;
}

async function ensureRecoverySession() {
    // Supabase JS v2 akan memproses token recovery dari hash URL saat getSession dipanggil.
    const session = await window.AuthService.getSession();
    return !!session;
}

document.addEventListener('DOMContentLoaded', async () => {
    const hasSession = await ensureRecoverySession();
    if (!hasSession) {
        setStatus('error', 'Link reset tidak valid atau sudah kedaluwarsa. Minta link baru.');
    }

    const form = document.getElementById('resetPasswordForm');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const password = String(document.getElementById('password')?.value || '');
        const confirmPassword = String(document.getElementById('confirmPassword')?.value || '');

        if (!password || !confirmPassword) {
            setStatus('error', 'Password baru wajib diisi.');
            return;
        }
        if (password.length < 6) {
            setStatus('error', 'Password minimal 6 karakter.');
            return;
        }
        if (password !== confirmPassword) {
            setStatus('error', 'Konfirmasi password tidak cocok.');
            return;
        }

        try {
            setStatus('info', 'Memperbarui password...');
            await window.AuthService.updatePassword(password);
            setStatus('success', 'Password berhasil diubah. Mengalihkan ke login...');
            setTimeout(() => {
                window.location.href = './login.html';
            }, 900);
        } catch (error) {
            setStatus('error', error.message || 'Gagal mengubah password.');
        }
    });
});
