// Navigation
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
const observasiDropdown = document.getElementById('observasiDropdown');
const observasiToggle = document.getElementById('observasiToggle');
const dropdownLinks = document.querySelectorAll('.dropdown-link');
const navSearchInput = document.getElementById('navSearchInput');
const navSearchBtn = document.getElementById('navSearchBtn');
const navSearchWrap = document.getElementById('navSearchWrap');
const navbar = document.querySelector('.navbar');
const heroSection = document.querySelector('.hero');
const heroBgLayer = document.getElementById('heroBgLayer');
const hseInfoImage = document.getElementById('hseInfoImage');
const safetyInductionVideo = document.getElementById('safetyInductionVideo');
const reportSection = document.getElementById('observasi-report');
const globalLoading = document.getElementById('globalLoading');
const globalLoadingText = document.getElementById('globalLoadingText');

// Observasi UI
const searchInput = document.getElementById('searchInput');
const filterType = document.getElementById('filterType');
const observasiFormCard = document.getElementById('observasiFormCard');
const observasiForm = document.getElementById('observasiForm');
const addObservasiBtn = document.getElementById('addObservasiBtn');
const cancelObservasiBtn = document.getElementById('cancelObservasiBtn');
const uploadObservasiFile = document.getElementById('uploadObservasiFile');
const importObservasiBtn = document.getElementById('importObservasiBtn');
const exportObservasiBtn = document.getElementById('exportObservasiBtn');
const templateObservasiBtn = document.getElementById('templateObservasiBtn');
const clearObservasiBtn = document.getElementById('clearObservasiBtn');
const uploadFileName = document.getElementById('uploadFileName');
const includePhotoCsv = document.getElementById('includePhotoCsv');

const reportImportBtn = document.getElementById('reportImportBtn');
const reportExportBtn = document.getElementById('reportExportBtn');
const reportTemplateBtn = document.getElementById('reportTemplateBtn');
const reportUploadFile = document.getElementById('reportUploadFile');
const reportUploadName = document.getElementById('reportUploadName');

const progressImportBtn = document.getElementById('progressImportBtn');
const progressExportBtn = document.getElementById('progressExportBtn');
const progressTemplateBtn = document.getElementById('progressTemplateBtn');
const progressUploadFile = document.getElementById('progressUploadFile');
const progressUploadName = document.getElementById('progressUploadName');
const progressDeleteAllBtn = document.getElementById('progressDeleteAllBtn');
const p2k3UploadBtn = document.getElementById('p2k3UploadBtn');
const p2k3UploadInput = document.getElementById('p2k3UploadInput');
const p2k3ClearBtn = document.getElementById('p2k3ClearBtn');
const p2k3FileName = document.getElementById('p2k3FileName');
const p2k3FileLinks = document.getElementById('p2k3FileLinks');
const p2k3EmptyState = document.getElementById('p2k3EmptyState');
const hseUploadBtn = document.getElementById('hseUploadBtn');
const hseUploadInput = document.getElementById('hseUploadInput');
const hseClearBtn = document.getElementById('hseClearBtn');
const hseFileName = document.getElementById('hseFileName');
const hseFileLinks = document.getElementById('hseFileLinks');
const hseEmptyState = document.getElementById('hseEmptyState');

const formTitle = document.getElementById('formTitle');
const editNoInput = document.getElementById('editNo');
const formTanggal = document.getElementById('formTanggal');
const formObservasiBy = document.getElementById('formObservasiBy');
const formDepartemen = document.getElementById('formDepartemen');
const formTipe = document.getElementById('formTipe');
const formLokasi = document.getElementById('formLokasi');
const formStatus = document.getElementById('formStatus');
const formPhotoInput = document.getElementById('formPhotoInput');
const formPhotoDescription = document.getElementById('formPhotoDescription');
const formPhotoPreviewWrap = document.getElementById('formPhotoPreviewWrap');
const formPhotoPreview = document.getElementById('formPhotoPreview');
const formPhotoFileName = document.getElementById('formPhotoFileName');
const clearPhotoBtn = document.getElementById('clearPhotoBtn');

const observasiTableBody = document.getElementById('observasiTableBody');
const progressTableBody = document.getElementById('progressTableBody');
const reportTypeTableBody = document.getElementById('reportTypeTableBody');
const reportDeptTableBody = document.getElementById('reportDeptTableBody');
const observasiPaginationInfo = document.getElementById('observasiPaginationInfo');
const observasiPaginationPrev = document.getElementById('observasiPaginationPrev');
const observasiPaginationNext = document.getElementById('observasiPaginationNext');
const progressPaginationInfo = document.getElementById('progressPaginationInfo');
const progressPaginationPrev = document.getElementById('progressPaginationPrev');
const progressPaginationNext = document.getElementById('progressPaginationNext');
const reportTypePaginationInfo = document.getElementById('reportTypePaginationInfo');
const reportTypePaginationPrev = document.getElementById('reportTypePaginationPrev');
const reportTypePaginationNext = document.getElementById('reportTypePaginationNext');
const reportDeptPaginationInfo = document.getElementById('reportDeptPaginationInfo');
const reportDeptPaginationPrev = document.getElementById('reportDeptPaginationPrev');
const reportDeptPaginationNext = document.getElementById('reportDeptPaginationNext');

// Charts
let typeChartInstance = null;
let deptChartInstance = null;

// Data Store
const STORAGE_KEY = 'sams_observasi_data_v2';
const STORAGE_KEY_P2K3 = 'sams_p2k3_upload_v1';
const STORAGE_KEY_HSE = 'sams_hse_uploads_v1';
const SUPABASE_TABLE = window.SAMS_SUPABASE_TABLE || 'observasi_records';
const SUPABASE_P2K3_TABLE = window.SAMS_SUPABASE_P2K3_TABLE || 'meeting_p2k3_files';
const SUPABASE_HSE_TABLE = window.SAMS_SUPABASE_HSE_TABLE || 'hse_observasi_files_2026';
const SUPABASE_DOC_BUCKET = window.SAMS_SUPABASE_DOC_BUCKET || 'sams-documents';
const SUPABASE_URL = window.SAMS_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = window.SAMS_SUPABASE_ANON_KEY || '';
let supabaseClient = null;
let useSupabase = false;
let syncWarned = false;
let localCacheWarned = false;
let loadingCounter = 0;
const SIDEBAR_COLLAPSED_KEY = 'sams_sidebar_collapsed_v1';

const state = {
    records: [],
    filtered: []
};
const PAGE_SIZE = {
    observasi: 10,
    progress: 10,
    report: 10
};
const paginationState = {
    observasi: 1,
    progress: 1,
    reportType: 1,
    reportDept: 1
};
const reportSummaryState = {
    typeCounts: {},
    deptCounts: {}
};
const p2k3State = {
    id: '',
    fileUrl: '',
    storagePath: '',
    fileName: '',
    defaultViewerUrl: ''
};
let includePhotoCsvDefault = false;
const hseFiles = [];
let currentFormPhotoDataUrl = '';
let currentFormPhotoName = '';
let isPhotoProcessing = false;
let isReportRenderEnabled = false;
const ASSET_BASE = normalizePathname(window.location.pathname).startsWith('pages/') ? '../assets/' : 'assets/';
const rotatingAssetImages = [
    `${ASSET_BASE}YEL08697.JPG.jpeg`,
    `${ASSET_BASE}YEL08705.JPG.jpeg`,
    `${ASSET_BASE}YEL08730.JPG.jpeg`,
    `${ASSET_BASE}YEL08737.JPG.jpeg`,
    `${ASSET_BASE}YEL08781.JPG.jpeg`,
    `${ASSET_BASE}YEL08799.JPG.jpeg`,
    `${ASSET_BASE}YEL08810.JPG.jpeg`,
    `${ASSET_BASE}YEL08814.JPG.jpeg`,
    `${ASSET_BASE}YEL08836.JPG.jpeg`,
    `${ASSET_BASE}YEL08842.JPG.jpeg`,
    `${ASSET_BASE}YEL08844.JPG.jpeg`,
    `${ASSET_BASE}YEL08854.JPG.jpeg`,
    `${ASSET_BASE}YEL08870.JPG.jpeg`,
    `${ASSET_BASE}YEL08879.JPG.jpeg`,
    `${ASSET_BASE}YEL08904.JPG.jpeg`,
    `${ASSET_BASE}YEL08905.JPG.jpeg`,
    `${ASSET_BASE}YEL08922.JPG.jpeg`,
    `${ASSET_BASE}YEL08926.JPG.jpeg`,
    `${ASSET_BASE}YEL08949.JPG.jpeg`,
    `${ASSET_BASE}YEL08967.JPG.jpeg`,
    `${ASSET_BASE}YEL08970.JPG.jpeg`,
    `${ASSET_BASE}YEL08975.JPG.jpeg`,
    `${ASSET_BASE}YEL08983.JPG.jpeg`,
    `${ASSET_BASE}YEL08992.JPG.jpeg`,
    `${ASSET_BASE}YEL09007.JPG.jpeg`,
    `${ASSET_BASE}YEL09045.JPG.jpeg`,
    `${ASSET_BASE}YEL09048.JPG.jpeg`,
    `${ASSET_BASE}YEL09049.JPG.jpeg`,
    `${ASSET_BASE}YEL09052.JPG.jpeg`,
    `${ASSET_BASE}YEL09087.JPG.jpeg`,
    `${ASSET_BASE}YEL09106.JPG.jpeg`
];

function generateId() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function showGlobalLoading(message = 'Memproses data...') {
    if (!globalLoading) return;
    loadingCounter += 1;
    globalLoading.classList.add('active');
    globalLoading.setAttribute('aria-busy', 'true');
    if (globalLoadingText) globalLoadingText.textContent = message;
}

function hideGlobalLoading() {
    if (!globalLoading) return;
    loadingCounter = Math.max(0, loadingCounter - 1);
    if (loadingCounter > 0) return;
    globalLoading.classList.remove('active');
    globalLoading.setAttribute('aria-busy', 'false');
    if (globalLoadingText) globalLoadingText.textContent = 'Loading...';
}

function normalizeStatus(status) {
    const raw = String(status || '').trim().toLowerCase();
    if (raw === 'done' || raw === 'selesai') return 'Done';
    if (raw === 'in progress' || raw === 'progress' || raw === 'on progress') return 'In Progress';
    return 'Pending';
}

function getCurrentYear() {
    return new Date().getFullYear();
}

function getTodayIsoDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function applyCurrentYearLabels() {
    const year = getCurrentYear();
    document.title = `SAMS - BMA ${year} | PT Bhumiadya Indonesia`;

    document.querySelectorAll('[data-current-year-text]').forEach((node) => {
        const prefix = node.getAttribute('data-current-year-text') || '';
        node.textContent = `${prefix} ${year}`;
    });

    document.querySelectorAll('[data-current-year-html]').forEach((node) => {
        const prefix = node.getAttribute('data-current-year-html') || '';
        node.innerHTML = `${prefix} ${year}`;
    });
}

function formatDateForDisplay(dateValue) {
    const value = String(dateValue || '').trim();
    if (!value) return '';
    if (value.includes('/')) return value;

    const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
        const [, year, month, day] = isoMatch;
        return `${day}/${month}/${year}`;
    }

    return value;
}

