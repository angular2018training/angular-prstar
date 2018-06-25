import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InterviewService } from './services/interview.service';
import { DatePipe } from '@angular/common';
import { Principal } from '../../../shared';
import { JhiAlertService } from 'ng-jhipster';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
declare var window: any;
@Component({
  selector: 'pro-interview-schedule-tab',
  templateUrl: './tab-schedule.component.html',
  styleUrls: ['./tab-schedule.component.css']
})
export class ProInterviewScheduleTabComponent {
  // @Input('session') public session: any;
  @Input('interview') public interview: any;
  @Output() refreshData = new EventEmitter<any>();
  switch = '';
  sessions: any[];
  showSelectDate: boolean = false;
  dataClick = {};
  disableList = [];
  isSubmit = true;
  disableNotice = true;

  dateAvailability: any;
  idInter: any;
  id: any;
  isBiz: any;
  note: any;
  noteStatic: string;

  lineDate = [
    {
      timezone: '',
      fromTime: '',
      toTime: ''
    }
  ]

  lineDatas = []

  data = {
    "id": '',
    "type": '',
    "interviewSessionScheduleList": [],
    "bizNote": ''
  }

  constructor(
    public interviewService: InterviewService,
    private principal: Principal,
    private datePipe: DatePipe,
    private modalService: NgbModal
  ) {
    this.principal.hasAnyAuthority(['ROLE_BIZ']).then((isBiz) => {
      this.isBiz = isBiz;
    });
  }

  checkDateAccept(date) {
    if (date) {
      if ((date.proAccepted === true) && (date.bizAccepted === true)) {
        return 'checked';
      } else {
        return '';
      }

    }
  }

  checkBizAcepted(data, key) {
    let schedule = data.suggestedInterviewSchedules;
    if (schedule.length > 0) {
      schedule.forEach((el, i) => {
        if ((el.proAccepted === true) && (el.bizAccepted === true)) {
          let name = 'group' + key;
          this.dataClick = Object.assign({}, this.dataClick, {
            [name]: [el.interviewDate, key * i, i]
          });
          this.disableNotice = false;
        }
      });
    }
    // console.log('dataClick----', this.dataClick)

  }

  ngOnChanges(changes: any): void {
    if (this.interview) {
      this.idInter = this.interview.id;
      this.sessions = this.interview.interviewSessions;
      console.log('onChanges-----', this.interview);
      this.lineDatas = [];
      this.dataClick = {};
      this.note = '';
      this.sessions.forEach((item, index) => {
        this.checkBizAcepted(item, index)
        let key = 'disable' + index;
        let line = 'line' + index;
        this.disableList.push({
          [key]: false
        })
        this.lineDatas.push({
          [line]: [
            {
              timezone: '',
              fromTime: '',
              toTime: '',
              zone: ''
            }
          ]
        })
      })
    }
  }

  onClick(e, key, i = null) {
    let { value, name, id } = e.target;
    let index = id.replace('radio', '');

    this.dataClick = Object.assign({}, this.dataClick, {
      [name]: [value, index, i]
    });

    if (value.includes('add')) {
      let i = value.replace('add', '')
      this.disableList[i][`disable${i}`] = true
    } else {
      this.disableList[key][`disable${key}`] = false
    }
  }

  recievedDate(value, key) {
    let { id, data } = value;
    if (this.lineDatas[key] && data) {
      this.lineDatas[key][`line${key}`][id].timezone = data;
    }
  }

  ngAfterViewInit() {
    this.initTooltip('#tooltip-message');
  }

  initTooltip(id) {
    window.initTooltip(id);
  }

  recievedTime(value, key) {
    let { id, data, name } = value;
    if (this.lineDatas[key] && data) {
      this.lineDatas[key][`line${key}`][id][name] = data;
    }
  }

  onRemoveLine(index, key) {
    if (this.lineDatas[key]) {
      this.lineDatas[key][`line${key}`].splice(index, 1);
    }
    this.lineDate.splice(index, 1)
  }

  onAddLine(key) {
    if (this.lineDatas[key]) {
      this.lineDatas[key][`line${key}`].push({
        timezone: '',
        fromTime: '',
        toTime: '',
        zone: ''
      })
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

  checkSubmitAddDate(date) {
    let temp = 0;
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

  parseData(index, valueClick) {
    let sessions = this.sessions;
    if (valueClick[0] === 'request') {
      this.isSubmit = true;
      let data: any = {};
      let session = sessions[index];
      let { suggestedInterviewSchedules } = session;
      data = {
        id: session.id,
        suggestedInterviewSchedules: []
      }
      return data
    } else if (valueClick[0].includes('add')) {
      let result = {};
      let suggestedInterviewSchedules = [];
      let session = sessions[index];
      let value = this.lineDatas[index][`line${index}`];
      this.checkSubmitAddDate(value);
      for (let index in value) {
        let item = value[index];
        let data = {};
        if (item && item.fromTime && item.timezone) {
          data = {
            "bizAccepted": this.isBiz ? true : false,
            "duration": this.parseDuaration(item.fromTime, item.toTime),
            "fromTime": item.fromTime,
            "interviewDate": new Date(item.timezone),
            "interviewSessionId": session.id,
            "timezone": item.zone,
            "proAccepted": this.isBiz ? false : true,
          }
          suggestedInterviewSchedules.push(data)
        }
      }
      result = {
        id: session.id,
        suggestedInterviewSchedules: suggestedInterviewSchedules
      }
      return result;
    } else {
      this.isSubmit = true;
      let result = {};
      let data = {};
      let schedule = [];
      let session = sessions[index];
      let scheduleSugget = session.suggestedInterviewSchedules[valueClick[2]];
      data = {
        "bizAccepted": this.checkRole(this.isBiz, scheduleSugget, 'biz'),
        "duration": scheduleSugget.duration,
        "fromTime": valueClick[0],
        "id": scheduleSugget['id'],
        "interviewDate": new Date(valueClick[0]),
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
    }
  }

  formartData(clickDate) {
    let keys = Object.keys(clickDate);
    let sessions = this.sessions;
    let dataParse = {};
    let dataRecive = [];
    keys.forEach((key, index) => {
      let i = key.replace('group', '')
      dataParse = this.parseData(i, clickDate[key])
      dataRecive.push(dataParse)
    })
    return dataRecive;
  }
  onSubmitData(type) {
    let data = [];
    data = this.formartData(this.dataClick);
    this.data.id = this.idInter;
    this.data.interviewSessionScheduleList = data;
    this.data.type = type;
    this.data.bizNote = this.note;
    if (this.isSubmit) {
      this.interviewService.updateSchedule(this.data).subscribe(result => {
        this.refreshData.emit();
        this.showNotificationDialog();
      });
    }
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

  changeTimezone(event, index, key) {
    if (this.lineDatas[key] && event) {
      this.lineDatas[key][`line${key}`][index].zone = event;
    }
    console.log('changeTimezone', this.lineDatas)
    // console.log('lineData', this.lineDatas)
    // console.log('event: ', event);
    // console.log('index: ', index);
  }

}
