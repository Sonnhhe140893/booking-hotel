import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HelperSeriveService } from './common/helper-serive.service';

@Injectable({
  providedIn: 'root',
})
export class ProductRoomService {
    // headers: any;
  constructor(private http: HttpClient, private helperService: HelperSeriveService) {
    // this.headers = {
    //     x_authorization: helperService.getItems('accessToken')
    // }
  }

  apiRoom     = 'http://localhost:3053/api/v1/room';
  apiCategoryAdmin = 'http://localhost:3053/api/v1/admin/category'
  apiCreateCategory = 'http://localhost:3053/api/v1/admin/category/store';
  apiDeleteRoom   = 'http://localhost:3053/api/v1/admin/room';
  apiDeleteCategory= 'http://localhost:3053/api/v1/admin/category/update';
  apiRoomAdmin ='http://localhost:3053/api/v1/admin/room/update';
  apiUpdateCategory = 'http://localhost:3053/api/v1/admin/category/update'
  apiCategory = 'http://localhost:3053/api/v1/category';
  apiCreateRoom= 'http://localhost:3053/api/v1/admin/room/store';

    getAll( filters: any ) {
     let params = new HttpParams()
        if(filters?.category_id) params = params.append('category_id', filters.category_id);
        if(filters?.page) params = params.append('page', filters.page);
        if(filters?.page_size) params = params.append('page_size', filters.page_size);
        if(filters?.name) params = params.append('name', filters.name);

        return this.http.get(this.apiRoom , { params: params} );
    // return this.http.get(this.apiRoom , {headers: this.headers, params: params} );
    }

    deleteProduct(id:any){
        return this.http.delete(this.apiDeleteRoom + '/' + id);
    }
    deleteCategory(id:any){
        return this.http.delete(this.apiDeleteCategory + '/' + id);
    }

    createProduct(inputdata:any){
        return this.http.post(this.apiCreateRoom, inputdata);
    }

    getNewProduct(filters:any){
      let params = new HttpParams()
       if(filters?.page) params= params.append('page', filters.page);
       if(filters?.page_size) params= params.append('page_size', filters.page_size);

       return this.http.get(this.apiRoom,{params: params});

    }

    getProductDetail(id: any) {
        return this.http.get(this.apiRoom + '/' + id);
       // return this.http.get(this.apiRoom + '/' + id, {headers: this.headers});
    }

    getCategories(params: any){
       //api getlist nên truyền parmas
        return this.http.get(this.apiCategory, {params: params});
    }

    getCategoryDetailAdmin(id:any){
       return this.http.get(this.apiCategoryAdmin + '/' + id);
    }

    getCategoriesAdmin(filters: any){
       let params = new HttpParams()
        if(filters?._id) params = params.append('_id', filters._id);
        return this.http.get(this.apiCategoryAdmin, {params: params});
    }

    createCategory(inputdata:any){
        return this.http.post(this.apiCreateCategory, inputdata);
    }

    updateProduct(id:any,inputdata:any ){
        return this.http.put(this.apiRoomAdmin + '/' + id, inputdata);
    }

    UpdateCategory(id:any,inpudata:any){
        return this.http.put(this.apiUpdateCategory+ '/' + id,inpudata);
    }

}
// nếu getlist dùng filters cho 1 cái thôi
// getdetail , post, put thì riêng 1 phương thức api
