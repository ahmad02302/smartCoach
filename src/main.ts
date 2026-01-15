import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { fitness, body, accessibility, walk, barbell, heartCircleOutline, pauseCircleOutline, playCircleOutline, stopCircleOutline, playOutline, homeOutline, personOutline, createOutline, star, starOutline, trashOutline, cameraOutline, imageOutline, search } from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { defineCustomElements } from '@ionic/pwa-elements/loader'; 
defineCustomElements(window);

addIcons({
  'fitness': fitness,
  'body': body,
  'accessibility': accessibility,
  'walk': walk,
  'barbell': barbell,
  'heart-circle-outline': heartCircleOutline,
  'pause-circle-outline': pauseCircleOutline,
  'play-circle-outline': playCircleOutline,
  'stop-circle-outline': stopCircleOutline,
  'play-outline': playOutline,
  'home-outline': homeOutline,
  'person-outline': personOutline,
  'create-outline': createOutline,
  'star': star,
  'star-outline': starOutline,
  'trash-outline': trashOutline,
  'camera-outline': cameraOutline,
  'image-outline': imageOutline,
  'search': search
  ,});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
