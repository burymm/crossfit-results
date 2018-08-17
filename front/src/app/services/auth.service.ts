import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  
  }
  
  googleAuthorize(token: string) {
    return this.http.post(`/googleAuth`, { token });
  }
  
  saveGoogleToken(token: string) {
    localStorage.setItem('googleToken', token);
  }
  
  loadGoogleToken(): string {
    const token = localStorage.getItem('googleToken');
    
    return token;
  }
  
  logout() {
    localStorage.removeItem('googleToken');
  }
}
