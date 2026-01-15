import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WgerApiService } from '../../core/services/api/wger-api.service';
import { getEnglishTranslationField, WgerExercise } from '../../core/utils/exercise.util';

@Component({
  imports: [IonicModule],
  templateUrl: './exercises.page.html'
})
export class ExercisesPage implements OnInit {
  exercises: WgerExercise[] = []; // ← Typed for safety
  categoryName: string = 'Loading...'; // Dynamic title

  constructor(
    private route: ActivatedRoute,
    private api: WgerApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Load category (for title)
    this.api.getCategoryById(id).subscribe(res => {
      this.categoryName = res.name || 'Unknown Category';
    });

    // Load exercises (filtering happens in utility)
    this.api.getExercisesByCategory(id).subscribe(res => {
      this.exercises = res.results || [];
    });
  }

  // Call the function here (or in template)
  getExerciseName(ex: WgerExercise): string {
    return getEnglishTranslationField(ex, 'name', 'Unnamed Exercise');
  }

  openExercise(ex: WgerExercise) {
    //const categoryId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/tabs/exercise', ex.id]);
  }
}