import { Component, NgModule } from '@angular/core';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {environment} from '../../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import { AppComponent } from '../app.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { PhotoService } from '../services/cam.service';


@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  constructor(public photoService: PhotoService) {}

}
