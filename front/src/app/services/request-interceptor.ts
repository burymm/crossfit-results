import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

const base_url = 'http://127.0.0.1:3000';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.loadAppToken();
    
    const config = {
      url: base_url + request.url,
    };
    
    if (!(request.url.includes('googleAuth') ||
      request.url.includes('assets'))) {
      config['setHeaders'] =  {
        'Authorization': `Bearer ${token}`
      };
    }
    
    
    request = request.clone(config);
    return next.handle(request);
  }
}
