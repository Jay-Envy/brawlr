import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-brawl',
  templateUrl: 'brawl.page.html',
  styleUrls: ['brawl.page.scss']
})
export class BrawlPage {

  constructor(public userService: UserService) {
    userService.populateBrawlUserList();
  }
}
