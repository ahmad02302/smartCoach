import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-timer-modal',
  templateUrl: './timer-modal.component.html',
  styleUrls: ['./timer-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class TimerModalComponent {

  elapsedSeconds = 0;          
  isRunning = false;
  private intervalId: any = null;
  private startTimestamp: number = 0;

  constructor(private modalCtrl: ModalController) {}

  get displayTime(): string {
    let totalSeconds = this.elapsedSeconds;

    if (this.isRunning) {
      const secondsSinceStart = Math.floor((Date.now() - this.startTimestamp) / 1000);
      totalSeconds += secondsSinceStart;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  get statusText(): string {
    if (this.isRunning) {
      return 'RUNNING';
    }
    if (this.elapsedSeconds > 0) {
      return 'PAUSED';
    }
    return 'READY';
  }

  get isPaused(): boolean {
    return !this.isRunning && this.elapsedSeconds > 0;
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startTimestamp = Date.now();

    this.intervalId = setInterval(() => {
      this.elapsedSeconds = this.elapsedSeconds;
    }, 1000);
  }

  pause() {
    if (!this.isRunning) return;

    const secondsSinceStart = Math.floor((Date.now() - this.startTimestamp) / 1000);
    this.elapsedSeconds += secondsSinceStart;

    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isRunning = false;
  }

  reset() {
    this.pause();
    this.elapsedSeconds = 0;
    this.startTimestamp = 0;
  }

  dismiss() {
    this.pause();
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    this.pause();
  }
}