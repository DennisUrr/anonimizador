// src/utils/fileProcessors/csvProcessor.ts
import Papa from 'papaparse';

export interface PapaParseResult {
  data: Record<string, unknown>[];
  errors: Papa.ParseError[];
  meta: Papa.ParseMeta;
}

export async function processCsv(file: File): Promise<string> {
  try {
    const text = await file.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results: PapaParseResult) => {
          try {
            resolve(JSON.stringify(results.data, null, 2));
          } catch ( error ) {
            reject(new Error('Error al convertir los datos CSV a texto'));
            console.error("Error convertiendo CSV a texto:", error);
          }
        },
        error: (error: Papa.ParseError) => {
          reject(new Error(`Error al analizar CSV: ${error.message || 'Error desconocido'}`));
        }
      } as Papa.ParseConfig);
    });
  } catch (error: unknown) {
    console.error("Error procesando CSV:", error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw new Error(`Error al procesar el archivo CSV: ${errorMessage}`);
  }
}