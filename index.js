const fs = require('fs');
const archiver = require('archiver');


const folderPath = 'folder';
``

const outputFilePath = 'file.zip';


const archive = archiver('zip', {
    zlib: { level: 9 }
});

const output = fs.createWriteStream(outputFilePath);


archive.pipe(output);

archive.directory(folderPath, false);

archive.finalize();

output.on('close', () => {
    console.log('Zipped .');
});

output.on('end', () => {
    console.log('Done.');
});

archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
        console.warn('Warning: Folder Or File Cannot Find.', err);
    } else {
        throw err;
    }
});

archive.on('error', (err) => {
    throw err;
});
