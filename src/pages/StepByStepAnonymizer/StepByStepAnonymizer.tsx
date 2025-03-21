// src/pages/StepByStepAnonymizer/StepByStepAnonymizer.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { FileUploadStep, BannedWordsStep, PreviewStep, StepIndicator } from '../../components';
import { useAnonymizer } from '../../hooks/useAnonymizer';
import '../../styles/spaceTheme.css';

// Enum para los pasos
enum Step {
  UPLOAD_FILE = 1,
  BANNED_WORDS = 2,
  PREVIEW = 3
}

const StepByStepAnonymizer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.UPLOAD_FILE);
  const [completedSteps, setCompletedSteps] = useState<Set<Step>>(new Set());
  
  const anonymizer = useAnonymizer();
  
  // Marcar un paso como completado (usando useCallback para evitar la dependencia circular)
  const completeStep = useCallback((step: Step) => {
    setCompletedSteps(prevSteps => {
      const updatedSteps = new Set(prevSteps);
      updatedSteps.add(step);
      return updatedSteps;
    });
  }, []);
  
  // Efecto para verificar si el paso actual está completo
  useEffect(() => {
    if (currentStep === Step.UPLOAD_FILE && anonymizer.fileContent) {
      completeStep(Step.UPLOAD_FILE);
    }
    
    if (currentStep === Step.BANNED_WORDS && anonymizer.bannedWords.length > 0) {
      completeStep(Step.BANNED_WORDS);
    }
  }, [currentStep, anonymizer.fileContent, anonymizer.bannedWords.length, completeStep]);
  
  // Avanzar al siguiente paso
  const nextStep = (currentStep: Step) => {
    completeStep(currentStep);
    setCurrentStep(currentStep + 1 as Step);
  };
  
  // Retroceder al paso anterior
  const prevStep = () => {
    if (currentStep > Step.UPLOAD_FILE) {
      setCurrentStep(currentStep - 1 as Step);
    }
  };
  
  // Verificar si un paso está completado
  const isStepCompleted = (step: Step): boolean => {
    return completedSteps.has(step);
  };
  
  // Verificar si se puede avanzar al siguiente paso
  const canProceedToNextStep = (step: Step): boolean => {
    switch (step) {
      case Step.UPLOAD_FILE:
        return !!anonymizer.fileContent;
      case Step.BANNED_WORDS:
        return anonymizer.bannedWords.length > 0;
      default:
        return false;
    }
  };
  
  // Pasos de la aplicación
  const steps = [
    { number: Step.UPLOAD_FILE, title: "Subir Archivo" },
    { number: Step.BANNED_WORDS, title: "Palabras Baneadas" },
    { number: Step.PREVIEW, title: "Previsualización" }
  ];
  
  // Función para ir directamente a un paso (si está disponible)
  const goToStep = (step: Step) => {
    // Solo permitir navegar a pasos completados o al paso siguiente al último completado
    if (isStepCompleted(step) || (step === Step.BANNED_WORDS && isStepCompleted(Step.UPLOAD_FILE)) ||
        (step === Step.PREVIEW && isStepCompleted(Step.BANNED_WORDS))) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="app-container min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Anonimizador de Documentos</h1>
        <p className="text-center mb-8 text-space-gray">Protege información sensible en tus documentos de forma sencilla</p>
        
        {/* Indicador de pasos con navegación */}
        <div className="mb-8">
          <StepIndicator 
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
          
          {/* Navegación entre pasos (solo visible en versión desktop) */}
          <div className="hidden md:flex justify-center mt-4 space-x-6">
            {steps.map((step) => (
              <button
                key={step.number}
                onClick={() => goToStep(step.number as Step)}
                disabled={!isStepCompleted(step.number as Step) && 
                          !(step.number === Step.BANNED_WORDS && isStepCompleted(Step.UPLOAD_FILE)) &&
                          !(step.number === Step.PREVIEW && isStepCompleted(Step.BANNED_WORDS))}
                className={`text-sm transition-colors ${
                  step.number === currentStep 
                    ? 'text-space-teal font-semibold' 
                    : (isStepCompleted(step.number as Step) || 
                      (step.number === Step.BANNED_WORDS && isStepCompleted(Step.UPLOAD_FILE)) ||
                      (step.number === Step.PREVIEW && isStepCompleted(Step.BANNED_WORDS)))
                      ? 'text-white hover:text-space-teal' 
                      : 'text-gray-500 cursor-not-allowed'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Contenedor principal */}
        <div className="space-card p-6 mb-6">
          {/* Errores */}
          {anonymizer.error && (
            <div className="bg-red-900 bg-opacity-20 border border-red-800 text-red-100 px-4 py-3 rounded mb-4 flex justify-between items-center">
              <span>{anonymizer.error}</span>
              <button 
                onClick={() => anonymizer.setError('')}
                className="text-red-100 hover:text-white"
              >
                ×
              </button>
            </div>
          )}
          
          {/* Paso 1: Subir archivo */}
          {currentStep === Step.UPLOAD_FILE && (
            <FileUploadStep 
              handleFileUpload={anonymizer.handleFileUpload}
              isProcessing={anonymizer.isProcessing}
              fileName={anonymizer.file?.name || ''}
              onNext={() => nextStep(Step.UPLOAD_FILE)}
              canProceed={canProceedToNextStep(Step.UPLOAD_FILE)}
            />
          )}
          
          {/* Paso 2: Gestionar palabras baneadas */}
          {currentStep === Step.BANNED_WORDS && (
            <BannedWordsStep
              bannedWords={anonymizer.bannedWords}
              newWord={anonymizer.newWord}
              setNewWord={anonymizer.setNewWord}
              newCategory={anonymizer.newCategory}
              setNewCategory={anonymizer.setNewCategory}
              newReplacement={anonymizer.newReplacement}
              setNewReplacement={anonymizer.setNewReplacement}
              addBannedWord={anonymizer.addBannedWord}
              removeBannedWord={anonymizer.removeBannedWord}
              exportBannedWords={anonymizer.exportBannedWords}
              importBannedWords={anonymizer.importBannedWords}
              onNext={() => nextStep(Step.BANNED_WORDS)}
              onPrev={prevStep}
              canProceed={canProceedToNextStep(Step.BANNED_WORDS)}
            />
          )}
          
          {/* Paso 3: Previsualización y descarga */}
          {currentStep === Step.PREVIEW && (
            <PreviewStep
              originalText={anonymizer.fileContent}
              anonymizedText={anonymizer.anonymizedContent}
              fileName={anonymizer.file?.name || 'documento'}
              onDownload={anonymizer.handleDownload}
              onPrev={prevStep}
            />
          )}
        </div>
        
        {/* Información de progreso */}
        <div className="text-center text-space-gray text-sm">
          {currentStep === Step.UPLOAD_FILE && "Sube un archivo para comenzar el proceso de anonimización"}
          {currentStep === Step.BANNED_WORDS && "Añade palabras que quieres anonimizar en tu documento"}
          {currentStep === Step.PREVIEW && "Revisa el resultado y descarga tu documento anonimizado"}
        </div>
      </div>
    <footer className='flex flex-col items-center justify-center text-space-py-8 px-4 text-center mt-8'>
      <p className="text-center text-space-teal text-md">
        <span>📄</span> 
        <a 
          href="https://github.com/DennisUrr/anonimizador"
          className="text-space-teal :hover-text-space-white"
          target="_blank" 
          rel="noopener noreferrer"
          >
            Código fuente disponible en GitHub
        </a>
      </p>
      <p className="text-center text-space-gray text-xl mt-8">
        <span>💡</span> 
        NO GUARDAMOS NADA DE INFORMACIÓN DEL ARCHIVO DE SUBIDA
      </p>
    </footer>
    </div>
  );
};

export default StepByStepAnonymizer;