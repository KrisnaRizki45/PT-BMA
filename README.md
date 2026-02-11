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