function formatDateForInput(dateValue) {
    const value = String(dateValue || '').trim();
    if (!value) return '';
    const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
        const [, year, month, day] = isoMatch;
        return `${year}-${month}-${day}`;
    }

    const parts = value.split('/');
    if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month}-${day}`;
    }

    return '';
}

function normalizeObservasiItem(item, fallbackNo) {
    return {
        id: item.id || generateId(),
        no: Number(item.no) || fallbackNo,
        tanggal: formatDateForDisplay(item.tanggal || item.date || ''),
        observasiBy: String(item.observasiBy || item.observer || item.pic || '').trim(),
        departemen: String(item.departemen || item.department || item.dept || '').trim(),
        tipe: String(item.tipe || item.type || item.jenis || '').trim(),
        lokasi: String(item.lokasi || item.location || item.area || '').trim(),
        photoDataUrl: String(item.photoDataUrl || item.photo || item.foto || item.image || item.photo_url || '').trim(),
        photoName: String(item.photoName || item.fotoNama || item.photo_name || '').trim(),
        photoDescription: String(item.photoDescription || item.deskripsiGambar || item.fotoDeskripsi || item.imageDescription || '').trim(),
        status: normalizeStatus(item.status || 'Pending')
    };
}

function reindexRecords() {
    state.records = state.records.map((item, idx) => normalizeObservasiItem({ ...item, no: idx + 1 }, idx + 1));
}

function saveLocalCache() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records));
    } catch {
        if (!localCacheWarned) {
            showNotification('Penyimpanan lokal penuh. Kurangi ukuran/jumlah foto observasi.', 'error');
            localCacheWarned = true;
        }
    }
}

function loadLocalCache() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((item, idx) => normalizeObservasiItem(item, idx + 1));
    } catch {
        return [];
    }
}

function saveP2k3LocalCache(item) {
    try {
        localStorage.setItem(STORAGE_KEY_P2K3, JSON.stringify(item || null));
    } catch {
        showNotification('Gagal menyimpan cache P2K3 di browser.', 'error');
    }
}

function loadP2k3LocalCache() {
    const raw = localStorage.getItem(STORAGE_KEY_P2K3);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return null;
        const fileUrl = String(parsed.fileUrl || '');
        if (fileUrl.startsWith('blob:')) return null;
        return {
            id: String(parsed.id || ''),
            fileName: String(parsed.fileName || ''),
            fileUrl,
            storagePath: String(parsed.storagePath || '')
        };
    } catch {
        return null;
    }
}

function saveHseLocalCache(items) {
    try {
        localStorage.setItem(STORAGE_KEY_HSE, JSON.stringify(Array.isArray(items) ? items : []));
    } catch {
        showNotification('Gagal menyimpan cache HSE di browser.', 'error');
    }
}

function loadHseLocalCache() {
    const raw = localStorage.getItem(STORAGE_KEY_HSE);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.map((item) => ({
            id: String(item.id || ''),
            name: String(item.name || ''),
            url: String(item.url || ''),
            storagePath: String(item.storagePath || '')
        })).filter((item) => item.name && item.url && !item.url.startsWith('blob:'));
    } catch {
        return [];
    }
}

function sanitizeFileName(fileName) {
    return String(fileName || 'file')
        .trim()
        .replace(/[^a-zA-Z0-9._-]/g, '_');
}

function splitStoragePathFromPublicUrl(publicUrl) {
    const marker = `/object/public/${SUPABASE_DOC_BUCKET}/`;
    const idx = String(publicUrl || '').indexOf(marker);
    if (idx < 0) return '';
    return decodeURIComponent(publicUrl.slice(idx + marker.length));
}

function initSupabase() {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
    if (!window.supabase || typeof window.supabase.createClient !== 'function') return;

    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    useSupabase = true;
}

async function uploadDocumentToSupabase(file, folder) {
    if (!useSupabase || !supabaseClient) {
        throw new Error('Supabase belum aktif.');
    }

    const safeName = sanitizeFileName(file.name);
    const path = `${folder}/${Date.now()}_${Math.random().toString(16).slice(2)}_${safeName}`;
    const uploadResult = await supabaseClient.storage
        .from(SUPABASE_DOC_BUCKET)
        .upload(path, file, { upsert: false });
    if (uploadResult.error) throw uploadResult.error;

    const { data } = supabaseClient.storage.from(SUPABASE_DOC_BUCKET).getPublicUrl(path);
    return {
        path,
        publicUrl: data && data.publicUrl ? data.publicUrl : ''
    };
}

async function deleteDocumentFromSupabase(storagePath) {
    if (!storagePath || !useSupabase || !supabaseClient) return;
    const removeResult = await supabaseClient.storage.from(SUPABASE_DOC_BUCKET).remove([storagePath]);
    if (removeResult.error) throw removeResult.error;
}

async function loadP2k3FileFromSupabase() {
    if (!useSupabase || !supabaseClient) return null;

    const result = await supabaseClient
        .from(SUPABASE_P2K3_TABLE)
        .select('id, file_name, public_url, storage_path')
        .order('created_at', { ascending: false })
        .limit(1);

    if (result.error) throw result.error;
    const row = Array.isArray(result.data) ? result.data[0] : null;
    if (!row) return null;

    const fileUrl = String(row.public_url || '').trim();
    return {
        id: String(row.id || ''),
        fileName: String(row.file_name || '').trim(),
        fileUrl,
        storagePath: String(row.storage_path || '').trim() || splitStoragePathFromPublicUrl(fileUrl)
    };
}

async function clearP2k3SupabaseData() {
    if (!useSupabase || !supabaseClient) return;

    const result = await supabaseClient
        .from(SUPABASE_P2K3_TABLE)
        .select('id, storage_path, public_url');
    if (result.error) throw result.error;

    const rows = Array.isArray(result.data) ? result.data : [];
    const storagePaths = rows
        .map((row) => String(row.storage_path || '').trim() || splitStoragePathFromPublicUrl(row.public_url))
        .filter(Boolean);

    if (storagePaths.length) {
        const removeResult = await supabaseClient.storage.from(SUPABASE_DOC_BUCKET).remove(storagePaths);
        if (removeResult.error) throw removeResult.error;
    }

    const ids = rows.map((row) => String(row.id || '')).filter(Boolean);
    if (ids.length) {
        const deleteResult = await supabaseClient.from(SUPABASE_P2K3_TABLE).delete().in('id', ids);
        if (deleteResult.error) throw deleteResult.error;
    }
}

async function insertP2k3SupabaseRow(fileMeta) {
    if (!useSupabase || !supabaseClient) return;
    const row = {
        file_name: fileMeta.fileName,
        public_url: fileMeta.fileUrl,
        storage_path: fileMeta.storagePath,
        mime_type: fileMeta.mimeType || '',
        file_size: Number(fileMeta.fileSize || 0)
    };
    const insertResult = await supabaseClient.from(SUPABASE_P2K3_TABLE).insert(row).select('id').single();
    if (insertResult.error) throw insertResult.error;
    return String(insertResult.data.id || '');
}

async function loadHseFilesFromSupabase() {
    if (!useSupabase || !supabaseClient) return [];

    const result = await supabaseClient
        .from(SUPABASE_HSE_TABLE)
        .select('id, file_name, public_url, storage_path')
        .order('created_at', { ascending: false });
    if (result.error) throw result.error;

    return (Array.isArray(result.data) ? result.data : []).map((row) => {
        const url = String(row.public_url || '').trim();
        return {
            id: String(row.id || ''),
            name: String(row.file_name || '').trim(),
            url,
            storagePath: String(row.storage_path || '').trim() || splitStoragePathFromPublicUrl(url)
        };
    }).filter((item) => item.name && item.url);
}

async function insertHseSupabaseRows(items) {
    if (!useSupabase || !supabaseClient || !items.length) return [];
    const rows = items.map((item) => ({
        file_name: item.name,
        public_url: item.url,
        storage_path: item.storagePath,
        mime_type: item.mimeType || '',
        file_size: Number(item.fileSize || 0)
    }));
    const result = await supabaseClient.from(SUPABASE_HSE_TABLE).insert(rows).select('id, storage_path, public_url');
    if (result.error) throw result.error;
    return Array.isArray(result.data) ? result.data : [];
}

async function deleteHseSupabaseRow(fileItem) {
    if (!useSupabase || !supabaseClient || !fileItem || !fileItem.id) return;

    const deleteResult = await supabaseClient.from(SUPABASE_HSE_TABLE).delete().eq('id', fileItem.id);
    if (deleteResult.error) throw deleteResult.error;

    const path = String(fileItem.storagePath || '').trim() || splitStoragePathFromPublicUrl(fileItem.url);
    if (path) {
        await deleteDocumentFromSupabase(path);
    }
}

async function clearHseSupabaseData() {
    if (!useSupabase || !supabaseClient) return;
    const result = await supabaseClient.from(SUPABASE_HSE_TABLE).select('id, storage_path, public_url');
    if (result.error) throw result.error;

    const rows = Array.isArray(result.data) ? result.data : [];
    const storagePaths = rows
        .map((row) => String(row.storage_path || '').trim() || splitStoragePathFromPublicUrl(row.public_url))
        .filter(Boolean);

    if (storagePaths.length) {
        const removeResult = await supabaseClient.storage.from(SUPABASE_DOC_BUCKET).remove(storagePaths);
        if (removeResult.error) throw removeResult.error;
    }

    const ids = rows.map((row) => String(row.id || '')).filter(Boolean);
    if (ids.length) {
        const deleteResult = await supabaseClient.from(SUPABASE_HSE_TABLE).delete().in('id', ids);
        if (deleteResult.error) throw deleteResult.error;
    }
}

function toDbRow(item) {
    return {
        id: item.id,
        tanggal: formatDateForInput(item.tanggal) || item.tanggal,
        observasi_by: item.observasiBy,
        departemen: item.departemen,
        tipe: item.tipe,
        lokasi: item.lokasi,
        status: item.status,
        photo_data_url: item.photoDataUrl || '',
        photo_name: item.photoName || '',
        photo_description: item.photoDescription || ''
    };
}

function fromDbRow(row, index) {
    return normalizeObservasiItem(
        {
            id: row.id,
            tanggal: row.tanggal,
            observasiBy: row.observasi_by,
            departemen: row.departemen,
            tipe: row.tipe,
            lokasi: row.lokasi,
            status: row.status,
            photoDataUrl: row.photo_data_url,
            photoName: row.photo_name,
            photoDescription: row.photo_description
        },
        index + 1
    );
}

async function pullFromSupabase() {
    if (!useSupabase || !supabaseClient) return null;

    const { data, error } = await supabaseClient
        .from(SUPABASE_TABLE)
        .select('id, tanggal, observasi_by, departemen, tipe, lokasi, status, photo_data_url, photo_name, photo_description')
        .order('created_at', { ascending: true });

    if (error) throw error;
    return Array.isArray(data) ? data.map((row, idx) => fromDbRow(row, idx)) : [];
}

function logSupabaseError(context, error, extra = null) {
    const payload = {
        context,
        message: error && error.message ? error.message : String(error || 'Unknown error'),
        code: error && error.code ? error.code : '',
        details: error && error.details ? error.details : '',
        hint: error && error.hint ? error.hint : '',
        extra
    };
    console.error('[SAMS][Supabase]', payload);
}

function chunkArray(items, chunkSize) {
    const list = Array.isArray(items) ? items : [];
    const chunks = [];
    for (let index = 0; index < list.length; index += chunkSize) {
        chunks.push(list.slice(index, index + chunkSize));
    }
    return chunks;
}

async function pushToSupabase() {
    if (!useSupabase || !supabaseClient) return;

    const payload = state.records.map(toDbRow);

    // Upsert per batch agar payload foto (base64) tidak terlalu besar dalam satu request.
    const upsertBatches = chunkArray(payload, 5);
    for (const batch of upsertBatches) {
        if (!batch.length) continue;
        const upsertResult = await supabaseClient.from(SUPABASE_TABLE).upsert(batch, { onConflict: 'id' });
        if (upsertResult.error) throw upsertResult.error;
    }

    // Hapus data remote yang sudah tidak ada di state lokal.
    const idResult = await supabaseClient.from(SUPABASE_TABLE).select('id');
    if (idResult.error) throw idResult.error;

    const localIds = new Set(payload.map((item) => String(item.id || '')).filter(Boolean));
    const remoteIds = Array.isArray(idResult.data) ? idResult.data.map((row) => String(row.id || '')).filter(Boolean) : [];
    const idsToDelete = remoteIds.filter((id) => !localIds.has(id));
    const deleteBatches = chunkArray(idsToDelete, 100);

    for (const idBatch of deleteBatches) {
        if (!idBatch.length) continue;
        const deleteResult = await supabaseClient.from(SUPABASE_TABLE).delete().in('id', idBatch);
        if (deleteResult.error) throw deleteResult.error;
    }
}

async function syncBackend() {
    saveLocalCache();
    if (!useSupabase) return;

    try {
        await pushToSupabase();
        syncWarned = false;
    } catch (error) {
        logSupabaseError('syncBackend.pushToSupabase', error, { table: SUPABASE_TABLE, totalRecords: state.records.length });
        if (!syncWarned) {
            showNotification('Sinkronisasi Supabase gagal. Data tetap disimpan lokal. Cek Console (F12).', 'error');
            syncWarned = true;
        }
        throw error;
    }
}

async function loadInitialData() {
    initSupabase();
    const localCache = loadLocalCache();

    if (useSupabase) {
        try {
            const remote = await pullFromSupabase();
            const merged = (remote || []).map((remoteItem) => {
                const localMatch = localCache.find((localItem) => localItem.id === remoteItem.id);
                if (!localMatch) return remoteItem;
                return {
                    ...remoteItem,
                    photoDataUrl: localMatch.photoDataUrl || remoteItem.photoDataUrl || '',
                    photoName: localMatch.photoName || remoteItem.photoName || '',
                    photoDescription: localMatch.photoDescription || remoteItem.photoDescription || ''
                };
            });
            state.records = merged;
            reindexRecords();
            saveLocalCache();
            return;
        } catch (error) {
            logSupabaseError('loadInitialData.pullFromSupabase', error, { table: SUPABASE_TABLE });
            useSupabase = false;
        }
    }

    state.records = localCache;
    reindexRecords();
}

// CSV / JSON Parser
function normalizeHeaderName(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[_-]/g, '');
}

function getMappedHeaderIndex(headers) {
    const normalized = headers.map(normalizeHeaderName);
    const findIndex = (aliases) => normalized.findIndex((name) => aliases.includes(name));

    return {
        no: findIndex(['no', 'nomor', 'id']),
        tanggal: findIndex(['tanggal', 'date']),
        observasiBy: findIndex(['observasiby', 'observer', 'observator', 'pic']),
        departemen: findIndex(['departemen', 'department', 'dept']),
        tipe: findIndex(['tipe', 'type', 'jenis']),
        lokasi: findIndex(['lokasi', 'location', 'area']),
        photoDataUrl: findIndex(['photo', 'fotourl', 'image', 'imagedata', 'photodataurl']),
        photoName: findIndex(['photoname', 'fotonama', 'imagename']),
        photoDescription: findIndex(['photodescription', 'deskripsigambar', 'fotodeskripsi', 'imagedescription']),
        status: findIndex(['status', 'progress'])
    };
}

function parseCsvLine(line, delimiter) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let index = 0; index < line.length; index += 1) {
        const char = line[index];
        const nextChar = line[index + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                index += 1;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === delimiter && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    values.push(current.trim());
    return values;
}

function detectDelimiter(headerLine) {
    const delimiters = [',', ';', '\t', '|'];
    let selected = ',';
    let bestScore = -1;

    delimiters.forEach((delimiter) => {
        const score = headerLine.split(delimiter).length;
        if (score > bestScore) {
            bestScore = score;
            selected = delimiter;
        }
    });

    return selected;
}

function parseDelimitedTextToObservasi(text) {
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (lines.length < 2) return [];

    const delimiter = detectDelimiter(lines[0]);
    const headers = parseCsvLine(lines[0], delimiter);
    const idx = getMappedHeaderIndex(headers);

    const parsed = lines.slice(1).map((line, rowIndex) => {
        const cols = parseCsvLine(line, delimiter);
        const getValue = (key) => {
            const pos = idx[key];
            if (pos < 0 || pos >= cols.length) return '';
            return cols[pos];
        };

        return normalizeObservasiItem(
            {
                no: Number(getValue('no')) || rowIndex + 1,
                tanggal: getValue('tanggal'),
                observasiBy: getValue('observasiBy'),
                departemen: getValue('departemen'),
                tipe: getValue('tipe'),
                lokasi: getValue('lokasi'),
                photoDataUrl: getValue('photoDataUrl'),
                photoName: getValue('photoName'),
                photoDescription: getValue('photoDescription'),
                status: getValue('status') || 'Pending'
            },
            rowIndex + 1
        );
    });

    return parsed.filter((item) => item.tanggal || item.observasiBy || item.departemen || item.tipe || item.lokasi);
}

function parseJsonToObservasi(text) {
    const raw = JSON.parse(text);
    const list = Array.isArray(raw) ? raw : Array.isArray(raw.data) ? raw.data : [];
    return list.map((item, idx) => normalizeObservasiItem(item, idx + 1));
}

function parseSpreadsheetToObservasi(fileContent, isBinary) {
    if (!window.XLSX) {
        throw new Error('Library XLSX tidak tersedia.');
    }

    const workbook = window.XLSX.read(fileContent, { type: isBinary ? 'array' : 'binary' });
    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName) return [];

    const firstSheet = workbook.Sheets[firstSheetName];
    const jsonRows = window.XLSX.utils.sheet_to_json(firstSheet, { defval: '' });
    if (!jsonRows.length) return [];
    const rowsAsArray = window.XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' });
    if (!rowsAsArray.length) return [];

    const headers = Array.isArray(rowsAsArray[0]) ? rowsAsArray[0].map((value) => String(value || '')) : [];
    const idx = getMappedHeaderIndex(headers);

    return rowsAsArray.slice(1).map((cols, rowIndex) => {
        const getValue = (key) => {
            const pos = idx[key];
            if (pos < 0) return '';
            return String((Array.isArray(cols) ? cols[pos] : '') || '').trim();
        };

        return normalizeObservasiItem(
            {
                no: Number(getValue('no')) || rowIndex + 1,
                tanggal: getValue('tanggal'),
                observasiBy: getValue('observasiBy'),
                departemen: getValue('departemen'),
                tipe: getValue('tipe'),
                lokasi: getValue('lokasi'),
                photoDataUrl: getValue('photoDataUrl'),
                photoName: getValue('photoName'),
                photoDescription: getValue('photoDescription'),
                status: getValue('status') || 'Pending'
            },
            rowIndex + 1
        );
    }).filter((item) => item.tanggal || item.observasiBy || item.departemen || item.tipe || item.lokasi);
}

function parseUploadedFile(file, fileContent, isBinary = false) {
    const fileName = String(file.name || '').toLowerCase();
    if (fileName.endsWith('.json')) return parseJsonToObservasi(fileContent);
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        return parseSpreadsheetToObservasi(fileContent, isBinary);
    }
    return parseDelimitedTextToObservasi(fileContent);
}

function pickAndReadFile(inputElement) {
    return new Promise((resolve, reject) => {
        if (!inputElement) {
            reject(new Error('Input file tidak tersedia'));
            return;
        }

        inputElement.onchange = null;
        inputElement.onchange = () => {
            const file = inputElement.files && inputElement.files[0];
            if (!file) {
                reject(new Error('Tidak ada file dipilih'));
                return;
            }

            const reader = new FileReader();
            const fileName = String(file.name || '').toLowerCase();
            const isSpreadsheet = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');

            reader.onload = () => {
                if (isSpreadsheet) {
                    resolve({ file, content: reader.result, isBinary: true });
                    return;
                }

                resolve({ file, content: String(reader.result || ''), isBinary: false });
            };
            reader.onerror = () => reject(new Error('File tidak dapat dibaca'));
            if (isSpreadsheet) {
                reader.readAsArrayBuffer(file);
            } else {
                reader.readAsText(file);
            }
        };

        inputElement.value = '';
        inputElement.click();
    });
}

async function importFromInput(inputElement, labelElement, acceptedHint) {
    const previousRecords = state.records.map((item) => ({ ...item }));
    showGlobalLoading('Mengimpor data...');

    try {
        const { file, content, isBinary } = await pickAndReadFile(inputElement);
        if (labelElement) labelElement.textContent = file.name;

        const parsed = parseUploadedFile(file, content, isBinary);
        if (!parsed.length) {
            showNotification(`File ${acceptedHint} tidak berisi data valid.`, 'error');
            return;
        }

        state.records = parsed;
        reindexRecords();
        await syncBackend();
        hideFormCard();
        if (searchInput) searchInput.value = '';
        if (filterType) filterType.value = '';
        paginationState.observasi = 1;
        paginationState.progress = 1;
        paginationState.reportType = 1;
        paginationState.reportDept = 1;
        renderAllObservasiViews();
        showNotification(`Import berhasil (${state.records.length} data).`, 'success');
    } catch (error) {
        if (String(error.message).includes('Tidak ada file')) {
            showNotification('Import dibatalkan. Tidak ada file dipilih.', 'info');
            return;
        }
        state.records = previousRecords;
        reindexRecords();
        renderAllObservasiViews();
        showNotification('Import gagal. Periksa format file.', 'error');
    } finally {
        hideGlobalLoading();
    }
}

function revokeObjectUrl(url) {
    if (url) {
        URL.revokeObjectURL(url);
    }
}

function renderUploadedLinks(container, files, removeHandler) {
    if (!container) return;
    container.innerHTML = '';

    if (!files.length) return;

    files.forEach((fileItem, index) => {
        const row = document.createElement('div');
        row.className = 'uploaded-file-item';
        row.innerHTML = `
            <a href="${fileItem.url}" target="_blank" rel="noopener noreferrer">${fileItem.name}</a>
            <button type="button" class="btn-table btn-delete" data-index="${index}">Hapus</button>
        `;

        const btn = row.querySelector('button');
        if (btn) {
            btn.addEventListener('click', () => removeHandler(index));
        }

        container.appendChild(row);
    });
}

function initP2k3DefaultViewer() {
    const viewer = document.getElementById('pdfViewer');
    if (!viewer) return;
    p2k3State.defaultViewerUrl = viewer.getAttribute('src') || '';
}

function updateP2k3Viewer(url, fileName) {
    const viewer = document.getElementById('pdfViewer');
    if (!viewer) return;

    const lower = String(fileName || '').toLowerCase();
    if (lower.endsWith('.pdf')) {
        viewer.setAttribute('src', url);
        viewer.style.display = 'block';
        if (p2k3EmptyState) p2k3EmptyState.style.display = 'none';
        return;
    }

    viewer.setAttribute('src', 'about:blank');
    viewer.style.display = 'none';
    if (p2k3EmptyState) {
        p2k3EmptyState.style.display = fileName ? 'none' : 'block';
    }
}

function setP2k3State(item) {
    const fileUrl = item && item.fileUrl ? String(item.fileUrl) : '';
    const fileName = item && item.fileName ? String(item.fileName) : '';
    const prevUrl = p2k3State.fileUrl;
    if (prevUrl && prevUrl.startsWith('blob:') && prevUrl !== fileUrl) {
        revokeObjectUrl(prevUrl);
    }
    p2k3State.id = item && item.id ? String(item.id) : '';
    p2k3State.fileUrl = fileUrl;
    p2k3State.fileName = fileName;
    p2k3State.storagePath = item && item.storagePath ? String(item.storagePath) : '';

    if (p2k3FileName) {
        p2k3FileName.textContent = fileName || 'Belum ada file dipilih';
    }
    updateP2k3Viewer(fileUrl, fileName);
    if (fileName && fileUrl) {
        renderUploadedLinks(p2k3FileLinks, [{ name: fileName, url: fileUrl }], () => {
            clearP2k3Upload();
        });
    } else {
        renderUploadedLinks(p2k3FileLinks, [], () => {});
    }
}

async function clearP2k3Upload() {
    if (!p2k3State.fileUrl && !p2k3State.storagePath && !p2k3State.fileName) {
        showNotification('Belum ada dokumen P2K3 untuk dihapus.', 'info');
        return;
    }

    const confirmed = await showConfirmDialog({
        title: 'Hapus Dokumen P2K3?',
        text: 'Dokumen P2K3 yang tersimpan akan dihapus permanen.',
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        icon: 'warning'
    });
    if (!confirmed) {
        showNotification('Penghapusan dokumen P2K3 dibatalkan.', 'info');
        return;
    }

    showGlobalLoading('Menghapus dokumen P2K3...');
    try {
        if (useSupabase) {
            await clearP2k3SupabaseData();
        }
        revokeObjectUrl(p2k3State.fileUrl);
        setP2k3State(null);
        saveP2k3LocalCache(null);
        showNotification('Dokumen P2K3 berhasil dihapus.', 'success');
    } catch (error) {
        logSupabaseError('clearP2k3Upload', error, { table: SUPABASE_P2K3_TABLE, bucket: SUPABASE_DOC_BUCKET });
        showNotification('Gagal hapus dokumen P2K3 dari database.', 'error');
    } finally {
        hideGlobalLoading();
    }
}

async function handleP2k3Upload() {
    if (!p2k3UploadInput) return;
    p2k3UploadInput.onchange = null;
    p2k3UploadInput.onchange = async () => {
        const file = p2k3UploadInput.files && p2k3UploadInput.files[0];
        if (!file) {
            showNotification('Upload dibatalkan. Tidak ada file dipilih.', 'info');
            return;
        }
        showGlobalLoading('Mengunggah dokumen P2K3...');

        try {
            if (useSupabase) {
                await clearP2k3SupabaseData();
                const uploaded = await uploadDocumentToSupabase(file, 'p2k3');
                const p2k3Id = await insertP2k3SupabaseRow({
                    fileName: file.name,
                    fileUrl: uploaded.publicUrl,
                    storagePath: uploaded.path,
                    mimeType: file.type,
                    fileSize: file.size
                });

                setP2k3State({
                    id: p2k3Id,
                    fileName: file.name,
                    fileUrl: uploaded.publicUrl,
                    storagePath: uploaded.path
                });
            } else {
                revokeObjectUrl(p2k3State.fileUrl);
                const localUrl = URL.createObjectURL(file);
                setP2k3State({ fileName: file.name, fileUrl: localUrl, storagePath: '' });
            }

            saveP2k3LocalCache({
                id: p2k3State.id,
                fileName: p2k3State.fileName,
                fileUrl: p2k3State.fileUrl,
                storagePath: p2k3State.storagePath
            });
            showNotification('Dokumen P2K3 berhasil diupload.', 'success');
        } catch (error) {
            logSupabaseError('handleP2k3Upload', error, { table: SUPABASE_P2K3_TABLE, bucket: SUPABASE_DOC_BUCKET });
            showNotification('Upload dokumen P2K3 gagal. Cek konfigurasi Supabase.', 'error');
        } finally {
            hideGlobalLoading();
        }
    };

    p2k3UploadInput.value = '';
    p2k3UploadInput.click();
}

async function handleHseUpload() {
    if (!hseUploadInput) return;
    hseUploadInput.onchange = null;
    hseUploadInput.onchange = async () => {
        const files = Array.from(hseUploadInput.files || []);
        if (!files.length) {
            showNotification('Upload dibatalkan. Tidak ada file dipilih.', 'info');
            return;
        }
        showGlobalLoading('Mengunggah dokumen HSE...');

        try {
            if (useSupabase) {
                const uploadedItems = [];
                for (const file of files) {
                    const uploaded = await uploadDocumentToSupabase(file, 'hse-observasi');
                    uploadedItems.push({
                        name: file.name,
                        url: uploaded.publicUrl,
                        storagePath: uploaded.path,
                        mimeType: file.type,
                        fileSize: file.size
                    });
                }

                const insertedRows = await insertHseSupabaseRows(uploadedItems);
                insertedRows.forEach((row, idx) => {
                    const fallback = uploadedItems[idx];
                    hseFiles.unshift({
                        id: String(row.id || ''),
                        name: fallback.name,
                        url: fallback.url,
                        storagePath: String(row.storage_path || fallback.storagePath || '')
                    });
                });
            } else {
                files.forEach((file) => {
                    hseFiles.unshift({ id: '', name: file.name, url: URL.createObjectURL(file), storagePath: '' });
                });
            }

            saveHseLocalCache(hseFiles);
            renderHseFileLinks();
            showNotification('Dokumen HSE berhasil diupload.', 'success');
        } catch (error) {
            logSupabaseError('handleHseUpload', error, { table: SUPABASE_HSE_TABLE, bucket: SUPABASE_DOC_BUCKET });
            showNotification('Upload dokumen HSE gagal. Cek konfigurasi Supabase.', 'error');
        } finally {
            hideGlobalLoading();
        }
    };

    hseUploadInput.value = '';
    hseUploadInput.click();
}

async function removeHseUploadByIndex(index) {
    const removed = hseFiles.splice(index, 1)[0];
    if (!removed) return;

    const confirmed = await showConfirmDialog({
        title: 'Hapus Dokumen HSE?',
        text: `Hapus dokumen "${removed.name}"?`,
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        icon: 'warning'
    });
    if (!confirmed) {
        hseFiles.splice(index, 0, removed);
        showNotification('Penghapusan dokumen HSE dibatalkan.', 'info');
        renderHseFileLinks();
        return;
    }

    try {
        if (useSupabase && removed.id) {
            await deleteHseSupabaseRow(removed);
        } else {
            revokeObjectUrl(removed.url);
        }
    } catch (error) {
        hseFiles.splice(index, 0, removed);
        logSupabaseError('removeHseUploadByIndex', error, { table: SUPABASE_HSE_TABLE, fileId: removed.id });
        showNotification('Gagal hapus dokumen HSE dari database.', 'error');
        renderHseFileLinks();
        return;
    }

    saveHseLocalCache(hseFiles);
    renderHseFileLinks();
    showNotification('Dokumen HSE berhasil dihapus.', 'success');
}

function renderHseFileLinks() {
    renderUploadedLinks(hseFileLinks, hseFiles, removeHseUploadByIndex);
    if (hseFileName) {
        hseFileName.textContent = hseFiles.length ? `${hseFiles.length} dokumen terunggah` : 'Belum ada file dipilih';
    }
    if (hseEmptyState) {
        hseEmptyState.style.display = hseFiles.length ? 'none' : 'block';
    }
}

async function clearHseUploads() {
    if (!hseFiles.length) {
        showNotification('Belum ada dokumen HSE untuk dihapus.', 'info');
        return;
    }

    const confirmed = await showConfirmDialog({
        title: 'Hapus Semua Dokumen HSE?',
        text: 'Semua dokumen HSE akan dihapus permanen.',
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        icon: 'warning'
    });
    if (!confirmed) {
        showNotification('Penghapusan dokumen HSE dibatalkan.', 'info');
        return;
    }

    showGlobalLoading('Menghapus dokumen HSE...');
    try {
        if (useSupabase) {
            await clearHseSupabaseData();
        } else {
            hseFiles.forEach((item) => revokeObjectUrl(item.url));
        }
        hseFiles.length = 0;
        saveHseLocalCache([]);
        renderHseFileLinks();
        showNotification('Semua dokumen HSE berhasil dihapus.', 'success');
    } catch (error) {
        logSupabaseError('clearHseUploads', error, { table: SUPABASE_HSE_TABLE, bucket: SUPABASE_DOC_BUCKET });
        showNotification('Gagal hapus semua dokumen HSE.', 'error');
    } finally {
        hideGlobalLoading();
    }
}

async function loadSupportingDocumentData() {
    if (useSupabase) {
        try {
            const [p2k3Doc, hseDocs] = await Promise.all([
                loadP2k3FileFromSupabase(),
                loadHseFilesFromSupabase()
            ]);

            setP2k3State(p2k3Doc);
            hseFiles.length = 0;
            hseDocs.forEach((item) => hseFiles.push(item));
            renderHseFileLinks();

            saveP2k3LocalCache(p2k3Doc);
            saveHseLocalCache(hseDocs);
            return;
        } catch (error) {
            logSupabaseError('loadSupportingDocumentData', error, {
                p2k3Table: SUPABASE_P2K3_TABLE,
                hseTable: SUPABASE_HSE_TABLE,
                bucket: SUPABASE_DOC_BUCKET
            });
        }
    }

    const cachedP2k3 = loadP2k3LocalCache();
    setP2k3State(cachedP2k3);
    hseFiles.length = 0;
    loadHseLocalCache().forEach((item) => hseFiles.push(item));
    renderHseFileLinks();
}

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function csvEscape(value) {
    const raw = String(value ?? '');
    if (/[",\n]/.test(raw)) return `"${raw.replace(/"/g, '""')}"`;
    return raw;
}

