const utilities = require('./utilities');

const getIndicadores = async () =>  {
    let urlIndicadores = "https://multimedia.planificacion.gob.ec/pnd2021/datospnd2021/datapnd.json";
    let indicadores = {}
    indicadores = await  utilities.getJsonUrl(urlIndicadores)
    .then((data) => data)
    .catch((error) => error);

    let urlFicha = "https://multimedia.planificacion.gob.ec/pnd2021/pdf/FICHAS/"
    let pathDowloadFicaha = "pdf/";
    for(const index in indicadores) {
        let urlPdf = urlFicha+""+indicadores[index].FICHA_INDICADOR;
        let pathDowloadPDF = pathDowloadFicaha+""+indicadores[index].FICHA_INDICADOR;
        utilities.getPdf(urlPdf, pathDowloadPDF);
    }



}

getIndicadores();
