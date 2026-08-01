# SAMS - Safety Management System
## PT Bhumiadya Indonesia

Portal SAMS untuk mengelola data HSE observasi dengan sistem CRUD, import file, report chart, dan progress tracking.

## Fitur Utama

1. Beranda, Info HSE, P2K3 BMA, Tambahkan Observasi, Safety Induction.
2. Data Observasi:
   - CRUD (Tambah, Edit, Delete, Kosongkan)
   - Import CSV/TXT/JSON/XLS/XLSX
   - Search + filter tipe
3. Observasi Report:
   - Pie chart tipe observasi
   - Pie chart distribusi departemen
   - Import CSV/XLS/XLSX dari menu report
4. Observasi Progress:
   - Tabel progress sinkron dengan data observasi
   - Import CSV/XLS/XLSX dari menu progress
   - Update status + delete data
5. P2K3 BMA:
   - Upload dokumen (PDF/Word/Excel/PPT/TXT/CSV)
   - Preview PDF di viewer dan link file upload
6. HSE - Observasi:
   - Upload multiple dokumen (PDF/Word/Excel/PPT/TXT/CSV)
   - List file + hapus file
7. Search bar di navbar untuk mencari data observasi cepat.

## Teknologi

- HTML5
- CSS3
- JavaScript (Vanilla)
- Chart.js
- Font Awesome
- Supabase (opsional)

## Format Import

Header yang dikenali:
- `no, tanggal, observasiBy, departemen, tipe, lokasi, status, deskripsiGambar, photoName, photo`

Format file:
- `.csv`
- `.txt` (delimiter csv/semi-colon/tab/pipe)
- `.json` (array object)
- `.xls`
- `.xlsx`

## Supabase (Opsional, siap deploy Vercel)

Aplikasi otomatis pakai `localStorage` jika Supabase belum diisi.

### 1) Tambahkan library Supabase
Sudah dimuat via CDN di `index.html`.

### 2) Tambahkan config global
Sisipkan sebelum `script.js`:

```html
<script>
  window.SAMS_SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
  window.SAMS_SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
  window.SAMS_SUPABASE_TABLE = "observasi_records";
  window.SAMS_SUPABASE_P2K3_TABLE = "meeting_p2k3_files";
  window.SAMS_SUPABASE_HSE_TABLE = "hse_observasi_files_2026";
  window.SAMS_SUPABASE_DOC_BUCKET = "sams-documents";
</script>
```

### 3) Buat tabel Supabase
Nama tabel: `observasi_records`

Kolom minimum (termasuk foto):
- `id` text primary key
- `tanggal` text
- `observasi_by` text
- `departemen` text
- `tipe` text
- `lokasi` text
- `status` text
- `photo_data_url` text
- `photo_name` text
- `photo_description` text
- `created_at` timestamp default now()

SQL create table (baru):

```sql
create table if not exists public.observasi_records (
  id text primary key,
  tanggal text,
  observasi_by text,
  departemen text,
  tipe text,
  lokasi text,
  status text,
  photo_data_url text,
  photo_name text,
  photo_description text,
  created_at timestamptz default now()
);
```

Jika tabel sudah ada, jalankan migrasi kolom foto:

```sql
alter table public.observasi_records
add column if not exists photo_data_url text,
add column if not exists photo_name text,
add column if not exists photo_description text;
```

### 3b) Tabel dokumen menu MEETING P2K3

```sql
create extension if not exists pgcrypto;

create table if not exists public.meeting_p2k3_files (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  public_url text not null,
  storage_path text not null,
  mime_type text,
  file_size bigint default 0,
  created_at timestamptz default now()
);
```

### 3c) Tabel dokumen menu HSE - OBSERVASI 2026

```sql
create table if not exists public.hse_observasi_files_2026 (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  public_url text not null,
  storage_path text not null,
  mime_type text,
  file_size bigint default 0,
  created_at timestamptz default now()
);
```

### 3d) Storage bucket dokumen

```sql
insert into storage.buckets (id, name, public)
values ('sams-documents', 'sams-documents', true)
on conflict (id) do nothing;
```

### 4) RLS Policy
Aktifkan RLS + policy berikut agar frontend (anon key) bisa CRUD:

