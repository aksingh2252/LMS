import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSubjectComponent } from './book-subject.component';

describe('BookSubjectComponent', () => {
  let component: BookSubjectComponent;
  let fixture: ComponentFixture<BookSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
