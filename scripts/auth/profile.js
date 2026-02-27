let profileMode = 'view';
let currentPhotoDataUrl = '';

function setProfileStatus(type, message) {
    if (window.Swal && typeof window.Swal.fire === 'function') {
        const icon = type === 'error' ? 'error' : type === 'success' ? 'success' : 'info';
        window.Swal.fire({
            toast: true,
            position: 'top-end',
            timer: 2200,
            timerProgressBar: true,
            showConfirmButton: false,
            icon,
            title: message
        });
    }
}

function getProfileTableName() {
    return window.SAMS_SUPABASE_PROFILE_TABLE || 'profiles';
}

function setMode(mode) {
    profileMode = mode === 'edit' ? 'edit' : 'view';
    const form = document.getElementById('profileForm');
    const fullNameInput = document.getElementById('profileFullName');
    const jobTitleInput = document.getElementById('profileJobTitle');
    const photoInput = document.getElementById('profilePhotoFile');
    const saveBtn = document.getElementById('profileSaveBtn');
    const editBtn = document.getElementById('profileEditModeBtn');

    const isEdit = profileMode === 'edit';
    if (form) form.classList.toggle('readonly', !isEdit);
    if (fullNameInput) fullNameInput.disabled = !isEdit;
    if (jobTitleInput) jobTitleInput.disabled = !isEdit;
    if (photoInput) photoInput.disabled = !isEdit;
    if (saveBtn) saveBtn.style.display = isEdit ? 'inline-block' : 'none';
    if (editBtn) editBtn.style.display = isEdit ? 'none' : 'inline-block';
}

function renderPhotoPreview(dataUrl) {
    const preview = document.getElementById('profilePhotoPreview');
    if (!preview) return;
    preview.src = dataUrl || '../assets/logo_Bhumiadya.png';
}

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(new Error('File foto tidak dapat dibaca.'));
        reader.readAsDataURL(file);
    });
}

async function loadProfileData() {
    const session = await window.AuthService.getSession();
    const user = session && session.user ? session.user : null;
    if (!user) throw new Error('Session login tidak ditemukan.');

    const emailInput = document.getElementById('profileEmail');
    const roleInput = document.getElementById('profileRole');
    const fullNameInput = document.getElementById('profileFullName');
    const jobTitleInput = document.getElementById('profileJobTitle');
    if (emailInput) emailInput.value = String(user.email || '');

    const client = window.AuthService.getSupabaseClient();
    const tableName = getProfileTableName();
    const result = await client
        .from(tableName)
        .select('id, full_name, role, job_title, avatar_url')
        .eq('id', user.id)
        .maybeSingle();
    const profile = result.error ? null : result.data;

    if (fullNameInput) {
        fullNameInput.value = String((profile && profile.full_name) || (user.user_metadata && user.user_metadata.full_name) || '');
    }
    if (roleInput) {
        roleInput.value = String((profile && profile.role) || 'viewer');
    }
    if (jobTitleInput) {
        jobTitleInput.value = String((profile && profile.job_title) || (user.user_metadata && user.user_metadata.job_title) || '');
    }

    // Simpan foto profile di tabel profiles, bukan metadata auth.
    currentPhotoDataUrl = String((profile && profile.avatar_url) || '');
    renderPhotoPreview(currentPhotoDataUrl);
}

async function handlePhotoChange() {
    const photoInput = document.getElementById('profilePhotoFile');
    const file = photoInput && photoInput.files ? photoInput.files[0] : null;
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        setProfileStatus('error', 'File foto harus berupa gambar.');
        photoInput.value = '';
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        setProfileStatus('error', 'Ukuran foto maksimal 2 MB.');
        photoInput.value = '';
        return;
    }
    try {
        currentPhotoDataUrl = await fileToDataUrl(file);
        renderPhotoPreview(currentPhotoDataUrl);
    } catch (error) {
        setProfileStatus('error', error.message || 'Gagal memproses foto.');
    }
}

async function saveProfileData(event) {
    if (event) event.preventDefault();
    if (profileMode !== 'edit') {
        setProfileStatus('info', 'Aktifkan mode edit terlebih dahulu.');
        return;
    }

    const fullName = String(document.getElementById('profileFullName')?.value || '').trim();
    const jobTitle = String(document.getElementById('profileJobTitle')?.value || '').trim();
    const saveBtn = document.getElementById('profileSaveBtn');

    try {
        setProfileStatus('info', 'Menyimpan profil...');
        if (saveBtn) saveBtn.disabled = true;
        const session = await window.AuthService.getSession();
        const user = session && session.user ? session.user : null;
        if (!user) throw new Error('Session login tidak ditemukan.');

        const client = window.AuthService.getSupabaseClient();
        const tableName = getProfileTableName();
        const basePayload = {
            full_name: fullName,
            job_title: jobTitle,
            avatar_url: currentPhotoDataUrl || null
        };

        const authUpdateResult = await client.auth.updateUser({
            data: {
                full_name: fullName,
                job_title: jobTitle
            }
        });
        if (authUpdateResult.error) throw authUpdateResult.error;

        // Sync ke tabel profiles (best effort, tidak memblokir jika policy tabel berbeda).
        const profileUpsertResult = await client
            .from(tableName)
            .upsert({
                id: user.id,
                ...basePayload
            }, { onConflict: 'id' });
        if (profileUpsertResult.error) {
            setProfileStatus('info', 'Profil auth tersimpan, sinkron tabel profiles dilewati.');
        }

        setProfileStatus('success', 'Profil berhasil diperbarui.');
        setMode('view');
    } catch (error) {
        const message = error && error.message ? error.message : 'Gagal menyimpan profil.';
        setProfileStatus('error', message);
    } finally {
        if (saveBtn) saveBtn.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    setMode('view');

    if (window.AuthGuard) {
        const session = await window.AuthGuard.requireAuth({ redirectTo: './auth/login.html' });
        if (!session) return;
    }

    try {
        setProfileStatus('info', 'Memuat profil...');
        await loadProfileData();
        setMode('view');
        setProfileStatus('success', 'Profil berhasil dimuat.');
    } catch (error) {
        setMode('view');
        setProfileStatus('error', error.message || 'Gagal memuat profil.');
    }

    const form = document.getElementById('profileForm');
    if (form) form.addEventListener('submit', saveProfileData);

    const editBtn = document.getElementById('profileEditModeBtn');
    const saveBtn = document.getElementById('profileSaveBtn');
    const photoInput = document.getElementById('profilePhotoFile');

    if (editBtn) editBtn.addEventListener('click', () => {
        setMode('edit');
        setProfileStatus('info', 'Mode edit aktif.');
    });
    if (saveBtn) saveBtn.addEventListener('click', saveProfileData);
    if (photoInput) photoInput.addEventListener('change', handlePhotoChange);
});
