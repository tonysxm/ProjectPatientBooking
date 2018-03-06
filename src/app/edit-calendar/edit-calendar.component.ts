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
    public event = {
        start: addHours(startOfDay(new Date()), 1),
        end: addHours(startOfDay(new Date()), 2),
        title: 'A 3 day event',
        color: colors.red,
        // actions: this.actions,
        meta : {
            id: 'test'
        }
    }

    activeDayIsOpen = true;
    public view = 'month';
    viewDate: Date = new Date();

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

    events: CalendarEvent[] = [
        {
            start: addHours(startOfDay(new Date()), 1),
            end: addHours(startOfDay(new Date()), 2),
            title: 'A 3 day event',
            color: colors.red,
            actions: this.actions,
            meta : {
                id: 'test'
            }
        },
        {
            start: addHours(startOfDay(new Date()), 2),
            end: addHours(startOfDay(new Date()), 3),
            title: 'An event with no end date',
            color: colors.yellow,
            actions: this.actions
        },
        {
            start: addHours(startOfDay(new Date()), 3),
            end: addHours(startOfDay(new Date()), 4),
            title: 'A long event that spans 2 months',
            color: colors.blue
        },
        {
            start: addHours(startOfDay(new Date()), 5),
            end: addHours(startOfDay(new Date()), 6),
            title: 'A draggable and resizable event',
            color: colors.yellow,
            actions: this.actions,
            resizable: {
                beforeStart: true,
                afterEnd: true
            },
            draggable: false
        }
    ];

    clickedDate: Date;

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

    goToBooking() {
        this.router.navigate(['edit-booking']);
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