function showFallbackDialog(options = {}) {
    return new Promise((resolve) => {
        const title = options.title || 'Konfirmasi';
        const text = options.text || '';
        const icon = options.icon || 'info';
        const confirmButtonText = options.confirmButtonText || 'OK';
        const cancelButtonText = options.cancelButtonText || 'Batal';
        const showCancel = options.showCancel !== false;
        const html = options.html || '';
        const inputType = options.inputType || '';
        const inputLabel = options.inputLabel || '';
        const inputChecked = !!options.inputChecked;

        const iconMap = {
            success: 'fa-circle-check',
            error: 'fa-circle-xmark',
            warning: 'fa-triangle-exclamation',
            question: 'fa-circle-question',
            info: 'fa-circle-info'
        };

        const backdrop = document.createElement('div');
        backdrop.className = 'custom-dialog-backdrop';

        const box = document.createElement('div');
        box.className = 'custom-dialog-box';

        const bodyHtml = html || `<p class="custom-dialog-text">${escapeHtml(text)}</p>`;
        const checkboxHtml = inputType === 'checkbox'
            ? `<label class="custom-dialog-checkbox"><input type="checkbox" id="customDialogCheckbox" ${inputChecked ? 'checked' : ''}> <span>${escapeHtml(inputLabel || 'Pilih opsi')}</span></label>`
            : '';

        box.innerHTML = `
            <div class="custom-dialog-header">
                <i class="fas ${iconMap[icon] || iconMap.info}" aria-hidden="true"></i>
                <h3>${escapeHtml(title)}</h3>
            </div>
            <div class="custom-dialog-body">
                ${bodyHtml}
                ${checkboxHtml}
            </div>
            <div class="custom-dialog-actions">
                ${showCancel ? `<button type="button" class="custom-dialog-btn custom-dialog-btn-cancel">${escapeHtml(cancelButtonText)}</button>` : ''}
                <button type="button" class="custom-dialog-btn custom-dialog-btn-confirm">${escapeHtml(confirmButtonText)}</button>
            </div>
        `;

        backdrop.appendChild(box);
        document.body.appendChild(backdrop);

        const closeDialog = (payload) => {
            backdrop.remove();
            resolve(payload);
        };

        const confirmBtn = box.querySelector('.custom-dialog-btn-confirm');
        const cancelBtn = box.querySelector('.custom-dialog-btn-cancel');
        const checkbox = box.querySelector('#customDialogCheckbox');

        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                closeDialog({
                    isConfirmed: true,
                    value: checkbox instanceof HTMLInputElement ? checkbox.checked : true
                });
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => closeDialog({ isConfirmed: false, isDismissed: true }));
        }

        backdrop.addEventListener('click', (event) => {
            if (event.target === backdrop) closeDialog({ isConfirmed: false, isDismissed: true });
        });
    });
}

