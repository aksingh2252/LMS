import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseNewsPaperComponent } from './purchase-news-paper.component';

describe('PurchaseNewsPaperComponent', () => {
  let component: PurchaseNewsPaperComponent;
  let fixture: ComponentFixture<PurchaseNewsPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseNewsPaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseNewsPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
