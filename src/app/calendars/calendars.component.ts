import { Component, OnInit } from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {CalendarModel} from '../models/calendar';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.css']
})
export class CalendarsComponent implements OnInit {
    user: Observable<firebase.User>;
    calendarCollectionRef: AngularFirestoreCollection<CalendarModel>;
    public calendars$: Observable<{}[]>;

    constructor(public afAuth: AngularFireAuth, afs: AngularFirestore, private router: Router, private auth: AuthService) {
        if (!auth.isAuthenticated()) {
            auth.login();
        }
        this.afAuth.auth.signInAnonymously();
        this.user = this.afAuth.authState;
        this.calendarCollectionRef = afs.collection<CalendarModel>('calendars');
        this.calendars$ = this.calendarCollectionRef.snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data() as CalendarModel;
                const id = action.payload.doc.id;
                return { id, ...data };
            });
        });
    }

    public addCalendar() {
        this.router.navigate(['add-calendar']);
    }

    public editCalander(calendarId: number) {
       this.router.navigate(['edit-calendar', { id: calendarId}]);
    }

    deleteCalendar(calendarId: string) {
        this.calendarCollectionRef.doc(calendarId).delete();
    }

  ngOnInit() {
  }

}
