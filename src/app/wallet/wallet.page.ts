import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  public isAuthorized = false;
  public isLoading = false;

  constructor(
    private walletService: WalletService,
    private router: Router
    ) {
    // walletService.connect();
  }

  ngOnInit() {

  }

  async authorize() {
    this.isLoading = true;
    await this.walletService.connect();
    this.router.navigate(['/tabs', {}]);
    this.isLoading = false;
    this.isAuthorized = true;
  }

}
