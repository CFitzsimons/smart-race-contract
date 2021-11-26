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
    this.wallet = new ethers.Wallet('0xe9aff276a5783a383b08e375df0c74b167b56d75086749f2bb1e1c8862d56df6', this.provider);
    this.wallet.getBalance()
      .then((bal) => {
        console.log('Balance:', bal.toString());
      })
  }

  disconnect() {

  }

  isConnected() {
    return !!this.wallet;
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
