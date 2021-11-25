import { Injectable } from '@angular/core';
import { WalletService } from './wallet.service';
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
    // const provider = this.walletService.getProvider();
    // const signer = this.walletService.getSigner();
    this.contract = new ethers.Contract('0x7f9E1Fa87E069b800b31b4Af2d7Af3706Eb769a7', ContractABI.abi, wallet);
    // this.contract = this.contract.connect(wallet);
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
