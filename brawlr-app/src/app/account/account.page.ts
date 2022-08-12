import { Component, OnInit } from '@angular/core';
import { User } from 'src/datatypes/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})

export class AccountPage implements OnInit {
  showLoginBtn = true;

  constructor(public authService: AuthService, public userService: UserService) {}

  ngOnInit(): void {
      if(this.authService.isLoggedIn()){
        this.showLoginBtn = false;
      };
  }

}
