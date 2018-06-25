import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RoleMatchPro } from './role-match-pro.model';
import { RoleMatchProService } from './role-match-pro.service';

@Component({
    selector: 'jhi-role-match-pro-detail',
    templateUrl: './role-match-pro-detail.component.html'
})
export class RoleMatchProDetailComponent implements OnInit, OnDestroy {

    roleMatchPro: RoleMatchPro;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private roleMatchProService: RoleMatchProService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRoleMatchPros();
    }

    load(id) {
        this.roleMatchProService.find(id)
            .subscribe((roleMatchProResponse: HttpResponse<RoleMatchPro>) => {
                this.roleMatchPro = roleMatchProResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRoleMatchPros() {
        this.eventSubscriber = this.eventManager.subscribe(
            'roleMatchProListModification',
            (response) => this.load(this.roleMatchPro.id)
        );
    }
}
