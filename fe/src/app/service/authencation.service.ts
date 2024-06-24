import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperSeriveService } from './common/helper-serive.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthencationService {
    apiRegister = 'http://localhost:3053/api/v1/auth/register';
    apiLogin = 'http://localhost:3053/api/v1/auth/login';
    apiProfile = 'http://localhost:3053/api/v1/profile';

    constructor(
        private http: HttpClient,
        private helperService: HelperSeriveService
    ) {
        // let token = localStorage.getItem('accessToken');
        // if(token) {
        //     this.header =  new HttpHeaders({
        //         x_authorization : JSON.parse(token)
        //      })
        // }

    }



    login(filters: any) {
        return this.http.post(this.apiLogin, filters,
            // {headers: {}}
        );
    }

    RegisterUser(inputdata: any) {
        return this.http.post(this.apiRegister, inputdata);
    }

    checkLogin(){
        return this.helperService.getItems("email","string")!=null;
    }

    updateProfile(inputdata:any ){
        return this.http.put(this.apiProfile, inputdata);

    }

    getUser(){
        return this.http.get(this.apiProfile);
        // let params = new HttpParams ()
        // if(filters?._id) params = params.append('_id', filters._id)
        //     return this.http.get(this.apiProfile, {params: params})
    }
}
