import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/users.service';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    // add token to http requests after seccesful login.
    constructor( ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with our token if needed.
        let token:string;
        token = localStorage.getItem("token");
        if (token) {            
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}
