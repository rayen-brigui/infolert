            import { Injectable } from '@angular/core';
            import {
              HttpEvent,
              HttpInterceptor,
              HttpHandler,
              HttpRequest,
            } from '@angular/common/http';
            import { Observable } from 'rxjs';

            @Injectable()
            export class MyHttpInterceptor implements HttpInterceptor {
              intercept(
                request: HttpRequest<any>,
                next: HttpHandler
              ): Observable<HttpEvent<any>> {
                // Modify request here, e.g., add headers
                const modifiedRequest = request.clone({
                  setHeaders: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                  },
                });
                return next.handle(modifiedRequest);
              }
            }
