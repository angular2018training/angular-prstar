import { File } from './../../entities/file/file.model';
import { JhiDataUtils } from 'ng-jhipster';
import { Biz } from './../../entities/biz/biz.model';
import { BizService } from '../../entities/biz/biz.service';
import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../shared/messenger.service';
import { Router } from '@angular/router';
import { DropDownItem } from './../../shared/model/dropdown-item.model';
import { Observable } from 'rxjs/Observable';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BizProfileModalService } from './biz-profile-modal.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from "../../shared/login/login.service";
declare var window: any;

@Component({
  selector: 'jhi-biz-profile-contracts',
  templateUrl: './biz-profile-contracts.component.html',
  styleUrls: ["./biz-profile-contracts.component.scss"]
})
export class BizProfileContractsComponent implements OnInit {
  files = [];
  dropdownDelegateList = [];
  dropdownDelegateSettings;
  selectedDelegate = [];
  delegateCheckbox = false;

  constructor(
    private bizService: BizService,
    private dataUtils: JhiDataUtils,
    private messengerService: MessengerService,
    private router: Router,
    private modalService: BizProfileModalService,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log('activationKey: ' + params['activation_key']);
      if (params['activation_key']) {
       this.bizService.findByActivationKey(params['activation_key'])
       .subscribe((bizResponse: HttpResponse<Biz>) => {
         this.bizService.biz = bizResponse.body;
                  console.log('biz: ' + this.bizService.biz.user);
                  // login with JWT
                  this.loginService.loginWithToken(this.bizService.biz.jwtToken.id_token, true)
                    .then(() => {
                      this.bizService.biz.jwtToken = null;
                      this.bizService.contractsDelegate = true;
                      // Go to contracts screen after forcing log in
                      this.router.navigate(['biz-profile/contracts']);
                    });
       });
      }
    });
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
  }

  ngAfterViewInit() {
    this.showToolTip('#tooltip-bill-rate');
  }

  showToolTip(id) {
    window.showTooltip(id);
  }

  setFileData(event) {
    if (event && event.target.files) {
      var files = event.target.files;

      this.files = [];
      this.bizService.biz.selectedContractTemplateDisplay = '';
      for (var i = 0; i < files.length; i++) {
          console.log(files[i]);
          var file = files[i];
          this.dataUtils.toBase64(file, (base64Data) => {
            let f = new File();
            f.name = file.name;
            this.bizService.biz.selectedContractTemplateDisplay += file.name;
            f.content = base64Data;
            f.contentType = file.type;
            // f.type = "CONTRACT_TEMPLATE";
            this.files.push(f);
          });
      }
    }
  }

  
  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  storeFileData() {
    for (let file of this.files) {
      this.bizService.biz.contractTemplates = [];
      this.bizService.biz.contractTemplates.push({
        content: file.content,
        contentType: file.contentType,
        name: file.name
      });
    }
  }

  // Navigate to next screen
  onNext() {
    // Store file data
    this.storeFileData();
    // Store data for delegation
    if (this.delegateCheckbox) {
      for (let bizUser of this.bizService.biz.bizUsers) {
        if (bizUser.user.login === this.selectedDelegate[0].itemName) {
          // If we did not delegate in previous screen
          if (!bizUser.user.bizDelegations) {
            bizUser.user.bizDelegations = [];
          }
          bizUser.user.bizDelegations.push({
            status: "DELEGATED",
            // Contract template will have delegate type = 2
            type: {
              id: 2
            }
          });
        }
      }
    }
    this.router.navigate(['biz-profile/summary']);
    
  }

  // If we are in delegate mode, we will update company info to back-end
  onSubmit() {
    this.storeFileData();
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
    this.modalService.open(true, ()=>{});
    
    this.bizService.resetData();
  }

  private onSaveError() {
    this.bizService.error = false;
    this.modalService.open(true, ()=>{});
    this.bizService.resetData();
  }
}
