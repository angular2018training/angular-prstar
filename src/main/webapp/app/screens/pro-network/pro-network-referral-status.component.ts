import { DropDownItem } from './../../shared/model/dropdown-item.model';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ViewChild } from '@angular/core';
import { Principal, AccountService, Account } from '../../shared';
import { ProService } from './../../entities/pro/pro.service';
import { ProNetwork, ProNetworkItem } from './pro-network.model';
import { Referral } from './pro-referral.model';
import { ProNetworkService } from './pro-network.service';

@Component({
  selector: 'jhi-pro-network',
  templateUrl: './pro-network-referral-status.component.html',
  styles: []
})
export class ReferralStatusComponent implements OnInit {
  loginAccount: Account;
  referral: Referral;
  referralListInit: Referral[] = [];
  filteredReferralList: Referral[] = [];
  filterSettingValue: String;
  selectedFilter: any;
  filterData = [
    new DropDownItem(0, "ALL STATUS"),
    new DropDownItem(1, "Referral Sent"),
    new DropDownItem(2, "In Review"),
    new DropDownItem(3, "Accepted"),
    new DropDownItem(4, "Rejected"),
    new DropDownItem(5, "Profile Setup"),
  ];
  filterSettings = {
    singleSelection: true,
    disabled: false,
    // text: 'ALL STATUS',
    // selectAllText: 'Select All',
    // unSelectAllText: 'UnSelect All',
    enableSearchFilter: false,
    classes: 'myclass custom-class'
  };

  constructor(
    private proNetworkService: ProNetworkService,
    private proService: ProService,
    private principal: Principal,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    //get login user
    this.principal.identity().then((account) => {
      this.loginAccount = account;
    });

    this.proNetworkService.getListReferralStatus().subscribe(
      referralList => {
        referralList.forEach(item => {
          this.filteredReferralList.push({
            proName: item.proName,
            roleName: item.roleName,
            referralStatus: item.referralStatus
          });
        })
        this.referralListInit = this.filteredReferralList;
      }
    );

    this.selectedFilter = [
      this.filterData[0]
    ];
    }

  onFilterSelect(event){
    // updateFilter
    this.updateFilterValueText();
    // show data according to filter
    this.showDataBaseOnSetting();
  }

  updateFilterValueText() {
    let filterSettingIndex = 0;
    if (this.selectedFilter.length > 0) {
      filterSettingIndex = this.selectedFilter[0].id;
    }
    let filterLanguageKey = 'prostarsWebApp.pro.referrral.allStatus';
    switch (filterSettingIndex) {
      case 0: {
        filterLanguageKey = 'prostarsWebApp.pro.referral.allStatus';
        break;
      }

      case 1: {
        filterLanguageKey = 'prostarsWebApp.pro.referral.sent';
        break;
      }

      case 2: {
        filterLanguageKey = 'prostarsWebApp.pro.referral.inReview';
        break;
      }

      case 3: {
        filterLanguageKey = 'prostarsWebApp.pro.referral.accepted';
        break;
      }

      case 4: {
        filterLanguageKey = 'prostarsWebApp.pro.referral.rejected';
        break;
      }

      case 5: {
        filterLanguageKey = 'prostarsWebApp.pro.referral.profileSetup';
        break;
      }

      default: {
        filterLanguageKey = 'prostarsWebApp.pro.referral.allStatus';
        break;
      }

    }

    this.translateService.get(filterLanguageKey).subscribe((value) => {
      this.filterSettingValue = value;
    });
  }

  showDataBaseOnSetting() {
    let filterSettingIndex = 0;
    if (this.selectedFilter.length > 0) {
      filterSettingIndex = this.selectedFilter[0].id;
    }
    switch (filterSettingIndex) {
      case 0: {
        this.showAll();
        break;
      }

      case 1: {
        this.showReferralSent();
        break;
      }

      case 2: {
        this.showInReview();
        break;
      }

      case 3: {
        this.showAccepted();
        break;
      }

      case 4: {
        this.showRejected();
        break;
      }

      case 5: {
        this.showProfileSetup();
        break;
      }

      default: {
        this.showAll();
        break;
      }
    }
  }

  showAll(){
    this.filteredReferralList = this.referralListInit;
  }

  showReferralSent(){
    let me = this;
    this.filteredReferralList = [];
    this.referralListInit.forEach(function(item) {
      if (item.referralStatus == 'REFERRAL_SENT'){
        me.filteredReferralList.push({
          proName: item.proName,
          roleName: item.roleName,
          referralStatus: item.referralStatus
        });
      }
    });
  }

  showInReview(){
    let me = this;
    this.filteredReferralList = [];
    this.referralListInit.forEach(function(item) {
      if (item.referralStatus == 'IN_REVIEW'){
        me.filteredReferralList.push({
          proName: item.proName,
          roleName: item.roleName,
          referralStatus: item.referralStatus
        });
      }
    });
  }

  showAccepted(){
    let me = this;
    this.filteredReferralList = [];
    this.referralListInit.forEach(function(item) {
      if (item.referralStatus == 'ACCEPTED'){
        me.filteredReferralList.push({
          proName: item.proName,
          roleName: item.roleName,
          referralStatus: item.referralStatus
        });
      }
    });
  }

  showRejected(){
    let me = this;
    this.filteredReferralList = [];
    this.referralListInit.forEach(function(item) {
      if (item.referralStatus == 'REJECTED'){
        me.filteredReferralList.push({
          proName: item.proName,
          roleName: item.roleName,
          referralStatus: item.referralStatus
        });
      }
    });
  }

  showProfileSetup(){
    let me = this;
    this.filteredReferralList = [];
    this.referralListInit.forEach(function(item) {
      if (item.referralStatus == 'PROFILE_SETUP'){
        me.filteredReferralList.push({
          proName: item.proName,
          roleName: item.roleName,
          referralStatus: item.referralStatus
        });
      }
    });
  }
}
