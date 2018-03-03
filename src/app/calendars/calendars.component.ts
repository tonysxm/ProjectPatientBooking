import { Component, OnInit } from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {CalendarModel} from '../models/calendar';

@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.css']
})
export class CalendarsComponent implements OnInit {
    user: Observable<firebase.User>;
    calendarCollectionRef: AngularFirestoreCollection<CalendarModel>;
    public calendars$: Observable<{}[]>;

    constructor(public afAuth: AngularFireAuth, afs: AngularFirestore, private router: Router) {
        this.afAuth.auth.signInAnonymously();
        this.user = this.afAuth.authState;
        this.calendarCollectionRef = afs.collection<CalendarModel>('calendars');
        this.calendars$ = afs.collection('calendars').snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data() as CalendarModel;
                const id = action.payload.doc.id;
                return { id, ...data };
            });
        });
        this.calendars$;
    }

    public addCalendar() {
        this.router.navigateByUrl('add-calendar');
    }

    updateCalendar(calendarModel: CalendarModel) {
        // this.calendarCollectionRef.doc(calendarModel.id).update({ completed: !calendarModel.name });
    }

    deleteCalendar(calendarModel: CalendarModel) {
        // this.calendarCollectionRef.doc(calendarModel.id).delete();
    }

  ngOnInit() {
  }

}
