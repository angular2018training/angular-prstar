import { element } from 'protractor';
import { CompanySize } from './../../entities/company-size/company-size.model';
import { DropDownItem } from './../../shared/model/dropdown-item.model';
import { Industry } from './../../entities/industry/industry.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CompanySizeService } from './../../entities/company-size/company-size.service';
import { IndustryService } from './../../entities/industry/industry.service';
import { JhiDataUtils } from 'ng-jhipster';
import { ResourceNeed } from './resource-need.model';
import { Address } from './../../shared/model/address';
import { BizService } from '../../entities/biz/biz.service';
import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../shared/messenger.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Biz } from '../../entities/biz/biz.model';
import { BizProfileModalService } from './biz-profile-modal.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from "../../shared/login/login.service";
import { File } from './../../entities/file';
import { FILE_SIZE } from '../../app.constants';
declare var window: any;

@Component({
  selector: 'jhi-biz-profile-company-bio',
  templateUrl: './biz-profile-company-bio.component.html',
  styleUrls: ["./biz-profile-company-bio.component.scss"]
})
export class BizProfileCompanyBioComponent implements OnInit {

  dropdownCompanySizeSettings;
  dropdownIndustrySettings;
  dropdownDelegateSettings;
  dropdownIndustryList = [];
  dropdownCompanySizeList = [];
  dropdownDelegateList = [];
  selectedIndustry = [];
  selectedCompanySize = [];
  selectedDelegate = [];
  delegateCheckbox = false;
  hqAddress: Address;
  resourceNeedList = [
    new ResourceNeed(),
    new ResourceNeed(),
    new ResourceNeed()
  ];
  companyName = "";
  website = "";
  companyBio = "";
  companyLogoFile: File;
  companyBioDelegate = false;
  validateLogoFile = {
    isNotImage: false,
    isOverSize: false
  };
  

