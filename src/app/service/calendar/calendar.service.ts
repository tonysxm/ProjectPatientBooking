import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CalendarModel} from '../../models/calendar';

@Injectable()
export class CalendarService {
    constructor(private http:  HttpClient) {}
}
