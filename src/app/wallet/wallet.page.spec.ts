import { ComponentFixture, TestBed, tick, waitForAsync, fakeAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WalletPage } from './wallet.page';

describe('WalletPage', () => {
  let component: WalletPage;
  let fixture: ComponentFixture<WalletPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set authorize to true if successful', fakeAsync(() => {
    expect(component.isLoading).toBeFalse();
    component.authorize();
    expect(component.isLoading).toBeTrue();
    expect(component.isAuthorized).toBeFalse();
    tick(5000);
    expect(component.isAuthorized).toBeTrue();
  }))
});
