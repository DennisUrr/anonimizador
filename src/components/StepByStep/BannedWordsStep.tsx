// src/components/StepByStep/BannedWordsStep.tsx
import React from 'react';
import { BannedWord, CategoryType, CATEGORIES } from '../../types/types';

interface BannedWordsStepProps {
  bannedWords: BannedWord[];
  newWord: string;
  setNewWord: (word: string) => void;
  newCategory: CategoryType;
  setNewCategory: (category: CategoryType) => void;
  newReplacement: string;
  setNewReplacement: (replacement: string) => void;
  addBannedWord: () => void;
  removeBannedWord: (index: number) => void;
  exportBannedWords: () => void;
  importBannedWords: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

const BannedWordsStep: React.FC<BannedWordsStepProps> = ({
  bannedWords,
  newWord,
  setNewWord,
  newCategory,
  setNewCategory,
  newReplacement,
  setNewReplacement,
  addBannedWord,
  removeBannedWord,
  exportBannedWords,
  importBannedWords,
  onNext,
  onPrev,
  canProceed
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBannedWord();
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Palabras a anonimizar</h2>
      <p className="mb-6 text-center text-space-gray">Añade palabras que quieres anonimizar en tu documento</p>
      
      {/* Formulario para añadir palabras */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block mb-2">Palabra a banear:</label>
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="Ej: Salesforce, Juan Pérez, 12.345.678-9"
            className="space-input w-full"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Categoría:</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as CategoryType)}
              className="space-select w-full"
            >
              {CATEGORIES.map((cat) => (
                <option className='text-black' key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-2">Reemplazo (opcional):</label>
            <input
              type="text"
              value={newReplacement}
              onChange={(e) => setNewReplacement(e.target.value)}
              placeholder="Dejar en blanco para auto-generar"
              className="space-input w-full"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="space-btn-primary w-full"
        >
          Añadir palabra
        </button>
      </form>
      
      {/* Lista de palabras baneadas */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Palabras añadidas ({bannedWords.length})</h3>
          
          <div className="flex space-x-2">
            <button
              onClick={exportBannedWords}
              disabled={bannedWords.length === 0}
              className="space-btn-secondary text-sm py-1 px-3"
            >
              Exportar
            </button>
            
            <label className="space-btn-secondary text-sm py-1 px-3 cursor-pointer">
              Importar
              <input
                type="file"
                accept=".json"
                onChange={importBannedWords}
                className="hidden"
              />
            </label>
          </div>
        </div>
        
        <div className="space-card bg-opacity-20 p-2 max-h-64 overflow-y-auto mb-4">
          {bannedWords.length === 0 ? (
            <div className="text-center py-6 text-space-gray italic">
              No hay palabras añadidas. Agrega al menos una palabra para continuar.
            </div>
          ) : (
            <table className="space-table">
              <thead>
                <tr>
                  <th>Palabra</th>
                  <th>Categoría</th>
                  <th>Reemplazo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bannedWords.map((word, index) => (
                  <tr key={index}>
                    <td className="truncate max-w-[150px]" title={word.word}>
                      {word.word}
                    </td>
                    <td>
                      {CATEGORIES.find(c => c.value === word.category)?.label || word.category}
                    </td>
                    <td className="truncate max-w-[150px]" title={word.replacement}>
                      {word.replacement}
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => removeBannedWord(index)}
                        className="text-red-300 hover:text-red-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={onPrev}
            className="space-btn-secondary"
          >
            Regresar
          </button>
          
          <button
            onClick={onNext}
            disabled={!canProceed}
            className="space-btn-primary"
          >
            Continuar al siguiente paso
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannedWordsStep;