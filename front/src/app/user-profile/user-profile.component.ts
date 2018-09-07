import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../models/models';
import { UserService } from '../services/user.service';
import { defaultUserData } from '../models/model.data';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})

export class UserProfileComponent implements OnInit{
  profile: UserProfile = defaultUserData();
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.userService.getProfile().subscribe((profile) => {
      this.profile = profile;
    });
  }
  
  saveUserProfile(form: NgForm) {
    if (!form.valid) {
      return;
    }
  }
}
