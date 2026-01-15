import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WgerApiService } from '../../core/services/api/wger-api.service';
import { Router, RouterModule } from '@angular/router';
import { CATEGORY_UI_MAP } from '../../core/constants/category-ui.map';

@Component({
  imports: [IonicModule, RouterModule],
  templateUrl: './home.page.html'
})
export class HomePage implements OnInit {
  categories: any[] = [];

  constructor(
    private api: WgerApiService,
    public router: Router,
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
    console.log('Tentative de navigation vers catégorie ID:', cat.id);
    this.router.navigate(['/exercises', cat.id]);
  }

  
}
