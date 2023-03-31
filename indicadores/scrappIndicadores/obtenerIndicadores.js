'use strict';
//tomado de: https://www.darrenlester.com/blog/basic-web-scraping-with-puppeteer
const puppeteer = require('puppeteer');
const request = require('request');



async function  delay (millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
 }
async function ingresarPaginaConsulta() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--disable-setuid-sandbox"],
        'ignoreHTTPSErrors': false
    });
    const page = await browser.newPage();

    const pageScraping = 'https://multimedia.planificacion.gob.ec/pnd2021/pndfichas.html';
    //https://multimedia.planificacion.gob.ec/pnd2021/datospnd2021/datapnd.json



    await page.goto(pageScraping, {
        waitUntil: "load"
    });
    
    
    // leer los archivos
    const fichasHomologadas = await page.evaluate(() => {
        const tbody  = document.querySelector('table#tablapnd tbody');
        
        const map_indicador = (indicadorRow)=>{
            let indicador = {}
            indicador = {
                "eje": indicadorRow[0],
                "objectivo": indicadorRow[1],
                "politica": indicadorRow[2],
                "meta": indicadorRow[3],
                "indicador": indicadorRow[4],
                "institucionResponsable": indicadorRow[5],
                "ficha": indicadorRow[6]
            }
            return indicador
        }
        const trs = Array.from(
            tbody.querySelectorAll("tr")
          );


          const indicadores = [];

          for (const tr of trs) {
            const tds = Array.from(tr.querySelectorAll("td"));
            const data = tds.slice(0, 7).map((td) => td.innerText);
            const indicadorItem = map_indicador(data); 
            indicadores.push(indicadorItem);
          }
        
          return indicadores;
    });

    // for(const indicador of fichasHomologadas) {
    //     console.log(indicador);

    // }


    let url = "https://multimedia.planificacion.gob.ec/pnd2021/datospnd2021/datapnd.json";

    let options = {json: true};



    request(url, options, (error, res, body) => {
        if (error) {
            return  console.log(error)
        };

        if (!error && res.statusCode == 200) {
            // var importedJSON = JSON.parse(body);
            //https://multimedia.planificacion.gob.ec/pnd2021/pdf/FICHAS/7.4.5_PND2125.pdf
            console.log(body);
        };
    });


   
    await delay(2000);




  
    await browser.close();
}

ingresarPaginaConsulta();