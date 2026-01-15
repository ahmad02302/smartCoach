import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { WgerApiService } from '../../core/services/api/wger-api.service';
import { getEnglishTranslationField, WgerExercise, getEquipmentList, getMainImage, getMusclesList } from '../../core/utils/exercise.util';
import { TimerModalComponent } from '../../components/timer-modal/timer-modal.component';
import { IonicModule } from '@ionic/angular';


@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ],
  templateUrl: './exercise-details.page.html'
})
export class ExerciseDetailPage implements OnInit {
  exercise: WgerExercise | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: WgerApiService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getExerciseDetails(id).subscribe(res => {
      this.exercise = res;
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
    return categoryId ? `/tabs/exercises/${categoryId}` : '/tabs/home';
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
}