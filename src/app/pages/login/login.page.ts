import { Component } from '@angular/core';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule, CommonModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async login() {
    if (!this.email || !this.password) {
      await this.showToast('Please fill in all fields', 'danger');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Logging in...'
    });
    await loading.present();

    try {
      await this.authService.login(this.email, this.password);
      await loading.dismiss();
      
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigate([returnUrl]);
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast(error.message || 'Login failed', 'danger');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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
