import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Pro } from './../../entities/pro/pro.model';
import { VettingModel, Decision } from './vetting.model';
import { ProService } from './../../entities/pro/pro.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { VettingService } from './vetting.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Principal, AccountService, Account } from '../../shared';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';
import { TranslateService } from '@ngx-translate/core/src/translate.service';
declare var window: any;
@Component({
  selector: 'jhi-vetting',
  templateUrl: './vetting.component.html',
  styles: []
})

export class VettingComponent implements OnInit, AfterViewInit {
  constructor(
    private proService: ProService,
    private vettingService: VettingService,
    private principal: Principal,
    private modalService: NgbModal,
    private translateService: TranslateService
  ) { }

  //Define the variables for applicant
  //lstApplicants: Pro[];
  lstVettings: VettingModel[] = [];
  lstVettingsInit: VettingModel[] = [];
  lstReadyCount: number = 0;
  loginAccount: Account;
  modalRef: NgbModalRef;
  tpmIndex: number;
  isOpen = false;

  selectedApplicant: Pro;
  decision: string;

  ngOnInit() {
    //get login user
    this.principal.identity().then((account) => {
      this.loginAccount = account;
    let keyWord = 'prostarsWebApp.vetChangeLog.tip';
    this.translateService.get(keyWord).subscribe((value) => {
    window.showTooltip(value)});
    });

    //Redirect to login screen in case is not login

    //get all pros (include submitted pros & non-submitted pros)
    this.proService.getAllPros().subscribe(
      (res: HttpResponse<Pro[]>) => {
        //this.lstApplicants = res.body;
        res.body.forEach(item => {
          this.lstVettings.push({
            applicantId: item.id,
            applicant: item,
            isReady: false,
            decision: item.decision
          });
        });
        this.lstVettingsInit = this.lstVettings;
      },
    );

  }

  ngAfterViewInit() {
    this.initTooltip('#tooltip-inform');    
  }

  initTooltip(id){
    window.initTooltip(id);
  }

  openDialog(i) {
    this.tpmIndex = i;
    this.modalRef = this.open(this.lstVettings[i].applicant);
  }

  open(pro): NgbModalRef {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef = this.modalService.open(ApplicantDetailComponent, { size: 'lg' });
    modalRef.componentInstance.pro = pro;
    modalRef.result.then((result) => {
      this.isOpen = false;
      if (result == 1) {
        //Approve
        this.makeDecision(this.tpmIndex, 2);
      } else {
        //Reject
        if (result == 2) {
          this.makeDecision(this.tpmIndex, 0);
        }
      }
    }, (reason) => {
      this.isOpen = false;
    });
    return modalRef;
  }

  filterPro(id: any) {
    this.lstVettings = this.lstVettingsInit;
    let lstVettingsTmp: VettingModel[];
    //All status
    if (id == 0) {
      return;
    }
    //Waiting decision
    if (id == 1) {
      lstVettingsTmp = [];
      this.lstVettings.forEach(item => {
        if (item.decision === Decision.AWAITING) {
          lstVettingsTmp.push(item);
        }
      });
      this.lstVettings = lstVettingsTmp;
    }

    //Ready to inform applicant
    if (id == 2) {
      lstVettingsTmp = [];
      this.lstVettings.forEach(item => {
        if (item.isReady == true) {
          lstVettingsTmp.push(item);
        }
      });
      this.lstVettings = lstVettingsTmp;
    }
  }
  makeDecision(index: any, id: any) {
    //Yes option
    if (id == 2) {
      this.lstVettings[index].isReady = true;
      this.lstVettings[index].decision = Decision.YES;
      this.lstVettings[index].veterId = this.loginAccount.id;
      //Setting for displaying on GUI
      this.lstVettings[index].decisionOption = 2;
      
      this.lstReadyCount += 1;
    }
    //Awaiting option
    if (id == 1) {
      this.lstVettings[index].isReady = false;
      this.lstVettings[index].decision = Decision.AWAITING;
      //Setting for displaying on GUI
      this.lstVettings[index].decisionOption = 1;
      this.lstReadyCount -= 1;
    }
    //No option
    if (id == 0) {
      this.lstVettings[index].isReady = true;
      this.lstVettings[index].decision = Decision.NO;
      this.lstVettings[index].veterId = this.loginAccount.id;
      //Setting for displaying on GUI
      this.lstVettings[index].decisionOption = 0;
      this.lstReadyCount += 1;
    }
  }

  submitDecision() {
    this.lstVettings.forEach(item => {
      if (item.isReady) {
        this.vettingService.create(item).subscribe(
          (res: HttpResponse<any>) => this.onSaveSuccess(res.body, item),
          (res: HttpErrorResponse) => this.onSaveError(res)
        );
      }
    });
  }

  private onSaveSuccess(result: any, item: VettingModel) {
    item.isReady = false;
    item.applicant.decision = item.decision;
    this.lstReadyCount -= 1;
  }

  private onSaveError(error) {
    console.log(error)
  }
}