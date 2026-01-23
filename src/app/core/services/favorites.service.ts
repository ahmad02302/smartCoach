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
    let i = this.favorites.findIndex(element => element.id == exerciseId)
    this.favorites.splice(i,1)
  }

  toggle(exercise: WgerExercise) {
    this.isFavorite(exercise.id)
      ? this.remove(exercise.id)
      : this.add(exercise);
  }
}
