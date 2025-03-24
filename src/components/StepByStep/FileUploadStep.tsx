// src/components/StepByStep/FileUploadStep.tsx
import React, { useState, useRef } from 'react';

interface FileUploadStepProps {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isProcessing: boolean;
  fileName: string;
  onNext: () => void;
  canProceed: boolean;
}

const FileUploadStep: React.FC<FileUploadStepProps> = ({
  handleFileUpload,
  isProcessing,
  fileName,
  onNext,
  canProceed
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const changeEvent = {
        target: {
          files: e.dataTransfer.files
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      await handleFileUpload(changeEvent);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Sube tu documento</h2>
      <p className="mb-6 text-space-gray">Sube un archivo para comenzar el proceso de anonimización</p>
      
      <div
        className={`file-drop-area mb-6 ${isDragging ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".docx,.txt,.csv,.pdf"
          onChange={handleFileUpload}
          className="hidden"
          disabled={isProcessing}
        />
        
        <div className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-space-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        {isProcessing ? (
          <div className="animate-pulse">Procesando archivo...</div>
        ) : (
          <>
            <p className="mb-2">Arrastra y suelta tu archivo aquí o</p>
            <button type="button" className="space-btn-secondary">Seleccionar archivo</button>
            <p className="mt-2 text-sm text-space-gray">Formatos soportados: .docx, .txt, .csv, .pdf</p>
          </>
        )}
      </div>
      
      {fileName && !isProcessing && (
        <div className="mb-6 p-3 bg-opacity-10 bg-white rounded">
          <p className="text-black"> 
            <span className="text-space-teal">✓</span> Archivo subido: <strong>{fileName}</strong>
          </p>
        </div>
      )}
      
      <div className="flex justify-center mt-8">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="space-btn-primary"
        >
          Continuar al siguiente paso
        </button>
      </div>
    </div>
  );
};

export default FileUploadStep;