  constructor(
    private bizService: BizService,
    private industryService: IndustryService,
    private companySizeService: CompanySizeService,
    private dataUtils: JhiDataUtils,
    private messengerService: MessengerService,
    private router: Router,
    private modalService: BizProfileModalService,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['activation_key']) {
        this.bizService.activationKey = params['activation_key'];
        if (this.bizService.activationKey) {
         this.bizService.findByActivationKey(this.bizService.activationKey)
          .subscribe((bizResponse: HttpResponse<Biz>) => {
            this.bizService.biz = bizResponse.body;
                      console.log('biz: ' + this.bizService.biz.user);
                      // login with JWT
                      this.loginService.loginWithToken(this.bizService.biz.jwtToken.id_token, true)
                        .then(() => {
                          this.bizService.biz.jwtToken = null;
                          this.bizService.companyBioDelegate = true;
                          // Go to company-bio screen after forcing log in
                          this.router.navigate(['biz-profile/company-bio']);
                        });
            });
          }
      }
    });
    // init setting for industry list
    this.dropdownIndustrySettings = {
      singleSelection: false,
      text: 'Industries served',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

    // init setting for company size list
    this.dropdownCompanySizeSettings = {
      singleSelection: true,
      text: 'Number of employees',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

    // init setting for delegate list
    this.dropdownDelegateSettings = {
      singleSelection: true,
      text: 'Role Contact',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

    // TODO: set delegate list from wf 1.21
    this.bizService.biz.bizUsers.forEach((item, index) => {
      this.dropdownDelegateList.push(new DropDownItem(index, item.user.login));
    });
    // this.dropdownDelegateList = this.bizService.biz.users;

    // load industry list
    this.industryService.query().subscribe(
      (res: HttpResponse<Industry[]>) => {
        // fill role list to GUI
        this.dropdownIndustryList = res.body.map(
          (item) =>
            new DropDownItem(item.id, item.name)
        );
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );

    // load company size list
    // this.companySizeService.query().subscribe(
    //   (res: HttpResponse<CompanySize[]>) => {
    //     // fill role list to GUI
    //     this.dropdownCompanySizeList = res.body.map(
    //       (item) =>
    //         new DropDownItem(item.id, item.sizeValue)
    //     );
    //   },
    //   (res: HttpErrorResponse) => this.onError(res.message)
    // );
    
    this.dropdownCompanySizeList = [
      new DropDownItem(1, '<10'),
      new DropDownItem(2, '11-50'),
      new DropDownItem(3, '51-200'),
      new DropDownItem(4, '201-500'),
      new DropDownItem(5, '501+')
    ];

    this.initInputtedCompanyData();
  }

  ngAfterViewInit() {
    this.messengerService.stepChange(2);
    this.showToolTip('#tooltip-bill-rate');
  }

  showToolTip(id) {
    window.showTooltip(id);
  }

  onError(msg): any {
    console.log("Error: " + msg);
  }

  addResourceNeed() {
    this.resourceNeedList.push(new ResourceNeed());
  }

  setLogoData(event) {
    if (event && event.target.files && event.target.files[0]) {
      this.validateLogoFile.isNotImage = false;
      this.validateLogoFile.isOverSize = false;
      const file = event.target.files[0];
      if (!/^image\//.test(file.type)) {
        this.validateLogoFile.isNotImage = true;
        return;
      }
      if (file.size > FILE_SIZE) {
        this.validateLogoFile.isOverSize = true;
        return;
      }
      this.dataUtils.toBase64(file, (base64Data) => {
          this.companyLogoFile = new File();
          this.companyLogoFile.content = base64Data;
          this.companyLogoFile.contentType = file.type;
          this.companyLogoFile.name = file.name;
      });
    }
  }

  isValidData(): boolean {
    // Biz admin use delegate feature (not under delegation)
    if ((this.delegateCheckbox && this.selectedDelegate.length > 0)
        || this.bizService.delegationType1 == true) {
      return true;
    }

    if (this.companyName && this.website && this.hqAddress && this.companyBio && this.companyLogoFile && this.companyLogoFile.content
      && this.selectedIndustry.length > 0 && this.selectedCompanySize.length > 0
    ) {
      return true;
    }
    return false;
  }

  stringifyAddress(address: Address) {
    var resultString = '';
    if (address.streetNumber !== undefined) {
      resultString += address.streetNumber;
    }
    if (address.streetName !== undefined) {
     resultString += ' ' + address.streetName + ',';
    }
    if (address.city !== undefined) {
     resultString += ' ' + address.city + ',';
    }
    if (address.state !== undefined) {
     resultString += ' ' + address.state + ',';
    }
    if (address.zipCode !== undefined) {
     resultString += ' ' + address.zipCode + ',';
    }
    if (address.country !== undefined) {
     resultString += ' ' + address.country + ',';
    }
    if (resultString.startsWith(' ')) {
      
      resultString = resultString.substr(1, resultString.length - 1);
    }
    if (resultString.endsWith(',')) {
      
      resultString = resultString.substr(0, resultString.length - 1);
    }
    return resultString;
  }

  // Load the info that BIZ_ADMIN already added
  initInputtedCompanyData() {
    this.companyLogoFile = this.bizService.biz.companyLogoFile;
    this.companyName = this.bizService.biz.companyName;
    this.website = this.bizService.biz.website;
    this.hqAddress = this.bizService.biz.hqAddress;
    this.companyBio = this.bizService.biz.companyBio;

    if (this.bizService.biz.industries[0]) {
      if (!this.bizService.biz.industries[0].itemName) {
        this.selectedIndustry = [];
        for (let selectedIndustryItem of this.bizService.biz.industries) {
          this.selectedIndustry.push({
            id: selectedIndustryItem.id,
            itemName: selectedIndustryItem.name
          });
        }
        this.bizService.biz.industries = this.selectedIndustry;
        
      }
    }

    var companySizeId;
    if (this.bizService.biz.companySize === 'LESS_THAN_10') {
      companySizeId = 1;
    } else if (this.bizService.biz.companySize === 'FROM_11_TO_50') {
      companySizeId = 2;
    } else if (this.bizService.biz.companySize === 'FROM_51_TO_200') {
      companySizeId = 3;
    } else if (this.bizService.biz.companySize === 'FROM_201_TO_500') {
      companySizeId = 4;
    } else if (this.bizService.biz.companySize === 'GREATER_THAN_501') {
      companySizeId = 5;
    }
        
    let selectedCompanySize = this.dropdownCompanySizeList.find(
        x => x.id == companySizeId);
    if (selectedCompanySize) {
      this.selectedCompanySize.push({
        id: companySizeId,
        itemName: selectedCompanySize.itemName
      });
    }

    // for (let resourceNeed of this.bizService.biz.resourceNeeds) {
        //   this.resourceNeedList.push({
        //     role: [
        //       {
        //         id: resourceNeed.role.id,
        //         itemName: resourceNeed.role.name
        //       }
        //     ],
        //     location: {
        //       city: resourceNeed.location.name,
        //       state: resourceNeed.location.state.name
        //     }
        //   }
          
        // );
        if (this.bizService.biz.resourceNeeds.length > 0) {
          this.resourceNeedList = [];
          this.bizService.biz.resourceNeeds.forEach((item, index) => {
            this.resourceNeedList[index] = {
              role: [
                {
                  id: item.role.id,
                  itemName: item.role.name
                }
              ],
              location: item.addressModel
            };
          });
        }
        
    // }
  }

  storeDataForNextSteps() {
    this.bizService.biz.companyLogoFile = this.companyLogoFile;
    this.bizService.biz.companyName = this.companyName;
    this.bizService.biz.website = this.website;
    if (this.hqAddress) {
      if (this.bizService.biz.city === null) {
        this.bizService.biz.city = {};
      }
      this.bizService.biz.city.name = this.hqAddress.city;
      if (this.bizService.biz.city.state === undefined) {
        this.bizService.biz.city.state = {};
      }
      this.bizService.biz.city.state.name = this.hqAddress.state;
      
      this.bizService.biz.hqAddress = this.hqAddress;
    }
    this.bizService.biz.companyBio = this.companyBio;
    this.bizService.biz.industries = [];
    for (let selectedIndustryItem of this.selectedIndustry) {
      this.bizService.biz.industries.push({
        id : selectedIndustryItem.id,
        name: selectedIndustryItem.itemName
      })
      
    }
    // this.bizService.biz.industries = this.selectedIndustry;
    if (this.selectedCompanySize[0]) {
      if (this.bizService.biz.companySize === null) {
        this.bizService.biz.companySize = {};
      }
      // this.bizService.biz.companySize.id = this.selectedCompanySize[0].id;
      switch (this.selectedCompanySize[0].id) {
        case 1:
          this.bizService.biz.companySize = 'LESS_THAN_10';
          this.bizService.biz.companySizeString = '<10';
          break;
        case 2:
          this.bizService.biz.companySize = 'FROM_11_TO_50';
          this.bizService.biz.companySizeString = '11-50';
          break;
        case 3:
          this.bizService.biz.companySize = 'FROM_51_TO_200';
          this.bizService.biz.companySizeString = '51-200';
          break;
        case 4:
          this.bizService.biz.companySize = 'FROM_201_TO_500';
          this.bizService.biz.companySizeString = '201-500';
          break;
        case 5:
          this.bizService.biz.companySize = 'GREATER_THAN_501';
          this.bizService.biz.companySizeString = '501+';
          break;
      }
      
    }
    this.bizService.biz.resourceNeeds = [];
    for (let resourceNeed of this.resourceNeedList) {
      if (resourceNeed.role !== undefined) {
        if (resourceNeed.location !== undefined) {
          this.bizService.biz.resourceNeeds.push({
          role: {
            id: resourceNeed.role[0].id,
            name: resourceNeed.role[0].itemName
          },
          location: {
            name: resourceNeed.location.city,
            state: {
              name: resourceNeed.location.state
            }
          },
          address: resourceNeed.location.displayText,
          addressModel: resourceNeed.location
        });
        }
        
      }
    }

    // Store data for delegation
    if (this.delegateCheckbox) {
      for (let bizUser of this.bizService.biz.bizUsers) {
        if (bizUser.user.login === this.selectedDelegate[0].itemName) {
          
          bizUser.user.bizDelegations = [];
          bizUser.user.bizDelegations.push({
            status: "DELEGATED",
            // Company info will have delegate type = 1
            type: {
              id: 1
            }
          });
        }
      }
    }
  }

  // Navigate to next screen
  onNext() {
    this.storeDataForNextSteps();
    // this.bizService.biz.resourceNeeds = this.resourceNeedList;
    this.router.navigate(['biz-profile/contracts']);
  }

  // If we are in delegate mode, we will update company info to back-end
  onSubmit() {
    this.storeDataForNextSteps();
    this.subscribeToSaveResponse(
          this.bizService.update(this.bizService.biz));
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Biz>>) {
    result.subscribe((res: HttpResponse<Biz>) =>
        this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: Biz) {
    this.bizService.error = false;
    //debugger;
    this.modalService.open(true, ()=>{
      // find input contract task (type = 2)
      let url = '';
      this.bizService.biz.user.bizDelegations.forEach(element => {
        if (element.type.id === 2) {
          url = element.type.url;
        }
      });

      // navigate to this task
      if (url) {
        this.router.navigate([url],{ queryParams: { activation_key: this.bizService.activationKey}});
      }
      
    });
    
    // this.bizService.resetData();
  }

  private onSaveError() {
    this.bizService.error = true;
    this.modalService.open(true, ()=>{
      // do nothing
    });
  }

}
