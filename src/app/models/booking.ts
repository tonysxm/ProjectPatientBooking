import {BookingSlot} from './bookingslot';

export class Booking {
    id?: number;
    calendarId: string;
    date: any;
    userId: string;
    treatmentType: string;
    bookingSlots: BookingSlot[];
}
