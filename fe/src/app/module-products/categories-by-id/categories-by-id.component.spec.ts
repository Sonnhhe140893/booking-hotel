import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesByIdComponent } from './categories-by-id.component';

describe('CategoriesByIdComponent', () => {
  let component: CategoriesByIdComponent;
  let fixture: ComponentFixture<CategoriesByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
