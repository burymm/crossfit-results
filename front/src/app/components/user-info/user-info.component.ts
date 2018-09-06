import { UserProfile } from '../../models/models';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})

export class UserInfoComponent implements OnInit{
  profile: UserProfile = {
    name: '',
    email: '',
    picture: '',
    id: '',
  };
  
  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) {}
  
  ngOnInit() {
    this.userService.getProfile().subscribe((profile) => {
      this.profile = profile;
    });
  }
  
  logout() {
    this.authService.logout();
    this.userService.clearProfile();
    this.router.navigateByUrl('login');
  }
  
  showUserProfile() {
    console.log('Not implemented');
  }
}
