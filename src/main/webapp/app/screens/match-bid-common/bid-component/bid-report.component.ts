import { DropDownItem } from './../../../shared/model/dropdown-item.model';
import { RoleMatch } from './../../../entities/role-match/role-match.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BidUserService } from './bid-common.service';
import { Bid, BidService } from '../../bid';
import { Principal } from '../../../shared';
import { FileService } from '../../../entities/file';
declare var window: any;

@Component({
  selector: '[jhi-bid-report]',
  templateUrl: './bid-report.component.html',
  styles: []
})
export class BidReportComponent implements OnInit {
  roleMatch: RoleMatch;

  savedProList = [];
  bidedProList = [];
  currentProList = [];
  viewAfterInit = false;

  // for current pro
  currentPro;
  currentProIndex = 0;
  currentProRoles = [];
  currentProskills = [];
  freeAnswerQuestionList = [];
  checkboxAnswerQuestionList = [];
  disableSaveButton = false;
  disablePassButton = false;
  estimateHours = 0;
  
  currentBid: any;
  isListSaved: boolean = false;
  currentLoginAccount: any;
  
  
  @Input() roleId;
  @Input() tab: number;
  @Input() proRequirementDetail;
  @Output() onSavePro = new EventEmitter();
  @Output('increase') increaseInterview = new EventEmitter<boolean>(false);
  
  constructor(
    private bidUserService: BidUserService,
    private bidService: BidService,
    private principal: Principal,
    private fileService: FileService
  ) {}

  ngOnInit() {
    if (!this.roleId) {
      this.roleId = 1;
    }
    // Call API get list pro depend on feature or tab
    if (this.tab == 0) {
      this.viewInReviewProList();
    }
    else if (this.tab == 1) {
      this.viewSavedProList();
    }
    else if (this.tab == 2) {
      
    }
    else if (this.tab == 3) {
      
    }
    else {
      this.viewInReviewProList();
    }
    this.principal.identity().then((account) => {
      this.currentLoginAccount = account;
    });
  }

  ngAfterViewInit() {
    this.viewAfterInit = true;
  }

  viewInReviewProList() {
    if (this.bidedProList.length == 0) {
      this.bidUserService.getBidUserDataListByProRequirement(this.roleId).subscribe(result => {
        this.bidedProList = result;
        this._filterToSavedList();
        this.currentProList = this.bidedProList;
        console.log(this.currentProList);
        if (this.currentProList) {
          this._updateCurrentProView(0);
        }
      });
    }
    else {
      this.currentProList = this.bidedProList;
      if (this.currentProList) {
        this._updateCurrentProView(0);
      }
    }
    this.isListSaved = false;
  }

  viewSavedProList() {
    if (this.bidedProList.length == 0) {
      this.bidUserService.getBidUserDataListByProRequirement(this.roleId).subscribe(result => {
        this.bidedProList = result;
        this._filterToSavedList();
        this.currentProList = this.savedProList;
        if (this.currentProList) {
          this._updateCurrentProView(0);
        }
      });
    }
    else {
      this.currentProList = this.savedProList;
      if (this.currentProList) {
        this._updateCurrentProView(0);
      }
    }
    this.isListSaved = true;
  }

  onSelectedPro(index) {
    this._updateCurrentProView(index);
  }

  onError(msg: any): any {

  }

  onSuccess(data: any, headers: any): any {

  }

  onScroll() {

  }

  onSave() {
    if (this.currentPro && this.currentBid) {
      // Send API update status save
      let bidModel = new Bid(this.currentBid.id);
      bidModel.status = "SAVE";
      this.bidService.updateStatus(bidModel).subscribe(result => {
        this.currentProList[this.currentProIndex].status = "SAVE";
        this.savedProList.push(this.currentProList[this.currentProIndex]);
        this.disablePassButton = false;
        this.disableSaveButton = true;

        this.onSavePro.emit();
      });
    }
  }

  onPass() {
    if (this.currentPro && this.currentBid) {
      // Send API update status save
      let bidModel = new Bid(this.currentBid.id);
      bidModel.status = "PASS";
      this.bidService.updateStatus(bidModel).subscribe(result => {
        this.currentProList[this.currentProIndex].status = "PASS";
        this._findUnSavedProThenRemove();
        if (this.isListSaved) {
          let savedListLength = this.savedProList.length;
          if (this.currentProIndex >= savedListLength) {
            this.currentProIndex = savedListLength - 1;
          }
          this.currentProList = this.savedProList;
          this._updateCurrentProView(this.currentProIndex);
        }
        else {
          this.disablePassButton = true;
          this.disableSaveButton = false;
        }
        this.onSavePro.emit();
      });
    }
  }


  downloadFile(filePath, fileName) {
    this.fileService.getDownloadFile({
      relativeFilePath: filePath
    }).subscribe(
      results => {
        let url = window.URL.createObjectURL(results);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      }
    );
  }


  private _findUnSavedProThenRemove() {
    let removeIndex = -1;
    for (let index = 0; index < this.savedProList.length; index++) {
      if (this.savedProList[index].status != "SAVE") {
        removeIndex = index;
      }
    }
    this.savedProList.splice(removeIndex, 1);
  }

  private _filterToSavedList() {
    for (let index = 0; index < this.bidedProList.length; index++) {
      if (this.bidedProList[index].status == "SAVE") {
        this.savedProList.push(this.bidedProList[index]);
      }
    }
  }

  private _updateCurrentProView(proIndex) {
    if (this.currentProList.length > 0) {
      // Call API get bid-user
      this.bidUserService.getBidUserDataSingle( this.currentProList[proIndex].id ).subscribe(result => {
        this.currentBid = result;
        this.currentPro = result.owner;
        console.log(this.currentPro);
        console.log(this.currentBid);
        this.currentProIndex = proIndex;
        this.currentProRoles = this.currentPro.roles;

        this.currentProskills = [];
        this.currentPro.skills.forEach(
          (item) => {
            let skill = new DropDownItem(item.skill.id, item.skill.name);
            this.currentProskills.push({
              skill: skill,
              strength: item.strength,
              yearsOfExperience: item.yearsOfExperience
            });
          }
        );

        if (this.currentBid.status == "SAVE") {
          this.disablePassButton = false;
          this.disableSaveButton = true;
        }
        else if (this.currentBid.status == "PASS") {
          this.disablePassButton = true;
          this.disableSaveButton = false;
        }
        else {
          this.disablePassButton = false;
          this.disableSaveButton = false;
        }
      });
    } 
    else {
      this.currentPro = null;
      this.disablePassButton = true;
      this.disableSaveButton = true;
    }
  }

  onOutputIncreaseInterview(data){
    if(data){
      this.increaseInterview.emit(data);
    }
  }
  
}
