# Monitoring Berita Acara Pleno Rutin KPU Kota Cirebon

Aplikasi full-stack untuk memonitor dokumen pleno, poin rencana, progres, target, penanggung jawab, catatan internal, dan evidence. Dibangun dengan Next.js 16 App Router, TypeScript, Tailwind CSS 4, Prisma, PostgreSQL, Zod, Recharts, dan autentikasi session berbasis cookie.

## Fitur

- Dashboard publik dengan statistik, grafik, pencarian, filter, pagination, dan detail aman.
- Ruang internal read-only untuk dokumen, catatan, dan evidence.
- Panel operator/admin untuk CRUD Berita Acara, poin rencana, dan banyak evidence.
- Status berbobot 100/50/0, badge mendekati target/terlambat, export CSV, dan riwayat perubahan status.
- Proteksi route dan endpoint berdasarkan role, validasi Zod, URL validation, konfirmasi hapus, loading/error/empty state.
- Mode demo otomatis saat DATABASE_URL belum tersedia.

## Persyaratan

- Node.js 20.19+, 22.12+, atau 24+
- PostgreSQL (Supabase, Prisma Postgres, Neon, atau layanan kompatibel)
- npm

## Menjalankan lokal

1. Salin konfigurasi:

   ```bash
   cp .env.example .env
   ```

2. Isi DATABASE_URL dan AUTH_SECRET. Buat secret acak minimal 32 karakter.

3. Pasang dependensi dan siapkan database:

   ```bash
   npm install
   npm run db:migrate
   npm run db:seed
   ```

4. Jalankan:

   ```bash
   npm run dev
   ```

Buka http://localhost:3000. Tanpa DATABASE_URL, aplikasi otomatis menampilkan data demo dalam mode hanya-baca.

## Akun awal

Seed membuat akun berikut:

- Admin demo: username `admin` / password `Admin123!`
- Internal demo: username `internal` / password `Internal123!`

Untuk seed production, isi variabel `SEED_ADMIN_*` dan `SEED_INTERNAL_*` di file `.env` lokal. Login menggunakan username dan password; email tetap disimpan sebagai informasi profil. Password disimpan sebagai hash bcrypt dan tidak ditulis di source code.

## Environment

| Variabel | Kegunaan |
| --- | --- |
| DATABASE_URL | Connection string PostgreSQL |
| AUTH_SECRET | Kunci penandatangan session JWT, minimal 32 karakter |
| NEXT_PUBLIC_APP_URL | URL aplikasi, misalnya http://localhost:3000 |
| SEED_ADMIN_USERNAME | Username admin saat menjalankan seed |
| SEED_ADMIN_EMAIL | Email profil admin saat menjalankan seed |
| SEED_ADMIN_PASSWORD | Password admin saat menjalankan seed |
| SEED_INTERNAL_USERNAME | Username internal saat menjalankan seed |
| SEED_INTERNAL_EMAIL | Email profil internal saat menjalankan seed |
| SEED_INTERNAL_PASSWORD | Password internal saat menjalankan seed |

## Database

Skema ada di `prisma/schema.prisma`, migrasi awal di `prisma/migrations`, dan data contoh di `prisma/seed.ts`.

Relasi:

- User admin → banyak Berita Acara
- Berita Acara → banyak Poin Rencana
- Poin Rencana → banyak Evidence dan Riwayat Update

Bulan dan tahun diturunkan otomatis dari tanggal Berita Acara agar data selalu konsisten.

## Deploy ke Vercel

1. Push folder proyek ini ke repository GitHub.
2. Import repository di Vercel.
3. Tambahkan database PostgreSQL dari Vercel Marketplace atau penyedia lain.
4. Tambahkan DATABASE_URL, AUTH_SECRET, dan NEXT_PUBLIC_APP_URL untuk Production dan Preview.
5. Deploy. Build command di `vercel.json` menjalankan migrasi sebelum build.
6. Jalankan seed satu kali dari komputer lokal dengan DATABASE_URL production: `npm run db:seed`.

Untuk tim besar, sebaiknya gunakan database preview terpisah agar migrasi pull request tidak memengaruhi production.

## Struktur

- `app/` — halaman App Router dan endpoint API
- `components/` — dashboard, grafik, form, layout, dan komponen reusable
- `lib/` — autentikasi, data, Prisma, validasi, konstanta, utilitas
- `prisma/` — schema, migrasi, dan seed
- `types/` — tipe domain TypeScript
- `proxy.ts` — proteksi route internal dan admin

## Keamanan

Data publik diproyeksikan oleh server tanpa `dokumenUrl`, `catatan`, dan `evidence`; informasi sensitif tidak dikirim ke browser publik. Route UI diproteksi oleh proxy dan layout server, sedangkan seluruh mutasi API memeriksa role ADMIN lagi. Cookie session bersifat httpOnly, sameSite=lax, dan secure pada production.

Sebelum production: ganti password seed, gunakan AUTH_SECRET kuat, aktifkan backup database, batasi akses database, dan audit akun secara berkala.

## Perintah

- `npm run dev` — server pengembangan
- `npm run build` — build production
- `npm run typecheck` — pemeriksaan TypeScript
- `npm run lint` — lint
- `npm run db:migrate` — migrasi pengembangan
- `npm run db:deploy` — migrasi production
- `npm run db:seed` — data contoh dan akun awal
- `npm run db:studio` — pengelola data visual
