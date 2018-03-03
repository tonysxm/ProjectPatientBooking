import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {CalendarModel} from '../models/calendar';

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.css']
})
export class AddCalendarComponent implements OnInit {
    public calendarModel: CalendarModel = {
        name: '',
        location: '',
        dateCreated: this.getTimestamp()
    };
    user: Observable<firebase.User>;
    public calendarCollectionRef: AngularFirestoreCollection<CalendarModel>;
    public calendars$: Observable<{}[]>;

    constructor(public afAuth: AngularFireAuth, afs: AngularFirestore) {
        this.afAuth.auth.signInAnonymously();
        this.user = this.afAuth.authState;

        this.calendarCollectionRef = afs.collection<CalendarModel>('calendars');
        this.calendars$ = this.calendarCollectionRef.valueChanges();
    }

    getTimestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }

    public addCalendar(calendarModel: CalendarModel): void {
        this.calendarCollectionRef.add(calendarModel)
            .then(function(docRef) {
                console.log('Document written with ID: ', docRef.id);
            })
            .catch(function(error) {
                console.error('Error adding document: ', error);
            });
    }

  ngOnInit() {
  }

}
