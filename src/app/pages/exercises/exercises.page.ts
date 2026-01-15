import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WgerApiService } from '../../core/services/api/wger-api.service';
import { getEnglishTranslationField, WgerExercise } from '../../core/utils/exercise.util';

@Component({
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './exercises.page.html'
})
export class ExercisesPage implements OnInit {
  exercises: WgerExercise[] = [];
  filteredExercises: WgerExercise[] = [];
  categoryName: string = 'Loading...';
  searchTerm: string = '';
  showSearch: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: WgerApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getCategoryById(id).subscribe(res => {
      this.categoryName = res.name || 'Unknown Category';
    });

    this.api.getExercisesByCategory(id).subscribe(res => {
      this.exercises = res.results || [];
      this.filteredExercises = [...this.exercises];
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.clearSearch();
    }
  }

  filterExercises() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredExercises = [...this.exercises];
      return;
    }

    this.filteredExercises = this.exercises.filter(ex =>
      this.getExerciseName(ex).toLowerCase().includes(term)
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredExercises = [...this.exercises];
  }

  getExerciseName(ex: WgerExercise): string {
    return getEnglishTranslationField(ex, 'name', 'Unnamed Exercise');
  }

  openExercise(ex: WgerExercise) {
    this.router.navigate(['/exercise', ex.id]);
  }
}