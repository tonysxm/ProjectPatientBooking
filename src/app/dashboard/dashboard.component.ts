import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {AuthService} from '../service/auth.service';

declare var $: any;

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    constructor(private auth: AuthService) {
        if (!auth.isAuthenticated()) {
            auth.login();
        }
    }

    ngOnInit(){
    }
}
