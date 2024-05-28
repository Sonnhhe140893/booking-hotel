import { Component } from '@angular/core';
import { HelperSeriveService } from '../../service/common/helper-serive.service';
import { ProductRoomService } from '../../service/product-room.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  constructor(private productService: ProductRoomService) {}

  categories: any;
  paging: any = {
    page: 1,
    page_size: 10,
    total: 0,
  };

  ngOnInit(): void {
    this.loadCategories(this.paging);
  }

  loadCategories(params: any) {
    this.productService.getCategories(params).subscribe((res: any) => {
      console.log('categories=>>>>>', res);
      if (res?.status == 200) {
        this.categories = res?.data?.categories || [];
      }
    });
  }
}

