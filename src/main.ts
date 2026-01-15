import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { fitness, body, accessibility, walk, barbell, heartCircleOutline, pauseCircleOutline, playCircleOutline, stopCircleOutline, playOutline } from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

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
  'play-outline': playOutline
  ,});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
