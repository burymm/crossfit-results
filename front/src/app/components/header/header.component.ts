import {
  Component,
  Input,
} from '@angular/core';
import { Menu } from '../../models/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  @Input()
  title: string;
  
  menuList: Menu[];

  constructor() {
    this.menuList = [{
      title: 'Results',
      url: '/results',
    }, {
      title: 'Profile',
      url: '/user-profile',
    }];
  }
}
