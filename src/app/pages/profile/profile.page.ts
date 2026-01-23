import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { AuthService } from '../../core/services/auth.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { getEnglishTranslationField } from '../../core/utils/exercise.util';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  imports: [IonicModule, RouterModule, CommonModule],
})
export class ProfilePage {

  profile = this.profileService.getProfile();
  favorites: any[] = [];
  userEmail: string = '';

  constructor(
    private profileService: ProfileService,
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.profile = this.profileService.getProfile();
    this.favorites = this.favoritesService.getFavorites();
    const user = this.authService.getCurrentUser();
    this.userEmail = user?.email || '';
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

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Logout',
          role: 'destructive',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Logging out...'
            });
            await loading.present();

            try {
              await this.authService.logout();
              await loading.dismiss();
            } catch (error) {
              await loading.dismiss();
              const toast = await this.toastController.create({
                message: 'Error logging out',
                duration: 2000,
                color: 'danger'
              });
              await toast.present();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
