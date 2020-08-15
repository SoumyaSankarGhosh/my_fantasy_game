import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { tap, finalize,catchError } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class Interceptor  implements HttpInterceptor {

    constructor(private tokenService:TokenService,private toastr: ToastrService){}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (this.tokenService.isToken()) {
            request = request.clone({
                setHeaders: { 
                    'x-auth-role':"0",
                    'x-auth-token':this.tokenService.getToken()
                }
            }); 
        }

        return next.handle(request).pipe(
            tap(data => {
             
            }),
            finalize(() => {
                
            }),
            catchError(err => {
                const error = err.error.message || err.statusText;
                if ([401].indexOf(err.status) !== -1) {
                    //auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    this.toastr.error('Error!', "Unauthorized");
                    this.tokenService.removeToken();
                    this.tokenService.removeUserid();
                    location.reload(true);
                }
                return throwError(error);
            })
          );
    }
}