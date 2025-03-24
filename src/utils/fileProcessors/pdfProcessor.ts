import * as pdfjsLib from 'pdfjs-dist';

// Configuración básica para pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

export async function processPdf(file: File): Promise<string> {
  try {
    // Convertir el archivo a ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Cargar el documento PDF
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    // Obtener el número total de páginas
    const numPages = pdf.numPages;
    
    // Array para almacenar el texto de todas las páginas
    const textContent: string[] = [];
    
    // Extraer el texto de cada página
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      
      // Extraer el texto de cada elemento de contenido
      const pageText = content.items
        .map((item: any) => item.str)
        .join(' ');
      
      textContent.push(`--- Página ${i} ---\n${pageText}`);
    }
    
    // Unir todo el texto extraído
    return textContent.join('\n\n');
  } catch (error: unknown) {
    console.error("Error procesando PDF:", error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw new Error(`Error al procesar el archivo PDF: ${errorMessage}`);
  }
}