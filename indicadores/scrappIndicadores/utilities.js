const https = require('https');
const fs = require('fs');
const request = require('request');
const { resolve } = require('path');

/**
 * @description
 * Función que sirve para descargar los archivos Pdf, conociendo el url y permite gravar en un directorio.
 * @example
 * const urlPdf = "https://web/file.pdf";
 * const ruta = "pdf/file.pdf"
 * getPdf(urlPDF, rutaGuardar);
 * @param {*} urlPdf
 * @param {*} ruta
 */
function getPdf(urlPdf, ruta) {
  const archivo = fs.createWriteStream(ruta);
  https.get(urlPdf, function(response) {
    response.pipe(archivo);
  });
}
/**
 * @description
 * delay
 * Función que sirve detener el compilador un instante en milisegundos.
 * @example
 * const millis = 2000, equivale a dos segundos;
 * delay(millis);
 * @param {*} millis
 */
async function  delay (millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}


/**
 * @description
 * getJsonUrl
 * Función que sirve detener la información de un archivo json o una  API.
 * @example
 * const urlJson ="https://web/api";
 * getJsonUrl(urlJson);
 * @param {*} urlJson
 */
async function getJsonUrl(urlJson)
{
  return new Promise((resolve, reject) => {
    const options = { json: true }; // Opciones de la solicitud, aquí se indica que se espera una respuesta en formato JSON

    request.get(urlJson, options, (error, response, body) => { // Hacer la solicitud utilizando el método GET
      if (error) {
        reject(error);
        return;
      }

      if (response.statusCode !== 200) { // Si la respuesta no es exitosa (código de estado 200)
        reject(new Error(`Error al hacer la solicitud. Código de estado: ${response.statusCode}`));
        return;
      }

      resolve(body); // Resuelve la promesa con los datos obtenidos
    });
  });
}


module.exports = {getPdf, delay, getJsonUrl}

