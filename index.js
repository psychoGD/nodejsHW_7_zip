const fs = require('fs');
const archiver = require('archiver');

// Zip oluşturulacak klasörün yolu
const folderPath = 'folder';

// Zip dosyasının adı ve yolu
const outputFilePath = 'file.zip';

// Archiver oluştur
const archive = archiver('zip', {
    zlib: { level: 9 } // Sıkıştırma seviyesi
});

// Çıkış dosyasını oluştur
const output = fs.createWriteStream(outputFilePath);

// Archiver'ı çıkış dosyasına yönlendir
archive.pipe(output);

// Klasörü ziplemek için dönüşümlü olarak gezin
archive.directory(folderPath, false);

// Ziplemeyi başlat
archive.finalize();

output.on('close', () => {
    console.log('Klasör başarıyla zip dosyasına dönüştürüldü.');
});

output.on('end', () => {
    console.log('Zip işlemi tamamlandı.');
});

archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
        console.warn('Uyarı: Dosya veya klasör bulunamadı.', err);
    } else {
        throw err;
    }
});

archive.on('error', (err) => {
    throw err;
});
