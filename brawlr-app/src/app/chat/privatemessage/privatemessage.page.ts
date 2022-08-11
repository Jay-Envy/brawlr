import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-privatemessage',
  templateUrl: './privatemessage.page.html',
  styleUrls: ['./privatemessage.page.scss'],
})
export class PrivateMessagePage implements OnInit {
  id: number;
  name: string;
  pic: string;

  constructor(public userService: UserService, public navController: NavController,
    public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  setData(): void{
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id === null) { return; }

    this.id = Number(id);

    const user = this.userService.getChatUser(this.id);
    this.name = user.name;
    this.pic = user.pic;

  }

}
