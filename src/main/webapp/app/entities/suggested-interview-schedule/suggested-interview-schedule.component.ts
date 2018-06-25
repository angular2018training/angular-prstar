import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SuggestedInterviewSchedule } from './suggested-interview-schedule.model';
import { SuggestedInterviewScheduleService } from './suggested-interview-schedule.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-suggested-interview-schedule',
    templateUrl: './suggested-interview-schedule.component.html'
})
export class SuggestedInterviewScheduleComponent implements OnInit, OnDestroy {
suggestedInterviewSchedules: SuggestedInterviewSchedule[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private suggestedInterviewScheduleService: SuggestedInterviewScheduleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.suggestedInterviewScheduleService.query().subscribe(
            (res: HttpResponse<SuggestedInterviewSchedule[]>) => {
                this.suggestedInterviewSchedules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSuggestedInterviewSchedules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SuggestedInterviewSchedule) {
        return item.id;
    }
    registerChangeInSuggestedInterviewSchedules() {
        this.eventSubscriber = this.eventManager.subscribe('suggestedInterviewScheduleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
