import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCategoryComponent } from './manager-category.component';

describe('ManagerCategoryComponent', () => {
  let component: ManagerCategoryComponent;
  let fixture: ComponentFixture<ManagerCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
