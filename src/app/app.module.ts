import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';
import {SidebarModule} from './sidebar/sidebar.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {NguiMapModule} from '@ngui/map';

import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';
import {TableComponent} from './table/table.component';
import {TypographyComponent} from './typography/typography.component';
import {IconsComponent} from './icons/icons.component';
import {MapsComponent} from './maps/maps.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {AuthService} from './service/auth.service';
import {CallbackComponent} from './callback/callback.component';
import {CalendarsComponent} from './calendars/calendars.component';
import {BookingsComponent} from './bookings/bookings.component';
import {SettingsComponent} from './settings/settings.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {FIRE_BASE_CREDENTIALS} from './firebase.credentials';
import {AngularFireAuth} from 'angularfire2/auth';
import {AddCalendarComponent} from './add-calendar/add-calendar.component';
import {FormsModule} from '@angular/forms';
import {EditCalendarComponent} from './edit-calendar/edit-calendar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'angular-calendar';
import {AngularDateTimePickerModule} from 'angular2-datetimepicker/datepicker.module';
import { EditBookingSlotComponent } from './edit-booking-slot/edit-booking-slot.component';
import {NotificationService} from './service/notification/notification.service';
import { PatientsComponent } from './patients/patients.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        UserComponent,
        TableComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        CallbackComponent,
        CalendarsComponent,
        BookingsComponent,
        SettingsComponent,
        AddCalendarComponent,
        EditCalendarComponent,
        EditBookingSlotComponent,
        PatientsComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        SidebarModule,
        NavbarModule,
        FooterModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
        AngularFireModule.initializeApp(FIRE_BASE_CREDENTIALS),
        AngularFirestoreModule.enablePersistence(),
        FormsModule,
        BrowserAnimationsModule,
        CalendarModule.forRoot(),
        AngularDateTimePickerModule
    ],
    providers: [AuthService, AngularFireAuth, NotificationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
