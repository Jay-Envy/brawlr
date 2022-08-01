import { Component, NgModule } from '@angular/core';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {environment} from '../../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import { AppComponent } from '../app.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { CamService } from '../services/cam.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [AppRoutingModule,
  //Firebase main import.
provideFirebaseApp(()=> initializeApp(environment.firebaseConfig)),
//Firebase authentication import.
provideAuth(()=> getAuth())
],
providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
bootstrap: [AppComponent],
})

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  constructor(public camService: CamService) {}

}
