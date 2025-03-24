import * as pdfjsLib from 'pdfjs-dist';

// Configuración del worker para pdf.js
export function setupPdfWorker() {
  // Si estamos en un entorno de desarrollo con Vite
  const isVite = typeof import.meta !== 'undefined';
  
  if (isVite) {
    // Utilizamos CDN para el worker en desarrollo
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
  } else {
    // En producción, asumimos que tenemos el worker en la carpeta public
    pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;
  }
}