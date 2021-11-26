import { Injectable, } from '@angular/core';
import { WalletService } from './wallet.service';
import { CanActivate } from '@angular/router';
import { ethers } from 'ethers';
const ContractABI = require('../../contractInterfaces/RaceCoin.json');

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contract;
  constructor(private walletService: WalletService) { }

  private connect() {
    const wallet = this.walletService.getWallet();
    this.contract = new ethers.Contract('0x70F43D8E875cFC047a3e77Cb3b623EAaf36d422d', ContractABI.abi, wallet);
  }
  async getEvents() {
    if (!this.contract) {
      this.connect();
    }
    const events = await this.contract.currentRaces();
    return events;
  }

  async createEvent(name, max, startingTime) {
    if (!this.contract) {
      this.connect();
    }
    const tx = await this.contract.createRace(name, max, startingTime);
  }
}