```sql
alter table public.observasi_records enable row level security;

drop policy if exists anon_select on public.observasi_records;
drop policy if exists anon_insert on public.observasi_records;
drop policy if exists anon_update on public.observasi_records;
drop policy if exists anon_delete on public.observasi_records;

create policy anon_select
on public.observasi_records for select
to anon
using (true);

create policy anon_insert
on public.observasi_records for insert
to anon
with check (true);

create policy anon_update
on public.observasi_records for update
to anon
using (true)
with check (true);

create policy anon_delete
on public.observasi_records for delete
to anon
using (true);
```

Aktifkan RLS + policy tabel dokumen:

```sql
alter table public.meeting_p2k3_files enable row level security;
alter table public.hse_observasi_files_2026 enable row level security;

drop policy if exists p2k3_anon_all on public.meeting_p2k3_files;
create policy p2k3_anon_all
on public.meeting_p2k3_files
for all
to anon
using (true)
with check (true);

drop policy if exists hse_anon_all on public.hse_observasi_files_2026;
create policy hse_anon_all
on public.hse_observasi_files_2026
for all
to anon
using (true)
with check (true);
```

Policy Storage bucket agar anon bisa upload/read/delete:

```sql
drop policy if exists storage_anon_docs_select on storage.objects;
drop policy if exists storage_anon_docs_insert on storage.objects;
drop policy if exists storage_anon_docs_update on storage.objects;
drop policy if exists storage_anon_docs_delete on storage.objects;

create policy storage_anon_docs_select
on storage.objects for select
to anon
using (bucket_id = 'sams-documents');

create policy storage_anon_docs_insert
on storage.objects for insert
to anon
with check (bucket_id = 'sams-documents');

create policy storage_anon_docs_update
on storage.objects for update
to anon
using (bucket_id = 'sams-documents')
with check (bucket_id = 'sams-documents');

create policy storage_anon_docs_delete
on storage.objects for delete
to anon
using (bucket_id = 'sams-documents');
```

## Menjalankan Lokal

1. Buka folder project.
2. Jalankan file `index.html` di browser.
3. Upload file data (CSV/XLSX) untuk mulai menampilkan data.

## Auth (Login/Register/Forgot Password)

Folder auth yang sudah ditambahkan:

- `pages/auth/login.html`
- `pages/auth/register.html`
- `pages/auth/forgot-password.html`
- `pages/auth/reset-password.html`
- `pages/auth/logout.html`
- `pages/profile.html`
- `scripts/auth/auth-service.js`
- `scripts/auth/auth-guard.js`
- `scripts/auth/login.js`
- `scripts/auth/register.js`
- `scripts/auth/forgot-password.js`
- `scripts/auth/reset-password.js`
- `scripts/auth/logout.js`
- `scripts/auth/profile.js`
- `scripts/auth/protect-page.js`
- `styles/auth/auth.css`

### Cara setup backend Supabase Auth

Penting: **Tidak perlu membuat tabel login manual**. Supabase Auth otomatis memakai tabel internal `auth.users`.

### 1) Aktifkan provider Email

Di Supabase Dashboard:

1. `Authentication` -> `Providers` -> aktifkan `Email`.
2. Pilih mode verifikasi email sesuai kebutuhan:
   - aktifkan `Confirm email` jika user wajib verifikasi email dulu.

### 2) Atur URL redirect reset password

Di Supabase Dashboard:

1. `Authentication` -> `URL Configuration`.
2. Isi `Site URL` (contoh produksi): `https://domain-anda.com`
3. Tambahkan `Redirect URLs`:
   - Lokal: `http://127.0.0.1:5500/pages/auth/reset-password.html`
   - Lokal alternatif: `http://localhost:5500/pages/auth/reset-password.html`
   - Produksi: `https://domain-anda.com/pages/auth/reset-password.html`

Untuk halaman aplikasi utama, auth guard akan redirect otomatis ke login bila session tidak ada.

### 3) (Opsional) Buat tabel profil user

Jika mau simpan nama/divisi/user role, buat tabel `profiles` yang relasi ke `auth.users`.

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  job_title text,
  avatar_url text,
  role text default 'viewer',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);
```

### 4) Trigger auto-create profile saat register (opsional)

```sql
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, job_title, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'job_title', ''),
    coalesce(new.raw_user_meta_data->>'role', 'admin')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