function hasSwal() {
    return !!(window.Swal && typeof window.Swal.fire === 'function');
}

async function showConfirmDialog(options = {}) {
    const title = options.title || 'Konfirmasi';
    const text = options.text || '';
    const confirmButtonText = options.confirmButtonText || 'Ya';
    const cancelButtonText = options.cancelButtonText || 'Batal';
    const icon = options.icon || 'warning';

    if (hasSwal()) {
        const result = await window.Swal.fire({
            icon,
            title,
            text,
            showCancelButton: true,
            confirmButtonText,
            cancelButtonText,
            reverseButtons: true
        });
        return !!result.isConfirmed;
    }

    const fallbackResult = await showFallbackDialog({
        icon,
        title,
        text,
        confirmButtonText,
        cancelButtonText,
        showCancel: true
    });
    return !!fallbackResult.isConfirmed;
}

async function askIncludePhotoForCsv(defaultValue) {
    if (hasSwal()) {
        const result = await window.Swal.fire({
            title: 'Export CSV',
            text: 'Pilih apakah data foto (base64) ikut diexport.',
            input: 'checkbox',
            inputValue: defaultValue ? 1 : 0,
            inputPlaceholder: 'Sertakan data foto di CSV',
            showCancelButton: true,
            confirmButtonText: 'Export',
            cancelButtonText: 'Batal',
            reverseButtons: true
        });

        if (result.isDismissed) return null;
        return !!result.value;
    }

    const fallbackResult = await showFallbackDialog({
        icon: 'question',
        title: 'Export CSV',
        text: 'Pilih apakah data foto (base64) ikut diexport.',
        inputType: 'checkbox',
        inputLabel: 'Sertakan data foto di CSV',
        inputChecked: !!defaultValue,
        confirmButtonText: 'Export',
        cancelButtonText: 'Batal',
        showCancel: true
    });
    if (!fallbackResult.isConfirmed) return null;
    return !!fallbackResult.value;
}

function getIncludePhotoCsvOption() {
    if (includePhotoCsv) return !!includePhotoCsv.checked;
    return includePhotoCsvDefault;
}

