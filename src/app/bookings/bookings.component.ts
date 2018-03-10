import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {BookingSlot} from '../models/bookingslot';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

    public bookingsref: AngularFirestoreCollection<BookingSlot>;
    public bookingsref$: Observable<{}>;
    public bookingSlotsref: AngularFirestoreCollection<BookingSlot>;
    public bookingSlotsref$: Observable<BookingSlot>;

    constructor(private auth: AuthService, public afs: AngularFirestore) {
      if (!auth.isAuthenticated()) {
          auth.login();
      }
      this.bookingsref = afs.collection('bookings');
      this.bookingsref$ = this.bookingsref.snapshotChanges();
      // this.bookingsref$ = this.bookingsref.snapshotChanges().map(actions => {
      //     return actions.map(action => {
      //         const data = action.payload.doc.data();
      //         const id = action.payload.doc.id;
      //         return { id, ...data };
      //     });
      // });
    }

    ngOnInit() {

    }

}
