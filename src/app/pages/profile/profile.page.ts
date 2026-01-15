import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { AlertController } from '@ionic/angular';
import { getEnglishTranslationField } from '../../core/utils/exercise.util';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  imports: [IonicModule, RouterModule],
})
export class ProfilePage {

  profile = this.profileService.getProfile();
  favorites: any[] = [];

  constructor(
    private profileService: ProfileService,
    private favoritesService: FavoritesService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.profile = this.profileService.getProfile();
    this.favorites = this.favoritesService.getFavorites();
  }

  getExerciseName(exercise: any): string {
    return getEnglishTranslationField(exercise, 'name', 'Unnamed exercise');
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  openExercise(id: number) {
    this.router.navigate(['/exercise', id]);
  }

  async confirmDelete(exerciseId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Supprimer favori',
      message: 'Voulez-vous supprimer cet exercice des favoris ?',
      buttons: [
        { text: 'Annuler' },
        {
          text: 'Supprimer',
          role: 'destructive',
          handler: () => {
            this.favoritesService.remove(exerciseId);
            this.favorites = this.favoritesService.getFavorites();
          }
        }
      ]
    });

    await alert.present();
  }
}
