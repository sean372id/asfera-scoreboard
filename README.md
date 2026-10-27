> Dokumen ini ditujukan untuk anak panitia ASFERA 2027, untuk penggunaan umum dapat mengabaikan file ini. Dokumen README ini dibantu oleh Claude. Tanyakan lagi ke abang-abang kelas di tim publik yaa!!!

# 📡 Panduan Lengkap Persiapan Livestreaming ASFERA 2027

Dokumen ini disusun untuk membantu tim publikasi yang akan melanjutkan tanggung jawab livestreaming ASFERA. Ikuti checklist dan penjelasan berikut secara berurutan, mulai dari persiapan alat sampai polesan akhir (bumper & transisi).

---

## Evaluasi dari ASFERA Sebelumnya

Beberapa catatan penting dari pengalaman ASFERA tahun lalu, supaya tidak terulang:

1. **Pastikan laptop memadai dari segi hardware maupun software.** Pada ASFERA sebelumnya, laptop yang dipakai beberapa kali mengalami **crash tanpa bluescreen** — gejalanya bukan layar biru, tapi **fitur utama Windows berhenti merespons** (taskbar, Start Menu, Alt-Tab, dll tidak jalan) sementara aplikasi yang sedang terbuka (misalnya OBS) tetap tampak terbuka di layar tapi juga tidak bisa dioperasikan. Antisipasi:
   - Pastikan Windows dalam kondisi update dan sudah pernah dites jalan lama (stress test) sebelum hari-H, bukan baru instal ulang mendadak.
   - Tutup aplikasi background yang tidak perlu (auto-update, cloud sync, dll) sebelum live dimulai.
   - Siapkan laptop cadangan yang sudah ter-setting sama (OBS + plugin + scene) supaya kalau laptop utama crash, tinggal pindah tanpa perlu setup ulang dari nol.
2. **Replay Source kadang tidak merespons** — video tidak terputar sama sekali, hanya muncul gambar statis (freeze). Antisipasi:
   - Cek dan tes fitur replay saat technical rehearsal H-1, jangan cuma dites sekali di awal lalu diasumsikan aman sepanjang acara.
   - Kalau saat live replay ternyata macet/statis, punya rencana cadangan (misalnya langsung cut ke kamera lain) supaya siaran tidak terlihat "diam" terlalu lama.
   - Restart plugin/OBS di waktu jeda (bukan saat momen penting) kalau replay mulai terasa tidak stabil.
