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
    this.wallet = new ethers.Wallet('0xed6c60ad103ee08684b76e486ab9332453132ad21681d251833da5dfee450ea9', this.provider);
  }

  disconnect() {

  }

  getBalance() {
    return this.wallet.getBalance();
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
