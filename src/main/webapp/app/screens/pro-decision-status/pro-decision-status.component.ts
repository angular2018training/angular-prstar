import { ProService } from './../../entities/pro/pro.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProDecisionService } from './pro-decision-status.service';
import { ModalDialogService } from '../../shared/dialog/modal-dialog.service';
import { JhiAlertService } from 'ng-jhipster';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './pro-decision-status.component.html',
  styles: []
})
export class ProDecisionStatusComponent implements OnInit {
  private decision: String = "";
  private proEmail: String = "";
  private isExisted: boolean = true;

  constructor(
    private activeModal: NgbActiveModal,
    private proService: ProService,
    private jhiAlertService: JhiAlertService,
    private dialogModal: ModalDialogService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit() {
    this.proService.getReferralStatus(this.proEmail).subscribe(
      response => {
        this.decision = response;
        this.displayDecisionStatus();
      },
      (res: HttpErrorResponse) => {
        if (res.status === 404) {
          this.isExisted = false;
        }
        else this.jhiAlertService.error(res.statusText, null, null);
      }
    );
  }

  displayDecisionStatus() {
    this.activeModal.dismiss();
    let me = this;
    let map = new Map<string, VoidFunction>();
    switch (this.decision) {
      case 'ACCEPTED': {
        map.set("prostarsWebApp.pro.status.resendEmailButton", function () {
          me.resendAcceptedEmail(me.proEmail);
        });
        this.dialogModal.open(
          "prostarsWebApp.pro.status.acceptTitle",
          "prostarsWebApp.pro.status.acceptMessage",
          map,
          true
        );
        break;
      }
      case 'IN_REVIEW': {
        map.set("prostarsWebApp.pro.status.closeButton", null);
        this.dialogModal.open(
          "prostarsWebApp.pro.status.reviewTitle",
          "prostarsWebApp.pro.status.reviewMessage",
          map,
          true
        );
        break;
      }
      case 'REJECTED': {
        map.set("prostarsWebApp.pro.status.closeButton", null);
        this.dialogModal.open(
          "prostarsWebApp.pro.status.rejectTitle",
          "prostarsWebApp.pro.status.rejectMessage",
          map,
          false
        );
        break;
      }
      case 'REFERRAL_SENT': {
        map.set("prostarsWebApp.pro.status.closeButton", null);
        this.dialogModal.open(
          "prostarsWebApp.pro.status.notice",
          "prostarsWebApp.pro.status.isReferral",
          map,
          true
        );
        break;
      }
      case 'PROFILE_SETUP': {
        map.set("prostarsWebApp.pro.status.closeButton", null);
        this.dialogModal.open(
          "prostarsWebApp.pro.status.notice",
          "prostarsWebApp.pro.status.isExist",
          map,
          true
        );
        break;
      }
    }

  }

  showError() {
    this.isExisted = true;
  }

  close() {
    this.activeModal.dismiss();
  }

  resendAcceptedEmail(proEmail) {
    let me = this;
    let map = new Map<string, VoidFunction>();
    me.proService.resendAcceptedEmail(proEmail).subscribe(
      (res: Response) => {
        if (res) {
          if (res.status === 200) {
            map.set("prostarsWebApp.pro.status.closeButton", null);
            me.dialogModal.open(
              "prostarsWebApp.pro.summaryProfile.noticeTitle",
              "prostarsWebApp.pro.status.emailSentMessage",
              map,
              true
            );
            return status;
          }
          else {
            map.set("prostarsWebApp.pro.status.closeButton", null);
            me.dialogModal.open(
              "prostarsWebApp.pro.summaryProfile.error",
              "prostarsWebApp.pro.status.emailSendingError",
              map,
              true
            );
          }
        }
      }
    );
  }
}
