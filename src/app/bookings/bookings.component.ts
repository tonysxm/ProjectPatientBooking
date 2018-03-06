import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor(private auth: AuthService) {
      if (!auth.isAuthenticated()) {
          auth.login();
      }
  }

  ngOnInit() {
  }

}
