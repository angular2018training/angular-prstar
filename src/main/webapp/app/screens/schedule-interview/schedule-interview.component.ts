import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { FileService } from '../../entities/file';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DropDownItem } from '../../shared/model/dropdown-item.model';
import { InterviewSession, SuggestedInterviewSchedule, ScheduleInterview } from './schedule-interview.model';
import { ScheduleInterviewService } from './schedule-interview.service';


@Component({
  selector: 'jhi-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styles: [],
})
export class ScheduleInterviewComponent implements OnInit {
  @Input() proID: number;
  @Input() proRequirementID: number;
  @Output('increase') increaseInterview = new EventEmitter<boolean>(false);

  selectedInterviewTemplate:any;
  interviewTemplateList = [];
  interviewTemplateListSetting = {
    singleSelection: true,
    disabled: false,
    text: 'Select template',
    enableSearchFilter: true,
    classes: 'mdb-select'
  };

  selectedInterviewer: any;
  interviewerList = [];
  interviewerListSetting = {
    singleSelection: true,
    disabled: false,
    text: 'Select Interviewer',
    enableSearchFilter: true,
    classes: 'mdb-select'
  };

  selectedInterviewType: any;
  interviewTypeList = [];
  interviewTypeListSetting = {
    singleSelection: true,
    disabled: false,
    text: 'Select Interviewer Type',
    enableSearchFilter: true,
    classes: 'mdb-select'
  };

  selectedInterviewDuration: any;
  interviewDurationList = [];
  interviewDurationListSetting = {
    singleSelection: true,
    disabled: false,
    text: 'Select Interviewer Duration',
    enableSearchFilter: true,
    classes: 'mdb-select'
  };

  scheduleInterview: ScheduleInterview = new ScheduleInterview();
  
  isCreated: boolean = false;
  constructor(
    // private jhiAlertService: JhiAlertService,
    private scheduleInterviewService: ScheduleInterviewService
  ) {}


