import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProductsComponent } from './payment-products.component';

describe('PaymentProductsComponent', () => {
  let component: PaymentProductsComponent;
  let fixture: ComponentFixture<PaymentProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
