import { LoginService } from './../../../shared/login/login.service';
import { Pro } from './../../../entities/pro/pro.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Address } from './../../../shared/model/address';
import { TitlePrefix } from './../../../entities/title-prefix/title-prefix.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TitlePrefixService } from './../../../entities/title-prefix/title-prefix.service';
import { DropDownItem } from './../../../shared/model/dropdown-item.model';
import { Component, OnInit } from '@angular/core';
import { ProService } from '../../../entities/pro';
import { MessengerService } from '../../shared/messenger.service';

@Component({
  selector: 'jhi-pro-detail-contact',
  templateUrl: './pro-detail-contact.component.html',
  styles: []
})
export class ProDetailContactComponent implements OnInit {

  contactData;

  dropdownPrefixList = [];
  dropdownPrefixSettings;
  dropdownPhoneTypeList = [];
  dropdownPhoneTypeSettings;
  
  errorList = [];

  captchaResponse;

  constructor(
    private route: ActivatedRoute,
    private proService: ProService,
    private router: Router,
    private titlePrefixService: TitlePrefixService,
    private messengerService: MessengerService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
    let activationKey = params['activation_key'];
    if (!this.proService.pro.id) {
      this.proService.findByActivationKey(activationKey).subscribe(
        (res: HttpResponse<Pro>) => {
          this.proService.pro = res.body;
          this.proService.mapDataToGUI();
          // login with JWT
          this.loginService.loginWithToken(this.proService.pro.jwtToken.id_token, true)
          .then(() => {
            this.proService.pro.jwtToken = null;
          });
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    }
  });

    this.contactData = this.proService.contactData;

    this.dropdownPrefixList = [
      new DropDownItem(1, 'Mr.'),
      new DropDownItem(2, 'Mrs.'),
      new DropDownItem(3, 'Miss'),
      new DropDownItem(4, 'Dr.')
    ];

    this.dropdownPrefixSettings = {
      singleSelection: true,
      disabled: false,
      text: 'Prefix',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

    // PHONE TYPE
    this.dropdownPhoneTypeList = [
      new DropDownItem(1, "Home"),
      new DropDownItem(2, "Office"),
      new DropDownItem(3, "Cell"),
      new DropDownItem(4, "Other"),
    ]
    this.dropdownPhoneTypeSettings = {
      singleSelection: true,
      disabled: false,
      text: 'Select',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }

  ngAfterViewInit() {
    this.messengerService.stepChange(1);
  }

  onError(msg) {
    console.log(msg);
  }

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

  onNext() {
    console.log("onNext");
    if (this.validData()) {
      this.router.navigate(['/pro-create-detail/background']);
    }
  }

  validData() : boolean {
    this.errorList = [];
    // if (!this.contactData.user.selectedPrefix) {
    //   this.errorList.push("Please select prefix");
    // }
    if (!this.contactData.user.firstName) {
      this.errorList.push("Please input first name");
    }
    if (!this.contactData.user.lastName) {
      this.errorList.push("Please input first name");
    }
    // if (!this.contactData.user.titleSuffix) {
    //   this.errorList.push("Please input suffix");
    // }
    if (this.isEmptyAddress()) {
      this.errorList.push("Please input address");
    }
    if (this.contactData.phoneList.length === 0) {
      this.errorList.push("Please input phone numbers");
    }
    let missingPhoneType = false;
    let missingPhoneNumber = false;
    this.contactData.phoneList.forEach(element => {
      if (element.selectedPhoneType.length === 0) {
        missingPhoneType = true;
      }
      if (!element.phoneNumber) {
        missingPhoneNumber = true;
      }
    });
    if (missingPhoneType) {
      this.errorList.push("Please input phone type");
    }
    if (missingPhoneNumber) {
      this.errorList.push("Please input phone number");
    }
    
    return this.errorList.length === 0;
  }

  isEmptyAddress() {
    let address = this.contactData.address;
    return !address.streetNumber && !address.streetName && !address.city 
        && !address.state && !address.zipCode && !address.country;
  }

  onRemovePhone(index) {
    this.contactData.phoneList.splice(index, 1);
  }

  onAddMorePhone() {
    this.contactData.phoneList.push({
      selectedPhoneType: [new DropDownItem(3, "Cell")],
      phoneNumber: ""
    });
  }

}
