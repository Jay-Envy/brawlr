import { Component } from '@angular/core';
import { Card } from '../components/app-brawlr-card/app-brawlr-card.component';

@Component({
  selector: 'app-brawl',
  templateUrl: 'brawl.page.html',
  styleUrls: ['brawl.page.scss']
})
export class BrawlPage {

  //kaartlijst wordt geinitialiseerd en id begint bij 0
  cardList: Card[] = [];
  id = 0;

  constructor() {}

}
