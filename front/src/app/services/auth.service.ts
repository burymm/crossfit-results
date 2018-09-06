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
  
  saveAppToken(token: string) {
    localStorage.setItem('appToken', token);
  }
  
  loginViaAppToken(token) {
    return this.http.post('/tokenAuth', { token });
  }
  
  loadGoogleToken(): string {
    const token = localStorage.getItem('googleToken');
    
    return token;
  }
  
  loadAuthToken(): string {
    const token = localStorage.getItem('token');
    
    return token;
  }
  
  loadAppToken(): string {
    return localStorage.getItem('appToken');
  }
  
  logout() {
    localStorage.removeItem('googleToken');
    localStorage.removeItem('appToken');
  }
}
