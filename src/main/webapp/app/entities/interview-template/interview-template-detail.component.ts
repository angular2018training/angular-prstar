import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InterviewTemplate } from './interview-template.model';
import { InterviewTemplateService } from './interview-template.service';

@Component({
    selector: 'jhi-interview-template-detail',
    templateUrl: './interview-template-detail.component.html'
})
export class InterviewTemplateDetailComponent implements OnInit, OnDestroy {

    interviewTemplate: InterviewTemplate;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private interviewTemplateService: InterviewTemplateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInterviewTemplates();
    }

    load(id) {
        this.interviewTemplateService.find(id)
            .subscribe((interviewTemplateResponse: HttpResponse<InterviewTemplate>) => {
                this.interviewTemplate = interviewTemplateResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInterviewTemplates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'interviewTemplateListModification',
            (response) => this.load(this.interviewTemplate.id)
        );
    }
}