function tryOpenPhotoPreviewFromEvent(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return false;

    const photoLink = target.closest('a.table-photo-link');
    if (!(photoLink instanceof HTMLAnchorElement)) return false;

    const imageNode = photoLink.querySelector('img.table-photo-thumb');
    const photoUrl = photoLink.getAttribute('href') || '';
    const photoTitle = imageNode ? imageNode.getAttribute('alt') || 'Foto observasi' : 'Foto observasi';
    if (!photoUrl) return false;

    if (hasSwal()) {
        event.preventDefault();
        window.Swal.fire({
            title: photoTitle,
            imageUrl: photoUrl,
            imageAlt: photoTitle,
            showCloseButton: true,
            showConfirmButton: false,
            width: 'min(920px, 95vw)'
        });
    }

    return true;
}

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(new Error('File gambar tidak dapat dibaca.'));
        reader.readAsDataURL(file);
    });
}

async function optimizeImageDataUrl(file) {
    const rawDataUrl = await fileToDataUrl(file);
    const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Gambar tidak valid.'));
        img.src = rawDataUrl;
    });

    const maxWidth = 1280;
    const maxHeight = 1280;
    let width = image.naturalWidth || image.width || 0;
    let height = image.naturalHeight || image.height || 0;

    if (!width || !height) return rawDataUrl;

    const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) return rawDataUrl;
    context.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg', 0.82);
}

function renderFormPhotoPreview() {
    if (!formPhotoPreviewWrap || !formPhotoPreview || !formPhotoFileName) return;

    if (!currentFormPhotoDataUrl) {
        formPhotoPreviewWrap.classList.remove('active');
        formPhotoPreview.removeAttribute('src');
        formPhotoFileName.textContent = 'Belum ada foto dipilih';
        return;
    }

    formPhotoPreviewWrap.classList.add('active');
    formPhotoPreview.src = currentFormPhotoDataUrl;
    formPhotoFileName.textContent = currentFormPhotoName || 'Foto observasi';
}

function clearFormPhoto(resetInput = true) {
    currentFormPhotoDataUrl = '';
    currentFormPhotoName = '';
    if (resetInput && formPhotoInput) formPhotoInput.value = '';
    renderFormPhotoPreview();
}

async function handleFormPhotoInputChange() {
    if (!formPhotoInput) return;
    const file = formPhotoInput.files && formPhotoInput.files[0];
    if (!file) {
        clearFormPhoto(false);
        return;
    }

    if (!file.type.startsWith('image/')) {
        showNotification('File harus berupa gambar.', 'error');
        clearFormPhoto();
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        showNotification('Ukuran foto maksimal 5 MB.', 'error');
        clearFormPhoto();
        return;
    }

    isPhotoProcessing = true;
    try {
        currentFormPhotoDataUrl = await optimizeImageDataUrl(file);
        currentFormPhotoName = file.name;
        renderFormPhotoPreview();
    } catch {
        showNotification('Gagal memproses foto.', 'error');
        clearFormPhoto();
    } finally {
        isPhotoProcessing = false;
    }
}

