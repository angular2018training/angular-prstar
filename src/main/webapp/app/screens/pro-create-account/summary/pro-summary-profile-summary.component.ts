import { Pro } from './../../../entities/pro/pro.model';
import { DropDownItem } from './../../../shared/model/dropdown-item.model';
import { ProService } from './../../../entities/pro/pro.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ModalDialogService } from '../../../shared/dialog/modal-dialog.service';

@Component({
  selector: 'jhi-pro-summary-profile-summary',
  templateUrl: './pro-summary-profile-summary.component.html',
  styles: []
})
export class ProSummaryProfileSummaryComponent implements OnInit {

    // For role mutli select
    dropdownRoleList = [];
    selectedRoles = [];
    dropdownRoleSettings = {};

    // For skill dropdown list
    dropdownSkillList = [];
    // selectedSkills = [];
    dropdownSkillSettings = {};

  constructor(
      private proService: ProService,
      private location: Location,
      private router: Router,
      private modalDialog: ModalDialogService
    ) { }

  ngOnInit() {
    // load roles list to GUI
    this.selectedRoles = this.proService.pro.roles.map(
      (item) => new DropDownItem(item.role.id, item.role.name)
    );

    // init setting for role list
    this.dropdownRoleSettings = {
      singleSelection: false,
      disabled: true,
      text: 'Python Developer',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }

  onBack() {
    this.location.back();
  }

  confirm() {
    this.proService.pro.account.email = this.proService.pro.account.login;
    // update skill list as server model
    // for (let i = 0; i < this.proService.pro.skills.length; i++) {
    //   this.proService.pro.skills[i].skill = this.proService.pro.skills[i].skill[0];
    // }
    this.proService.pro.jwtToken = null;
    this.subscribeToSaveResponse(
        this.proService.updateSummary(this.proService.pro));

    // restore back to normal
    // for (let i = 0; i < this.proService.pro.skills.length; i++) {
    //   let val = this.proService.pro.skills[i];
    //   if (!(val instanceof Array)) {
    //     val.skill = [this.proService.pro.skills[i].skill];
    //   }
    // }
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
      me.goToHome(me);
    });
    this.modalDialog.open(
      "prostarsWebApp.pro.summaryProfile.successTitle", 
      "prostarsWebApp.pro.summaryProfile.successMessage", 
      map, 
      true);
  }

  private onSaveError() {
    this.proService.error = true;

    //modal dialog
    let map = new Map<string, VoidFunction>();
    map.set("prostarsWebApp.pro.summaryProfile.buttonClose",null);
    this.modalDialog.open(
      "prostarsWebApp.pro.summaryProfile.errorMessage", 
      "prostarsWebApp.pro.summaryProfile.errorMessage", 
      map, 
      false);
  }

  //function(s) for modal dialog
  goToHome(me) {
    me.router.navigate(['/']);
  }
}
