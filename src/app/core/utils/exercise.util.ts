export interface WgerExercise {
  id: number;
  category: { id: number; name: string };
  translations: Array<{
    language: number;
    name: string;
    description: string;
    notes?: string[]; 
  }>;
  images: Array<{ image: string; is_main: boolean }>; 
  equipment: Array<{ id: number; name: string }>;   
  muscles: Array<{ id: number; name_en: string; name: string }>;
  muscles_secondary: Array<{ id: number; name_en: string; name: string }>;
}

/**
 * @param exercise The exercise object from API
 * @param field The field to extract (e.g., 'name', 'description')
 * @param fallback Custom fallback string if not found
 * @returns The extracted value or fallback
 */
export function getEnglishTranslationField(
  exercise: WgerExercise | null | undefined,
  field: keyof { name: string; description: string; notes?: string[] }, 
  fallback: string = 'Not available'
): string {
  if (!exercise?.translations?.length) {
    return fallback;
  }

  // Prioritize English (language === 2)
  const english = exercise.translations.find(t => t.language === 2);

  if (english && english[field]) {
    return english[field] as string; 
  }

  // Fallback to first translation
  const first = exercise.translations[0];
  if (first && first[field]) {
    return first[field] as string;
  }

  return fallback;
}


  //Get main image URL of exercise
 
export function getMainImage(exercise: WgerExercise | null | undefined): string | null {
  if (!exercise?.images?.length) return null;
  const main = exercise.images.find(img => img.is_main);
  return main?.image || exercise.images[0].image || null;
}

// Get equipment/material as comma-separated string
 
export function getEquipmentList(exercise: WgerExercise | null | undefined): string {
  if (!exercise?.equipment?.length) return 'None (bodyweight)';
  return exercise.equipment.map(eq => eq.name).join(', ');
}


export function getMusclesList(exercise: WgerExercise | null | undefined): string {
  if (!exercise?.muscles?.length) {
    return 'None specified';
  }

  const muscleNames = exercise.muscles
    .map(m => m.name_en?.trim() || m.name?.trim() || 'Unknown')
    .filter(name => name !== 'Unknown'); 

  if (muscleNames.length === 0) {
    return 'None specified';
  }

  return muscleNames.join(', ');
}