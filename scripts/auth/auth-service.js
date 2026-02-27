(function () {
    let client = null;
    const SESSION_MAX_MS = 30 * 60 * 1000; // 30 menit
    const SESSION_LOGIN_AT_KEY = 'sams_login_at';
    const AUTH_STORAGE_KEY_HINTS = ['auth-token', 'supabase.auth.token', 'sb-'];

    function getSupabaseClient() {
        if (client) return client;
        if (window.__SAMS_SUPABASE_CLIENT) {
            client = window.__SAMS_SUPABASE_CLIENT;
            return client;
        }

        const supabaseFactory = window.supabase;
        const url = window.SAMS_SUPABASE_URL || '';
        const key = window.SAMS_SUPABASE_ANON_KEY || '';

        if (!supabaseFactory || typeof supabaseFactory.createClient !== 'function') {
            throw new Error('Library Supabase tidak ditemukan.');
        }
        if (!url || !key) {
            throw new Error('Konfigurasi Supabase (URL/ANON KEY) belum diisi.');
        }

        client = supabaseFactory.createClient(url, key);
        window.__SAMS_SUPABASE_CLIENT = client;
        return client;
    }

    async function getSession() {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        const session = data.session || null;
        if (!session) {
            clearLoginTimestamp();
            return null;
        }

        if (!getLoginTimestamp()) {
            setLoginTimestamp(Date.now());
        }

        if (isSessionExpired()) {
            await supabase.auth.signOut();
            clearLoginTimestamp();
            return null;
        }

        return session;
    }

    async function signInWithPassword(email, password) {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setLoginTimestamp(Date.now());
        return data;
    }

    async function signUp(email, password, metadata) {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: metadata || {} }
        });
        if (error) throw error;
        return data;
    }

    async function sendResetPassword(email, redirectTo) {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
        if (error) throw error;
        return data;
    }

    async function updatePassword(newPassword) {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
        return data;
    }

    function clearAuthStorage() {
        const storages = [window.localStorage, window.sessionStorage];
        storages.forEach((storage) => {
            if (!storage) return;
            try {
                const keysToRemove = [];
                for (let index = 0; index < storage.length; index += 1) {
                    const key = storage.key(index);
                    if (!key) continue;
                    const normalized = String(key).toLowerCase();
                    if (AUTH_STORAGE_KEY_HINTS.some((hint) => normalized.includes(hint))) {
                        keysToRemove.push(key);
                    }
                }
                keysToRemove.forEach((key) => storage.removeItem(key));
            } catch {}
        });
    }

    async function signOut(options = {}) {
        const allowNetworkFailure = options && options.allowNetworkFailure === true;
        const supabase = getSupabaseClient();
        try {
            const { error } = await supabase.auth.signOut({ scope: 'global' });
            if (error) throw error;
            clearLoginTimestamp();
            clearAuthStorage();
            return;
        } catch (globalError) {
            try {
                // Fallback: hapus session lokal agar user tetap keluar dari aplikasi.
                await supabase.auth.signOut({ scope: 'local' });
            } catch {}
            clearLoginTimestamp();
            clearAuthStorage();
            if (!allowNetworkFailure) throw globalError;
        }
    }

    function onAuthStateChange(callback) {
        const supabase = getSupabaseClient();
        return supabase.auth.onAuthStateChange(callback);
    }

    function setLoginTimestamp(value) {
        try {
            localStorage.setItem(SESSION_LOGIN_AT_KEY, String(value || Date.now()));
        } catch {}
    }

    function getLoginTimestamp() {
        try {
            return Number(localStorage.getItem(SESSION_LOGIN_AT_KEY) || 0);
        } catch {
            return 0;
        }
    }

    function clearLoginTimestamp() {
        try {
            localStorage.removeItem(SESSION_LOGIN_AT_KEY);
        } catch {}
    }

    function isSessionExpired() {
        const loginAt = getLoginTimestamp();
        if (!loginAt) return false;
        return Date.now() - loginAt > SESSION_MAX_MS;
    }

    window.AuthService = {
        getSupabaseClient,
        getSession,
        signInWithPassword,
        signUp,
        sendResetPassword,
        updatePassword,
        signOut,
        onAuthStateChange,
        setLoginTimestamp,
        clearLoginTimestamp,
        clearAuthStorage,
        isSessionExpired
    };
})();
