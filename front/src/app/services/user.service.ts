import {Injectable} from "@angular/core";
import {UserProfile} from "../models/models";
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class UserService {
  profile: UserProfile;
  profileSubscriber: Subscriber<UserProfile>;
  profileObserver: Observable<UserProfile>;
  
  constructor(private http: HttpClient) {
  }
  
  isAuthorized(): boolean {
    return !!this.profile;
  }
  
  saveProfile(profile: UserProfile) {
    return new Observable((observer) => {
      this.http.post(
        `/profile`,
        profile).subscribe((data: UserProfile) => {
          observer.next(data);
          this.setProfile(data);
      });
    });
  }
  
  setProfile(profile: UserProfile) {
    if (!this.profileObserver) {
      this.getProfileObserver();
    }
    this.profile = profile;
    this.profileSubscriber.next(this.profile);
  }
  
  getProfile(): Observable<UserProfile> {
    return this.getProfileObserver();
  }
  
  clearProfile() {
    this.profile = void 0;
  }
  
  private getProfileObserver() {
    if (!this.profileObserver) {
      this.profileObserver = new Observable((observer) => {
        this.profileSubscriber = observer;
      });
    }
  
    return this.profileObserver;
  }
}
