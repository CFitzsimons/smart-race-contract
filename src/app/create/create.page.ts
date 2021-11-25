import { Component, Input, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  @Input() eventName;
  @Input() maxParticipants;
  @Input() startDateTime;

  constructor(private contract: ContractService) { }

  ngOnInit() {

  }

  async save() {
    console.log(this.eventName, this.maxParticipants, this.startDateTime);
    const starting = new Date(this.startDateTime);
    const unixStamp = parseInt((new Date(this.startDateTime).getTime() / 1000).toFixed(0));
    // this.startDateTime
    // this.contract.s
    this.contract.createEvent(this.eventName, this.maxParticipants, unixStamp);
  }

}
