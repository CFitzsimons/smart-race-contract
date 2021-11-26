import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public balance;
  constructor(private wallet: WalletService) {};

  ngOnInit(): void {
    this.wallet.getBalance()
      .then((balance) => {
        this.balance = balance.toFixed(2);
      })
  };

  async refreshBalance() {
    this.balance = await this.wallet.getBalance();
    this.balance = this.balance.toFixed(2);
  }

}
