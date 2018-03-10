import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {CalendarModel} from '../models/calendar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.css']
})
export class AddCalendarComponent implements OnInit {
    public calendarModel: CalendarModel = {
        name: '',
        location: '',
        dateCreated: this.getTimestamp(),
        isArchived: false,
        isVisible: true
    };
    user: Observable<firebase.User>;
    public calendarCollectionRef: AngularFirestoreCollection<CalendarModel>;
    public calendars$: Observable<{}[]>;

    constructor(public afAuth: AngularFireAuth, afs: AngularFirestore, private router: Router) {
        this.afAuth.auth.signInAnonymously();
        this.user = this.afAuth.authState;

        // this.calendarCollectionRef = afs.collection<CalendarModel>('calendars'
        //     , ref => ref.where('isArchived', '==', 'false')
        //                          .where('isVisible', '==', 'true'));
        this.calendarCollectionRef = afs.collection<CalendarModel>('calendars');
        this.calendars$ = this.calendarCollectionRef.valueChanges();
    }

    getTimestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }

    public addCalendar(calendarModel: CalendarModel): void {
        this.calendarCollectionRef.add(calendarModel);
        this.router.navigate(['calendars']);
    }

  ngOnInit() {
  }

}
