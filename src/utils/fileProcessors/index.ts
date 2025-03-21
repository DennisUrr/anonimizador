// src/utils/fileProcessors/index.ts
import { processDocx } from './docxProcessor';
import { processTxt } from './txtProcessor';
import { processCsv } from './csvProcessor';

export async function processFile(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.docx')) {
    return processDocx(file);
  } else if (fileName.endsWith('.txt')) {
    return processTxt(file);
  } else if (fileName.endsWith('.csv')) {
    return processCsv(file);
  } else {
    throw new Error('Formato de archivo no soportado. Por favor sube un archivo .docx, .txt o .csv');
  }
}

export { processDocx, processTxt, processCsv };