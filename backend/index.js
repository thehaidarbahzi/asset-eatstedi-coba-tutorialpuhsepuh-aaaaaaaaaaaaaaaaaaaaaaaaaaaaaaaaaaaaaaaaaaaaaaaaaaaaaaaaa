import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Konfigurasi Awal
app.get("/", (req, res) => {
    res.send("Server Express berhasil dijalankan! Akses /section-3.html untuk melihat halaman.");
});

// Melayani file statis dari folder frontend (naik satu level dari folder backend)
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// Melayani folder img agar gambar bisa diakses (misal: /img/gambar.jpg)
const imgPath = path.join(__dirname, '..', 'img');
app.use('/img', express.static(imgPath));

// 1. Endpoint untuk bagian atas
app.get('/api/section/atas', (req, res) => {
    res.json({
        title: "Judul Section",
        description: "Kalimat kalimat kalimat kalimat kalimat kalimat kalimat kalimat kalimat kalimat kalimat"
    });
});

// 2. Endpoint untuk bagian tengah
app.get('/api/section/tengah', (req, res) => {
    res.json({
        subtitle: "Subjudul subjudul subjudul",
        description: "Kalimat kalimat kalimat kalimat kalimat kalimat kalimat kalimat kalimat kalimat"
    });
});

// 3. Endpoint untuk bagian bawah
app.get('/api/section/bawah', (req, res) => {
    res.json({
        subtitle: "Subjudul subjudul subjudul",
        description: "Kalimat kalimat kalimat kalimat kalimat kalimat",
        points: [
            { title: "Judul Poin", text: "Kalimat kalimat kalimat kalimat kalimat kalimat." },
            { title: "Judul Poin", text: "Kalimat kalimat kalimat kalimat kalimat kalimat." },
            { title: "Judul Poin", text: "Kalimat kalimat kalimat kalimat kalimat kalimat." }
        ]
    });
});

// 4. Endpoint untuk tombol
app.get('/api/section/tombol', (req, res) => {
    res.json({
        text: "Tombol",
        link: "https://google.com"
    });
});

// 5. Endpoint untuk gambar
app.get('/api/section/gambar', (req, res) => {
    res.json({
        src: "img/gambar-buku-biru.jpg",
        alt: "Kumpulan Buku"
    });
});

// Middleware 404 harus diletakkan paling bawah setelah semua route
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint tidak ditemukan" });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});