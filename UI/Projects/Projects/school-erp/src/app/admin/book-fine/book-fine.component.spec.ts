import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFineComponent } from './book-fine.component';

describe('BookFineComponent', () => {
  let component: BookFineComponent;
  let fixture: ComponentFixture<BookFineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookFineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
