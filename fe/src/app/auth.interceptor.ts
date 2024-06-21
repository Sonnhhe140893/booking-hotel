import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken = localStorage.getItem('accessToken');

    if (authToken) {
      let authReq = request.clone({
        headers: request.headers.set('x_authorization', JSON.parse(authToken))
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
