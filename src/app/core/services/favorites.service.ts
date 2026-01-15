import { Injectable } from '@angular/core';
import { WgerExercise } from '../utils/exercise.util';

@Injectable({ providedIn: 'root' })
export class FavoritesService {

  private favorites: WgerExercise[] = [];

  getFavorites(): WgerExercise[] {
    return this.favorites;
  }

  isFavorite(exerciseId: number): boolean {
    return this.favorites.some(e => e.id === exerciseId);
  }

  add(exercise: WgerExercise) {
    if (!this.isFavorite(exercise.id)) {
      this.favorites.push(exercise);
    }
  }

  remove(exerciseId: number) {
    this.favorites = this.favorites.filter(e => e.id !== exerciseId);
  }

  toggle(exercise: WgerExercise) {
    this.isFavorite(exercise.id)
      ? this.remove(exercise.id)
      : this.add(exercise);
  }
}
