import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {CallbackComponent} from './callback/callback.component';
import {CalendarsComponent} from './calendars/calendars.component';
import {BookingsComponent} from './bookings/bookings.component';
import {SettingsComponent} from './settings/settings.component';
import {AddCalendarComponent} from './add-calendar/add-calendar.component';
import {EditCalendarComponent} from './edit-calendar/edit-calendar.component';
import {EditBookingSlotComponent} from "./edit-booking-slot/edit-booking-slot.component";
import {PatientsComponent} from "./patients/patients.component";

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'callback',
        component: CallbackComponent
    },
    {
        path: 'calendars',
        component: CalendarsComponent
    },
    {
        path: 'add-calendar',
        component: AddCalendarComponent
    },
    {
        path: 'edit-calendar',
        component: EditCalendarComponent
    },
    {
        path: 'bookings',
        component: BookingsComponent
    },
    {
        path: 'edit-booking-slot',
        component: EditBookingSlotComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'patients',
        component: PatientsComponent
    }
];
