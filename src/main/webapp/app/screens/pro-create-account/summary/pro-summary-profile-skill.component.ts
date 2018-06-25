import { MessengerService } from './../../shared/messenger.service';
import { DropDownItem } from './../../../shared/model/dropdown-item.model';
import { ProService } from './../../../entities/pro/pro.service';
import { MasterService } from './../../../shared/master/master.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Location } from '@angular/common';

@Component({
  selector: 'jhi-pro-summary-profile-skill',
  templateUrl: './pro-summary-profile-skill.component.html',
  styles: []
})
export class ProSummaryProfileSkillComponent implements OnInit {

  readonly MAX_SKILL_NUM = 10;

  // For role mutli select
  dropdownRoleList = [];
  selectedRoles = [];
  dropdownRoleSettings = {};
  errorList = [];

  // For skill dropdown list
  // dropdownSkillList = [];
  selectedSkills = [];

  constructor(
   private router: Router,
   private masterService: MasterService,
   private proService: ProService,
   private jhiAlertService: JhiAlertService,
   private location: Location,
   private messengerService: MessengerService
  ) { }

  ngOnInit() {
    // load roles list to GUI
    this.selectedRoles = this.proService.pro.roles.map(
      (item) => new DropDownItem(item.role.id, item.role.name)
    );

    // for (let i = 0; i< this.proService.pro.skills.length; i++) {
    //   let val = this.proService.pro.skills[i];
    //   if (!(val instanceof Array)) {
    //     val.skill = [this.proService.pro.skills[i].skill];
    //   }
    // }

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

  ngAfterViewInit() {
    this.messengerService.stepChange(3);
  }

  private onError(error) {
    this.jhiAlertService.error(error.message, null, null);
  }

  onNext() {
    if(this.validData()){
      this.router.navigate(['pro-create-summary/pro-summary-profile-summary']);
    }
    
  }

  onBack() {
    //this.location.back();
    this.router.navigate(['pro-create-summary/pro-summary-bio']);
  }
  validData() : boolean {
    this.errorList = [];
    if (this.proService.pro.skills.length === 0) {
      this.errorList.push("Please select skills");
    }
    return this.errorList.length === 0;
  }

}
