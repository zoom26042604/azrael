import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personnalisé pour gérer le localStorage de manière réactive
 * @param key - La clé du localStorage
 * @param initialValue - La valeur initiale par défaut
 * @returns [storedValue, setValue] - La valeur stockée et la fonction pour la mettre à jour
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // État pour stocker la valeur
  // Passe une fonction d'initialisation pour éviter l'exécution à chaque render
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur dans le state et le localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Permet de passer une fonction comme avec useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Écoute les changements du localStorage (pour synchroniser entre onglets)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing storage event for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue] as const;
}