  ngOnInit() {
    this.interviewTemplateList = [
      new DropDownItem(1, 'Interview template 1'),
      new DropDownItem(2, 'Interview template 2'),
      new DropDownItem(3, 'Interview template 3'),
      new DropDownItem(4, 'Interview template 4')
    ];

    this.scheduleInterviewService.getListInterviewer().subscribe(result => {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        let interviewerName = result[i].titlePrefix + "." + result[i].firstName + " " + result[i].lastName + " " + result[i].titleSuffix;
        let interviewer = new DropDownItem(result[i].id, interviewerName);
        this.interviewerList.push(interviewer);

        this._checkInterviewCreated();
      }
    });
  }

  ngOnChanges() {
    this._checkInterviewCreated();
  }

  sendInvitation() {
    // let invitation = {
    //   "proId": 8,
    //   "proRequirementId": 41,
    //   "status": "PENDING_AVAILABILITY",
    //   "bizNote": "biz note 1",
    //   "proNote": null,
    //   "interviewSessions": [
    //     {
    //       "interviewerUserId": 22,
    //       "interviewType": "interview type 1",
    //       "interviewDate": null,
    //       "fromTime": null,
    //       "duration": 60,
    //       "timezone": "UTC+07:00",
    //       "decision": "AWAITING",
    //       "note": null,
    //       "suggestedInterviewSchedules": [
    //         {
    //           "interviewDate": "2018-06-12T04:32:21.423Z",
    //           "fromTime": "13:00",
    //           "duration": 60,
    //           "timezone": "UTC+07:00",
    //           "note": null,
    //           "proAccepted": false,
    //           "bizAccepted": false
    //         }
    //       ]
    //     }
    //   ]
    // }

    // invitation.proId = this.proID;
    // invitation.proRequirementId = this.proRequirementID;
    // this.scheduleInterviewService.sendInvitation(invitation).subscribe(result => {
    //   console.log(result);
    // });

    this.scheduleInterview.proId = this.proID;
    this.scheduleInterview.proRequirementId = this.proRequirementID;
    this.scheduleInterview.status = "PENDING_AVAILABILITY";
    for (let i = 0; i < this.scheduleInterview.interviewSessions.length; i++) {
      this.scheduleInterview.interviewSessions[i].interviewerUserId = this.scheduleInterview.interviewSessions[i].selectedInterviewer[0].id;
      delete this.scheduleInterview.interviewSessions[i].selectedInterviewer;
      for (let index = 0; index < this.scheduleInterview.interviewSessions[i].suggestedInterviewSchedules.length; index++) {
        this.scheduleInterview.interviewSessions[i].suggestedInterviewSchedules[index].duration = this.scheduleInterview.interviewSessions[i].duration;
      }
    }

    this.scheduleInterviewService.sendInvitation(this.scheduleInterview).subscribe(result => {
      this.isCreated = true;
      this.increaseInterview.emit(true);
    });
  }

  removeInterviewer(interviewerIndex: number) {
    this.scheduleInterview.interviewSessions.splice(interviewerIndex, 1);
  }

  addInterviewer() {
    this.scheduleInterview.interviewSessions.push(new InterviewSession([new SuggestedInterviewSchedule()]));
  }

  removeSuggestedSchedule(interviewerIndex: number, scheduleIndex: number) {
    this.scheduleInterview.interviewSessions[interviewerIndex].suggestedInterviewSchedules.splice(scheduleIndex, 1);
  }

  addSuggestedSchedule(interviewerIndex: number) {
    this.scheduleInterview.interviewSessions[interviewerIndex].suggestedInterviewSchedules.push(new SuggestedInterviewSchedule());
  }

  recievedDate(value, interviewerIndex, scheduleIndex) {
    console.log("Set date", value, interviewerIndex, scheduleIndex);
    const splittedDate = value.data.split('.');
    this.scheduleInterview.interviewSessions[interviewerIndex].suggestedInterviewSchedules[scheduleIndex].interviewDate = new Date(`${splittedDate[2]}-${splittedDate[0]}-${splittedDate[1]}`);
    console.log('check date:', new Date(`${splittedDate[2]}-${splittedDate[0]}-${splittedDate[1]}`));
  }

  recievedTime(value, interviewerIndex, scheduleIndex) {    
    if (value.name == "toTime") {
      // this.scheduleInterview.interviewSessions[interviewerIndex].suggestedInterviewSchedules[scheduleIndex]. = value.data;
    }
    else if (value.name == "fromTime") {
      this.scheduleInterview.interviewSessions[interviewerIndex].suggestedInterviewSchedules[scheduleIndex].fromTime = value.data;
      this.scheduleInterview.interviewSessions[interviewerIndex].suggestedInterviewSchedules[scheduleIndex].duration = this.scheduleInterview.interviewSessions[interviewerIndex].duration;
    }
    
  }

  changeTimezone(event, index, key){
    this.scheduleInterview.interviewSessions[key].suggestedInterviewSchedules[index].timezone = event;
  }

  private _checkInterviewCreated() {
    this.scheduleInterviewService.checkInterviewCreated(this.proID, this.proRequirementID).subscribe(res => {
      if (res.body.length > 0) {
        
        this.isCreated = true;
        this.scheduleInterview = res.body[0];

        for (let i = 0; i < this.scheduleInterview.interviewSessions.length; i++) {
          console.log(this.interviewerList);
          for (let interviewerIndex = 0; interviewerIndex < this.interviewerList.length; interviewerIndex++) {
            if (this.interviewerList[interviewerIndex].id == this.scheduleInterview.interviewSessions[i].interviewerUserId) {
              let interviewer = this.interviewerList[interviewerIndex];
              this.scheduleInterview.interviewSessions[i].selectedInterviewer.push(interviewer);
            }
          }
        }
        console.log(this.scheduleInterview);
      }
      else {
        this.scheduleInterview.interviewSessions = [
          new InterviewSession([new SuggestedInterviewSchedule()])
        ];
      }
    });
  }
}