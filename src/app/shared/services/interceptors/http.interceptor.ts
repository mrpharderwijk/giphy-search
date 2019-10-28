import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptor implements HttpInterceptor {
  constructor() {}

  // TODO: return object
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
    const additionalInfo: { setHeaders: { [key: string]: string } } = { setHeaders: {} };

    // add the (new) headers to the request
    request = request.clone(additionalInfo);

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          // check to see if there's internet
          if (!window.navigator.onLine) {
            /**
             * if there is no internet, throw a HttpErrorResponse error
             * since an error is thrown, the function will terminate here
             */
            console.warn('Internet connection required');
            return EMPTY;
          }
        }

        // Other case throw an error
        throw new Error(error);
      }),
      map(response => {
        if (response instanceof HttpResponse) {
          console.log(response);
        }

        return response;
      }),
    );
  }
}
