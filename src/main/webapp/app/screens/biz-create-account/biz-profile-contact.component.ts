import { Component, OnInit } from '@angular/core';
import { DropDownItem } from '../../shared/model/dropdown-item.model';
import { Biz } from '../../entities/biz/biz.model';
import { BizService } from '../../entities/biz/biz.service';
import { UserService } from '../../shared';
import { AngularMultiSelectModule } from './../../shared/angular2-multiselect-dropdown-custom/angular2-multiselect-dropdown';
import { TitlePrefixService } from '../../entities/title-prefix/title-prefix.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TitlePrefix } from '../../entities/title-prefix/title-prefix.model';
import { Address } from '../../shared/model/address';
import { PhoneService } from '../../entities/phone';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BizProfileModalService } from './biz-profile-modal.service';
import { MessengerService } from '../shared/messenger.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-biz-profile-contact',
  templateUrl: './biz-profile-contact.component.html',
  styles: []
})
export class BizProfileContactComponent implements OnInit {
  biz: any;
  address: Address;
  doNotMatch: boolean;
  errorEmailExists: boolean;
  dropdownPrefixList = [];
  selectedPrefix = null;
  selectedPhoneType = [];
  selectedPhoneNumber = "";
  dropdownPrefixSettings;
  dropdownPhoneTypeSettings;
  dropdownPhoneTypeList: any[];
  phoneForm;
  addMorePhone = false;
  captchaResponse: any;
  readyToNextStep: boolean;
  subBizProfile = false;
  companyName = "";


  constructor(
    private userService: UserService,
    private bizService: BizService,
    private titlePrefixService: TitlePrefixService,
    private phoneService: PhoneService,
    private router: Router,
    private route: ActivatedRoute,
    private messengerService: MessengerService,
    private modalService: BizProfileModalService
  ) { }

  ngOnInit() {
    this.bizService.resetData();
    
    // subBizEmail=tran@taytran04.cybersoft.vn
    // Get the sub biz email and display on email field, and after that update to DB, not create new user
    this.route.queryParams.subscribe((params) => {
      if(params['subBizEmail']) {
        this.subBizProfile = true;
        this.bizService.biz.user.login = params['subBizEmail'];
        // Call back-end
        this.bizService.findByBizUser(params['subBizEmail'])
        .subscribe((bizResponse: HttpResponse<Biz>) => {
          this.companyName = bizResponse.body.companyName;  
        });
      }
    });
    this.biz = this.bizService.biz;
    this.readyToNextStep = false;
    
    
    //this.bizService.biz.user.phones = this.selectedPhoneType;
    // this.titlePrefixService.query().subscribe(
    //   (res: HttpResponse<TitlePrefix[]>) => {
    //     // fill Prefix list to GUI
    //     this.dropdownPrefixList = res.body.map(
    //       (item) =>
    //         new DropDownItem(item.id, item.name)
    //     );
    //   },
    //   (res: HttpErrorResponse) => this.onError(res.message)
    // );
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
      text: 'select',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    // creating FormGroup for Phone
    // this.phoneForm = new FormGroup({
    //   phoneType: new FormArray([
    //     new FormControl(null),
    //     new FormControl(null)
    //   ]),
    //   phoneNumber: new FormArray([
    //     new FormControl(null)
    //   ])
    // });
    
        
    
  }
  ngAfterViewInit() {
    this.messengerService.stepChange(1);
  }



  onError(msg) {

  }

  submit() {
    this.validatePassword();
    this.userService.validateEmail(this.bizService.biz.user.login).subscribe((result) => {
      this.errorEmailExists = !result;
      if (!(this.errorEmailExists && !this.subBizProfile) && !this.doNotMatch) {
        this.onNext();
      }
    });
  }

