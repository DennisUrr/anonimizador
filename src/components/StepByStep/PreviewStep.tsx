// src/components/StepByStep/PreviewStep.tsx
import React from 'react';

interface PreviewStepProps {
  originalText: string;
  anonymizedText: string;
  fileName: string;
  onDownload: () => void;
  onPrev: () => void;
}

const PreviewStep: React.FC<PreviewStepProps> = ({
  originalText,
  anonymizedText,
  fileName,
  onDownload,
  onPrev
}) => {
  // Función para mostrar las primeras 1000 caracteres si el texto es muy largo
  const truncateText = (text: string, maxLength: number = 1000): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Previsualización</h2>
      <p className="mb-6 text-center text-space-gray">Revisa el resultado y descarga tu documento anonimizado</p>
      
      <div className="space-card bg-opacity-20 p-4 mb-6">
        <h3 className="font-semibold mb-2">Información del documento</h3>
        <p className="text-space-gray mb-1">Archivo: <span className="text-space-white">{fileName}</span></p>
        <p className="text-space-gray">Tamaño: <span className="text-space-white">{(originalText.length / 1024).toFixed(2)} KB</span></p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold mb-2">Texto Original</h3>
          <div className="space-card bg-opacity-5 p-3 h-64 overflow-y-auto whitespace-pre-wrap text-sm">
            {truncateText(originalText)}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Texto Anonimizado</h3>
          <div className="space-card bg-opacity-5 p-3 h-64 overflow-y-auto whitespace-pre-wrap text-sm">
            {truncateText(anonymizedText)}
          </div>
        </div>
      </div>
      
      <div className="space-card bg-opacity-20 p-4 mb-6">
        <h3 className="font-semibold mb-2">Modificaciones realizadas</h3>
        <p className="text-space-gray mb-1">
          Se ha anonimizado correctamente el documento, aplicando los cambios según tus especificaciones.
        </p>
        <p className="text-space-gray mb-0">
          <span className="text-space-teal">Nota:</span> Los cambios son permanentes en el documento descargado.
        </p>
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          className="space-btn-secondary"
        >
          Regresar
        </button>
        
        <button
          onClick={onDownload}
          className="space-btn-primary"
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar documento anonimizado
          </span>
        </button>
      </div>
    </div>
  );
};

export default PreviewStep;