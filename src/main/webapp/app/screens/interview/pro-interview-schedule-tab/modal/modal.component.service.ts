import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TabScheduleService {
    public data = new BehaviorSubject<any>(
        [
            {
                timezone: '',
                fromTime: '',
                toTime: ''
            }
        ]
    );
    constructor() {

    }
}
