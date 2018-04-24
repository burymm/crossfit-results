import { Injectable } from '@angular/core';
import {UsersService} from "./users.service";


@Injectable()
export class RestService {

  constructor(private usersService: UsersService) {

  }

  saveUserData(userData){
    this.usersService.addUserData(id, name);
  }

}

