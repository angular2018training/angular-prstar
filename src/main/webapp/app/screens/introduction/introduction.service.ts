import { Injectable } from '@angular/core';
import { Invitee } from '../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/**
 * This Service used to share data between Introduction and its children.
 */
@Injectable()
export class IntroductionService {

    invitee: Invitee;

    private inviteeSource = new BehaviorSubject<Invitee>(new Invitee());

    constructor() {}

    setInvitee(invitee: Invitee) {
        this.inviteeSource.next(invitee);
    }

    getInvitee() {
        return this.inviteeSource;
    }
}
