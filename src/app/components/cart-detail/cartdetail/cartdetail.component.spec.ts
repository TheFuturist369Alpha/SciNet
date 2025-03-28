import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartdetailComponent } from './cartdetail.component';

describe('CartdetailComponent', () => {
  let component: CartdetailComponent;
  let fixture: ComponentFixture<CartdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartdetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