3. **Perkuat komunikasi antara tim di konsol streaming, kamera, dan tableman.** Ini jadi salah satu titik lemah sebelumnya — pastikan poin-poin di bagian [3. Komunikasi Tim — Handy-Talky (HT)](#3-komunikasi-tim--handy-talky-ht) benar-benar dijalankan (radio check, channel khusus, kode komunikasi singkat), bukan sekadar bawa HT tanpa disiplin pemakaian.

---

## 1. Persiapan Alat Streaming (Vendor / Media Yayasan)

### Langkah:
1. **Tentukan sumber alat** — ada dua opsi:
   - **Sewa vendor** streaming lokal (biasanya per hari/paket event).
   - **Pinjam dari media yayasan** — koordinasikan jauh-jauh hari, karena alat mungkin dipakai unit lain.
2. **Booking minimal H-3 sampai H-7** sebelum hari-H, supaya ada waktu untuk technical check dan antisipasi alat rusak/kurang.
3. **Pastikan paket/alat yang dipinjam atau disewa mencakup:**
   - **Video switcher** (contoh: ATEM Mini/ATEM Mini Pro, atau switcher sejenis) — untuk mengatur perpindahan sumber gambar (kamera 1, kamera 2, overlay, dsb). **Kalau menyewa vendor, usahakan pilih video switcher yang sudah punya monitor tersendiri (built-in monitor)** — ini menghemat biaya sewa/beli monitor tambahan dan menyederhanakan setup meja kontrol.
   - **Hollyland** (wireless video transmitter, contoh: Hollyland Mars 300/400S) — untuk mengirim sinyal video dari kamera wireless ke switcher tanpa kabel panjang.
   - **Kamera** (jumlah sesuai kebutuhan, lihat poin 2 di bawah).
   - **Sound card (audio interface)** — untuk menyambungkan audio komentator ke dalam siaran. Ada beberapa opsi:
     - Sambungkan sound card ke **sound system di bawah** (misalnya output dari mixer venue) supaya suara komentator dan suasana lapangan bisa masuk ke live streaming.
     - Atau siapkan **mic komentator tersendiri** yang langsung disambung ke sound card, terpisah dari sound system venue — lebih terkontrol kualitasnya tapi butuh setup mic sendiri.
     - **Kalau tidak ada sound card**, audio tetap bisa masuk lewat **salah satu kamera** yang mic-nya diarahkan/disambung ke sound system, lalu audio dari kamera tersebut diambil oleh video switcher (sebagian switcher seperti ATEM bisa embed audio dari input HDMI kamera) — opsi ini lebih simpel tapi kualitas audio biasanya kalah jernih dibanding jalur sound card khusus.
4. **Cek kelengkapan tambahan** saat serah terima alat: kabel HDMI cadangan, baterai/charger Hollyland, tripod, dan adaptor daya. Foto/video kondisi alat saat diterima sebagai bukti serah terima.
5. **Uji coba (technical rehearsal) minimal H-1**, bukan hari-H — supaya kalau ada masalah alat, masih ada waktu untuk vendor mengganti atau mencari solusi.

### Persiapan Internet — Kabel LAN & Mikrotik
Koneksi internet yang stabil sama pentingnya dengan alat streaming itu sendiri, jadi ini perlu diurus dari jauh-jauh hari lewat **IT yayasan**:

1. **Ajukan pemasangan kabel LAN dari yayasan ke dalam GOR** — koordinasikan dengan bagian IT yayasan sejak awal persiapan, karena biasanya perlu penarikan kabel fisik dari titik jaringan terdekat sampai ke meja kontrol streaming di dalam GOR.
2. **Minta dibuatkan akun Mikrotik khusus** untuk keperluan livestreaming — jangan pakai akun/jaringan umum yang dipakai bersama unit lain, supaya koneksi streaming tidak terganggu pemakaian jaringan lain saat event berlangsung.
3. **Minta bypass/prioritas kecepatan internet** pada akun tersebut ke bagian IT yayasan — supaya bandwidth untuk upload live streaming tidak dibatasi seperti akun jaringan biasa (yang biasanya ada limit kecepatan/kuota untuk pemakaian umum).
4. **Uji koneksi H-1** dari titik LAN yang sama dengan yang akan dipakai hari-H — cek kecepatan upload (bukan cuma download) karena upload adalah faktor utama kualitas live streaming.

---

## 2. Penempatan & Kebutuhan Kamera

### Konsep dasar:
Karena GOR bersifat **indoor**, sinyal wireless bisa terpengaruh oleh jarak dan pantulan dinding, jadi kombinasi wired + wireless adalah pilihan paling aman.

### Rincian kebutuhan:
- **Kamera 1 — Wired**
  - Ditempatkan **dekat meja kontrol/operator**, karena kabel HDMI tidak perlu menjangkau jarak jauh.
  - Biasanya berfungsi sebagai kamera utama (main shot / wide angle lapangan).
- **Kamera 2 — Wireless (pakai Hollyland)**
  - Ditempatkan **di seberang** (posisi berlawanan dari kamera 1), karena jarak dari kontrol terlalu jauh untuk kabel.
  - Signal dikirim ke receiver Hollyland yang terhubung ke switcher.
- **Penempatan umum:** kedua kamera idealnya di **tribun atas GOR**, supaya:
  - Mendapat sudut pandang luas ke seluruh lapangan.
  - Tidak menghalangi penonton atau peserta di bawah.
  - Mengurangi risiko kamera tersenggol/terganggu penonton.
- **Kamera tambahan (opsional) — Mobile Camera**
  - Bisa ditambah 1 unit untuk mengambil momen dari sisi **internal** (dekat lapangan, closeup ekspresi/aksi) maupun **eksternal** (suasana penonton, MC, area luar GOR).
  - Operator kamera ini bergerak bebas, idealnya terhubung wireless juga (Hollyland tambahan) atau merekam terpisah untuk dipakai sebagai cutaway/highlight.
  - Jumlah total kamera bisa disesuaikan dengan jumlah operator yang tersedia — jangan memaksakan 3-4 kamera kalau operator terbatas, karena kualitas switching lebih penting daripada jumlah sudut.

---

## 3. Komunikasi Tim — Handy-Talky (HT)

### Kenapa penting:
Operator switcher, kamera, dan tableman (kalau ada) berada di lokasi berbeda dan tidak bisa saling teriak saat live berlangsung.

### Langkah:
1. Siapkan minimal **1 unit HT per role kunci**: operator (di kontrol), kamera 1, kamera 2/mobile, dan tableman (jika ada papan skor manual yang perlu di-update).
2. Sebelum hari-H, **cek baterai penuh** dan bawa charger/baterai cadangan.
3. Tentukan **channel/frekuensi khusus** untuk tim streaming (hindari bentrok dengan HT panitia lain).
4. Lakukan **radio check** minimal 30 menit sebelum siaran mulai — pastikan semua titik bisa saling dengar dengan jelas.
5. Buat kesepakatan kode komunikasi singkat (contoh: "siap", "standby", "cut ke kamera 2") supaya komunikasi saat live singkat dan tidak membingungkan.

---

## 4. Komputer/Laptop untuk Produksi

### Spesifikasi & setup:
1. **Gunakan laptop/PC dengan spesifikasi tinggi** untuk menjalankan OBS — minimal:
   - Processor setara Intel i5/Ryzen 5 generasi terbaru ke atas (idealnya i7/Ryzen 7).
   - RAM 16GB ke atas.
   - GPU dedicated (NVIDIA/AMD) akan sangat membantu untuk encoding NVENC/AMF supaya CPU tidak overload.
2. **Gunakan kipas tambahan (cooling pad/external fan)** jika laptop dipakai streaming dalam durasi lama (beberapa jam), karena OBS + game/scoreboard rendering menghasilkan panas berlebih yang bisa menyebabkan thermal throttling (lag mendadak).
3. **Pisahkan laptop kerja:**
   - **Laptop A (dedicated)**: hanya menjalankan **OBS Studio** — jangan buka aplikasi lain di laptop ini saat live berlangsung, supaya performanya maksimal dan tidak terganggu proses lain.
   - **Laptop B (monitoring & admin)**: dipakai untuk:
     - Memantau **YouTube Studio** (cek live health, komentar, viewer count).
     - Membuka **Canva** (jika ada elemen visual/template yang perlu diedit real-time, misalnya slide sponsor).
     - Membuka **Excel/Google Sheets** jika dibutuhkan (misalnya pencatatan skor manual, rundown acara, atau data pertandingan).
4. Pastikan kedua laptop terhubung ke **jaringan internet yang stabil** (idealnya kabel LAN untuk laptop OBS, bukan WiFi, untuk menghindari drop koneksi saat upload stream).

---

## 5. Plugin OBS yang Dibutuhkan

### a) Scoreboard Plugin (custom, dari GitHub Sean)
- **Sumber:** https://github.com/sean372id/asfera-scoreboard
- **Cara pasang (umum untuk plugin/browser source berbasis web):**
  1. Download/clone repository dari link di atas.
  2. Baca file `README` di repo tersebut (jika ada) untuk instruksi spesifik — beberapa scoreboard custom berbasis HTML/CSS/JS dijalankan sebagai **Browser Source** di OBS, bukan plugin instalasi biasa.
  3. Di OBS: **Sources → tombol "+" → Browser** → arahkan ke file `index.html` lokal (Local File) atau path server jika di-hosting.
  4. Atur ukuran (Width/Height) sesuai resolusi kanvas OBS (1920x1080).
  5. Uji update skor secara manual dulu untuk pastikan tampilan sudah sesuai sebelum hari-H.
- **Menambahkan panel kontrol (control.html):**
  1. Di OBS, buka menu **Docks → Customize Browser Docks...**
  2. Tambahkan dock baru, lalu cari file `control.html` di folder hasil download/clone repo tadi.
  3. Klik kanan file `control.html` tersebut di File Explorer/Finder → pilih **Copy as path** untuk menyalin lokasi filenya.
  4. Tempel path yang disalin ke kolom alamat dock, lalu **ganti semua tanda backslash (`\`) menjadi slash (`/`)**.
  5. **Tambahkan awalan `file:///`** di depan path tersebut (contoh hasil akhir: `file:///C:/Users/nama/asfera-scoreboard/control.html`).
  6. Beri nama dock (misalnya "Scoreboard Control"), lalu simpan — dock kontrol scoreboard akan muncul sebagai panel di dalam OBS yang bisa dipakai untuk update skor langsung tanpa keluar dari OBS.
- **Menambahkan overlay tambahan (folder `/overlays/`):**
  1. Buka folder `/overlays/` di dalam repo hasil download/clone.
  2. **Setiap file HTML** yang ada di folder tersebut ditambahkan sebagai **Source** terpisah di OBS: **Sources → "+" → Browser → pilih Local File → arahkan ke masing-masing file HTML** di folder `/overlays/`.
  3. Sesuaikan ukuran (Width/Height) tiap overlay sama seperti langkah scoreboard utama, lalu atur posisinya di scene sesuai kebutuhan tampilan (misalnya logo pojok, nama tim, dsb).
- Karena ini proyek open-source milik sendiri, lu pada (panitia ASFERA 2027) sangat boleh bikin fitur tambahan (misalnya animasi transisi skor, logo tim, atau timer otomatis) — kontribusi bisa dikirim lewat pull request ke repo yang sama.

### b) Replay Source
- **Fungsi:** memutar ulang momen (goal, gerakan penting) secara instan tanpa software eksternal.
- **Instalasi:**
  1. Download plugin **Replay Source** dari situs resmi OBS Project (obsproject.com/forum/resources) — cari "Replay Source" by `exeldro`.
  2. Jalankan installer, pastikan OBS ditutup dulu sebelum instalasi.
  3. Buka OBS → **Sources → "+" → Replay Source**.
  4. Atur **Replay Buffer** di OBS Settings → Output → Replay Buffer, aktifkan dan tentukan durasi buffer (misal 20-30 detik).
  5. Set hotkey untuk "Start Replay Buffer" dan "Save Replay" di Settings → Hotkeys agar bisa dipicu cepat saat momen penting terjadi.

### c) Move Transition
- **Fungsi:** transisi antar-scene dengan efek pergerakan/morph mulus, mirip Morph Transition di PowerPoint.
- **Instalasi:**
  1. Download **Move Transition** oleh `exeldro` dari obsproject.com/forum/resources.
  2. Install seperti plugin OBS lain (tutup OBS dulu, jalankan installer, buka lagi OBS).
  3. Di OBS, buka **Scene Transitions**, klik "+" untuk menambah transisi baru, pilih tipe **Move**.
  4. Atur durasi dan properti sumber yang ingin dianimasikan (posisi, ukuran, opacity) di masing-masing scene agar transisi terlihat seperti morph.

> 💡 Catatan umum: setelah install plugin apa pun, **restart OBS** dan cek di menu Sources/Transitions apakah plugin sudah muncul. Kalau tidak muncul, cek folder instalasi plugin sesuai versi OBS (32-bit/64-bit) sudah cocok dengan OBS yang terpasang.

---

## 6. Bumper Logo & Stinger Transition

### a) Membuat bumper logo (intro)
- Bumper adalah video pendek (3-5 detik) berisi animasi logo yang tampil di awal siaran.
- **Software yang bisa dipakai:**
  - **Adobe After Effects** — paling fleksibel untuk motion graphics kompleks (keyframe, easing, particle).
  - **Alight Motion** — alternatif mobile-friendly, tetap mendukung keyframe.
  - **Aplikasi edit video biasa** (CapCut, Filmora, dll) — asal mendukung keyframe untuk animasi posisi/skala/opacity, cukup untuk bumper sederhana.
- **Tips:** gunakan easing (ease in/out) pada keyframe supaya gerakan logo tidak kaku/linear.

### b) Membuat stinger transition
Stinger adalah video transisi pendek (biasanya logo "menutup" penuh layar) yang dipakai OBS saat berpindah scene, menggantikan cut/fade biasa.

**Alur produksi stinger — step by step:**

1. **Desain & animasikan** stinger di After Effects/Alight Motion/aplikasi edit pilihan — pastikan ada momen "full cover" (logo menutupi seluruh layar) yang akan jadi titik potong antar-scene di OBS.
2. **Export dengan alpha channel aktif:**
   - Format: **GoPro CineForm** (codec yang mendukung alpha channel dengan kualitas tinggi, cocok untuk hasil dari After Effects).
   - Di After Effects: Composition → Add to Render Queue → Output Module → pilih format **QuickTime**, codec **GoPro CineForm**, lalu aktifkan opsi **channel Alpha** (bukan hanya RGB) supaya bagian transparan ikut ter-render.
3. **Instalasi Shutter Encoder** (tersedia 2 versi — pilih salah satu):
   - **Versi Installer:**
     1. Download installer Shutter Encoder dari situs resmi (shutterencoder.com).
     2. Jalankan file installer (.exe untuk Windows/.dmg untuk Mac), ikuti wizard instalasi sampai selesai.
     3. Buka Shutter Encoder dari Start Menu/Applications seperti software biasa.
   - **Versi Portable:**
     1. Download versi portable (biasanya berupa file .zip) dari situs resmi Shutter Encoder.
     2. Ekstrak .zip tersebut ke folder pilihan (misalnya di Desktop atau folder khusus proyek ASFERA) — tidak perlu proses instalasi.
     3. Jalankan langsung file .exe/aplikasi di dalam folder hasil ekstrak.
   - **Kapan pakai yang mana:** pilih **portable** kalau laptop yang dipakai bukan milik sendiri atau tidak ingin meninggalkan jejak instalasi (misalnya laptop pinjaman/laptop yayasan); pilih **installer** kalau ingin Shutter Encoder tetap terpasang permanen di laptop kerja sendiri.
4. **Kompres/ringankan file dengan Shutter Encoder:**
   - Buka **Shutter Encoder** → masukkan file CineForm hasil export tadi.
   - Pilih **Video codec: VP9**.
   - **Aktifkan Alpha channel** di pengaturan encoder (biasanya ada opsi khusus "Alpha" atau "Transparency" di Shutter Encoder — pastikan dicentang, karena tanpa ini transparansi akan hilang jadi background hitam/putih).
   - Jalankan proses encoding, tunggu sampai selesai — hasil akhirnya adalah file **.webm (VP9 dengan alpha)** yang jauh lebih ringan dari CineForm tapi tetap mempertahankan transparansi.
5. **Terapkan ke OBS sebagai Stinger Transition:**
   - Buka **Scene Transitions** di OBS → klik "+" → pilih **Stinger**.
   - Pilih file `.webm` hasil Shutter Encoder tadi sebagai video source.
   - Atur **Transition Point** (titik dalam video saat scene berikutnya mulai terlihat — biasanya di momen "full cover" tadi).
   - Sesuaikan **Audio Fade/Monitor** jika stinger punya sound effect.
   - Preview transisi antar 2 scene untuk memastikan timing pas dan tidak ada frame hitam/putih aneh (tanda alpha gagal terbaca).

> ⚠️ Kalau di OBS transisi terlihat ada kotak hitam/putih di sekeliling logo (bukan transparan), kemungkinan besar alpha channel tidak aktif saat export CineForm atau saat encoding VP9 — cek ulang kedua langkah tersebut.

---

## 7. Saran Tambahan

Selain dua ide dari gua, berikut beberapa saran tambahan yang bisa dipertimbangkan:

1. **Otomatisasi scoreboard tersinkron dengan skor di tempat**
   - Idealnya scoreboard di OBS (browser source) terhubung ke sistem input sederhana (misalnya Google Sheet yang di-update tableman, lalu dibaca otomatis oleh script scoreboard) supaya tidak perlu edit manual tiap kali skor berubah.
2. **Otomatisasi judul livestream dengan Apps Script**
   - Judul (dan mungkin deskripsi) video YouTube Live otomatis ter-update sesuai pertandingan/sesi yang berlangsung, dipicu dari Google Sheet rundown, mengurangi human error saat mengganti judul manual di YouTube Studio.
3. **Backup recording lokal** — selain streaming ke YouTube, aktifkan juga **local recording** di OBS (Settings → Output) sebagai cadangan jika koneksi internet putus di tengah acara, supaya rekaman penuh tetap ada untuk di-upload ulang atau dipakai highlight.
4. **Siapkan skema koneksi internet cadangan** — misalnya tethering HP/modem 4G/5G sebagai backup selain WiFi/LAN utama, plus software failover sederhana (atau siap pindah manual) kalau koneksi utama drop saat live.
5. **Buat rundown & scene list tertulis** — daftar scene OBS (Starting Soon, Main Camera, Replay, Sponsor, Ending) beserta urutan pemakaiannya, supaya operator baru pun bisa mengikuti alur tanpa bingung.
6. **Lakukan dry run H-1 penuh** — bukan cuma tes alat, tapi simulasi penuh dari bumper masuk, switching kamera, replay, sampai stinger transition dan ending, supaya semua tim (kamera, operator, tableman) terbiasa dengan alur real.
7. **Siapkan checklist fisik cetak/digital** untuk hari-H — supaya tim yang capek/gugup di lokasi tidak lupa langkah kecil (misalnya nyalakan replay buffer sebelum go live, cek audio monitor, dsb).
8. **Cadangkan file bumper & stinger di lebih dari satu tempat** (laptop OBS, flashdisk, cloud) — supaya kalau laptop utama bermasalah mendadak, file bisa cepat dipindah ke laptop cadangan.
9. **Minta bantuan tim ekskul programming untuk bagian yang berhubungan dengan pemrograman** — beberapa hal di atas seperti Apps Script untuk otomatisasi judul livestream, atau otomatisasi sinkronisasi scoreboard, tidak harus dikerjakan sendiri oleh tim multimedia. Ini kesempatan bagus untuk kolaborasi lintas ekskul — ajak tim programming dari awal proses (bukan mendadak H-1) supaya ada waktu cukup untuk develop dan testing.

---

Semoga panduan ini memudahkan persiapan livestreaming ASFERA 2027. Kalau ada pertanyaan soal bagian tertentu (misalnya detail setting OBS atau workflow Apps Script), tinggal koordinasikan lebih lanjut dengan tim yang berpengalaman menangani ASFERA tahun-tahun sebelumnya.
