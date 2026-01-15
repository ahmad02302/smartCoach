import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { WgerApiService } from '../../core/services/api/wger-api.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { getEnglishTranslationField, WgerExercise, getEquipmentList, getMainImage, getMusclesList } from '../../core/utils/exercise.util';
import { TimerModalComponent } from '../../components/timer-modal/timer-modal.component';
import { IonicModule } from '@ionic/angular';
@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './exercise-details.page.html'
})
export class ExerciseDetailPage implements OnInit {
  exercise: WgerExercise | null = null;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: WgerApiService,
    private modalCtrl: ModalController,
    private favoritesService: FavoritesService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getExerciseDetails(id).subscribe(res => {
      this.exercise = res;
      this.isFavorite = this.favoritesService.isFavorite(id);
    });
  }

  getName(): string {
    return getEnglishTranslationField(this.exercise, 'name', 'Unnamed');
  }

  getDescription(): string {
    return getEnglishTranslationField(this.exercise, 'description', 'No description');
  }

  getMainImageUrl(): string | null {
    return getMainImage(this.exercise);
  }

  getMaterials(): string {
    return getEquipmentList(this.exercise);
  }

  getMuscles(): string {
    return getMusclesList(this.exercise);
  }

  getDefaultHref(): string {
    const categoryId = this.exercise?.category?.id;
    return categoryId ? `/exercises/${categoryId}` : '/home';
  }

  async openTimer() {
    const modal = await this.modalCtrl.create({
      component: TimerModalComponent,
      cssClass: 'timer-modal',
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      canDismiss: true
    });
    await modal.present();
  }

  async toggleFavorite() {
    if (!this.exercise) return;

    const exerciseId = this.exercise.id;

    if (this.isFavorite) {
      this.favoritesService.remove(exerciseId);
      this.isFavorite = false;
      await this.showToast('Exercise removed from favorites', 'danger');
    } else {
      this.favoritesService.add(this.exercise);
      this.isFavorite = true;
      await this.showToastWithAction('Exercise added to favorites', 'success');
    }
  }

  private async showToastWithAction(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 4000,
      position: 'bottom',
      color,
      buttons: [
        {
          text: 'View All Favorites',
          handler: () => {
            this.router.navigate(['/profile']);
          }
        }
      ]
    });

    await toast.present();
  }

  private async showToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });

    await toast.present();
  }
}