import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookingSlotComponent } from './edit-booking-slot.component';

describe('EditBookingSlotComponent', () => {
  let component: EditBookingSlotComponent;
  let fixture: ComponentFixture<EditBookingSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookingSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookingSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
