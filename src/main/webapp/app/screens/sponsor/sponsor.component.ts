import { JhiAlertService } from 'ng-jhipster';
import { ProService } from './../../entities/pro/pro.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Invitee } from '../../entities/invitee/invitee.model';
import { InviteeService } from '../../entities/invitee/invitee.service';
declare var window: any;

@Component({
  selector: 'jhi-sponsor',
  templateUrl: './sponsor.component.html',
  styles: []
})
export class SponsorComponent implements OnInit {
@ViewChild("success") MyPropSuccess: ElementRef;
@ViewChild("notAgree") MyPropError: ElementRef;
@ViewChild("applied") MyPropApplied: ElementRef;
@ViewChild("already") MyPropAlready: ElementRef;
@ViewChild("invited") MyPropInvited: ElementRef;
@ViewChild('sponsorForm') sponsorForm: NgForm;


success: string;
agree: boolean = false;
doNotAgree: string;
invitee: Invitee = {};
decision: String;

    constructor(
        private inviteeService: InviteeService,
        private proService: ProService,
        private jhiAlertService: JhiAlertService
    ) { }

    ngOnInit() {
        this.agree = false;
    }

    checkEmailStatus() {
        this.proService.getReferralStatus(this.invitee.email).subscribe(response => {
            this.decision = response;
            if (this.decision === 'IN_REVIEW' || this.decision === 'REJECTED') {
                setTimeout(() => {
                    this.MyPropApplied.nativeElement.scrollIntoView(true);
                    window.scrollBy(0, -100);
                }, 50);
            }
            if (this.decision === 'ACCEPTED' || this.decision === 'PROFILE_SETUP') {
                setTimeout(() => {
                    this.MyPropAlready.nativeElement.scrollIntoView(true);
                    window.scrollBy(0, -100);
                }, 50);
            }
            if (this.decision === 'REFERRAL_SENT') {
                setTimeout(() => {
                    this.MyPropInvited.nativeElement.scrollIntoView(true);
                    window.scrollBy(0, -100);
                }, 50);
            }
        }, (res: HttpErrorResponse) => {
            this.decision = '';
            this.jhiAlertService.error(res.statusText, null, null);
        });
    }

    save() {
        this.doNotAgree = null;
        if (this.agree === false) {
            this.doNotAgree = 'ERROR';
            setTimeout(() => {
                this.MyPropError.nativeElement.scrollIntoView(true);
                window.scrollBy(0, -100);
            }, 50);
        } else {
            if (this.invitee.id !== undefined) {
                this.subscribeToSaveResponse(
                    this.inviteeService.update(this.invitee));
            } else {
                this.subscribeToSaveResponse(
                    this.inviteeService.create(this.invitee));
            }
        }
        
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Invitee>>) {
        result.subscribe((res: HttpResponse<Invitee>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Invitee) {
        this.success = 'OK';
        setTimeout(() => {
            this.success = null;
         }, 3000);
         setTimeout(() => {
            this.MyPropSuccess.nativeElement.scrollIntoView(true);
            window.scrollBy(0, -100);
        }, 50);
        this.agree = false;
        this.resetData();
    }

    private onSaveError() {
        this.success = null;
    }

    private resetData(){
        this.sponsorForm.reset();
    }
}