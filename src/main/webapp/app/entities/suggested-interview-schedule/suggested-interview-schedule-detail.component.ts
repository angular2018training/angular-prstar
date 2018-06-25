import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SuggestedInterviewSchedule } from './suggested-interview-schedule.model';
import { SuggestedInterviewScheduleService } from './suggested-interview-schedule.service';

@Component({
    selector: 'jhi-suggested-interview-schedule-detail',
    templateUrl: './suggested-interview-schedule-detail.component.html'
})
export class SuggestedInterviewScheduleDetailComponent implements OnInit, OnDestroy {

    suggestedInterviewSchedule: SuggestedInterviewSchedule;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private suggestedInterviewScheduleService: SuggestedInterviewScheduleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSuggestedInterviewSchedules();
    }

    load(id) {
        this.suggestedInterviewScheduleService.find(id)
            .subscribe((suggestedInterviewScheduleResponse: HttpResponse<SuggestedInterviewSchedule>) => {
                this.suggestedInterviewSchedule = suggestedInterviewScheduleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSuggestedInterviewSchedules() {
        this.eventSubscriber = this.eventManager.subscribe(
            'suggestedInterviewScheduleListModification',
            (response) => this.load(this.suggestedInterviewSchedule.id)
        );
    }
}
