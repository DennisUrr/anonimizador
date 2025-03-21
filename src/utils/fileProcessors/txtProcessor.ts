// src/utils/fileProcessors/txtProcessor.ts
export async function processTxt(file: File): Promise<string> {
    try {
      return await file.text();
    } catch (error: unknown) {
      console.error("Error procesando TXT:", error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error al procesar el archivo TXT: ${errorMessage}`);
    }
  }
  