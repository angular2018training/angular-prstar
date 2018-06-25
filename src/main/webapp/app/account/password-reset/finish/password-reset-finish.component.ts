import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { PasswordResetFinishService } from './password-reset-finish.service';

@Component({
    selector: 'jhi-password-reset-finish',
    templateUrl: './password-reset-finish.component.html'
})
export class PasswordResetFinishComponent implements OnInit, AfterViewInit {
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    resetAccount: any;
    success: string;
    modalRef: NgbModalRef;
    confirmationCode: string;

    constructor(
        private passwordResetFinishService: PasswordResetFinishService,
        private route: ActivatedRoute,
        private router: Router,
        private elementRef: ElementRef, private renderer: Renderer
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.confirmationCode = params['confirmationCode'];
        });
        this.resetAccount = {};
    }

    ngAfterViewInit() {
        if (this.elementRef.nativeElement.querySelector('#password') != null) {
          this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#password'), 'focus', []);
        }
    }

    finishReset() {
        this.doNotMatch = null;
        this.error = null;
        if (this.resetAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.passwordResetFinishService.save({confirmationCode: this.confirmationCode, newPassword: this.resetAccount.password}).subscribe(() => {
                this.success = 'OK';
            }, () => {
                this.success = null;
                this.error = 'ERROR';
            });
        }
    }

    login() {
        this.router.navigate(['/login']);
    }
}
