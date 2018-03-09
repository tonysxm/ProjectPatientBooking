import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class NotificationService {

  constructor() { }

    public showNotification(message: string, type: string, icon: string, from, align) {
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

    public showSavedNotification(message: string) {
      this.showNotification(message, 'success', 'ti-save', 'top', 'center');
    }

}
