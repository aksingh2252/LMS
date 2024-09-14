import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseMagazineComponent } from './purchase-magazine.component';

describe('PurchaseMagazineComponent', () => {
  let component: PurchaseMagazineComponent;
  let fixture: ComponentFixture<PurchaseMagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseMagazineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
