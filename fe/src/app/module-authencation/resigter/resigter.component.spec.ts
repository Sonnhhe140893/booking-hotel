import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResigterComponent } from './resigter.component';

describe('ResigterComponent', () => {
  let component: ResigterComponent;
  let fixture: ComponentFixture<ResigterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResigterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResigterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
