// src/hooks/useAnonymizer.ts
import { useState, useEffect, ChangeEvent } from 'react';
import { BannedWord, CategoryType } from '../types/types';
import { processFile } from '../utils/fileProcessors';
import { anonymizeText, isBannedWordArray, generateReplacement } from '../utils/anonymizer';
import { downloadFile } from '../utils/fileUtils';

export function useAnonymizer() {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [anonymizedContent, setAnonymizedContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  // Estado para palabras baneadas y formulario
  const [bannedWords, setBannedWords] = useState<BannedWord[]>([
    { word: "Geovictoria", category: 'empresa', replacement: "Empresa X" },
    { word: "Cencosud", category: 'empresa', replacement: "Empresa Y" },
    { word: "Juan Pérez", category: 'nombre_completo', replacement: "Persona 1" },
    { word: "12.345.678-9", category: 'rut', replacement: "XX.XXX.XXX-X" },
    { word: "contacto@ejemplo.com", category: 'correo', replacement: "correo@anonimo.com" }
  ]);
  
  const [newWord, setNewWord] = useState<string>('');
  const [newCategory, setNewCategory] = useState<CategoryType>('otro');
  const [newReplacement, setNewReplacement] = useState<string>('');
  
  // Reprocesar el archivo actual cuando cambia la lista de palabras baneadas
  useEffect(() => {
    if (fileContent) {
      const { anonymizedContent } = anonymizeText(fileContent, bannedWords);
      setAnonymizedContent(anonymizedContent);
    }
  }, [bannedWords, fileContent]);

  // Función para manejar la carga de archivos
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const uploadedFile = files[0];
    setFile(uploadedFile);
    setIsProcessing(true);
    setError('');

    try {
      const content = await processFile(uploadedFile);
      
      if (!content || typeof content !== 'string') {
        throw new Error('No se pudo extraer contenido del archivo. El archivo podría estar vacío o dañado.');
      }

      setFileContent(content);
      const { anonymizedContent } = anonymizeText(content, bannedWords);
      setAnonymizedContent(anonymizedContent);
    } catch (err: unknown) {
      console.error("Error completo:", err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(`Error al procesar el archivo: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Función para agregar una nueva palabra baneada
  const addBannedWord = (): void => {
    if (!newWord.trim()) {
      setError('Por favor ingresa una palabra para banear');
      return;
    }
    
    // Verificar si la palabra ya existe
    if (bannedWords.some(item => item.word.toLowerCase() === newWord.toLowerCase())) {
      setError('Esta palabra ya está en la lista');
      return;
    }
    
    // Generar un reemplazo automático si no se proporciona uno
    let replacement = newReplacement;
    if (!replacement) {
      const count = bannedWords.filter(w => w.category === newCategory).length + 1;
      replacement = generateReplacement(newCategory, count);
    }
    
    // Agregar la nueva palabra
    setBannedWords([...bannedWords, { word: newWord, category: newCategory, replacement }]);
    
    // Resetear el formulario
    setNewWord('');
    setNewReplacement('');
    setError('');
  };

  // Eliminar una palabra baneada
  const removeBannedWord = (index: number): void => {
    const updatedWords = [...bannedWords];
    updatedWords.splice(index, 1);
    setBannedWords(updatedWords);
  };

  // Descargar el contenido anonimizado
  const handleDownload = (): void => {
    if (!anonymizedContent) return;
    
    const fileName = file 
      ? `anonimizado_${file.name.replace(/\.\w+$/, '.txt')}` 
      : 'documento_anonimizado.txt';
      
    downloadFile(anonymizedContent, fileName);
  };
  
  // Exportar la lista de palabras baneadas
  const exportBannedWords = (): void => {
    if (bannedWords.length === 0) return;
    downloadFile(JSON.stringify(bannedWords, null, 2), 'palabras_baneadas.json', 'application/json');
  };
  
  // Importar lista de palabras baneadas
  const importBannedWords = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    try {
      const content = await files[0].text();
      const imported = JSON.parse(content) as unknown;
      
      // Validar el formato
      if (!isBannedWordArray(imported)) {
        throw new Error('Formato de archivo inválido');
      }
      
      setBannedWords(imported);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(`Error al importar palabras: ${errorMessage}`);
    }
  };

  return {
    file,
    fileContent,
    anonymizedContent,
    isProcessing,
    error,
    bannedWords,
    newWord,
    newCategory,
    newReplacement,
    setNewWord,
    setNewCategory,
    setNewReplacement,
    handleFileUpload,
    addBannedWord,
    removeBannedWord,
    handleDownload,
    exportBannedWords,
    importBannedWords,
    setError
  };
}