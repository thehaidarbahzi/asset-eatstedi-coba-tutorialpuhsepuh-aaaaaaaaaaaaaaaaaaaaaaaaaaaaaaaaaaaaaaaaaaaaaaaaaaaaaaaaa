async function fetchData() {
    try {
        // Mengambil semua data secara paralel agar jauh lebih cepat
        const endpoints = [
            '/api/section/atas',
            '/api/section/tengah',
            '/api/section/bawah',
            '/api/section/tombol',
            '/api/section/gambar'
        ];

        const responses = await Promise.all(endpoints.map(url => fetch(url)));
        const [dataAtas, dataTengah, dataBawah, dataTombol, dataGambar] = await Promise.all(
            responses.map(res => res.json())
        );

        // 1. Update Section Bagian Atas
        document.getElementById('hero-title').innerText = dataAtas.title;
        document.getElementById('hero-desc').innerText = dataAtas.description;

        // 2. Update Section Bagian Tengah
        document.getElementById('intro-subtitle').innerText = dataTengah.subtitle;
        document.getElementById('intro-desc').innerText = dataTengah.description;

        // 3. Update Section Bagian Bawah
        document.getElementById('feature-subtitle').innerText = dataBawah.subtitle;
        document.getElementById('feature-desc').innerText = dataBawah.description;
        
        const pointsContainer = document.getElementById('feature-points');
        pointsContainer.innerHTML = dataBawah.points.map((point, index) => `
            <li class="${index === 0 ? 'point-border' : ''}">
                <div class="point-title">${point.title}</div>
                <div class="point-text">${point.text}</div>
            </li>
        `).join('');

        // 4. Update Tombol
        const btn = document.getElementById('hero-btn');
        btn.innerText = dataTombol.text;
        btn.href = dataTombol.link;

        // 5. Update Gambar
        const img = document.getElementById('feature-img');
        img.src = dataGambar.src;
        img.alt = dataGambar.alt;

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}