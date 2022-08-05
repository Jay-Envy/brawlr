import { Component } from '@angular/core';
import { PhotoService } from '../services/cam.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(public photoService: PhotoService) {}

}
