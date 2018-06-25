import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Dummy } from './dummy.model';
import { DummyService } from './dummy.service';

@Component({
    selector: 'jhi-dummy',
    templateUrl: './dummy.component.html'
})
export class DummyComponent implements OnInit, OnDestroy {
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dummyService: DummyService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }


    ngOnInit() {
    }

    ngOnDestroy() {
        // this.eventManager.destroy(this.eventSubscriber);
    }
}
