import { Router } from '@angular/router';
import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { InterviewService } from './../../services/interview.service';
import { DatePipe } from '@angular/common';
import { Principal } from '../../../../shared';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
declare var window: any;
@Component({
  selector: 'app-schedule-tab',
  templateUrl: './tab-schedule.component.html',
  styleUrls: ['./tab-schedule.component.css']
})
export class ScheduleTabComponent {
  // @Input('interview') public interview: any;
  @Input('session') public session: any;
  @Input('interview') public interview: any;
  @Output() refreshData = new EventEmitter<any>();
  switch = '';
  sessions: any;
  showSelectDate: boolean = false;
  dataClick = {};
  disableNotice = true;
  isSubmit = true;

  dateAvailability: any;
  idInter: any;
  id: any;
  isBiz: any;
  note: any;

  lineDate = [
    {
      timezone: '',
      fromTime: '',
      toTime: '',
      zone: ''
    }
  ]
  data = {
    "id": '',
    "interviewSessionScheduleList": [],
    "bizNote": '',
    "type": ''
  }
  timezone: string = '';

  constructor(
    public interviewService: InterviewService,
    private principal: Principal,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private elementRef: ElementRef
  ) {
    this.principal.hasAnyAuthority(['ROLE_BIZ']).then((isBiz) => {
      this.isBiz = isBiz;
    });
  }

  checkBizAcepted(data) {
    let schedule = data.suggestedInterviewSchedules;
    if (schedule.length > 0) {
      schedule.forEach((el, i) => {
        if (el.proAccepted && el.bizAccepted) {
          let name = "group0"
          this.dataClick = Object.assign({}, this.dataClick, {
            [name]: [el.interviewDate, i]
          });
          this.disableNotice = false;
        }
      });
    }
  }

  checkDateAccept(date) {
    if (date) {
      if (date.proAccepted && date.bizAccepted) {
        return 'checked';
      }
      return '';
    }
  }

