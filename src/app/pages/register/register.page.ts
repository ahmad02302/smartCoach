import { Component } from '@angular/core';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule, CommonModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async register() {
    if (!this.email || !this.password || !this.firstName || !this.lastName) {
      await this.showToast('Please fill in all fields', 'danger');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await this.showToast('Passwords do not match', 'danger');
      return;
    }

    if (this.password.length < 6) {
      await this.showToast('Password must be at least 6 characters', 'danger');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creating account...'
    });
    await loading.present();

    try {
      await this.authService.register(
        this.email,
        this.password,
        this.firstName,
        this.lastName
      );
      await loading.dismiss();
      await this.showToast('Account created successfully!', 'success');
      this.router.navigate(['/']);
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast(error.message || 'Registration failed', 'danger');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  private async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
