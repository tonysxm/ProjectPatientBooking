import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CalendarModel} from '../models/calendar';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent} from 'angular-calendar';

import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';
import {Subject} from "rxjs/Subject";

declare var $: any;

const colors: any = {
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

@Component({
    selector: 'app-edit-calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-calendar.component.html',
    styleUrls: ['./edit-calendar.component.css']
})
export class EditCalendarComponent implements OnInit {

    public id;
    public calendarModelRef: AngularFirestoreDocument<CalendarModel>;
    public calendarModel$: Observable<CalendarModel>;
    user: Observable<firebase.User>;
    activeDayIsOpen = true;
    public view = 'month';
    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy hh:mm',
        defaultOpen: false
    };
    actions: CalendarEventAction[] = [
        {
            label: '<i class="fa fa-fw fa-pencil"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            }
        },
        {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                this.handleEvent('Deleted', event);
            }
        }
    ];
    events: CalendarEvent[] = [];
    clickedDate: Date;
    public event = {
        start: new Date(),
        end: new Date(),
        title: '',
        color: '',
        actions: this.actions,
        meta : {
            therapy: ''
        }
    }

    therapies: any[] = [
        { id: 1, name: 'Thereapy A'},
        { id: 2, name: 'Thereapy B'}
    ];
    selectedTherapy: any = this.therapies[0]; // first will be selected by default by browser

    setTherapy(id: any): void {
        this.selectedTherapy = this.therapies.filter(value => value.id === parseInt(id));
    }

    handleEvent(action: string, event: CalendarEvent): void {
        // this.modalData = { event, action };
        // this.modal.open(this.modalContent, { size: 'lg' });
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        this.clickedDate = date;
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

  constructor(route: ActivatedRoute, private afs: AngularFirestore, private router: Router) {
      this.id = route.snapshot.paramMap.get('id');
      this.calendarModelRef = this.afs.doc('calendars/' + this.id);
      this.calendarModel$ = this.calendarModelRef.valueChanges();
  }

    updateCalendar(calendarModel: CalendarModel) {
        this.afs.doc('calendars/' + this.id).update(calendarModel);
        this.showNotification('Calendar was updated', 'success' , 'top', 'center');
    }

    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    }

    addEvent(): void {
        this.events.push({
            title: this.event.meta.therapy,
            start: new Date(this.event.start),
            end: new Date(this.event.end),
            color: colors.green,
            actions: this.actions,
            draggable: false,
            resizable: {
                beforeStart: false,
                afterEnd: false
            },
            meta: {
                therapy: this.selectedTherapy
            }
        });
        this.refresh.next();
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