  checkReply() {
    let data = this.dataClick;
    if (Object.keys(data).length !== 0) {
      let count = 0;
      for (let key in data) {
        if (data[key][0].includes('add') || data[key][0] === 'request') {
          count = count + 1;
        }
      }
      if (count > 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return true
    }
  }

  checkAccept() {
    let data = this.dataClick;
    if (
      this.interview &&
      (this.interview.status === 'SCHEDULED' ||
      this.interview.status === 'COMPLETED' ||
      this.interview.status === 'ACCEPTED' ||
      this.interview.status === 'DECLINED' ||
      this.interview.status === 'PENDING_OFFER')
    ) {
      return true;
    } else {
      if (Object.keys(data).length !== 0) {
        let count = 0
        for (let key in data) {
          if ((data[key][0].includes('add') || data[key][0] === 'request')) {
            count = count + 1;
          } 
        }
        if (count > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  }

  checkSelect() {
    if (Object.keys(this.dataClick).length == 0) {
      return '';
    }
  }

  ngOnChanges(changes: any): void {
    if (this.session) {
      this.id = this.session.id;
      this.sessions = this.session;
      this.dataClick = {};
      this.lineDate = [
        {
          timezone: '',
          fromTime: '',
          toTime: '',
          zone: ''
        }
      ];
      this.note = '';
      this.checkBizAcepted(this.sessions);
    }
    if (this.interview) {
      console.log('ngOnchange---', this.interview)
      this.idInter = this.interview.id;
    }
  }

  ngAfterViewInit() {
    this.initTooltip('#tooltip-message');
  }

  initTooltip(id) {
    window.initTooltip(id);
  }

  onClick(e) {
    let { value, name, id } = e.target;
    id = id.replace('radio', '');
    this.dataClick = Object.assign({}, this.dataClick, {
      [name]: [value, id]
    });
    this.switch = e.target.value;
    e.target.value === 'add' ? this.showSelectDate = true : this.showSelectDate = false;
  }

  recievedDate(value) {
    let { id, data } = value;
    console.log('datepicker: ' ,value.data);
    this.lineDate[id].timezone = data;
  }

  recievedTime(value) {
    let { id, data, name } = value;
    this.lineDate[id][name] = data;
  }

  onRemoveLine(index) {
    this.lineDate.splice(index, 1)
  }

  onAddLine() {
    this.lineDate.push(
      {
        timezone: '',
        fromTime: '',
        toTime: '',
        zone: ''
      },
    )
  }
  checkDisabled() {
    let data = this.dataClick;
    for (let key in data) {
      if (data[key] === 'add' || data[key] === 'request') {
        return true
      }
    }
    return false;
  }

  parseDuaration(fromTime, toTime) {
    let result = 0;
    if (fromTime && toTime) {
      let from = fromTime.split(':');
      let to = toTime.split(':');
      result = (parseInt(to[0]) * 60 + parseInt(to[1])) - (parseInt(from[0]) * 60 + parseInt(from[1]))
      return result;
    }
  }

  checkRole(isBiz, session, name) {
    if (session.bizAccepted && session.proAccepted) {
      return true;
    } else {
      if (name === 'biz') {
        if (isBiz) {
          return true
        } else {
          return false
        }
      } else {
        if (isBiz) {
          return false
        } else {
          return true
        }
      }
    }
  }

  checkSubmitAddDate(date) {
    let temp = 0;
    console.log('checkSubmitAddDate----', date)
    date.forEach(item => {
      if ((item.fromTime === "") || (item.timezone === "") || (item.toTime === "") || (item.zone === "")) {
        temp = 1;
        this.isSubmit = false;
        return 0;
      }
    });
    if (temp === 0) {
      this.isSubmit = true;
    }

  }

  parseTime(data) {
    let dateObj = new Date(data.interviewDate);
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newDate = year + "-" + month + "-" + day + ' ' + data.fromTime + ' ' + data.timezone;
    return newDate;
  }


  parseData(session, date) {
    if (this.switch === 'add') {
      let suggestedInterviewSchedules = [];
      let result = {};
      this.checkSubmitAddDate(date);
      date.forEach((item, index) => {
        let data = {};
        const splittedDate = item.timezone.split('.');
        data = {
          "bizAccepted": this.isBiz ? true : false,
          "duration": this.parseDuaration(item.fromTime, item.toTime),
          "fromTime": item.fromTime,
          "interviewDate": new Date(`${splittedDate[2]}-${splittedDate[0]}-${splittedDate[1]}`),
          // "interviewDate": Date.parse(item.timezone + item.fromTime + item.zone),
          "interviewSessionId": this.id,
          "timezone": item.zone,
          "proAccepted": this.isBiz ? false : true,
        }
        suggestedInterviewSchedules.push(data)
      });
      result = {
        id: session.id,
        suggestedInterviewSchedules: suggestedInterviewSchedules
      }
      // this.data.interviewSessionScheduleList.push({
      //   id: this.id,
      //   suggestedInterviewSchedules: suggestedInterviewSchedules
      // })
      // this.data.id = this.idInter;
      return result;
    } else if (this.switch === 'request') {
      this.isSubmit = true;
      let data = {};
      data = {
        id: session.id,
        suggestedInterviewSchedules: []
      }
      return data;
    } else {
      this.isSubmit = true;
      let { suggestedInterviewSchedules } = session;
      let keys = Object.keys(date);
      let result = {}
      let schedule = [];
      let data = {};
      let index = parseInt(date[keys[0]][1]);
      let scheduleSugget = suggestedInterviewSchedules[index];

      data = {
        "bizAccepted": this.checkRole(this.isBiz, scheduleSugget, 'biz'),
        "duration": scheduleSugget.duration,
        "fromTime": scheduleSugget.fromTime,
        "id": scheduleSugget.id,
        "interviewDate": new Date(scheduleSugget.interviewDate),
        "interviewSessionId": session.id,
        "timezone": scheduleSugget.timezone,
        "proAccepted": this.checkRole(this.isBiz, scheduleSugget, 'pro'),
      }
      schedule.push(data)
      result = {
        id: session.id,
        suggestedInterviewSchedules: schedule
      }
      return result;
      // let index = keys[0].replace('group', '')
      // suggestedInterviewSchedules[index].interviewDate = value;
      // suggestedInterviewSchedules[index].interviewSessionId = this.id;
      // if (this.role === 'ROLE_BIZ') {
      //   suggestedInterviewSchedules[index].bizAccepted = true;
      // } else {
      //   suggestedInterviewSchedules[index].proAccepted = true;
      // }

      // this.data.id = this.idInter;
      // this.data.interviewSessionScheduleList.push({
      //   id: this.id,
      //   suggestedInterviewSchedules: suggestedInterviewSchedules
      // })

      // return this.data;
    }
  }

  formartData(sessions, dateAvailability, lineDate) {
    let data = {}
    if (this.switch === 'add') {
      data = this.parseData(sessions, lineDate)
      return data;
    } else if (this.switch === 'request') {
      data = this.parseData(sessions, dateAvailability)
      return data;
    } else {
      data = this.parseData(sessions, dateAvailability)
      return data;
    }
  }

  onSubmitData(type) {
    let data = {};
    data = this.formartData(this.sessions, this.dataClick, this.lineDate);
    this.data.id = this.idInter;
    this.data.interviewSessionScheduleList.push(data)
    this.data.type = type;
    this.data.bizNote = this.note;
    console.log('data: ', data);
    if (this.isSubmit) {
      this.interviewService.updateSchedule(this.data).subscribe(result => {
        this.refreshData.emit();
        this.showNotificationDialog();
      });
    }
    // console.log('onSubmit----', this.data);
    // data = Object.assign({}, data, { type: type, note: this.note })

  }

  showConfirmDialog(): NgbModalRef {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.result.then((result) => {
      this.interviewService.updateSchedule({
        id: this.idInter,
        type: 0,
        interviewSessionScheduleList: [] // required
      }).subscribe(data => {
        console.log('cancel successfully!');
      });
    }, (reason) => {
      console.log('reason confirm cancel: ', reason);
    });
    return modalRef;
  }

  showNotificationDialog(): NgbModalRef {
    const modalRefNotice = this.modalService.open(NotificationModalComponent);
    modalRefNotice.result.then((result) => {
      console.log('cancel successfully!');
    }, (reason) => {
      console.log('reason confirm cancel: ');
    });
    return modalRefNotice;
  }

  changeTimezone(event, index) {
    if (event) {
      this.lineDate[index].zone = event;
    }
  }

}