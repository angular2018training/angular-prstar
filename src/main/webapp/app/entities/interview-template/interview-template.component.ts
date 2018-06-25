import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InterviewTemplate } from './interview-template.model';
import { InterviewTemplateService } from './interview-template.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-interview-template',
    templateUrl: './interview-template.component.html'
})
export class InterviewTemplateComponent implements OnInit, OnDestroy {
interviewTemplates: InterviewTemplate[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private interviewTemplateService: InterviewTemplateService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.interviewTemplateService.query().subscribe(
            (res: HttpResponse<InterviewTemplate[]>) => {
                this.interviewTemplates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInterviewTemplates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: InterviewTemplate) {
        return item.id;
    }
    registerChangeInInterviewTemplates() {
        this.eventSubscriber = this.eventManager.subscribe('interviewTemplateListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
