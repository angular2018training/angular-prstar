import { BizService } from '../../entities/biz/biz.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessengerService } from '../shared/messenger.service';
import { MasterService, UserService, Principal } from '../../shared';
import { HttpResponse} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Authority } from "../../shared/master/master.model";
import { DropDownItem } from '../../shared/model/dropdown-item.model';
import { Biz } from "../../entities/biz";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BizDelegationService } from '../../entities/biz-delegation/biz-delegation.service';
import { BizDelegation } from "../../entities/biz-delegation/biz-delegation.model";
import { LoginService } from "../../shared/login/login.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-biz-profile-key-roles',
  templateUrl: './biz-profile-key-roles.component.html',
  styles: []
})
export class BizProfileKeyRolesComponent implements OnInit, OnDestroy {
  bizUsers = [];
  dropdownAuthorityList = [];
  dropdownAuthoritySettings;
  bizDelegation = [];
  errorEmailExists: boolean;
  errorEmptyEmail: boolean;
  createNewRoleSubs : Subscription;

  constructor(
    private bizService: BizService,
    private bizDelegationService: BizDelegationService,
    private messengerService: MessengerService,
    private masterService: MasterService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private principal: Principal
  ) { }

  ngOnInit() {
    // load the created biz company from back-end to "user" field of the JSON in bizService.biz
    // get param from mail
    
    this.route.queryParams.subscribe((params) => {
      console.log('activationKey: ' + params['activation_key']);
      if (params['activation_key']) {
        // find biz by activation key
         this.bizService.findByActivationKey(params['activation_key'])
              .subscribe((bizResponse: HttpResponse<Biz>) => {
                  // this.bizService.biz.user = bizResponse.body.user;
                  this.bizService.biz = bizResponse.body;
                  console.log('biz: ' + this.bizService.biz.user);
                  // login with JWT
                  this.loginService.loginWithToken(this.bizService.biz.jwtToken.id_token, true)
                    .then(() => {
                      this.bizService.biz.jwtToken = null;
                      // Go to key-roles screen after forcing log in
                      this.router.navigate(['biz-profile/key-roles']);
                    });
              });
      }
      
      
     
    });
   

    // Restore data if switching back from next screen
    this.bizUsers = this.bizService.biz.bizUsers;
    console.log('bizUsers: ', this.bizUsers);
    
    //PROS-601: BACK function on Biz Create Profile won't allow user to continue 
    //this.onAddMoreRole();
    
    const subMaster = this.masterService.bizRoles().subscribe(
            (res: HttpResponse<Authority[]>) => {
                console.log('res: ', res);
                res.body.forEach((item, index) => {
                  this.dropdownAuthorityList.push(
                    new DropDownItem(index, item.displayedName));
                });

                subMaster.unsubscribe();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.dropdownAuthoritySettings = {
      singleSelection: false,
      disabled: false,
      text: 'Role',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      addNew: true
    };
    
  }


  onAddMoreRole() {
    this.bizUsers.push({
      user: {
        authorities: [],
        login: ""
      }
    })
    // this.bizService.biz.users.push({
    //   login: "",
    //   authority: ""
    // })
  }

  private onError(error) {
        console.log(error.message);
    }

  validateEmail(email: string) {
    // Validate email
    this.userService.validateEmail(email).subscribe((result) => {
      this.errorEmailExists = !result;
    });
  }

  onNext() {
    this.errorEmailExists = false;
    this.errorEmptyEmail = false;
    // Store data to show if we switch back from next screen
    for (var i = 0; i < this.bizUsers.length; i++) {
      if (this.bizUsers[i+1]) {
        if (this.bizUsers[i].user.login === this.bizUsers[i+1].user.login) {
          this.errorEmailExists = true;
          break;
        }
      }
      if (this.bizUsers[i].user.login === '' ||
          this.bizUsers[i].user.login === null ||
          this.bizUsers[i].user.login === undefined) {
        this.errorEmptyEmail = true;
        break;
      }
    }
    if (!this.errorEmailExists) {
      if (!this.errorEmptyEmail) {
        this.bizService.biz.bizUsers = this.bizUsers;
        this.router.navigate(['biz-profile/company-bio']);
      }
    }
  }

  // ngAfterViewInit() {
  //   this.messengerService.stepChange(1);
  // }

  addNewItem(data){
    let name = 'ROLE_BIZ_' + data.trim().toUpperCase().replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/  +/g, ' ').split(' ').join('_');
    let authority = new Authority(this.dropdownAuthorityList.length, name, data);
    this.createNewRoleSubs = this.masterService.createBizRole(authority).subscribe((res: HttpResponse<Authority>) => {
      this.dropdownAuthorityList.push(new DropDownItem(this.dropdownAuthorityList.length, res.body.displayedName));
    },
    (res: HttpErrorResponse) => this.onError(res.message));
  }

  ngOnDestroy(): void {
    if(this.createNewRoleSubs){
      this.createNewRoleSubs.unsubscribe();  
    }
  }

}
