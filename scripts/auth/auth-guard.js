(function () {
    function normalize(path) {
        return String(path || '').trim();
    }

    async function requireAuth(options) {
        const redirectTo = normalize(options && options.redirectTo) || '../auth/login.html';
        try {
            const session = await window.AuthService.getSession();
            if (!session) {
                window.location.href = redirectTo;
                return null;
            }
            return session;
        } catch {
            window.location.href = redirectTo;
            return null;
        }
    }

    async function redirectIfAuthenticated(options) {
        const destination = normalize(options && options.destination) || '../data-observasi.html';
        try {
            const session = await window.AuthService.getSession();
            if (session) {
                window.location.href = destination;
                return true;
            }
        } catch {}
        return false;
    }

    window.AuthGuard = {
        requireAuth,
        redirectIfAuthenticated
    };
})();
