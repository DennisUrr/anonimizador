// src/utils/anonymizer.ts
import { BannedWord, CategoryType } from '../types/types';

/**
 * Escapa caracteres especiales para uso en expresiones regulares
 */
export function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Genera un reemplazo automático según la categoría
 */
export function generateReplacement(category: CategoryType, count: number): string {
  switch (category) {
    case 'nombre':
      return `Nombre ${count}`;
    case 'apellido':
      return `Apellido ${count}`;
    case 'nombre_completo':
      return `Persona ${count}`;
    case 'empresa':
      return `Empresa ${count}`;
    case 'rut':
      return `XX.XXX.XXX-${count}`;
    case 'correo':
      return `email${count}@anonimo.com`;
    case 'telefono':
      return `+XX-XXX-XXXX${count}`;
    case 'direccion':
      return `Dirección ${count}`;
    case 'ciudad':
      return `Ciudad ${count}`;
    default:
      return `[Redactado ${count}]`;
  }
}

/**
 * Anonimiza un texto basado en una lista de palabras baneadas
 */
export function anonymizeText(content: string, bannedWords: BannedWord[]): {
  anonymizedContent: string;
  replacements: Record<string, string>;
} {
  let anonymized = content;
  const replacements: Record<string, string> = {};
  
  // Ordenar palabras por longitud (descendente) para evitar reemplazos parciales
  const sortedWords = [...bannedWords].sort((a, b) => b.word.length - a.word.length);
  
  // Procesar cada palabra baneada
  for (const bannedWord of sortedWords) {
    // Crear una expresión regular que coincida con la palabra completa (case-insensitive)
    const regex = new RegExp(`\\b${escapeRegExp(bannedWord.word)}\\b`, 'gi');
    
    // Reemplazar todas las ocurrencias
    anonymized = anonymized.replace(regex, (match) => {
      // Almacenar en el mapa de reemplazos
      replacements[match] = bannedWord.replacement;
      return bannedWord.replacement;
    });
  }
  
  return {
    anonymizedContent: anonymized,
    replacements
  };
}

/**
 * Valida si un objeto es un array de BannedWord
 */
export function isBannedWordArray(arr: unknown): arr is BannedWord[] {
  return Array.isArray(arr) && arr.every(item => 
    item !== null &&
    typeof item === 'object' && 
    'word' in item && typeof item.word === 'string' && 
    'category' in item && typeof item.category === 'string' && 
    'replacement' in item && typeof item.replacement === 'string'
  );
}