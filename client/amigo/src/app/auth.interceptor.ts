// src/app/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
   
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Auth interceptor called');
    const token = sessionStorage.getItem('token');
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', token ? `Bearer ${token}` : ''),
    });

    return next.handle(clonedRequest).pipe(
      tap((event) => {
        console.log('event interceptor', event);
        if (event instanceof HttpResponse) {
          if (event.body && event.body.logout) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('loginedInUser');
            this.router.navigate(['/login']);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403 && error.error && error.error.logout) {
       
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('loginedInUser');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
