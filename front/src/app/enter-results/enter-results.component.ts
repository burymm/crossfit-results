import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from  "../user"
import { UsersService } from '../services/users.service';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-enter-results',
  templateUrl: './enter-results.component.html',
  styleUrls: ['./enter-results.component.scss']
})

export class EnterResultsComponent implements OnInit {

Users = [];

	constructor(private router: Router,
              private route: ActivatedRoute,
              private usersService: UsersService,
              private restService: RestService) { }



	ngOnInit() {
		this.Users = this.usersService.userData;
	}

onClick() {
	console.log(this.Users[1]);
//this.restService.saveUserData(userData);
}
}

