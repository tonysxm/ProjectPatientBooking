import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CalendarModel} from '../models/calendar';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';

declare var $: any;

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.css']
})
export class EditCalendarComponent implements OnInit {

  public id;
  public calendarModelRef: AngularFirestoreDocument<CalendarModel>;
  public calendarModel$: Observable<CalendarModel>;
  user: Observable<firebase.User>;

  constructor(route: ActivatedRoute, private afs: AngularFirestore) {
      this.id = route.snapshot.paramMap.get('id');
      this.calendarModelRef = this.afs.doc('calendars/' + this.id);
      this.calendarModel$ = this.calendarModelRef.valueChanges();
  }

    updateCalendar(calendarModel: CalendarModel) {
        this.afs.doc('calendars/' + this.id).update(calendarModel);
        this.showNotification('Calendar was updated', 'success' , 'top', 'center');
    }

    showNotification(message: string, type: string, from, align) {
        $.notify({
            icon: 'ti-save',
            message: message
        }, {
            type: type,
            timer: 1000,
            placement: {
                from: from,
                align: align
            }
        });
    }

  ngOnInit() {
  }

}
