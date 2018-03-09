import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {BookingSlot} from '../models/bookingslot';
import {Observable} from 'rxjs/Observable';
import {NotificationService} from '../service/notification/notification.service';

@Component({
  selector: 'app-edit-booking-slot',
  templateUrl: './edit-booking-slot.component.html',
  styleUrls: ['./edit-booking-slot.component.css']
})
export class EditBookingSlotComponent implements OnInit {

  public calendarId;
  public bookingSlotId;
  public bookingSlotRef: AngularFirestoreDocument<BookingSlot>;
  public bookingSlot$: Observable<BookingSlot>;
  public colors: any = {
        red: {
            primary: '#ad2121',
            secondary: '#FAE3E3'
        },
        blue: {
            primary: '#1e90ff',
            secondary: '#D1E8FF'
        },
        yellow: {
            primary: '#e3bc08',
            secondary: '#FDF1BA'
        },
        green: {
            primary: '#00FF00',
            secondary: '#00FF00'
        }
    };
  // Turn this into a service
  therapies: any[] = [
      { id: 1, name: 'Thereapy A'},
      { id: 2, name: 'Thereapy B'}
  ];
  selectedTherapy: any = this.therapies[0];

      constructor(route: ActivatedRoute,  private afs: AngularFirestore, private router: Router,
                  private notificationService: NotificationService) {
          this.calendarId = route.snapshot.paramMap.get('calendarId');
          this.bookingSlotId = route.snapshot.paramMap.get('bookingSlotId');
          this.bookingSlotRef = afs.doc('bookings/' + this.calendarId + '/bookingSlots/' + this.bookingSlotId);
          this.bookingSlot$ = this.bookingSlotRef.valueChanges();
      }

    updateBookingSlot(bookingSlot: BookingSlot) {
        bookingSlot = this.updateBookingSlotStatusColor(bookingSlot);
        this.afs.doc('bookings/' + this.calendarId + '/bookingSlots/' + this.bookingSlotId).update(bookingSlot);
        this.notificationService.showSavedNotification('Booking Updated');
    }

    updateBookingSlotStatusColor(bookingSlot: BookingSlot) {
          if (bookingSlot.meta.isBooked) {
              bookingSlot.color = this.colors.blue;
          } else {
              bookingSlot.color = this.colors.green;
          }
          return bookingSlot;
    }

    setTherapy(id: any): void {
        this.selectedTherapy = this.therapies.filter(value => value.id === parseInt(id));
    }

  ngOnInit() {
  }

}
