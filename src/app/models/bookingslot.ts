export class BookingSlot {
    id?: number;
    title: string;
    start: any;
    end: any;
    color: any;
    actions: any;
    draggable: boolean;
    resizable: {
        beforeStart: boolean,
        afterEnd: boolean
    };
    meta: {
        therapy: string,
        isAvailable: boolean,
        isBooked: boolean,
        isAccepted: boolean,
        isCompleted: boolean
    };
}
