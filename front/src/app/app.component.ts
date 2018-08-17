import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
	constructor(private userService: UserService,
              private router: Router,
              private ref: ChangeDetectorRef) {
	}
  
  isAuthorized():boolean {
	  return this.userService.isAuthorized();
  }
  
  onUserAuthorized(authorizedByLogin) {
	  if (authorizedByLogin) {
      setTimeout(() => {
        location.reload();
      }, 50);
    }
  
    this.router.navigateByUrl('results');
  }
}
