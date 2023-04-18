import os
import pdfplumber


# Ruta del directorio con los archivos PDF
ruta_directorio = '../scrappIndicadores/pdf/'

# Obtiene la lista de archivos en el directorio
lista_archivos = os.listdir(ruta_directorio)


# Itera por cada archivo en la lista
for archivo in lista_archivos:
    if archivo.endswith('.pdf'):
        # Crea la ruta completa del archivo
        ruta_archivo = os.path.join(ruta_directorio, archivo)

        # Abre el archivo PDF con pdfplumber
        with pdfplumber.open(ruta_archivo) as pdf:
            encontrado = False

            # Itera por cada página del archivo PDF
            for pagina in pdf.pages:
                # Extrae el texto de la página actual
                page_text = pagina.extract_text()

                # Busca la palabra "indicador" en la página actual metas,  historicos de cada indicador
                if 'Serie histórica del indicador' in page_text:
                    encontrado = True
                    break

            if encontrado:
                print(f'Existe en el archivo {archivo}')
            else:
                print(f'No existe en el archivo {archivo}')