function downloadCsvFile(headers, rows, baseFileName) {
    const csvBody = [headers, ...rows]
        .map((row) => row.map(csvEscape).join(','))
        .join('\n');

    const blob = new Blob([`\uFEFF${csvBody}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const now = new Date();
    const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    anchor.href = url;
    anchor.download = `${baseFileName}-${stamp}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
}

function getObservasiCsvHeaders(options = {}) {
    const includePhotoData = !!options.includePhotoData;
    const headers = [
        'no',
        'tanggal',
        'observasiBy',
        'departemen',
        'tipe',
        'lokasi',
        'status',
        'deskripsiGambar',
        'photoName',
        'fotoTersedia'
    ];
    if (includePhotoData) headers.push('photo');
    return headers;
}

function buildObservasiCsvRows(records, options = {}) {
    const includePhotoData = !!options.includePhotoData;
    return records.map((item) => {
        const row = [
            item.no,
            item.tanggal,
            item.observasiBy,
            item.departemen,
            item.tipe,
            item.lokasi,
            item.status,
            item.photoDescription || '',
            item.photoName || '',
            item.photoDataUrl ? 'Ya' : 'Tidak'
        ];
        if (includePhotoData) row.push(item.photoDataUrl || '');
        return row;
    });
}

async function exportObservasiToCsv() {
    if (!state.records.length) {
        showNotification('Belum ada data observasi untuk diexport.', 'error');
        return;
    }

    const includePhotoData = await askIncludePhotoForCsv(getIncludePhotoCsvOption());
    if (includePhotoData === null) return;
    includePhotoCsvDefault = includePhotoData;
    if (includePhotoCsv) includePhotoCsv.checked = includePhotoData;

    downloadCsvFile(
        getObservasiCsvHeaders({ includePhotoData }),
        buildObservasiCsvRows(state.records, { includePhotoData }),
        'observasi-data'
    );
    showNotification('Export CSV Data Observasi berhasil.', 'success');
}

async function exportProgressToCsv() {
    if (!state.records.length) {
        showNotification('Belum ada data progress untuk diexport.', 'error');
        return;
    }

    const includePhotoData = await askIncludePhotoForCsv(getIncludePhotoCsvOption());
    if (includePhotoData === null) return;
    includePhotoCsvDefault = includePhotoData;
    if (includePhotoCsv) includePhotoCsv.checked = includePhotoData;

    downloadCsvFile(
        getObservasiCsvHeaders({ includePhotoData }),
        buildObservasiCsvRows(state.records, { includePhotoData }),
        'observasi-progress'
    );
    showNotification('Export CSV Observasi Progress berhasil.', 'success');
}

function exportReportToCsv() {
    if (!state.records.length) {
        showNotification('Belum ada data report untuk diexport.', 'error');
        return;
    }
    const typeCounts = {};
    const deptCounts = {};
    state.records.forEach((item) => {
        typeCounts[item.tipe] = (typeCounts[item.tipe] || 0) + 1;
        deptCounts[item.departemen] = (deptCounts[item.departemen] || 0) + 1;
    });

    const rows = [];
    Object.entries(typeCounts).forEach(([name, count], index) => {
        rows.push(['Tipe', index + 1, name, count]);
    });
    Object.entries(deptCounts).forEach(([name, count], index) => {
        rows.push(['Departemen', index + 1, name, count]);
    });

    downloadCsvFile(['kategori', 'no', 'nama', 'jumlah'], rows, 'observasi-report');
    showNotification('Export CSV Observasi Report berhasil.', 'success');
}

function downloadCsvTemplate(kind = 'observasi') {
    const sampleDate = getTodayIsoDate();

    if (kind === 'report') {
        downloadCsvFile(
            ['tanggal', 'observasiBy', 'departemen', 'tipe', 'lokasi', 'status'],
            [[sampleDate, 'Nama Pengamat', 'HSE', 'Hazard Report', 'Area Workshop', 'Pending']],
            'template-observasi-report'
        );
        showNotification('Template CSV Observasi Report berhasil diunduh.', 'success');
        return;
    }

    if (kind === 'progress') {
        const includePhotoData = getIncludePhotoCsvOption();
        downloadCsvFile(
            getObservasiCsvHeaders({ includePhotoData }),
            buildObservasiCsvRows(
                [normalizeObservasiItem({
                    no: 1,
                    tanggal: sampleDate,
                    observasiBy: 'Nama Pengamat',
                    departemen: 'Produksi',
                    tipe: 'Improvement',
                    lokasi: 'Stockpile',
                    status: 'In Progress',
                    photoDescription: 'Contoh deskripsi gambar',
                    photoName: 'contoh-foto.jpg',
                    photoDataUrl: ''
                }, 1)],
                { includePhotoData }
            ),
            'template-observasi-progress'
        );
        showNotification('Template CSV Observasi Progress berhasil diunduh.', 'success');
        return;
    }

    const includePhotoData = getIncludePhotoCsvOption();
    downloadCsvFile(
        getObservasiCsvHeaders({ includePhotoData }),
        buildObservasiCsvRows(
            [normalizeObservasiItem({
                no: 1,
                tanggal: sampleDate,
                observasiBy: 'Nama Pengamat',
                departemen: 'Produksi',
                tipe: 'Hazard Report',
                lokasi: 'Jalan Hauling',
                status: 'Pending',
                photoDescription: 'Contoh deskripsi gambar',
                photoName: 'contoh-foto.jpg',
                photoDataUrl: ''
            }, 1)],
            { includePhotoData }
        ),
        'template-observasi-data'
    );
    showNotification('Template CSV Data Observasi berhasil diunduh.', 'success');
}

// CRUD
async function clearAllData() {
    const confirmed = await showConfirmDialog({
        title: 'Hapus Semua Data?',
        text: 'Semua data observasi akan dikosongkan.',
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        icon: 'warning'
    });
    if (!confirmed) {
        showNotification('Penghapusan semua data dibatalkan.', 'info');
        return;
    }

    const previousRecords = state.records.map((item) => ({ ...item }));
    showGlobalLoading('Menghapus semua data observasi...');

    try {
        state.records = [];
        await syncBackend();
        hideFormCard();
        renderAllObservasiViews();
        showNotification('Data observasi berhasil dikosongkan.', 'success');
    } catch {
        state.records = previousRecords;
        renderAllObservasiViews();
        showNotification('Gagal menghapus semua data observasi.', 'error');
    } finally {
        hideGlobalLoading();
    }
}

function setFormMode(mode, item = null) {
    if (!observasiFormCard || !observasiForm || !formTitle) return;

    observasiFormCard.classList.add('active');
    formTitle.textContent = mode === 'edit' ? 'Edit Observasi' : 'Tambah Observasi';

    if (mode === 'edit' && item) {
        editNoInput.value = item.no;
        formTanggal.value = formatDateForInput(item.tanggal);
        formObservasiBy.value = item.observasiBy;
        formDepartemen.value = item.departemen;
        formTipe.value = item.tipe;
        formLokasi.value = item.lokasi;
        formStatus.value = item.status;
        if (formPhotoDescription) formPhotoDescription.value = item.photoDescription || '';
        currentFormPhotoDataUrl = item.photoDataUrl || '';
        currentFormPhotoName = item.photoName || '';
        renderFormPhotoPreview();
    } else {
        observasiForm.reset();
        editNoInput.value = '';
        formTanggal.valueAsDate = new Date();
        clearFormPhoto();
        if (formPhotoDescription) formPhotoDescription.value = '';
    }
}

function hideFormCard() {
    if (!observasiFormCard || !observasiForm) return;
    observasiFormCard.classList.remove('active');
    observasiForm.reset();
    if (editNoInput) editNoInput.value = '';
    clearFormPhoto();
}

function hasObservasiFormDraft() {
    if (!observasiForm) return false;
    const fields = [formTanggal, formObservasiBy, formDepartemen, formTipe, formLokasi, formStatus, formPhotoDescription];
    const hasText = fields.some((input) => input && String(input.value || '').trim());
    return hasText || !!currentFormPhotoDataUrl;
}

async function handleCancelObservasiForm() {
    if (!observasiFormCard || !observasiFormCard.classList.contains('active')) return;

    if (hasObservasiFormDraft()) {
        const confirmed = await showConfirmDialog({
            title: 'Batalkan Input?',
            text: 'Perubahan pada form observasi akan dibuang.',
            confirmButtonText: 'Ya, Batalkan',
            cancelButtonText: 'Lanjut Edit',
            icon: 'warning'
        });
        if (!confirmed) {
            showNotification('Pembatalan input dibatalkan.', 'info');
            return;
        }
    }

    hideFormCard();
    showNotification('Form observasi ditutup.', 'info');
}

async function handleObservasiSubmit(event) {
    event.preventDefault();

    if (isPhotoProcessing) {
        showNotification('Foto masih diproses, tunggu beberapa saat.', 'info');
        return;
    }

    const payload = normalizeObservasiItem(
        {
            tanggal: formTanggal.value,
            observasiBy: formObservasiBy.value,
            departemen: formDepartemen.value,
            tipe: formTipe.value,
            lokasi: formLokasi.value,
            photoDataUrl: currentFormPhotoDataUrl,
            photoName: currentFormPhotoName,
            photoDescription: formPhotoDescription ? formPhotoDescription.value : '',
            status: formStatus.value
        },
        state.records.length + 1
    );

    if (!payload.tanggal || !payload.observasiBy || !payload.departemen || !payload.tipe || !payload.lokasi) {
        showNotification('Semua field form wajib diisi.', 'error');
        return;
    }

    const editNo = Number(editNoInput.value);
    const previousRecords = state.records.map((item) => ({ ...item }));
    const isEditMode = !!editNo;
    showGlobalLoading(isEditMode ? 'Memperbarui observasi...' : 'Menyimpan observasi...');

    try {
        if (isEditMode) {
            state.records = state.records.map((item) => item.no === editNo ? { ...item, ...payload, id: item.id } : item);
        } else {
            state.records.push(payload);
        }

        reindexRecords();
        await syncBackend();
        hideFormCard();
        renderAllObservasiViews();
        showNotification(isEditMode ? 'Data observasi berhasil diperbarui.' : 'Data observasi berhasil ditambahkan.', 'success');
    } catch {
        state.records = previousRecords;
        reindexRecords();
        renderAllObservasiViews();
        showNotification(isEditMode ? 'Gagal memperbarui data observasi.' : 'Gagal menambahkan data observasi.', 'error');
    } finally {
        hideGlobalLoading();
    }
}

async function editObservasi(no) {
    const item = state.records.find((row) => row.no === no);
    if (!item) {
        showNotification('Data observasi tidak ditemukan.', 'error');
        return;
    }

    const confirmed = await showConfirmDialog({
        title: 'Edit Data?',
        text: `Buka form edit observasi No ${no} oleh ${item.observasiBy}?`,
        confirmButtonText: 'Ya, Edit',
        cancelButtonText: 'Batal',
        icon: 'question'
    });
    if (!confirmed) {
        showNotification('Edit data dibatalkan.', 'info');
        return;
    }

    setFormMode('edit', item);
    observasiFormCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function deleteObservasi(no) {
    const item = state.records.find((row) => row.no === no);
    if (!item) {
        showNotification('Data observasi tidak ditemukan.', 'error');
        return;
    }

    const confirmed = await showConfirmDialog({
        title: 'Hapus Data?',
        text: `Hapus observasi No ${no} oleh ${item.observasiBy}?`,
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        icon: 'warning'
    });
    if (!confirmed) {
        showNotification('Hapus data dibatalkan.', 'info');
        return;
    }

    const previousRecords = state.records.map((row) => ({ ...row }));
    showGlobalLoading('Menghapus data observasi...');

    try {
        state.records = state.records.filter((row) => row.no !== no);
        reindexRecords();
        await syncBackend();
        renderAllObservasiViews();
        showNotification('Data observasi berhasil dihapus.', 'success');
    } catch {
        state.records = previousRecords;
        reindexRecords();
        renderAllObservasiViews();
        showNotification('Gagal menghapus data observasi.', 'error');
    } finally {
        hideGlobalLoading();
    }
}

async function updateObservasiStatus(no, status) {
    const previousRecords = state.records.map((item) => ({ ...item }));
    state.records = state.records.map((item) => item.no === no ? { ...item, status: normalizeStatus(status) } : item);
    showGlobalLoading('Memperbarui status observasi...');

    try {
        await syncBackend();
        renderAllObservasiViews();
        showNotification('Status observasi berhasil diperbarui.', 'success');
    } catch {
        state.records = previousRecords;
        reindexRecords();
        renderAllObservasiViews();
        showNotification('Gagal memperbarui status observasi.', 'error');
    } finally {
        hideGlobalLoading();
    }
}

// Rendering
function applyFilters() {
    const searchTerm = String(searchInput ? searchInput.value : '').toLowerCase();
    const selectedType = String(filterType ? filterType.value : '').toLowerCase();

    state.filtered = state.records.filter((item) => {
        const matchesSearch =
            item.observasiBy.toLowerCase().includes(searchTerm) ||
            item.departemen.toLowerCase().includes(searchTerm) ||
            item.lokasi.toLowerCase().includes(searchTerm) ||
            item.tipe.toLowerCase().includes(searchTerm) ||
            item.tanggal.toLowerCase().includes(searchTerm) ||
            item.photoDescription.toLowerCase().includes(searchTerm);

        const matchesType = selectedType === '' || item.tipe.toLowerCase().includes(selectedType);
        return matchesSearch && matchesType;
    });
}

function getStatusClass(status) {
    if (status === 'Done') return 'status-done';
    if (status === 'In Progress') return 'status-progress';
    return 'status-pending';
}

async function showObservasiDetailModal(no) {
    const item = state.records.find((row) => row.no === no);
    if (!item) {
        showNotification('Data observasi tidak ditemukan.', 'error');
        return;
    }

    const photoHtml = item.photoDataUrl
        ? `<a href="${item.photoDataUrl}" target="_blank" rel="noopener noreferrer"><img src="${item.photoDataUrl}" alt="Foto observasi ${item.no}" style="max-width:100%;max-height:260px;border-radius:8px;display:block;margin:0 auto 10px;"></a>`
        : '<div style="font-style:italic;color:#6c757d;">Tidak ada foto</div>';

    const html = `
        <div style="text-align:left;line-height:1.6;">
            <div style="margin-bottom:10px;">${photoHtml}</div>
            <div><strong>No:</strong> ${item.no}</div>
            <div><strong>Tanggal:</strong> ${escapeHtml(item.tanggal || '-')}</div>
            <div><strong>Observasi By:</strong> ${escapeHtml(item.observasiBy || '-')}</div>
            <div><strong>Departemen:</strong> ${escapeHtml(item.departemen || '-')}</div>
            <div><strong>Tipe:</strong> ${escapeHtml(item.tipe || '-')}</div>
            <div><strong>Lokasi:</strong> ${escapeHtml(item.lokasi || '-')}</div>
            <div><strong>Status:</strong> ${escapeHtml(item.status || '-')}</div>
            <div><strong>Deskripsi Gambar:</strong> ${escapeHtml(item.photoDescription || '-')}</div>
        </div>
    `;

    if (hasSwal()) {
        await window.Swal.fire({
            title: `Detail Observasi #${item.no}`,
            html,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Tutup',
            confirmButtonColor: '#6c757d',
            width: 'min(760px, 96vw)'
        });
        return;
    }

    await showFallbackDialog({
        icon: 'info',
        title: `Detail Observasi #${item.no}`,
        html,
        confirmButtonText: 'Tutup',
        showCancel: false
    });
}

function getTotalPages(totalItems, pageSize) {
    return Math.max(1, Math.ceil(totalItems / pageSize));
}

function clampPageNumber(page, totalItems, pageSize) {
    const totalPages = getTotalPages(totalItems, pageSize);
    if (!Number.isFinite(page) || page < 1) return 1;
    if (page > totalPages) return totalPages;
    return page;
}

function getPaginatedItems(items, page, pageSize) {
    const safePage = clampPageNumber(page, items.length, pageSize);
    const startIndex = (safePage - 1) * pageSize;
    return {
        safePage,
        startIndex,
        rows: items.slice(startIndex, startIndex + pageSize)
    };
}

function renderPaginationControls(infoEl, prevEl, nextEl, page, totalItems, pageSize) {
    const totalPages = getTotalPages(totalItems, pageSize);
    if (infoEl) infoEl.textContent = `Halaman ${page} dari ${totalPages} (${totalItems} data)`;
    if (prevEl) prevEl.disabled = page <= 1 || totalItems === 0;
    if (nextEl) nextEl.disabled = page >= totalPages || totalItems === 0;
}

function renderObservasiTable() {
    if (!observasiTableBody) return;
    observasiTableBody.innerHTML = '';
    const totalItems = state.filtered.length;
    paginationState.observasi = clampPageNumber(paginationState.observasi, totalItems, PAGE_SIZE.observasi);
    const paged = getPaginatedItems(state.filtered, paginationState.observasi, PAGE_SIZE.observasi);

    if (!totalItems) {
        const emptyText = state.records.length
            ? 'Tidak ada data yang cocok dengan pencarian/filter saat ini.'
            : 'Belum ada data observasi.';
        observasiTableBody.innerHTML = `<tr><td colspan="10" class="empty-table">${emptyText}</td></tr>`;
        renderPaginationControls(observasiPaginationInfo, observasiPaginationPrev, observasiPaginationNext, 1, 0, PAGE_SIZE.observasi);
        return;
    }

    paged.rows.forEach((item) => {
        const photoCell = item.photoDataUrl
            ? `<a href="${item.photoDataUrl}" target="_blank" rel="noopener noreferrer" class="table-photo-link"><img src="${item.photoDataUrl}" class="table-photo-thumb" alt="Foto observasi ${item.no}" loading="lazy" decoding="async"></a>`
            : '<span class="table-photo-empty">Tidak ada foto</span>';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.no}</td>
            <td>${escapeHtml(item.tanggal)}</td>
            <td>${escapeHtml(item.observasiBy)}</td>
            <td>${escapeHtml(item.departemen)}</td>
            <td>${escapeHtml(item.tipe)}</td>
            <td>${escapeHtml(item.lokasi)}</td>
            <td class="table-photo-cell">${photoCell}</td>
            <td class="table-text-muted">${escapeHtml(item.photoDescription || '-')}</td>
            <td><span class="status-badge ${getStatusClass(item.status)}">${item.status}</span></td>
            <td>
                <div class="table-actions">
                    <button type="button" class="btn-table btn-view btn-icon" data-no="${item.no}" title="Lihat Detail" aria-label="Lihat Detail"><i class="fas fa-eye"></i></button>
                    <button type="button" class="btn-table btn-edit btn-icon" data-no="${item.no}" title="Edit" aria-label="Edit"><i class="fas fa-pen"></i></button>
                    <button type="button" class="btn-table btn-delete btn-icon" data-no="${item.no}" title="Hapus" aria-label="Hapus"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        observasiTableBody.appendChild(row);
    });

    renderPaginationControls(
        observasiPaginationInfo,
        observasiPaginationPrev,
        observasiPaginationNext,
        paged.safePage,
        totalItems,
        PAGE_SIZE.observasi
    );
}

function renderProgressTable() {
    if (!progressTableBody) return;
    progressTableBody.innerHTML = '';
    const totalItems = state.records.length;
    paginationState.progress = clampPageNumber(paginationState.progress, totalItems, PAGE_SIZE.progress);
    const paged = getPaginatedItems(state.records, paginationState.progress, PAGE_SIZE.progress);

    if (!totalItems) {
        progressTableBody.innerHTML = '<tr><td colspan="10" class="empty-table">Belum ada data progress.</td></tr>';
        renderPaginationControls(progressPaginationInfo, progressPaginationPrev, progressPaginationNext, 1, 0, PAGE_SIZE.progress);
        return;
    }

    paged.rows.forEach((item) => {
        const photoCell = item.photoDataUrl
            ? `<a href="${item.photoDataUrl}" target="_blank" rel="noopener noreferrer" class="table-photo-link"><img src="${item.photoDataUrl}" class="table-photo-thumb" alt="Foto observasi ${item.no}" loading="lazy" decoding="async"></a>`
            : '<span class="table-photo-empty">Tidak ada foto</span>';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.no}</td>
            <td>${escapeHtml(item.tanggal)}</td>
            <td>${escapeHtml(item.observasiBy)}</td>
            <td>${escapeHtml(item.departemen)}</td>
            <td>${escapeHtml(item.tipe)}</td>
            <td>${escapeHtml(item.lokasi)}</td>
            <td class="table-photo-cell">${photoCell}</td>
            <td class="table-text-muted">${escapeHtml(item.photoDescription || '-')}</td>
            <td class="progress-status-cell">
                <select class="progress-status-select" data-no="${item.no}">
                    <option value="Pending" ${item.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="In Progress" ${item.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Done" ${item.status === 'Done' ? 'selected' : ''}>Done</option>
                </select>
            </td>
            <td>
                <div class="table-actions">
                    <button type="button" class="btn-table btn-view btn-icon" data-no="${item.no}" title="Lihat Detail" aria-label="Lihat Detail"><i class="fas fa-eye"></i></button>
                    <button type="button" class="btn-table btn-edit btn-icon" data-no="${item.no}" title="Edit" aria-label="Edit"><i class="fas fa-pen"></i></button>
                    <button type="button" class="btn-table btn-delete btn-icon" data-no="${item.no}" title="Hapus" aria-label="Hapus"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        progressTableBody.appendChild(row);
    });

    renderPaginationControls(
        progressPaginationInfo,
        progressPaginationPrev,
        progressPaginationNext,
        paged.safePage,
        totalItems,
        PAGE_SIZE.progress
    );
}

function initCharts() {
    const { typeCounts, deptCounts } = buildReportCounts();

    const typeCtx = document.getElementById('typeChart');
    const deptCtx = document.getElementById('deptChart');

    if (typeChartInstance) {
        typeChartInstance.destroy();
        typeChartInstance = null;
    }

    if (deptChartInstance) {
        deptChartInstance.destroy();
        deptChartInstance = null;
    }

    if (typeCtx && Object.keys(typeCounts).length) {
        typeChartInstance = new Chart(typeCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(typeCounts),
                datasets: [{
                    data: Object.values(typeCounts),
                    backgroundColor: ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#00ACC1', '#9C27B0']
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    if (deptCtx && Object.keys(deptCounts).length) {
        deptChartInstance = new Chart(deptCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(deptCounts),
                datasets: [{
                    data: Object.values(deptCounts),
                    backgroundColor: ['#FBBC04', '#4285F4', '#EA4335', '#34A853', '#00ACC1', '#9C27B0', '#FF7043']
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    reportSummaryState.typeCounts = { ...typeCounts };
    reportSummaryState.deptCounts = { ...deptCounts };
    renderReportSummaryTables(typeCounts, deptCounts);
}

function buildReportCounts() {
    const typeCounts = {};
    const deptCounts = {};

    state.records.forEach((item) => {
        typeCounts[item.tipe] = (typeCounts[item.tipe] || 0) + 1;
        deptCounts[item.departemen] = (deptCounts[item.departemen] || 0) + 1;
    });

    return { typeCounts, deptCounts };
}

function refreshReportCacheOnly() {
    const { typeCounts, deptCounts } = buildReportCounts();
    reportSummaryState.typeCounts = { ...typeCounts };
    reportSummaryState.deptCounts = { ...deptCounts };
}

function initLazySectionLoaders() {
    if (safetyInductionVideo) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const source = safetyInductionVideo.getAttribute('data-src') || '';
                if (source && safetyInductionVideo.getAttribute('src') !== source) {
                    safetyInductionVideo.setAttribute('src', source);
                }
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '150px 0px', threshold: 0.05 });

        const section = document.getElementById('safety-induction');
        if (section) videoObserver.observe(section);
    }

    if (reportSection) {
        const reportObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                isReportRenderEnabled = true;
                initCharts();
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '120px 0px', threshold: 0.05 });
        reportObserver.observe(reportSection);
    }
}

function renderReportSummaryTables(typeCounts, deptCounts) {
    if (reportTypeTableBody) {
        reportTypeTableBody.innerHTML = '';
        const typeEntries = Object.entries(typeCounts);
        paginationState.reportType = clampPageNumber(paginationState.reportType, typeEntries.length, PAGE_SIZE.report);
        const pagedType = getPaginatedItems(typeEntries, paginationState.reportType, PAGE_SIZE.report);
        if (!typeEntries.length) {
            reportTypeTableBody.innerHTML = '<tr><td colspan="3" class="empty-table">Belum ada data report tipe.</td></tr>';
            renderPaginationControls(reportTypePaginationInfo, reportTypePaginationPrev, reportTypePaginationNext, 1, 0, PAGE_SIZE.report);
        } else {
            pagedType.rows.forEach(([name, total], index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pagedType.startIndex + index + 1}</td>
                    <td>${escapeHtml(name)}</td>
                    <td>${total}</td>
                `;
                reportTypeTableBody.appendChild(row);
            });
            renderPaginationControls(
                reportTypePaginationInfo,
                reportTypePaginationPrev,
                reportTypePaginationNext,
                pagedType.safePage,
                typeEntries.length,
                PAGE_SIZE.report
            );
        }
    }

    if (reportDeptTableBody) {
        reportDeptTableBody.innerHTML = '';
        const deptEntries = Object.entries(deptCounts);
        paginationState.reportDept = clampPageNumber(paginationState.reportDept, deptEntries.length, PAGE_SIZE.report);
        const pagedDept = getPaginatedItems(deptEntries, paginationState.reportDept, PAGE_SIZE.report);
        if (!deptEntries.length) {
            reportDeptTableBody.innerHTML = '<tr><td colspan="3" class="empty-table">Belum ada data report departemen.</td></tr>';
            renderPaginationControls(reportDeptPaginationInfo, reportDeptPaginationPrev, reportDeptPaginationNext, 1, 0, PAGE_SIZE.report);
        } else {
            pagedDept.rows.forEach(([name, total], index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pagedDept.startIndex + index + 1}</td>
                    <td>${escapeHtml(name)}</td>
                    <td>${total}</td>
                `;
                reportDeptTableBody.appendChild(row);
            });
            renderPaginationControls(
                reportDeptPaginationInfo,
                reportDeptPaginationPrev,
                reportDeptPaginationNext,
                pagedDept.safePage,
                deptEntries.length,
                PAGE_SIZE.report
            );
        }
    }
}

function renderAllObservasiViews() {
    applyFilters();
    renderObservasiTable();
    renderProgressTable();
    if (isReportRenderEnabled) initCharts();
    else refreshReportCacheOnly();
}

function pickNextIndex(currentIndex, length) {
    if (length <= 1) return 0;
    let nextIndex = currentIndex;
    while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * length);
    }
    return nextIndex;
}

function preloadImage(imagePath) {
    return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve(imagePath);
        image.onerror = () => resolve(imagePath);
        image.src = imagePath;
    });
}

function applyHeroBackground(imagePath) {
    if (!heroSection || !imagePath) return;
    heroSection.style.backgroundImage = `linear-gradient(rgba(26, 58, 77, 0.72), rgba(44, 95, 125, 0.72)), url('${imagePath}')`;
}

async function crossfadeHeroBackground(imagePath) {
    if (!heroSection || !imagePath) return;
    await preloadImage(imagePath);

    if (!heroBgLayer) {
        applyHeroBackground(imagePath);
        return;
    }

    heroBgLayer.style.backgroundImage = `linear-gradient(rgba(26, 58, 77, 0.72), rgba(44, 95, 125, 0.72)), url('${imagePath}')`;
    heroBgLayer.classList.add('visible');

    window.setTimeout(() => {
        applyHeroBackground(imagePath);
        heroBgLayer.classList.remove('visible');
    }, 1200);
}

let isHseImageAnimating = false;
async function animateHseInfoImage(imagePath) {
    if (!hseInfoImage || !imagePath || isHseImageAnimating) return;
    isHseImageAnimating = true;
    await preloadImage(imagePath);

    hseInfoImage.classList.remove('is-entering');
    hseInfoImage.classList.add('is-transitioning');

    window.setTimeout(() => {
        hseInfoImage.src = imagePath;
        hseInfoImage.classList.remove('is-transitioning');
        hseInfoImage.classList.add('is-entering');
        window.setTimeout(() => {
            hseInfoImage.classList.remove('is-entering');
            isHseImageAnimating = false;
        }, 900);
    }, 280);
}

function initRotatingImages() {
    if (!rotatingAssetImages.length) return;

    let heroIndex = 0;
    let hseIndex = 1 % rotatingAssetImages.length;

    applyHeroBackground(rotatingAssetImages[heroIndex]);
    if (hseInfoImage) hseInfoImage.src = rotatingAssetImages[hseIndex];

    window.setInterval(() => {
        heroIndex = pickNextIndex(heroIndex, rotatingAssetImages.length);
        crossfadeHeroBackground(rotatingAssetImages[heroIndex]);
    }, 14000);

    window.setInterval(() => {
        if (!hseInfoImage) return;
        hseIndex = pickNextIndex(hseIndex, rotatingAssetImages.length);
        animateHseInfoImage(rotatingAssetImages[hseIndex]);
    }, 10000);
}

// Navigation interactions
function setObservasiDropdownState(isOpen) {
    if (!observasiDropdown || !observasiToggle) return;
    observasiDropdown.classList.toggle('open', isOpen);
    observasiToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

if (navToggle) {
    navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
}

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        if (isMobileViewport()) {
            const isOpen = document.body.classList.contains('sidebar-open');
            setSidebarOpenState(!isOpen);
            return;
        }

        const isCollapsed = document.body.classList.contains('sidebar-collapsed');
        setSidebarCollapsedState(!isCollapsed);
    });
}

