import { Observable } from 'rxjs/Observable';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Pro } from './../../../entities/pro/pro.model';
import { ProService } from './../../../entities/pro/pro.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MessengerService } from '../../shared/messenger.service';
import { ModalDialogComponent } from '../../../shared/dialog/modal-dialog.component';
import { ModalDialogService } from '../../../shared/dialog/modal-dialog.service';

@Component({
  selector: 'jhi-pro-detail-summary',
  templateUrl: './pro-detail-summary.component.html',
  styles: []
})
export class ProDetailSummaryComponent implements OnInit {

  contactData;
  backgroundData;
  bioSkillData;

  constructor(
    private proService: ProService,
    private location: Location,
    private router: Router,
    private messengerService: MessengerService,
    private modalDialog: ModalDialogService
  ) { }

  ngOnInit() {
    this.contactData = this.proService.contactData;
    this.backgroundData = this.proService.backgroundData;
    this.bioSkillData = this.proService.bioSkillData;
  }

  ngAfterViewInit() {
    this.messengerService.stepChange(3);
  }

  onRevise() {
    this.router.navigate(['/pro-create-detail/']);
  }

  onSubmit() {
    this.proService.mapGUIDataToDTO();
    this.subscribeToSaveResponse(
      this.proService.updateDetail(this.proService.pro));
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Pro>>) {
    result.subscribe((res: HttpResponse<Pro>) =>
        this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: Pro) {
    this.proService.error = false;
    
    //modal dialog
    let me = this;
    let map = new Map<string, VoidFunction>();
    map.set("prostarsWebApp.pro.summaryProfile.buttonClose", function() {
      me.goToDashboard(me);
    });
    this.modalDialog.open(
      "prostarsWebApp.pro.summaryProfile.successTitle", 
      "prostarsWebApp.pro.detailProfile.successMessage", 
      map, 
      true);

    this.proService.resetData();
  }

  private onSaveError() {
    this.proService.error = true;
    
    // modal dialog
    let map = new Map<string, VoidFunction>();
    map.set("prostarsWebApp.pro.summaryProfile.buttonClose",null);
    this.modalDialog.open(
      "prostarsWebApp.pro.summaryProfile.errorMessage", 
      "prostarsWebApp.pro.summaryProfile.errorMessage", 
      map, 
      false);
  }

  //function(s) for modal dialog
  goToDashboard(me) {
    me.router.navigate(['/dashboard']);
  }
}
