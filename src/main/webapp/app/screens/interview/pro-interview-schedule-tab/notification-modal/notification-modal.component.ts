import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'notification-modal',
    templateUrl: './notification-modal.component.html',
    styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent {
    constructor(public activeModalNotified: NgbActiveModal) {}
}