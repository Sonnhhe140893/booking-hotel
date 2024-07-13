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
    apiAdmin = 'http://localhost:3053/api/v1/admin/user/update';
    apiGetUserAdmin = 'http://localhost:3053/api/v1/admin/user/';
    apiCreatAdmin = 'http://localhost:3053/api/v1/admin/user/store';
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

    getAll(filters:any){
        let params = new HttpParams ()
        if(filters?._id) params = params.append('_id',filters._id);
        if(filters?.type) params = params.append('type',filters.type);
        if(filters?.name) params = params.append('name',filters.name);
        if(filters?.page) params = params.append('page', filters.page);
        if(filters?.page_size) params = params.append('page_size', filters.page_size);

        return this.http.get(this.apiGetUserAdmin, {params: params})
    }
    getUserById(id:any){
        return this.http.get(this.apiProfile+ '/'+ id)
    }


    login(filters: any) {
        return this.http.post(this.apiLogin, filters,
            // {headers: {}}
        );
    }

    RegisterUser(inputdata: any) {
        return this.http.post(this.apiRegister, inputdata);
    }

    createAdmin(inputdata:any){
        return this.http.post(this.apiCreatAdmin,inputdata);
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

    updateUsers(id:any,inputdata:any ){
        return this.http.put(this.apiAdmin + '/' + id, inputdata);

    }

}
