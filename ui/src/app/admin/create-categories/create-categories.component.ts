import { Component, OnInit } from '@angular/core';
import {DataService} from '../../utils/data.service';
import {Category} from '../../category';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent implements OnInit {

  categories: Category[] = [];
  category = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCategories()
      .subscribe( categories => {
        console.log(categories);
        if ( categories.msg === 'OK' ) {
          this.categories = categories.object;
        }
      }, error => console.error(error));
  }

  insertCategory() {
    if ( this.category === '' || !this.category) {
      return;
    }
    this.categories.push(new Category(this.category.trim(), true));
    this.category = '';
  }

  getCategories() {
    return this.categories.filter( cat => cat.checked );
  }
}
