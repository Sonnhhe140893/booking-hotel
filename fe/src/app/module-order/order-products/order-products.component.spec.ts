import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductsComponent } from './order-products.component';

describe('OrderProductsComponent', () => {
  let component: OrderProductsComponent;
  let fixture: ComponentFixture<OrderProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
