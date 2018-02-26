import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-enter-results',
  templateUrl: './enter-results.component.html',
  styleUrls: ['./enter-results.component.scss']
})

export class EnterResultsComponent implements OnInit {

Users = [];

	constructor(private router: Router, private route: ActivatedRoute, private usersService: UsersService) { }



	ngOnInit() {
		this.Users = this.usersService.User;
	}

onClick() {
	console.log(this.Users[1]);
}
}
