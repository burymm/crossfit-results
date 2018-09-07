import {Injectable} from "@angular/core";
import {UserProfile} from "../models/models";
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { defaultUserData } from '../models/model.data';

@Injectable()
export class UserService {
  profile: UserProfile;
  profileObserver: BehaviorSubject<UserProfile>;
  
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
    this.profileObserver.next(this.profile);
  }
  
  getProfile(): BehaviorSubject<UserProfile> {
    return this.getProfileObserver();
  }
  
  clearProfile() {
    this.profile = void 0;
  }
  
  private getProfileObserver() {
    if (!this.profileObserver) {
      this.profileObserver = new BehaviorSubject(defaultUserData());
    }
  
    return this.profileObserver;
  }
}
