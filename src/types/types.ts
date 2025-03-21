// src/types/types.ts

// Categorías disponibles para palabras baneadas
export type CategoryType = 
  | 'nombre' 
  | 'apellido' 
  | 'nombre_completo' 
  | 'empresa' 
  | 'rut' 
  | 'correo' 
  | 'telefono' 
  | 'direccion' 
  | 'ciudad' 
  | 'otro';

// Interfaz para palabras baneadas
export interface BannedWord {
  word: string;
  category: CategoryType;
  replacement: string;
}

// Mapa de reemplazos
export interface ReplacementMap {
  [key: string]: string;
}

// Opciones para categorías
export const CATEGORIES: { value: CategoryType; label: string }[] = [
  { value: 'nombre', label: 'Nombre' },
  { value: 'apellido', label: 'Apellido' },
  { value: 'nombre_completo', label: 'Nombre Completo' },
  { value: 'empresa', label: 'Empresa' },
  { value: 'rut', label: 'RUT' },
  { value: 'correo', label: 'Correo Electrónico' },
  { value: 'telefono', label: 'Teléfono' },
  { value: 'direccion', label: 'Dirección' },
  { value: 'ciudad', label: 'Ciudad' },
  { value: 'otro', label: 'Otro' }
];

// Tipo para los errores
export interface ProcessError {
  message: string;
}

// Tipado para Mammoth
// src/types/mammoth.d.ts
declare module 'mammoth' {
  export function extractRawText(options: { arrayBuffer: ArrayBuffer }): Promise<{ value: string }>;
}