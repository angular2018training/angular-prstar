import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoleMatchPro } from './role-match-pro.model';
import { RoleMatchProPopupService } from './role-match-pro-popup.service';
import { RoleMatchProService } from './role-match-pro.service';

@Component({
    selector: 'jhi-role-match-pro-dialog',
    templateUrl: './role-match-pro-dialog.component.html'
})
export class RoleMatchProDialogComponent implements OnInit {

    roleMatchPro: RoleMatchPro;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private roleMatchProService: RoleMatchProService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.roleMatchPro.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roleMatchProService.update(this.roleMatchPro));
        } else {
            this.subscribeToSaveResponse(
                this.roleMatchProService.create(this.roleMatchPro));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RoleMatchPro>>) {
        result.subscribe((res: HttpResponse<RoleMatchPro>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RoleMatchPro) {
        this.eventManager.broadcast({ name: 'roleMatchProListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-role-match-pro-popup',
    template: ''
})
export class RoleMatchProPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roleMatchProPopupService: RoleMatchProPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.roleMatchProPopupService
                    .open(RoleMatchProDialogComponent as Component, params['id']);
            } else {
                this.roleMatchProPopupService
                    .open(RoleMatchProDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
