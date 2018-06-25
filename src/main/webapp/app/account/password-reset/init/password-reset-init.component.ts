import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordResetInitService } from './password-reset-init.service';
import { EMAIL_NOT_FOUND_TYPE } from '../../../shared';

@Component({
    selector: 'jhi-password-reset-init',
    templateUrl: './password-reset-init.component.html'
})
export class PasswordResetInitComponent implements OnInit, AfterViewInit {
    error: string;
    errorEmailNotExists: string;
    errorWrongConfirmationCode: string;
    errorConfirmationCodeExpired : string;
    resetAccount: any;
    success: string;
    confirmationCodeSuccess : string;

    constructor(
        private passwordResetInitService: PasswordResetInitService,
        private elementRef: ElementRef,
        private router: Router,
        private renderer: Renderer
    ) {
    }

    ngOnInit() {
        this.resetAccount = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#email'), 'focus', []);
    }

    requestReset() {
        this.error = null;
        this.errorEmailNotExists = null;
        this.errorConfirmationCodeExpired = null;

        this.passwordResetInitService.save(this.resetAccount.login).subscribe(() => {
            this.success = 'OK';
        }, (response) => {
            this.success = null;
            if (response.status === 400) {
                this.errorEmailNotExists = response.error.title;
            } else {
                this.error = 'ERROR';
            }
        });
    }

    refreshPage() {
        this.errorConfirmationCodeExpired = null;
        this.errorWrongConfirmationCode = null;
        this.success = null;
    }

    checkConfirmationCode() {
        this.errorWrongConfirmationCode = null;
        this.errorConfirmationCodeExpired = null;
        this.passwordResetInitService.checkConfirmationCode(this.resetAccount).subscribe((result) => {
            this.confirmationCodeSuccess = 'OK';
            if (result === true) {
                this.router.navigate(['/reset', 'finish'],
                    { queryParams: { confirmationCode: this.resetAccount.resetKey } });
            }
        }, (response) => {
            this.confirmationCodeSuccess = null;
            if (response.status === 400) {
                this.errorWrongConfirmationCode = response.error.title;
                if (response.error.title === 'Confimation Code expired') {
                    this.errorConfirmationCodeExpired = response.error.title;
                    this.errorWrongConfirmationCode = null;
                    this.success = null;
                }
            } else {
                this.error = 'ERROR';
            }
        });
    }
}