if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', () => {
        if (isMobileViewport()) {
            setSidebarOpenState(false);
            return;
        }

        const isCollapsed = document.body.classList.contains('sidebar-collapsed');
        setSidebarCollapsedState(!isCollapsed);
    });
}

if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', () => setSidebarOpenState(false));
}

window.addEventListener('resize', () => {
    if (!document.body.classList.contains('layout-sidebar')) return;
    if (isMobileViewport()) {
        setSidebarOpenState(false);
    }
});

if (observasiToggle) {
    observasiToggle.addEventListener('click', (event) => {
        event.preventDefault();
        setObservasiDropdownState(!observasiDropdown.classList.contains('open'));
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        if (link.classList.contains('dropdown-toggle')) {
            event.preventDefault();
            return;
        }

        navMenu.classList.remove('active');
        setSidebarOpenState(false);
        setObservasiDropdownState(false);
        navLinks.forEach((node) => node.classList.remove('active'));
        link.classList.add('active');
    });
});

dropdownLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        setSidebarOpenState(false);
        setObservasiDropdownState(false);
    });
});

sidebarLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (isMobileViewport()) setSidebarOpenState(false);
    });
});

document.addEventListener('click', (event) => {
    if (!observasiDropdown) return;
    if (!observasiDropdown.contains(event.target)) setObservasiDropdownState(false);
});

window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) current = section.id;
    });

    navLinks.forEach((link) => {
        const href = String(link.getAttribute('href') || '');
        if (!href.startsWith('#')) return;
        link.classList.remove('active');
        if (href === `#${current}`) link.classList.add('active');
    });
});

const SECTION_PAGE_MAP = {
    beranda: 'index.html',
    'info-hse': 'pages/info-hse.html',
    'p2k3-bma': 'pages/p2k3-bma.html',
    'tambahkan-observasi': 'pages/tambahkan-observasi.html',
    'safety-induction': 'pages/safety-induction.html',
    'data-observasi': 'pages/data-observasi.html',
    'observasi-report': 'pages/observasi-report.html',
    'observasi-progress': 'pages/observasi-progress.html'
};

function runNavSearch() {
    const term = String(navSearchInput ? navSearchInput.value : '').trim();
    if (!term) return;

    if (navigateByKeyword(term)) {
        setNavSearchState(false);
        return;
    }

    if (searchInput) searchInput.value = term;
    paginationState.observasi = 1;
    renderAllObservasiViews();
    scrollToSection('data-observasi');
    showNotification(`Tidak ada menu spesifik untuk "${term}", menampilkan hasil di Data Observasi.`, 'info');
}

function navigateByKeyword(term) {
    const keyword = term.toLowerCase().trim();
    if (!keyword) return false;

    const keywordMap = [
        { section: 'beranda', keys: ['beranda', 'home', 'utama', 'welcome'] },
        { section: 'info-hse', keys: ['info hse', 'hse', 'safety', 'keselamatan'] },
        { section: 'p2k3-bma', keys: ['p2k3', 'meeting', 'p2k3 bma', 'bma'] },
        { section: 'tambahkan-observasi', keys: ['tambah observasi', 'submit observasi', 'hse observasi', 'form observasi'] },
        { section: 'safety-induction', keys: ['safety induction', 'induction', 'materi safety'] },
        { section: 'data-observasi', keys: ['data observasi', 'observasi', 'data'] },
        { section: 'observasi-report', keys: ['observasi report', 'report', 'grafik', 'chart'] },
        { section: 'observasi-progress', keys: ['observasi progress', 'progress', 'tindak lanjut', 'status'] }
    ];

    let targetSection = '';
    let bestScore = 0;

    keywordMap.forEach((entry) => {
        entry.keys.forEach((key) => {
            const normalizedKey = String(key || '').toLowerCase().trim();
            if (!normalizedKey) return;

            let score = 0;
            if (keyword === normalizedKey) score += 1000;
            if (keyword.includes(normalizedKey)) score += normalizedKey.length * 10;
            if (normalizedKey.includes(keyword)) score += Math.max(10, keyword.length * 4);

            if (score > bestScore) {
                bestScore = score;
                targetSection = entry.section;
            }
        });
    });

    if (!targetSection) return false;

    scrollToSection(targetSection);
    return true;
}

