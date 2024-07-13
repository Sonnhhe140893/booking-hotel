import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBookingComponent } from './manager-booking.component';

describe('ManagerBookingComponent', () => {
  let component: ManagerBookingComponent;
  let fixture: ComponentFixture<ManagerBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
