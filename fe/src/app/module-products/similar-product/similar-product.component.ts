import { Component, Input, SimpleChange } from '@angular/core';
import { IRoom } from '../../interface/iroom';
import { ProductRoomService } from '../../service/product-room.service';
@Component({
    selector: 'app-similar-product',
    templateUrl: './similar-product.component.html',
    styleUrl: './similar-product.component.scss',
})
export class SimilarProductComponent {
    listProduct: IRoom[] = [];

    @Input() page_size: number = 0;
    @Input() category_id: string = '';

    constructor(private productService: ProductRoomService) {}

    ngOnInit(): void {}

    ngOnChanges(change: SimpleChange) {
        console.log(this.category_id);
        this.productService.getAll({category_id: this.category_id, page_size: this.page_size})
            .subscribe((res: any) => {
                this.listProduct = res?.data?.rooms;
            });
    }
}
