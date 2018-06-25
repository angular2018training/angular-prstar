import { Router } from '@angular/router';
import { DropDownItem } from './../../../shared/model/dropdown-item.model';
import { Pro } from './../../../entities/pro/pro.model';
import { ProService } from './../../../entities/pro/pro.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MessengerService } from '../../shared/messenger.service';
import { element } from 'protractor';
import { TranslateService } from '@ngx-translate/core/src/translate.service';
declare var window: any;

@Component({
  selector: 'jhi-pro-detail-bio-skill',
  templateUrl: './pro-detail-bio-skill.component.html',
  styles: []
})
export class ProDetailBioSkillComponent implements OnInit {

  bioSkillData;
  errorList = [];
  allRoleList = [];

  constructor(
    private location: Location, 
    private router: Router,
    private proService: ProService,
    private messengerService: MessengerService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.bioSkillData = this.proService.bioSkillData;
  }

  ngAfterViewInit() {
    this.messengerService.stepChange(2);
    this.updateRoleTooltip();
  }

  onSelectedRoleChange() {
    this.updateRoleTooltip();
  }

  onAllRoleListLoad(roleList) {
    this.allRoleList = roleList;
    this.updateRoleTooltip();
  }

  updateRoleTooltip() {
    // filter selected role list
    let selectedRoleList = [];
    this.allRoleList.forEach(item => {
        this.bioSkillData.selectedRoles.forEach(roleDropdownItem => {
          if (roleDropdownItem.id === item.id) {
            selectedRoleList.push(item);
          }
        });
    });
    
    let keyWord = 'prostarsWebApp.pro.status.toolTipRateRole';
    this.translateService.get(keyWord).subscribe((value) => {
    window.showTooltip(value)});
  }

  onNext() {
    if (this.validData()) {
      this.router.navigate(['/pro-create-detail/summary']);
    }
  }

  validData() : boolean {
    this.errorList = [];
    if (this.bioSkillData.selectedRoles.length === 0) {
      this.errorList.push("Please select roles");
    }
    if (!this.bioSkillData.summaryBio) {
      this.errorList.push("Please select summary bio");
    }
    this.bioSkillData.selectedRoles.forEach(item=>{
      if(!item.lowRate)
      {
        this.errorList.push("Please select low rate for " + item.itemName);
      }
      if(!item.highRate)
      {
        this.errorList.push("Please select high rate for " + item.itemName);
      }

    })
    if (this.bioSkillData.skills.length === 0) {
      this.errorList.push("Please select skills");
    }
    return this.errorList.length === 0;
  }

  onBack() {
    this.location.back();
  }

}
