import { processDocx } from './docxProcessor';
import { processTxt } from './txtProcessor';
import { processCsv } from './csvProcessor';
import { processPdf } from './pdfProcessor';

export async function processFile(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.docx')) {
    return processDocx(file);
  } else if (fileName.endsWith('.txt')) {
    return processTxt(file);
  } else if (fileName.endsWith('.csv')) {
    return processCsv(file);
  } else if (fileName.endsWith('.pdf')) {
    return processPdf(file);
  } else {
    throw new Error('Formato de archivo no soportado. Por favor sube un archivo .docx, .txt, .csv o .pdf');
  }
}

export { processDocx, processTxt, processCsv, processPdf };