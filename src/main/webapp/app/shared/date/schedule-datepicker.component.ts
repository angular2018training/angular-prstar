import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DatePipe } from '@angular/common';
declare var window: any;

@Component({
    selector: 'schedule-datepicker',
    templateUrl: './schedule-datepicker.component.html',
    styleUrls: []
})
export class ScheduleDateComponent {
    @Input('name') name: String;
    @Input('id') id: number;
    @Input('initDate') initDate: Date = null;
    @Output() value = new EventEmitter<any>();

    currentDate = this.datePipe.transform(Date.now(), "yyyy-MM-dd");

    constructor(
        private datePipe: DatePipe,
    ) {
    }

    outputValue(data) {
        this.value.emit(data);
    }

    ngAfterViewInit() {
        window.initDatePicker(`#${this.name}`, [],
            (data) => {
                this.outputValue({
                    id: this.id,
                    data: data
                });
                return;
            }, new Date(this.initDate), new Date(), null);
    }
}   