function setNavSearchState(isActive) {
    if (!navSearchWrap || !navSearchBtn || !navbar) return;
    navSearchWrap.classList.toggle('active', isActive);
    navbar.classList.toggle('search-mode', isActive);
    navSearchBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
}

function isMobileViewport() {
    return window.matchMedia('(max-width: 968px)').matches;
}

function setSidebarOpenState(isOpen) {
    const bodyNode = document.body;
    if (!bodyNode) return;
    bodyNode.classList.toggle('sidebar-open', !!isOpen);
}

function setSidebarCollapsedState(isCollapsed) {
    const bodyNode = document.body;
    if (!bodyNode) return;
    bodyNode.classList.toggle('sidebar-collapsed', !!isCollapsed);
    try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, isCollapsed ? '1' : '0');
    } catch {}
}

function initSidebarState() {
    if (!document.body || !document.body.classList.contains('layout-sidebar')) return;
    document.documentElement.classList.remove('sidebar-collapsed-pref');
    if (isMobileViewport()) {
        setSidebarOpenState(false);
        return;
    }

    let collapsed = false;
    try {
        collapsed = localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1';
    } catch {}
    setSidebarCollapsedState(collapsed);
}

function normalizePathname(pathname) {
    const raw = String(pathname || '').trim().toLowerCase();
    if (!raw || raw.endsWith('/')) return 'index.html';
    return raw.replace(/^\/+/, '');
}

function normalizeRoute(route) {
    const raw = normalizePathname(route);
    if (!raw || raw === '.') return 'index.html';
    if (raw.startsWith('pages/')) return raw;
    return raw;
}

function resolveSectionPagePath(sectionId) {
    const target = SECTION_PAGE_MAP[sectionId];
    if (!target) return '';

    const inPagesDir = normalizePathname(window.location.pathname).startsWith('pages/');
    if (!inPagesDir) return target;
    if (target === 'index.html') return '../index.html';
    if (target.startsWith('pages/')) return target.replace(/^pages\//, '');
    return target;
}

function applyActiveNavigationByPath() {
    const currentPath = normalizeRoute(normalizePathname(window.location.pathname));
    const inPagesDir = currentPath.startsWith('pages/');
    const normalizeLinkHref = (href) => {
        const value = String(href || '').trim().toLowerCase();
        if (!value || value.startsWith('#')) return '';
        const cleaned = value.replace(/^\.\//, '');
        if (cleaned.startsWith('../')) return cleaned.replace(/^\.\.\//, '');
        return cleaned;
    };
    const applyActive = (links) => {
        links.forEach((link) => {
            const href = normalizeLinkHref(link.getAttribute('href') || '');
            if (!href) return;
            let route = normalizeRoute(href);
            if (inPagesDir && !route.startsWith('pages/') && route !== 'index.html') {
                route = `pages/${route}`;
            }
            const samePage = route === currentPath;
            link.classList.toggle('active', samePage);
        });
    };

    applyActive(navLinks);
    applyActive(sidebarLinks);
}

function applyPageVisibilityByConfig() {
    const bodyNode = document.body;
    if (!bodyNode) return;
    const raw = String(bodyNode.getAttribute('data-visible-sections') || '').trim();
    if (!raw) return;

    const allowed = raw.split(',').map((item) => item.trim()).filter(Boolean);
    if (!allowed.length) return;
    const allowedSet = new Set(allowed);

    document.querySelectorAll('section').forEach((section) => {
        const sectionId = String(section.id || '').trim();
        if (sectionId && allowedSet.has(sectionId)) return;
        section.style.display = 'none';
    });
}

if (navSearchBtn) {
    navSearchBtn.addEventListener('click', () => {
        const isOpen = navSearchWrap && navSearchWrap.classList.contains('active');
        if (!isOpen) {
            setNavSearchState(true);
            if (navSearchInput) navSearchInput.focus();
            return;
        }

        runNavSearch();
    });
}

if (navSearchInput) {
    navSearchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            runNavSearch();
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            setNavSearchState(false);
        }
    });
}

if (navbar) {
    navbar.addEventListener('click', (event) => {
        if (!navbar.classList.contains('search-mode')) return;
        if (!navSearchWrap) return;
        if (!navSearchWrap.contains(event.target)) {
            setNavSearchState(false);
        }
    });
}

document.addEventListener('click', (event) => {
    if (!navSearchWrap) return;
    if (!navbar || !navbar.classList.contains('search-mode')) return;
    if (!navSearchWrap.contains(event.target) && !navbar.contains(event.target)) {
        setNavSearchState(false);
    }
});

// Table actions
if (observasiTableBody) {
    observasiTableBody.addEventListener('click', (event) => {
        if (tryOpenPhotoPreviewFromEvent(event)) return;

        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        const actionBtn = target.closest('button[data-no]');
        if (!actionBtn) return;

        const no = Number(actionBtn.dataset.no);
        if (!no) return;

        if (actionBtn.classList.contains('btn-view')) showObservasiDetailModal(no);
        if (actionBtn.classList.contains('btn-edit')) editObservasi(no);
        if (actionBtn.classList.contains('btn-delete')) deleteObservasi(no);
    });
}

if (progressTableBody) {
    progressTableBody.addEventListener('click', (event) => {
        if (tryOpenPhotoPreviewFromEvent(event)) return;

        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        const actionBtn = target.closest('button[data-no]');
        if (!actionBtn) return;

        const no = Number(actionBtn.dataset.no);
        if (!no) return;

        if (actionBtn.classList.contains('btn-view')) showObservasiDetailModal(no);
        if (actionBtn.classList.contains('btn-edit')) editObservasi(no);
        if (actionBtn.classList.contains('btn-delete')) deleteObservasi(no);
    });

    progressTableBody.addEventListener('change', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLSelectElement)) return;
        if (!target.classList.contains('progress-status-select')) return;

        const no = Number(target.dataset.no);
        if (!no) return;
        updateObservasiStatus(no, target.value);
    });
}

// Filters
if (searchInput) {
    searchInput.addEventListener('input', () => {
        paginationState.observasi = 1;
        renderAllObservasiViews();
    });
}
if (filterType) {
    filterType.addEventListener('change', () => {
        paginationState.observasi = 1;
        renderAllObservasiViews();
    });
}

if (observasiPaginationPrev) {
    observasiPaginationPrev.addEventListener('click', () => {
        paginationState.observasi = Math.max(1, paginationState.observasi - 1);
        renderObservasiTable();
    });
}
if (observasiPaginationNext) {
    observasiPaginationNext.addEventListener('click', () => {
        paginationState.observasi += 1;
        renderObservasiTable();
    });
}
if (progressPaginationPrev) {
    progressPaginationPrev.addEventListener('click', () => {
        paginationState.progress = Math.max(1, paginationState.progress - 1);
        renderProgressTable();
    });
}
if (progressPaginationNext) {
    progressPaginationNext.addEventListener('click', () => {
        paginationState.progress += 1;
        renderProgressTable();
    });
}
if (reportTypePaginationPrev) {
    reportTypePaginationPrev.addEventListener('click', () => {
        paginationState.reportType = Math.max(1, paginationState.reportType - 1);
        renderReportSummaryTables(reportSummaryState.typeCounts, reportSummaryState.deptCounts);
    });
}
if (reportTypePaginationNext) {
    reportTypePaginationNext.addEventListener('click', () => {
        paginationState.reportType += 1;
        renderReportSummaryTables(reportSummaryState.typeCounts, reportSummaryState.deptCounts);
    });
}
if (reportDeptPaginationPrev) {
    reportDeptPaginationPrev.addEventListener('click', () => {
        paginationState.reportDept = Math.max(1, paginationState.reportDept - 1);
        renderReportSummaryTables(reportSummaryState.typeCounts, reportSummaryState.deptCounts);
    });
}
if (reportDeptPaginationNext) {
    reportDeptPaginationNext.addEventListener('click', () => {
        paginationState.reportDept += 1;
        renderReportSummaryTables(reportSummaryState.typeCounts, reportSummaryState.deptCounts);
    });
}

// CRUD controls
if (addObservasiBtn) addObservasiBtn.addEventListener('click', () => setFormMode('create'));
if (cancelObservasiBtn) cancelObservasiBtn.addEventListener('click', handleCancelObservasiForm);
if (observasiForm) observasiForm.addEventListener('submit', handleObservasiSubmit);
if (importObservasiBtn) importObservasiBtn.addEventListener('click', () => importFromInput(uploadObservasiFile, uploadFileName, 'CSV/TXT/JSON/XLSX'));
if (exportObservasiBtn) exportObservasiBtn.addEventListener('click', exportObservasiToCsv);
if (templateObservasiBtn) templateObservasiBtn.addEventListener('click', () => downloadCsvTemplate('observasi'));
if (clearObservasiBtn) clearObservasiBtn.addEventListener('click', clearAllData);
if (formPhotoInput) formPhotoInput.addEventListener('change', handleFormPhotoInputChange);
if (clearPhotoBtn) clearPhotoBtn.addEventListener('click', () => clearFormPhoto());

if (reportImportBtn) reportImportBtn.addEventListener('click', () => importFromInput(reportUploadFile, reportUploadName, 'CSV/XLSX report'));
if (reportExportBtn) reportExportBtn.addEventListener('click', exportReportToCsv);
if (reportTemplateBtn) reportTemplateBtn.addEventListener('click', () => downloadCsvTemplate('report'));
if (progressImportBtn) progressImportBtn.addEventListener('click', () => importFromInput(progressUploadFile, progressUploadName, 'CSV/XLSX progress'));
if (progressExportBtn) progressExportBtn.addEventListener('click', exportProgressToCsv);
if (progressTemplateBtn) progressTemplateBtn.addEventListener('click', () => downloadCsvTemplate('progress'));
if (progressDeleteAllBtn) progressDeleteAllBtn.addEventListener('click', clearAllData);
if (p2k3UploadBtn) p2k3UploadBtn.addEventListener('click', handleP2k3Upload);
if (p2k3ClearBtn) p2k3ClearBtn.addEventListener('click', clearP2k3Upload);
if (hseUploadBtn) hseUploadBtn.addEventListener('click', handleHseUpload);
if (hseClearBtn) hseClearBtn.addEventListener('click', clearHseUploads);

// Global functions used by inline HTML
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const isVisible = !!(section && window.getComputedStyle(section).display !== 'none');
    if (section && isVisible) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
    }

    const targetPage = resolveSectionPagePath(sectionId);
    if (targetPage) window.location.href = targetPage;
}

function openPDFFullscreen() {
    const iframe = document.getElementById('pdfViewer');
    if (!iframe) return;

    if (iframe.requestFullscreen) iframe.requestFullscreen();
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
}

function showNotification(message, type = 'info') {
    if (hasSwal()) {
        const icon = type === 'error' ? 'error' : type === 'success' ? 'success' : 'info';
        window.Swal.fire({
            toast: true,
            position: 'top-end',
            timer: 2500,
            timerProgressBar: true,
            showConfirmButton: false,
            icon,
            title: message
        });
        return;
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initial bootstrap
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('fade-in');
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', async () => {
    showGlobalLoading('Menyiapkan website...');
    applyCurrentYearLabels();
    applyPageVisibilityByConfig();
    applyActiveNavigationByPath();
    initSidebarState();
    document.querySelectorAll('section').forEach((section) => observer.observe(section));
    initLazySectionLoaders();
    initRotatingImages();
    renderFormPhotoPreview();
    initP2k3DefaultViewer();
    try {
        await loadInitialData();
        await loadSupportingDocumentData();
        renderAllObservasiViews();

        if (useSupabase) {
            showNotification('Backend Supabase aktif.', 'success');
        } else {
            showNotification('Backend localStorage aktif. Tambahkan config Supabase untuk mode cloud.', 'info');
        }
    } finally {
        hideGlobalLoading();
    }
});

console.log('%c SAMS - Safety Management System ', 'background: #2c5f7d; color: white; font-size: 16px; padding: 10px;');
