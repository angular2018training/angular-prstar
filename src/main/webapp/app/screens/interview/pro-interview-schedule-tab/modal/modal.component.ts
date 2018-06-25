import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TabScheduleService } from './modal.component.service';
declare var window: any;

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {
    data: any[];
    date = []
    constructor(
        public activeModal: NgbActiveModal,
        public tabScheduleService: TabScheduleService
    ) {
        this.tabScheduleService.data.subscribe(data => {
            this.date = data;
        })
    }

    recievedDate(value) {
        let { id, data } = value;
        this.date[id].timezone = data;
    }
    recievedTime(value) {
        let { id, data, name } = value;
        this.date[id][name] = data;
    }
    async onAddLine() {
        await this.tabScheduleService.data.subscribe(data => {
            data.push({
                timezone: '',
                fromTime: '',
                toTime: ''
            })
        })
        // await this.dateLine.push(
        //     {
        //         timezone: '',
        //         fromTime: '',
        //         toTime: ''
        //     },
        // )
        // let len = this.dateLine.length - 1;
    }
    onRemoveLine(index) {
        this.tabScheduleService.data.subscribe(data => {
            data.splice(index, 1)
        })
        // this.dateLine.splice(index, 1)

    }
    addDate() {
        this.activeModal.close(this.date);
    }
}