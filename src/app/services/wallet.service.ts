import { ethers } from 'ethers';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private wallet;
  private signer;
  private provider;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

  }

  connect() {
    this.wallet = new ethers.Wallet('3c83e23d48bad20e5ec85bda0e3c61a477a2e403504b8447338353bbd6ab84c6', this.provider);
    this.wallet.getBalance()
      .then((bal) => {
        console.log(bal.toString());
      })
    // this.signer = this.provider.getSigner();
  }

  disconnect() {

  }

  getWallet() {
    return this.wallet;
  }

  getProvider() {
    return this.provider;
  }

  getSigner() {
    return this.signer;
  }
}
