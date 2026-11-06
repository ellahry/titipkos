# Titip Kos — corporate website (UTS Cyber Public Relations)

Website statis 5 halaman (+3 halaman berita) untuk perusahaan fiktif **Titip Kos**, jasa titip barang mahasiswa rantau di Semarang.
Tidak perlu build, tidak perlu database. Cukup HTML, CSS, dan sedikit JavaScript.

## Isi folder

| File | Halaman |
|---|---|
| `index.html` | Beranda |
| `tentang.html` | Tentang (profil, kisah awal, visi misi, tujuan, nilai, sejarah, struktur organisasi) |
| `layanan.html` | Layanan (3 layanan, kalkulator biaya, cara memesan, FAQ) |
| `berita.html` | Daftar berita |
| `berita-*.html` | 3 artikel berita |
| `kontak.html` | Kontak (WA, email, alamat, jam layanan, peta wilayah, formulir) |
| `assets/` | CSS, JS, font, logo, ilustrasi |

## Cara publish ke GitHub Pages (gratis)

1. Buat repository baru di GitHub, misalnya `titipkos`, set **Public**.
2. Klik **Add file → Upload files**, lalu seret **seluruh isi** folder ini (bukan foldernya) termasuk folder `assets`. Klik **Commit changes**.
3. Buka **Settings → Pages**. Di *Build and deployment*, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Tunggu 1–2 menit. Alamatnya akan menjadi `https://<username-github>.github.io/titipkos/`.
5. Buka alamat itu dari HP dan dari jendela penyamaran (incognito) untuk memastikan bisa diakses tanpa login.

Alternatif: seret folder ini ke https://app.netlify.com/drop. Hasilnya langsung berupa link `*.netlify.app`.

## Sumber aset

- Logo dan semua ilustrasi: dibuat sendiri dalam format SVG (tanpa foto stok).
- Font: TeX Gyre Heros Cn, TeX Gyre Adventor, TeX Gyre Cursor (GUST e-foundry), lisensi GUST Font License / LPPL. Lihat `assets/fonts/LICENSE-TeX-Gyre-GUST.txt`.
- Ikon: digambar sendiri (SVG garis 24 px).

Titip Kos adalah perusahaan fiktif. Semua nomor, alamat, email, dan akun media sosial di situs ini hanya contoh.
