const https = require('https');
const fs = require('fs');

function descargarPDF(url, ruta) {
  const archivo = fs.createWriteStream(ruta);

  https.get(url, function(response) {
    response.pipe(archivo);
  });
}

const urlPDF = 'https://multimedia.planificacion.gob.ec/pnd2021/pdf/FICHAS/7.4.5_PND2125.pdf';
const rutaGuardar = 'pdf/7.4.5_PND2125.pdf';

descargarPDF(urlPDF, rutaGuardar);