```

### Catatan keamanan

- Untuk data aplikasi utama, sebaiknya policy tabel bukan `anon`, tapi `authenticated`.
- Jangan pakai `service_role` di frontend.
- `anon key` boleh di frontend, tapi akses tetap dikontrol oleh RLS policy.

### Contoh proteksi halaman (opsional)

Tambahkan script ini di halaman yang wajib login, sebelum script utama:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="../supabase-config.js"></script>
<script src="../scripts/auth/auth-service.js"></script>
<script src="../scripts/auth/auth-guard.js"></script>
<script>
  window.AuthGuard.requireAuth({ redirectTo: '../pages/auth/login.html' });
</script>
```

### Rekomendasi proteksi halaman (best practice)

1. Gunakan `AuthGuard.requireAuth()` di semua halaman aplikasi non-auth.
2. Pisahkan halaman publik vs halaman privat:
   - Publik: `pages/auth/*`
   - Privat: dashboard utama (`index.html`, `pages/*.html` selain auth)
3. Terapkan redirect otomatis:
   - Belum login -> ke `pages/auth/login.html`
   - Sudah login tapi buka halaman auth -> ke halaman utama (`pages/data-observasi.html`)
4. Jangan simpan logic otorisasi hanya di frontend; backend tetap wajib RLS.
5. Untuk tabel data utama, ubah policy dari `anon` ke `authenticated`.
6. Batasi akses data per user bila diperlukan (contoh: `auth.uid() = owner_id`).
7. Jangan expose `service_role` di frontend, hanya `anon key`.
8. Aktifkan verifikasi email untuk mengurangi akun palsu.
9. Tambahkan halaman `logout` dan paksa `signOut` saat token invalid.
10. Audit session secara berkala dengan `supabase.auth.getSession()` saat load halaman.

Contoh policy minimum berbasis user login:

```sql
alter table public.observasi_records enable row level security;

drop policy if exists observasi_select_auth on public.observasi_records;
create policy observasi_select_auth
on public.observasi_records
for select
to authenticated
using (true);

drop policy if exists observasi_insert_auth on public.observasi_records;
create policy observasi_insert_auth
on public.observasi_records
for insert
to authenticated
with check (true);

drop policy if exists observasi_update_auth on public.observasi_records;
create policy observasi_update_auth
on public.observasi_records
for update
to authenticated
using (true)
with check (true);

drop policy if exists observasi_delete_auth on public.observasi_records;
create policy observasi_delete_auth
on public.observasi_records
for delete
to authenticated
using (true);
```

### Rekomendasi role admin/viewer tanpa menghapus data existing

Gunakan migrasi berikut (aman untuk data lama, tidak drop tabel):

```sql
alter table public.profiles
add column if not exists role text;

alter table public.profiles
add column if not exists job_title text;

alter table public.profiles
add column if not exists avatar_url text;

alter table public.profiles
alter column role set default 'viewer';

update public.profiles
set role = 'viewer'
where role is null or trim(role) = '';

alter table public.profiles
drop constraint if exists profiles_role_check;

alter table public.profiles
add constraint profiles_role_check
check (role in ('admin', 'viewer'));
```

Function helper role:

```sql
create or replace function public.current_user_role()
returns text
language sql
stable
as $$
  select coalesce(
    (select p.role from public.profiles p where p.id = auth.uid()),
    'viewer'
  );
$$;
```

Contoh policy `observasi_records`:
- `admin` bisa CRUD
- `viewer` hanya bisa baca

```sql
alter table public.observasi_records enable row level security;

drop policy if exists observasi_select_all_auth on public.observasi_records;
create policy observasi_select_all_auth
on public.observasi_records
for select
to authenticated
using (true);

drop policy if exists observasi_insert_admin on public.observasi_records;
create policy observasi_insert_admin
on public.observasi_records
for insert
to authenticated
with check (public.current_user_role() = 'admin');

drop policy if exists observasi_update_admin on public.observasi_records;
create policy observasi_update_admin
on public.observasi_records
for update
to authenticated
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

drop policy if exists observasi_delete_admin on public.observasi_records;
create policy observasi_delete_admin
on public.observasi_records
for delete
to authenticated
using (public.current_user_role() = 'admin');
```

Contoh set role user jadi admin:

```sql
update public.profiles
set role = 'admin'
where id = 'UUID_USER_YANG_DIJADIKAN_ADMIN';
```
