(function () {
    async function runProtection() {
        if (!window.AuthGuard || typeof window.AuthGuard.requireAuth !== 'function') return;

        const body = document.body;
        if (!body) return;

        const redirectTo = String(body.getAttribute('data-auth-redirect') || '').trim() || './auth/login.html';
        await window.AuthGuard.requireAuth({ redirectTo });
    }

    runProtection();
})();
