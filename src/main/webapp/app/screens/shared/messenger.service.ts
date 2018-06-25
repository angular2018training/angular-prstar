import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MessengerService {
    private messageSource: BehaviorSubject<number> = new BehaviorSubject(1); 
    public message = this.messageSource.asObservable();
    public stepChange(value: number) {
        this.messageSource.next(value);
    }
}