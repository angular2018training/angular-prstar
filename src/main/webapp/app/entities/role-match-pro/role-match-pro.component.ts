import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoleMatchPro } from './role-match-pro.model';
import { RoleMatchProService } from './role-match-pro.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-role-match-pro',
    templateUrl: './role-match-pro.component.html'
})
export class RoleMatchProComponent implements OnInit, OnDestroy {
roleMatchPros: RoleMatchPro[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private roleMatchProService: RoleMatchProService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.roleMatchProService.query().subscribe(
            (res: HttpResponse<RoleMatchPro[]>) => {
                this.roleMatchPros = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRoleMatchPros();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RoleMatchPro) {
        return item.id;
    }
    registerChangeInRoleMatchPros() {
        this.eventSubscriber = this.eventManager.subscribe('roleMatchProListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
