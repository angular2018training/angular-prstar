import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RoleMatchPro } from './role-match-pro.model';
import { RoleMatchProService } from './role-match-pro.service';

@Injectable()
export class RoleMatchProPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private roleMatchProService: RoleMatchProService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.roleMatchProService.find(id)
                    .subscribe((roleMatchProResponse: HttpResponse<RoleMatchPro>) => {
                        const roleMatchPro: RoleMatchPro = roleMatchProResponse.body;
                        this.ngbModalRef = this.roleMatchProModalRef(component, roleMatchPro);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.roleMatchProModalRef(component, new RoleMatchPro());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    roleMatchProModalRef(component: Component, roleMatchPro: RoleMatchPro): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.roleMatchPro = roleMatchPro;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
