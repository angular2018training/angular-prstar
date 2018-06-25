import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoleMatchPro } from './role-match-pro.model';
import { RoleMatchProPopupService } from './role-match-pro-popup.service';
import { RoleMatchProService } from './role-match-pro.service';

@Component({
    selector: 'jhi-role-match-pro-delete-dialog',
    templateUrl: './role-match-pro-delete-dialog.component.html'
})
export class RoleMatchProDeleteDialogComponent {

    roleMatchPro: RoleMatchPro;

    constructor(
        private roleMatchProService: RoleMatchProService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.roleMatchProService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'roleMatchProListModification',
                content: 'Deleted an roleMatchPro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-role-match-pro-delete-popup',
    template: ''
})
export class RoleMatchProDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roleMatchProPopupService: RoleMatchProPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.roleMatchProPopupService
                .open(RoleMatchProDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
