import { ProRole } from './../../../shared/master/master.model';
import { MessengerService } from './../../shared/messenger.service';
import { Role } from './../../../shared/role/role.model';
import { DropDownItem } from './../../../shared/model/dropdown-item.model';
import { ProService } from './../../../entities/pro/pro.service';
import { Pro } from './../../../entities/pro/pro.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { LoginService } from "../../../shared/login/login.service";

@Component({
  selector: 'jhi-pro-summary-bio',
  templateUrl: './pro-summary-bio.component.html',
  styles: []
})

export class ProSummaryBioComponent implements OnInit {
  pro: Pro;
  selectedRoles = [];
  dropdownRoleList = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private location: Location,
    private proService: ProService,
    private messengerService: MessengerService
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
    console.log('activationKey: ' + params['activation_key']);
    if (params['activation_key']) {
      // find pro by activation key
      this.proService.findBySummaryActivationKey(params['activation_key']).subscribe(
        (proResponse: HttpResponse<Pro>) => {
            this.proService.pro = proResponse.body;
            this.pro = this.proService.pro;
            this.selectedRoles = this.pro.roles.map(
              (item) => new DropDownItem(item.role.id, item.role.name)
            );
            this.router.navigate(['/pro-create-summary/pro-summary-bio']);
      });
    } else {
      this.pro = this.proService.pro;
      this.selectedRoles = this.pro.roles.map(
        (item) => new DropDownItem(item.role.id, item.role.name)
      );
    }

  });
  }

  ngAfterViewInit() {
    this.messengerService.stepChange(2);
  }

  storeRoleData() {
    this.pro.roles = this.selectedRoles.map((dropdownRoleItem) => {
        let role = new Role(dropdownRoleItem.id, dropdownRoleItem.itemName)
        let proRole = new ProRole();
        proRole.role = role;
        return proRole;
      }
    );
  }

  onNext() {
    // store role data
    this.storeRoleData();
    this.proService.pro = this.pro;
    this.router.navigate(['pro-create-summary/pro-summary-profile-skill']);
  }

  onBack() {
    // store role data
    this.storeRoleData();
    this.location.back();
  }

  onError(error) {

  }
}
