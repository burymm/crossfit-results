import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	title = null;	

	constructor() {

		let current_path = window.location.pathname;
		
		switch (current_path) {

			case ('/'):
				this.title = 'View Results';
				break;

			case ('/results-enter'):
				this.title = 'Enter Results';
				break;
			
			case ('/results-view'):
				this.title = 'View Results';
				break;

			default:
				this.title = 'Undefined Title';
				break;
		}
	}
}
