import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WgerApiService {
  private BASE_URL = 'https://wger.de/api/v2';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any>(`${this.BASE_URL}/exercisecategory/`);
  }

  getCategoryById(categoryId: number) {
  return this.http.get<any>(`${this.BASE_URL}/exercisecategory/${categoryId}/`);
}

  getExercisesByCategory(categoryId: number) {
    return this.http.get<any>(
      `${this.BASE_URL}/exerciseinfo/?category=${categoryId}`
    );
  }
 
  getExerciseDetails(id: number) {
    return this.http.get<any>(`${this.BASE_URL}/exerciseinfo/${id}/`);
  }
}
