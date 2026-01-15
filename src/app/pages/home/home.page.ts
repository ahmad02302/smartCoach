import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WgerApiService } from '../../core/services/api/wger-api.service';
import { Router } from '@angular/router';
import { CATEGORY_UI_MAP } from '../../core/constants/category-ui.map';

@Component({
  imports: [IonicModule],
  templateUrl: './home.page.html'
})
export class HomePage implements OnInit {
  categories: any[] = [];

  constructor(
    private api: WgerApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.api.getCategories().subscribe(res => {

      this.categories = res.results.map((cat: any) => ({
        ...cat,
        icon: CATEGORY_UI_MAP[cat.name]?.icon || 'fitness',
        color: CATEGORY_UI_MAP[cat.name]?.color || 'medium'
      }));

    });
  
}

  openCategory(cat: any) {
    this.router.navigate(['/tabs/exercises', cat.id]);
  }

  
}