  onNext() {
    this.storePrefixData();
    this.storePhoneTypeData();

    this.bizService.biz.user.email = this.bizService.biz.user.login;
    if (this.address) {
      this.bizService.biz.user.street = this.address.streetNumber + ' ' + this.address.streetName;
      this.bizService.biz.user.city.name = this.address.city;
      this.bizService.biz.user.city.state.name = this.address.state;
      this.bizService.biz.user.latitude = this.address.latitude;
      this.bizService.biz.user.longitude = this.address.longitude;
    }
    this.biz = this.bizService.biz;
    for (let phone of this.biz.user.phones) {
      if (phone.type[0]) {
        phone.type = phone.type[0].itemName;
        if (phone.type === 'Home') {
          phone.type = 'HOME';
        }
        if (phone.type === 'Office') {
          phone.type = 'OFFICE';
        }
        if (phone.type === 'Cell') {
          phone.type = 'CELL';
        }
        if (phone.type === 'Other') {
          phone.type = 'OTHER';
        }
      }
    }
    // update skill list as server model
    // for (let i = 0; i < this.proService.pro.skills.length; i++) {
    //   this.proService.pro.skills[i].skill = this.proService.pro.skills[i].skill[0];
    // }
    if (this.subBizProfile) {
      // Update current user info (of the sub Biz)
      this.subscribeToSaveResponse(
          this.userService.update(this.biz.user));
    } else {
      // Create new biz company
      this.subscribeToSaveResponse(
          //this.bizService.create(this.bizService.biz));
          this.bizService.create(this.biz));
    }
    // restore back to normal
    // for (let i = 0; i < this.proService.pro.skills.length; i++) {
    //   let val = this.proService.pro.skills[i];
    //   if (!(val instanceof Array)) {
    //     val.skill = [this.proService.pro.skills[i].skill];
    //   }
    // }

    // this.router.navigate(['pro-create-summary/pro-summary-profile-skill']);


  }

  onAddMorePhone() {
    // this.phoneForm.controls.phoneType.push(new FormControl(null));
    // this.phoneForm.controls.phoneNumber.push(new FormControl(null));
    if (this.bizService.biz.user.phones.length < 4) {
      this.bizService.biz.user.phones.push( {
          type: [new DropDownItem(3, "Cell")],
          number: "",
          
        });
    }
  }

  onRemovePhone(index) {
    // this.phoneForm.controls['phoneType'].removeAt(index);
    // this.phoneForm.controls['phoneNumber'].removeAt(index);
    this.bizService.biz.user.phones.splice(index, 1);
  }

  storePrefixData() {
    this.bizService.biz.user.titlePrefix = this.selectedPrefix ? this.selectedPrefix[0].itemName : null;
    
    if (this.bizService.biz.user.titlePrefix === 'Mr.') {
      this.bizService.biz.user.titlePrefix = 'MR';
    } else if (this.bizService.biz.user.titlePrefix === 'Mrs.') {
      this.bizService.biz.user.titlePrefix = 'MRS';
    } else if (this.bizService.biz.user.titlePrefix === 'Miss') {
      this.bizService.biz.user.titlePrefix = 'MISS';
    } else {
      this.bizService.biz.user.titlePrefix = 'DR';
    }
  }

  storePhoneTypeData() {
    // this.biz.phoneType = this.phoneForm.value
    // this.bizService.biz.user.phones = this.phoneForm.value;
  }

  validateEmail() {
    console.log(this.bizService.biz.user.login);
    this.userService.validateEmail(this.bizService.biz.user.login).subscribe((result) => {
      this.errorEmailExists = !result;
    });
  }

  validatePassword() {
    this.doNotMatch = this.bizService.biz.user.password !== this.bizService.biz.user.confirmPassword;
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.captchaResponse = captchaResponse;
    if (captchaResponse) {
      this.readyToNextStep = true;
    } else {
      this.readyToNextStep = false;
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Biz>>) {
    result.subscribe((res: HttpResponse<Biz>) =>
      this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: Biz) {
    this.bizService.error = false;
    this.modalService.open(false, ()=>{
      this.bizService.resetData();
    });
    
  }

  private onSaveError() {
    this.bizService.error = true;
    this.modalService.open(false, ()=>{});
  }
}
