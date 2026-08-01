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

    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const fullName = String(document.getElementById('fullName')?.value || '').trim();
        const jobTitle = String(document.getElementById('jobTitle')?.value || '').trim();
        const email = String(document.getElementById('email')?.value || '').trim();
        const password = String(document.getElementById('password')?.value || '');
        const confirmPassword = String(document.getElementById('confirmPassword')?.value || '');

        if (!fullName || !jobTitle || !email || !password || !confirmPassword) {
            setStatus('error', 'Semua field wajib diisi.');
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
            setStatus('info', 'Mendaftarkan akun...');
            const data = await window.AuthService.signUp(email, password, {
                full_name: fullName,
                job_title: jobTitle,
                role: 'admin'
            });

            if (data && data.session && data.user) {
                const client = window.AuthService.getSupabaseClient();
                await client.from(window.SAMS_SUPABASE_PROFILE_TABLE || 'profiles').upsert({
                    id: data.user.id,
                    full_name: fullName,
                    job_title: jobTitle,
                    role: 'admin'
                }, { onConflict: 'id' });
            }

            setStatus('success', 'Registrasi berhasil. Cek email untuk verifikasi sebelum login.');
        } catch (error) {
            setStatus('error', error.message || 'Registrasi gagal.');
        }
    });
});
