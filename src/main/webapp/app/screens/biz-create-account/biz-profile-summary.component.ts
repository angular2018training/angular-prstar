import { BizService } from '../../entities/biz/biz.service';
import { Biz } from '../../entities/biz/biz.model';
import { Component, OnInit } from '@angular/core';
import { BizProfileModalService } from './biz-profile-modal.service';
import { Observable } from 'rxjs/Observable';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MessengerService } from '../../screens/shared/messenger.service';

@Component({
  selector: 'jhi-biz-profile-summary',
  templateUrl: './biz-profile-summary.component.html',
  styles: []
})
export class BizProfileSummaryComponent implements OnInit {
  
  bizUsers = [];
  resourceNeeds = [];
  
  constructor(
    private bizService: BizService,
    private modalService: BizProfileModalService,
    private router: Router,
    private messengerService: MessengerService
  ) { }

  ngOnInit() {
    

    // Retrieve data in previous screens
    this.bizUsers = JSON.parse(JSON.stringify(this.bizService.biz.bizUsers));
    
    // this.bizUsers = Object.assign({}, this.bizService.biz.bizUsers);
    // this.bizUsers = this.bizService.biz.bizUsers;
    for (let bizUser of this.bizUsers) {
      // Create an empty string
      bizUser.user.authoritiesString = '';
      for (let authority of bizUser.user.authorities) {
        // String to display on GUI
        bizUser.user.authoritiesString += authority.itemName + ', ';
      }
      // Remove ', ' at the end of authoritiesString
      bizUser.user.authoritiesString = bizUser.user.authoritiesString.substr(0,
        bizUser.user.authoritiesString.length - 2);
      

    }
  }

  ngAfterViewInit() {
    this.messengerService.stepChange(3);
  }

  onBack() {
    this.router.navigate(['biz-profile/contracts']);
  }

  confirm() {
    // this.bizService.biz.id = 27; // TODO: specify biz id
    // Map authorities type from DropDownItem to String (to send to back-end)
    this.bizUsers.forEach((item, index) => {
      this.bizService.biz.bizUsers[index].user.authorities = [];
      for (let authority of item.user.checkedAuthorities) {
        // authority has type DropDownItem
        // push the String value to authorities array
        this.bizService.biz.bizUsers[index].user.authorities.push(authority.itemName);
        this.bizService.biz.bizUsers[index].user.checkedAuthorities.push({
          id: authority.id,
          itemName: authority.itemName
        });
      }
    });
    // BIZ_ADMIN info is only used to display on GUI, not sent to back-end
    // this.bizService.biz.user = {};
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
    
    // this.bizService.resetData();
  }

  private onSaveError() {
    this.bizService.error = true;
    this.modalService.open(true, ()=>{});
  }

}
