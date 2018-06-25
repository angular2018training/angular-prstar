import { MessengerService } from './../../shared/messenger.service';
import { ProService } from './../../../entities/pro/pro.service';
import { UserService } from './../../../shared/user/user.service';
import { Pro } from './../../../entities/pro/pro.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalDialogService } from '../../../shared/dialog/modal-dialog.service';
import { ProstarsWebAppModule } from '../../../app.module';
import { Observable } from 'rxjs/Observable';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-pro-create-account',
  templateUrl: './pro-create-account.component.html',
  styles: []
})
export class ProCreateAccountComponent implements OnInit {
  pro: Pro;
  captchaResponse: any;
  readyToNextStep: boolean;
  doNotMatch: boolean;
  error: string;
  errorEmailExists: boolean;
  errorUserExists: string;
  registerAccount: any;
  success: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private proService: ProService,
    private messengerService: MessengerService,
    private modalDialog: ModalDialogService
  ) { }

  ngOnInit() {
    this.pro = this.proService.pro;
    this.readyToNextStep = false;
    this.success = false;
    if (this.proService.pro.account.login === '') {
      this.route.queryParams.subscribe((params) => {
        this.proService.pro.account.login = params['inviteeEmail'];
        this.proService.pro.sponsorEmail = params['inviterEmail'];
        
        if (this.proService.pro.account.login) {
          this.validateEmail();
        }
      });
    }
  }

  ngAfterViewInit() {
    this.messengerService.stepChange(1);
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.captchaResponse = captchaResponse;
    if (captchaResponse) {
      this.readyToNextStep = true;
    } else {
      this.readyToNextStep = false;
    }
  }

  onNext() {
    this.validatePassword();
    this.userService.validateEmail(this.proService.pro.account.login).subscribe((result) => {
      this.errorEmailExists = !result;
      console.log(this.errorEmailExists);
      if (!this.doNotMatch && !this.errorEmailExists) {
        console.log(this.pro);
        this.pro.account.email = this.pro.account.login;
        this.subscribeToSaveResponse(this.proService.create(this.pro));
      }
    });

  }

  validateEmail() {
    console.log(this.proService.pro.account.login);
    this.userService.validateEmail(this.proService.pro.account.login).subscribe((result) => {
      this.errorEmailExists = !result;
    });
  }

  validatePassword() {
    this.doNotMatch = this.proService.pro.account.password !== this.pro.confirmPassword;
  }

  close(){
    //dismiss is already on Modal Dialog Component
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Pro>>) {
    result.subscribe((res: HttpResponse<Pro>) =>
      this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: Pro) {
    this.proService.error = false;
    // this.modalDialog.open(
    //     "prostarsWebApp.pro.summaryProfile.noticeTitle",
    //     "prostarsWebApp.pro.summaryProfile.noticeMessage",
    //     "prostarsWebApp.pro.summaryProfile.buttonClose",
    //     this.close,
    //     false
    // );

    //modal dialog updated
    let me = this;
    let map = new Map<string, VoidFunction>();
    map.set("prostarsWebApp.pro.summaryProfile.buttonClose", () => {
      this.proService.resetData();
      this.router.navigate(['./']);
    });
    this.modalDialog.open(
          "prostarsWebApp.pro.summaryProfile.noticeTitle",
          "prostarsWebApp.pro.summaryProfile.noticeMessage",
          map,
          true
        );
  }

  private onSaveError() {
    this.proService.error = true;
    // this.modalDialog.open(
    //   "prostarsWebApp.pro.summaryProfile.errorMessage",
    //   "prostarsWebApp.pro.summaryProfile.errorMessage",
    //   "prostarsWebApp.pro.summaryProfile.buttonClose",
    //   this.close,
    //   false
    // );

    //modal dialog updated
    let me = this;
    let map = new Map<string, VoidFunction>();
    map.set("prostarsWebApp.pro.summaryProfile.buttonClose", () => {
      this.proService.resetData();
      this.router.navigate(['./']);
    });
    this.modalDialog.open(
          "prostarsWebApp.pro.summaryProfile.errorMessage",
          "prostarsWebApp.pro.summaryProfile.errorMessage",
          map,
          true
        );
  }
}
