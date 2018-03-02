import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

class Calendar {
    constructor(public name) { }
}

@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.css']
})
export class CalendarsComponent implements OnInit {
  public tableData1: TableData;
    user: Observable<firebase.User>;
    calendars: Observable<any[]>;

    constructor(public afAuth: AngularFireAuth, db: AngularFirestore) {
        this.afAuth.auth.signInAnonymously();
        this.user = this.afAuth.authState;
        this.calendars = db.collection('calendars').valueChanges();
    }

  ngOnInit() {
      this.tableData1 = {
          headerRow: [ 'ID', 'Name', 'Location', '# of Bookings', 'Actions'],
          dataRows: [
              ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
              ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
              ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
              ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
              ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
              ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
          ]
      };
  }

}
