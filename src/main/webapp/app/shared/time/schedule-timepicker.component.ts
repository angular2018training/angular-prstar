import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DatePipe } from '@angular/common';
declare var window: any;

@Component({
    selector: 'schedule-timepicker',
    templateUrl: './schedule-timepicker.component.html',
    styleUrls: []
})
export class ScheduleTimeComponent {
    @Input('id') id: number;
    @Input('name') name: String;
    @Input('placeholder') placeholder: String;
    @Input('field') field: String;
    @Input('initTime') initTime: String = null;
    @Output() value = new EventEmitter<any>();
    constructor(
    ) {
    }
    defaultValue='';
    outputValue(data) {
        let { name } = data;
        this.value.emit(data);
    }

    ngAfterViewInit() {
        window.initTimePicker(`#${this.name}`, this.initTime, (data) => {
            this.outputValue({
                id: this.id,
                data: data,
                name: this.field
            });
            return;
        })
    }
}   