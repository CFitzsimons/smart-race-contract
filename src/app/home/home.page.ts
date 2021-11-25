import { Component } from '@angular/core';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class Home {
  public events = [];

  constructor(private contract: ContractService) {
    this.contract.getEvents()
      .then((res) => {
        console.log('REs:', res);
        this.events = res;
      });
  }

  async ngOnInit() {
    const test = await this.contract.getEvents();
    console.log(test);
    this.events = test;
  }

}
