import { Component } from '@angular/core';
import { ProductRoomService } from '../../service/product-room.service';
import { ActivatedRoute } from '@angular/router';
import { IRoom } from '../../interface/iroom';
import { HelperSeriveService } from '../../service/common/helper-serive.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product: IRoom={
    _id: '',
    name: '',
    avatar: '',
    room_code: '',
    status:false,
    price: 0,
    size: 0,
    bed: 0,
    description: '',
    category_id: '',
    room_content: '',
    category: '',
    albums: [],
    created_at: '' ,

  };
  category_id: string="";



  constructor(
    private productService: ProductRoomService,
    private activeRoute: ActivatedRoute,
    public helperService: HelperSeriveService
  ) {}

  ngOnInit(): void {
    this.productDetails();
  }

  productDetails() {

    this.activeRoute.params.subscribe((params: any) => {
        if(params?.id) {
            let id = params.id
            this.productService.getProductDetail(id).subscribe((res: any) => {
                console.log('resssssss', res);

                this.product =res?.data;
                this.category_id = this.product.category_id;
                console.log("category=========>",this.category_id);
                console.log("product=>>>>>",this.product);

              });
        }
    })

  }
}
