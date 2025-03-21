// src/utils/fileProcessors/docxProcessor.ts
import * as mammoth from 'mammoth';

export async function processDocx(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error: unknown) {
    console.error("Error procesando DOCX:", error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw new Error(`Error al procesar el archivo DOCX: ${errorMessage}`);
  }
}