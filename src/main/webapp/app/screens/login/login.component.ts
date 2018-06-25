import { Component, AfterViewInit, Renderer,ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaComponent } from 'ng-recaptcha/recaptcha/recaptcha.component';

import { LoginService } from '../../shared/login/login.service';
import { StateStorageService } from '../../shared/auth/state-storage.service';
import { error } from 'util';
import { ERR_MAX_LOGIN_ATTEMPTS } from '../../shared';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements AfterViewInit {

  authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    readyLogin: boolean;
    captchaResponse: any;
    showCaptcha: boolean;

    @ViewChild('recaptcha') recaptchaRef: RecaptchaComponent;
    

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
    ) {
        this.credentials = {};
        this.readyLogin = true;
        this.showCaptcha = false;
    }

    ngAfterViewInit() {
        this.loginService.getCaptchaStatus()
            .subscribe((needShowCaptcha) => {
                this.showCaptcha = needShowCaptcha;
                this.readyLogin = !this.showCaptcha;
            });
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response ${captchaResponse}:`);
        this.captchaResponse = captchaResponse;
        if (captchaResponse) {
          this.readyLogin = true;
        } else {
          this.readyLogin = false;
        }
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
    }

    login() {
        this.loginService.login({
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe,
            captchaResponse: this.captchaResponse
        }).then(() => {
            this.authenticationError = false;
            if (this.router.url === '/register' || (/^\/activate\//.test(this.router.url)) ||
                (/^\/reset\//.test(this.router.url))) {
                this.router.navigate(['']);
            }

            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });

            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            // const redirect = this.stateStorageService.getUrl();
            /*if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            }*/

            // always display dashboard screen after logging in application
            this.router.navigate(['/dashboard']);
        }).catch((logInResponse) => {
            this.authenticationError = true;
            if (ERR_MAX_LOGIN_ATTEMPTS === logInResponse.error.title) {
                this.showCaptcha = true;
                this.readyLogin = false;
            }
        });

        if (this.recaptchaRef) {
            this.recaptchaRef.reset();
        }
    }

    register() {
        this.router.navigate(['/']);
    }

    requestResetPassword() {
        this.router.navigate(['/reset', 'request']);
    }

}
