import {Injectable} from "@angular/core";
import {UserProfile} from "../models/models";

@Injectable()
export class UserService {
  profile: UserProfile;
  
  constructor() {
  }
  
  isAuthorized(): boolean {
    return !!this.profile;
  }
  
  saveProfile(profile: UserProfile) {
    this.profile = {
      ...profile,
    }
  }
  
  getProfile(): UserProfile {
    return this.profile;
  }
  
  clearProfile() {
    this.profile = void 0;
  }
}
