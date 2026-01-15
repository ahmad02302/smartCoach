import { Component } from '@angular/core';
import { IonicModule, ToastController, ActionSheetController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  standalone: true,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  imports: [IonicModule, FormsModule]
})
export class EditProfilePage {

  profile = structuredClone(this.profileService.getProfile());
  previewImage: string | null = null;  
  interestInput = '';

  constructor(
    private profileService: ProfileService,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router
  ) {}

  async changePhoto() {
    await this.showWebPhotoOptions();
  }

  private async showWebPhotoOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Changer la photo',
      cssClass: 'photo-action-sheet',
      buttons: [
        {
          text: 'Prendre une photo',
          icon: 'camera-outline',
          handler: () => this.takePhoto(CameraSource.Camera)
        },
        {
          text: 'Choisir depuis la galerie',
          icon: 'image-outline',
          handler: () => this.takePhoto(CameraSource.Photos)
        }
      ]
    });

    await actionSheet.present();
  }

  private async takePhoto(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source,
        correctOrientation: true
      });

      if (image.dataUrl) {
        this.previewImage = image.dataUrl;
      }
    } catch (error: any) {
      if (error?.message !== 'User cancelled photos app') {
        console.error('Erreur photo:', error);
        await this.showToast('Impossible de récupérer la photo');
      }
    }
  }

  async addInterest() {
    const value = this.interestInput.trim();
    if (!value) return;

    if (this.profile.interests.includes(value)) {
      await this.showToast('Already added this interest !');
      return;
    }

    this.profile.interests.push(value);
    this.interestInput = '';
  }

  removeInterest(interest: string) {
    this.profile.interests = this.profile.interests.filter(i => i !== interest);
  }

  cancel() {
    this.router.navigate(['/profile']);
  }

  save() {
    if (!this.profile.firstName || !this.profile.lastName) {
      this.showToast('First and last name are required !');
      return;
    }

    if (this.previewImage) {
      this.profile.image = this.previewImage;
    }

    this.profileService.updateProfile(this.profile);
    this.router.navigate(['/profile']);
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'warning',
      position: 'top'
    });
    await toast.present();
  }
}