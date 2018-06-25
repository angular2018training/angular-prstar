import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Post } from './matching.model';
import { MatchingService } from './matching.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-matching',
    templateUrl: './matching-landing.component.html'
})
export class MatchingLandingComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private matchingService: MatchingService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    ngOnInit() {
        
    }


    
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
