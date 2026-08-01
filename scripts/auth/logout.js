document.addEventListener('DOMContentLoaded', async () => {
    const status = document.getElementById('authStatus');
    const setStatus = (message) => {
        if (!status) return;
        status.className = 'auth-status info active';
        status.textContent = message;
    };

    try {
        setStatus('Memproses logout...');
        await window.AuthService.signOut({ allowNetworkFailure: true });
        setStatus('Logout berhasil. Mengalihkan ke halaman login...');
        window.location.href = './login.html';
    } catch (error) {
        if (window.AuthService && typeof window.AuthService.clearLoginTimestamp === 'function') {
            window.AuthService.clearLoginTimestamp();
        }
        if (window.AuthService && typeof window.AuthService.clearAuthStorage === 'function') {
            window.AuthService.clearAuthStorage();
        }
        if (status) {
            status.className = 'auth-status info active';
            status.textContent = 'Koneksi logout global bermasalah. Session lokal dibersihkan, mengalihkan ke login...';
        }
        setTimeout(() => {
            window.location.href = './login.html';
        }, 300);
    }
});
