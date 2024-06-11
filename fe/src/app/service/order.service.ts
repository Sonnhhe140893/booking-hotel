import { Injectable } from '@angular/core';
import { HelperSeriveService } from './common/helper-serive.service';
import { HttpClient , HttpParams} from '@angular/common/http';
import { Booking } from '../interface/booking';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private helperservice:HelperSeriveService,
              private http :HttpClient ) { }

   apiCart = "http://localhost:3053/api/v1/booking";

    getAll(filters: any){
        let params = new HttpParams()
        if(filters?.user_id) params = params.append('user_id', filters.user_id)
        return this.http.get(this.apiCart , {params: params})
    }

    bookingsRooms(data:any){
       return this.http.post(this.apiCart , data);
    }




   }




