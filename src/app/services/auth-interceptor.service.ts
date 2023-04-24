import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on its way');
    const modifiedRequest = request.clone({
        headers : request.headers.append('Auth', 'xyz') // Add a new header named auth.
    });
    return next.handle(modifiedRequest);
  }
}
