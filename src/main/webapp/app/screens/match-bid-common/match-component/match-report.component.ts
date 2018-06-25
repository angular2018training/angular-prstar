import { DropDownItem } from './../../../shared/model/dropdown-item.model';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatchService } from './match-bid-common.service';
declare var window: any;

@Component({
  selector: '[jhi-match-report]',
  templateUrl: './match-report.component.html',
  styles: []
})
export class MatchReportComponent implements OnInit {
  currentProList = [];
  viewAfterInit = false;

  // for current pro
  currentPro;
  currentProIndex = 0;
  currentProRoles = [];
  currentProskills = [];
  disableSaveButton = false;
  disablePassButton = false;
  estimateHours = 0;

  proList = [];
  curProId = null;
  

  @Input() roleId;
  @Input() roleName;
  @Input() roleMatch;
  @Input() selectedTab;
  @Output() proListChange = new EventEmitter();
  @Output('increase') increaseInterview = new EventEmitter<boolean>(false);
  
  constructor(
    private matchService: MatchService
  ) {}

  ngOnInit() {
    if(this.roleId) {
      this.getProlist();
    } else {
      // navigate to dashboard
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.roleMatch) {
      this.estimateHours = (window.diffDate(this.roleMatch.startDate, this.roleMatch.endDate) + 1) * 8;
    }
  }

  ngAfterViewInit() {

  }

  viewProList() {
    this.getProlist();
    this.selectedTab = 1;
  }

  viewSavedProList() {
    this.currentProList = this.formatJson(this.savedProList());
    this.disablePassButton = true;
    this.updateCurrentProView(0);
    this.selectedTab = 2;
  }

  updateCurrentProView(proIndex) {
    let proId = 0;
    if (this.currentProList.length > 0) {
      if(this.currentProList[proIndex]) {
        proId = this.currentProList[proIndex].id;
        this.currentProIndex = proIndex;
      } else {
        proId = this.currentProList[proIndex-1].id;
        this.currentProIndex = proIndex - 1;
      }
      
      for (let index = 0; index < this.proList.length; index++) {
        if(this.proList[index].pro.id === proId) {
          this.currentPro = this.proList[index].pro;
          this.currentPro.status = this.proList[index].status;
          this.currentPro.matchPercentage = this.proList[index].matchPercentage;
          this.currentPro.lowDesiredRate = this.proList[index].lowRate;
          this.currentPro.hightDesiredRate = this.proList[index].highRate;
          break;
        }
      }

      // this.currentProRoles = this.currentPro.roles;
      // this.currentPro.roles.forEach(element => {
      //     this.currentProRoles.push(new DropDownItem(element.id, element.name));
      // });
      
      // TODO
      this.currentProskills = [];
      if(this.currentPro.skills) {
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
      }

      this.disablePassButton = false;
      this.disableSaveButton = false;
      if(this.currentPro.status ==  'PASSED') {
        this.disablePassButton = true;
      } else if(this.currentPro.status ==  'SAVED') {
        this.disableSaveButton = true;
      }
      
    } else {
      this.currentPro = null;
      this.disablePassButton = true;
      this.disableSaveButton = true;
    }
  }

  onSelectedPro(index) {
    this.updateCurrentProView(index);
  }

  onSave() {
    let bodyParam = {
      status: "SAVED",    
      proId: this.currentPro.id,    
      proRequirementId: this.roleId
    }
    if (this.currentPro) {
      this.updateProDecsion(bodyParam);
    }
  }

  onPass() {
    let bodyParam = {
      status: "PASSED",    
      proId: this.currentPro.id,    
      proRequirementId: this.roleId
    }
    if (this.currentPro) {
      this.updateProDecsion(bodyParam);
    }
  }

  getProlist() {
    return this.matchService.getProList(this.roleId).subscribe(result =>{
      if (result) {
        this.proList = result;
        /* check tab selected */
        if(this.selectedTab == 2) {
          this.currentProList =  this.formatJson(this.savedProList());
        } else {
          this.currentProList = this.formatJson(this.proList);
        }
        this.updateCurrentProView(this.currentProIndex);
        /* change number of pro on tab */
        this.proListChange.emit({
          numberProlist: this.proList.length,
          numberProlistSaved: this.savedProList().length
        });
      }
    }, error =>{

    })
  }

  savedProList() {
    let savedProList = [];
    this.proList.forEach((pro)=>{
      if(pro.status === 'SAVED') {
        savedProList.push(pro);
      }
    })
    return savedProList;
  }

  onSelectPro(proIndex) {
    this.currentPro = this.currentProList[proIndex];
  }

  formatJson(currentProList) {
    let proList = [];
    currentProList.forEach((item) =>{
      proList.push({
        id: item.pro.id ? item.pro.id : null,
        lastName: item.pro.account.lastName ? item.pro.account.lastName : null,
        firstName: item.pro.account.firstName ? item.pro.account.firstName : null,
        middleName: item.pro.account.middleName ? item.pro.account.middleName: null,
        rating: item.pro.rating ? item.pro.rating : null, // TODO
        cityName: item.pro.account.city ? item.pro.account.city.name: null,
        stateName: (item.pro.account.city && item.pro.account.city.state) ? item.pro.account.city.state.name : null ,
        pictureFile: item.pro.pictureFile ? item.pro.pictureFile : null,
        status: item.status ? item.status : null
      })
    });

    return proList
  }

  updateProDecsion(bodyParam){
    return this.matchService.updateProDecsion(bodyParam).subscribe(result => {
    }, error => {

    }, () => {
      this.getProlist();
    })
  }
  
  onOutputIncreaseInterview(data){
    if(data){
      this.increaseInterview.emit(data);
    }
  }
  
}
