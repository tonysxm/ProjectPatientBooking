import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  public bookingItems$ = [
      {
        id: '1234',
        startTime: '08:00',
        endTime: '8:30',
        availability: false,
        booked: false,
        accepted: false,
      }
  ];
  constructor() { }

  ngOnInit() {
  }

}
