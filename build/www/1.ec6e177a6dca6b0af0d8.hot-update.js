webpackHotUpdate(1,{

/***/ "./src/main/webapp/app/screens/biz-interview/components/schedule-tab/tab-schedule.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar interview_service_1 = __webpack_require__(\"./src/main/webapp/app/screens/biz-interview/services/interview.service.ts\");\r\nvar common_1 = __webpack_require__(\"./node_modules/@angular/common/esm5/common.js\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar ng_bootstrap_1 = __webpack_require__(\"./node_modules/@ng-bootstrap/ng-bootstrap/index.js\");\r\nvar confirm_modal_component_1 = __webpack_require__(\"./src/main/webapp/app/screens/biz-interview/components/confirm-modal/confirm-modal.component.ts\");\r\nvar ScheduleTabComponent = /** @class */ (function () {\r\n    function ScheduleTabComponent(interviewService, principal, datePipe, modalService, elementRef) {\r\n        var _this = this;\r\n        this.interviewService = interviewService;\r\n        this.principal = principal;\r\n        this.datePipe = datePipe;\r\n        this.modalService = modalService;\r\n        this.elementRef = elementRef;\r\n        this.switch = '';\r\n        this.showSelectDate = false;\r\n        this.dataClick = {};\r\n        this.lineDate = [\r\n            {\r\n                timezone: '',\r\n                fromTime: '',\r\n                toTime: '',\r\n                zone: ''\r\n            }\r\n        ];\r\n        this.data = {\r\n            \"id\": '',\r\n            \"interviewSessionScheduleList\": [],\r\n            \"note\": 'string'\r\n        };\r\n        this.timezone = '';\r\n        this.principal.identity().then(function (account) {\r\n            _this.role = account.authorities[1];\r\n            console.log('current user: ', account);\r\n        });\r\n    }\r\n    ScheduleTabComponent.prototype.checkBizAcepted = function (data) {\r\n        var schedule = data.suggestedInterviewSchedules;\r\n        if (schedule.length > 0) {\r\n            schedule.forEach(function (el, i) {\r\n                if (el.proAccepted && el.bizAccepted) {\r\n                    console.log('checkBizAcepted', i);\r\n                    console.log('checkBizAcepted', el);\r\n                }\r\n            });\r\n        }\r\n    };\r\n    ScheduleTabComponent.prototype.ngOnChanges = function (changes) {\r\n        if (this.session) {\r\n            this.id = this.session.id;\r\n            this.sessions = this.session;\r\n            this.checkBizAcepted(this.sessions);\r\n            console.log('onChanges--', this.sessions);\r\n        }\r\n        if (this.interview) {\r\n            this.idInter = this.interview.id;\r\n        }\r\n    };\r\n    ScheduleTabComponent.prototype.ngAfterViewInit = function () {\r\n        this.initTooltip('#tooltip-message');\r\n    };\r\n    ScheduleTabComponent.prototype.initTooltip = function (id) {\r\n        window.initTooltip(id);\r\n    };\r\n    ScheduleTabComponent.prototype.onClick = function (e) {\r\n        var _a = e.target, value = _a.value, name = _a.name, id = _a.id;\r\n        id = id.replace('radio', '');\r\n        this.dataClick = Object.assign({}, this.dataClick, (_b = {},\r\n            _b[name] = [value, id],\r\n            _b));\r\n        console.log('dataClick---', this.dataClick);\r\n        this.switch = e.target.value;\r\n        e.target.value === 'add' ? this.showSelectDate = true : this.showSelectDate = false;\r\n        var _b;\r\n    };\r\n    ScheduleTabComponent.prototype.recievedDate = function (value) {\r\n        var id = value.id, data = value.data;\r\n        this.lineDate[id].timezone = data;\r\n    };\r\n    ScheduleTabComponent.prototype.recievedTime = function (value) {\r\n        var id = value.id, data = value.data, name = value.name;\r\n        this.lineDate[id][name] = data;\r\n    };\r\n    ScheduleTabComponent.prototype.onRemoveLine = function (index) {\r\n        this.lineDate.splice(index, 1);\r\n    };\r\n    ScheduleTabComponent.prototype.onAddLine = function () {\r\n        this.lineDate.push({\r\n            timezone: '',\r\n            fromTime: '',\r\n            toTime: '',\r\n            zone: ''\r\n        });\r\n    };\r\n    ScheduleTabComponent.prototype.checkDisabled = function () {\r\n        var data = this.dataClick;\r\n        for (var key in data) {\r\n            if (data[key] === 'add' || data[key] === 'request') {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    };\r\n    ScheduleTabComponent.prototype.parseData = function (session, date) {\r\n        var _this = this;\r\n        if (this.switch === 'add') {\r\n            var suggestedInterviewSchedules_1 = [];\r\n            date.forEach(function (item, index) {\r\n                var data = {};\r\n                data = {\r\n                    \"bizAccepted\": _this.role === 'ROLE_BIZ' ? true : false,\r\n                    \"duration\": 30,\r\n                    \"fromTime\": item.fromTime,\r\n                    \"interviewDate\": new Date(item.timezone),\r\n                    \"interviewSessionId\": _this.id,\r\n                    \"note\": \"string\",\r\n                    \"timezone\": \"string\",\r\n                    \"proAccepted\": _this.role === 'ROLE_BIZ' ? false : true,\r\n                };\r\n                suggestedInterviewSchedules_1.push(data);\r\n            });\r\n            this.data.interviewSessionScheduleList.push({\r\n                id: this.id,\r\n                suggestedInterviewSchedules: suggestedInterviewSchedules_1\r\n            });\r\n            this.data.id = this.idInter;\r\n            return this.data;\r\n        }\r\n        else if (this.switch === 'request') {\r\n            var data = {};\r\n            data = {\r\n                id: session.id,\r\n                suggestedInterviewSchedules: []\r\n            };\r\n            return data;\r\n        }\r\n        else {\r\n            var data = {};\r\n            var suggestedInterviewSchedules = session.suggestedInterviewSchedules;\r\n            var keys = Object.keys(date);\r\n            var value = date[keys[0]];\r\n            var schedule = [];\r\n            var index = value[1];\r\n            var scheduleSugget = suggestedInterviewSchedules[index];\r\n            data = {\r\n                \"bizAccepted\": this.role === 'ROLE_BIZ' ? true : false,\r\n                \"duration\": scheduleSugget.duration,\r\n                \"fromTime\": scheduleSugget.fromTime,\r\n                \"id\": scheduleSugget.id,\r\n                \"interviewDate\": new Date(value[0]),\r\n                \"interviewSessionId\": session.id,\r\n                \"timezone\": \"string\",\r\n                \"proAccepted\": this.role === 'ROLE_BIZ' ? false : true,\r\n            };\r\n            schedule.push(data);\r\n            var result = {\r\n                id: session.id,\r\n                suggestedInterviewSchedules: schedule\r\n            };\r\n            return result;\r\n            // suggestedInterviewSchedules[index].interviewDate = value;\r\n            // suggestedInterviewSchedules[index].interviewSessionId = this.id;\r\n            // if (this.role === 'ROLE_BIZ') {\r\n            //   suggestedInterviewSchedules[index].bizAccepted = true;\r\n            // } else {\r\n            //   suggestedInterviewSchedules[index].proAccepted = true;\r\n            // }\r\n            // this.data.id = this.idInter;\r\n            // this.data.interviewSessionScheduleList.push({\r\n            //   id: this.id,\r\n            //   suggestedInterviewSchedules: suggestedInterviewSchedules\r\n            // })\r\n            // return this.data;\r\n        }\r\n    };\r\n    ScheduleTabComponent.prototype.formartData = function (sessions, dateAvailability, lineDate) {\r\n        var data = {};\r\n        if (this.switch === 'add') {\r\n            data = this.parseData(sessions, lineDate);\r\n            return data;\r\n        }\r\n        else if (this.switch === 'request') {\r\n            data = this.parseData(sessions, dateAvailability);\r\n            return data;\r\n        }\r\n        else {\r\n            data = this.parseData(sessions, dateAvailability);\r\n            return data;\r\n        }\r\n    };\r\n    ScheduleTabComponent.prototype.onSubmitData = function (type) {\r\n        var data = {};\r\n        data = this.formartData(this.sessions, this.dataClick, this.lineDate);\r\n        data = Object.assign({}, data, { type: type, note: this.note });\r\n        console.log('onSubmit----', data);\r\n        // this.interviewService.updateSchedule(data).subscribe(result => {\r\n        // });\r\n    };\r\n    ScheduleTabComponent.prototype.showConfirmDialog = function () {\r\n        var _this = this;\r\n        var modalRef = this.modalService.open(confirm_modal_component_1.ConfirmModalComponent);\r\n        modalRef.result.then(function (result) {\r\n            _this.interviewService.updateSchedule({\r\n                id: _this.idInter,\r\n                type: 0,\r\n                interviewSessionScheduleList: [] // required\r\n            }).subscribe(function (data) {\r\n                console.log('cancel successfully!');\r\n            });\r\n        }, function (reason) {\r\n            console.log('reason confirm cancel: ', reason);\r\n        });\r\n        return modalRef;\r\n    };\r\n    ScheduleTabComponent.prototype.changeTimezone = function (event, index) {\r\n        if (event) {\r\n            this.lineDate[index].zone = event;\r\n        }\r\n    };\r\n    __decorate([\r\n        core_1.Input('session'),\r\n        __metadata(\"design:type\", Object)\r\n    ], ScheduleTabComponent.prototype, \"session\", void 0);\r\n    __decorate([\r\n        core_1.Input('interview'),\r\n        __metadata(\"design:type\", Object)\r\n    ], ScheduleTabComponent.prototype, \"interview\", void 0);\r\n    ScheduleTabComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'app-schedule-tab',\r\n            template: __webpack_require__(\"./src/main/webapp/app/screens/biz-interview/components/schedule-tab/tab-schedule.component.html\"),\r\n            styles: [__webpack_require__(\"./src/main/webapp/app/screens/biz-interview/components/schedule-tab/tab-schedule.component.css\")]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [interview_service_1.InterviewService,\r\n            shared_1.Principal,\r\n            common_1.DatePipe,\r\n            ng_bootstrap_1.NgbModal,\r\n            core_1.ElementRef])\r\n    ], ScheduleTabComponent);\r\n    return ScheduleTabComponent;\r\n}());\r\nexports.ScheduleTabComponent = ScheduleTabComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NjcmVlbnMvYml6LWludGVydmlldy9jb21wb25lbnRzL3NjaGVkdWxlLXRhYi90YWItc2NoZWR1bGUuY29tcG9uZW50LnRzPzRjYWYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw4RUFBcUU7QUFHckUsMkhBQXNFO0FBQ3RFLG9GQUEyQztBQUMzQyw0RUFBK0M7QUFDL0MsK0ZBQW1FO0FBQ25FLHVKQUFpRjtBQU9qRjtJQThCRSw4QkFDUyxnQkFBa0MsRUFDakMsU0FBb0IsRUFDcEIsUUFBa0IsRUFDbEIsWUFBc0IsRUFDdEIsVUFBc0I7UUFMaEMsaUJBV0M7UUFWUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixpQkFBWSxHQUFaLFlBQVksQ0FBVTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBL0JoQyxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBRVosbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQVFmLGFBQVEsR0FBRztZQUNUO2dCQUNFLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFFBQVEsRUFBRSxFQUFFO2dCQUNaLE1BQU0sRUFBRSxFQUFFO2dCQUNWLElBQUksRUFBRSxFQUFFO2FBQ1Q7U0FDRjtRQUNELFNBQUksR0FBRztZQUNMLElBQUksRUFBRSxFQUFFO1lBQ1IsOEJBQThCLEVBQUUsRUFBRTtZQUNsQyxNQUFNLEVBQUUsUUFBUTtTQUNqQjtRQUNELGFBQVEsR0FBVyxFQUFFLENBQUM7UUFTcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO1lBQ3JDLEtBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEMsT0FBTyxD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cy9iaXotaW50ZXJ2aWV3L2NvbXBvbmVudHMvc2NoZWR1bGUtdGFiL3RhYi1zY2hlZHVsZS5jb21wb25lbnQudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSmhpQWxlcnRTZXJ2aWNlIH0gZnJvbSAnbmctamhpcHN0ZXInO1xyXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbnRlcnZpZXdTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9pbnRlcnZpZXcuc2VydmljZSc7XHJcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUHJpbmNpcGFsIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkJztcclxuaW1wb3J0IHsgTmdiTW9kYWwsIE5nYk1vZGFsUmVmIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xyXG5pbXBvcnQgeyBDb25maXJtTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi9jb25maXJtLW1vZGFsL2NvbmZpcm0tbW9kYWwuY29tcG9uZW50JztcclxuZGVjbGFyZSB2YXIgd2luZG93OiBhbnk7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXNjaGVkdWxlLXRhYicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYi1zY2hlZHVsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGFiLXNjaGVkdWxlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2NoZWR1bGVUYWJDb21wb25lbnQge1xyXG4gIC8vIEBJbnB1dCgnaW50ZXJ2aWV3JykgcHVibGljIGludGVydmlldzogYW55O1xyXG4gIEBJbnB1dCgnc2Vzc2lvbicpIHB1YmxpYyBzZXNzaW9uOiBhbnk7XHJcbiAgQElucHV0KCdpbnRlcnZpZXcnKSBwdWJsaWMgaW50ZXJ2aWV3OiBhbnk7XHJcbiAgc3dpdGNoID0gJyc7XHJcbiAgc2Vzc2lvbnM6IGFueTtcclxuICBzaG93U2VsZWN0RGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGRhdGFDbGljayA9IHt9O1xyXG5cclxuICBkYXRlQXZhaWxhYmlsaXR5OiBhbnk7XHJcbiAgaWRJbnRlcjogYW55O1xyXG4gIGlkOiBhbnk7XHJcbiAgcm9sZTogYW55O1xyXG4gIG5vdGU6IGFueTtcclxuXHJcbiAgbGluZURhdGUgPSBbXHJcbiAgICB7XHJcbiAgICAgIHRpbWV6b25lOiAnJyxcclxuICAgICAgZnJvbVRpbWU6ICcnLFxyXG4gICAgICB0b1RpbWU6ICcnLFxyXG4gICAgICB6b25lOiAnJ1xyXG4gICAgfVxyXG4gIF1cclxuICBkYXRhID0ge1xyXG4gICAgXCJpZFwiOiAnJyxcclxuICAgIFwiaW50ZXJ2aWV3U2Vzc2lvblNjaGVkdWxlTGlzdFwiOiBbXSxcclxuICAgIFwibm90ZVwiOiAnc3RyaW5nJ1xyXG4gIH1cclxuICB0aW1lem9uZTogc3RyaW5nID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGludGVydmlld1NlcnZpY2U6IEludGVydmlld1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHByaW5jaXBhbDogUHJpbmNpcGFsLFxyXG4gICAgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGUsXHJcbiAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTmdiTW9kYWwsXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcclxuICApIHtcclxuICAgIHRoaXMucHJpbmNpcGFsLmlkZW50aXR5KCkudGhlbigoYWNjb3VudCkgPT4ge1xyXG4gICAgICB0aGlzLnJvbGUgPSBhY2NvdW50LmF1dGhvcml0aWVzWzFdXHJcbiAgICAgIGNvbnNvbGUubG9nKCdjdXJyZW50IHVzZXI6ICcsIGFjY291bnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGVja0JpekFjZXB0ZWQoZGF0YSkge1xyXG4gICAgbGV0IHNjaGVkdWxlID0gZGF0YS5zdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXM7XHJcbiAgICBpZiAoc2NoZWR1bGUubGVuZ3RoID4gMCkge1xyXG4gICAgICBzY2hlZHVsZS5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChlbC5wcm9BY2NlcHRlZCAmJiBlbC5iaXpBY2NlcHRlZCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrQml6QWNlcHRlZCcsIGkpXHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tCaXpBY2VwdGVkJywgZWwpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc2Vzc2lvbikge1xyXG4gICAgICB0aGlzLmlkID0gdGhpcy5zZXNzaW9uLmlkO1xyXG4gICAgICB0aGlzLnNlc3Npb25zID0gdGhpcy5zZXNzaW9uO1xyXG4gICAgICB0aGlzLmNoZWNrQml6QWNlcHRlZCh0aGlzLnNlc3Npb25zKTtcclxuICAgICAgY29uc29sZS5sb2coJ29uQ2hhbmdlcy0tJywgdGhpcy5zZXNzaW9ucylcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmludGVydmlldykge1xyXG4gICAgICB0aGlzLmlkSW50ZXIgPSB0aGlzLmludGVydmlldy5pZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuaW5pdFRvb2x0aXAoJyN0b29sdGlwLW1lc3NhZ2UnKTtcclxuICB9XHJcblxyXG4gIGluaXRUb29sdGlwKGlkKSB7XHJcbiAgICB3aW5kb3cuaW5pdFRvb2x0aXAoaWQpO1xyXG4gIH1cclxuXHJcbiAgb25DbGljayhlKSB7XHJcbiAgICBsZXQgeyB2YWx1ZSwgbmFtZSwgaWQgfSA9IGUudGFyZ2V0O1xyXG4gICAgaWQgPSBpZC5yZXBsYWNlKCdyYWRpbycsICcnKTtcclxuICAgIHRoaXMuZGF0YUNsaWNrID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kYXRhQ2xpY2ssIHtcclxuICAgICAgW25hbWVdOiBbdmFsdWUsIGlkXVxyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZygnZGF0YUNsaWNrLS0tJywgdGhpcy5kYXRhQ2xpY2spO1xyXG4gICAgdGhpcy5zd2l0Y2ggPSBlLnRhcmdldC52YWx1ZTtcclxuICAgIGUudGFyZ2V0LnZhbHVlID09PSAnYWRkJyA/IHRoaXMuc2hvd1NlbGVjdERhdGUgPSB0cnVlIDogdGhpcy5zaG93U2VsZWN0RGF0ZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmVjaWV2ZWREYXRlKHZhbHVlKSB7XHJcbiAgICBsZXQgeyBpZCwgZGF0YSB9ID0gdmFsdWU7XHJcbiAgICB0aGlzLmxpbmVEYXRlW2lkXS50aW1lem9uZSA9IGRhdGE7XHJcbiAgfVxyXG5cclxuICByZWNpZXZlZFRpbWUodmFsdWUpIHtcclxuICAgIGxldCB7IGlkLCBkYXRhLCBuYW1lIH0gPSB2YWx1ZTtcclxuICAgIHRoaXMubGluZURhdGVbaWRdW25hbWVdID0gZGF0YTtcclxuICB9XHJcblxyXG4gIG9uUmVtb3ZlTGluZShpbmRleCkge1xyXG4gICAgdGhpcy5saW5lRGF0ZS5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgfVxyXG5cclxuICBvbkFkZExpbmUoKSB7XHJcbiAgICB0aGlzLmxpbmVEYXRlLnB1c2goXHJcbiAgICAgIHtcclxuICAgICAgICB0aW1lem9uZTogJycsXHJcbiAgICAgICAgZnJvbVRpbWU6ICcnLFxyXG4gICAgICAgIHRvVGltZTogJycsXHJcbiAgICAgICAgem9uZTogJydcclxuICAgICAgfSxcclxuICAgIClcclxuICB9XHJcbiAgY2hlY2tEaXNhYmxlZCgpIHtcclxuICAgIGxldCBkYXRhID0gdGhpcy5kYXRhQ2xpY2s7XHJcbiAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICBpZiAoZGF0YVtrZXldID09PSAnYWRkJyB8fCBkYXRhW2tleV0gPT09ICdyZXF1ZXN0Jykge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHBhcnNlRGF0YShzZXNzaW9uLCBkYXRlKSB7XHJcbiAgICBpZiAodGhpcy5zd2l0Y2ggPT09ICdhZGQnKSB7XHJcbiAgICAgIGxldCBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXMgPSBbXTtcclxuICAgICAgZGF0ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBkYXRhID0ge307XHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgIFwiYml6QWNjZXB0ZWRcIjogdGhpcy5yb2xlID09PSAnUk9MRV9CSVonID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgXCJkdXJhdGlvblwiOiAzMCxcclxuICAgICAgICAgIFwiZnJvbVRpbWVcIjogaXRlbS5mcm9tVGltZSxcclxuICAgICAgICAgIFwiaW50ZXJ2aWV3RGF0ZVwiOiBuZXcgRGF0ZShpdGVtLnRpbWV6b25lKSxcclxuICAgICAgICAgIFwiaW50ZXJ2aWV3U2Vzc2lvbklkXCI6IHRoaXMuaWQsXHJcbiAgICAgICAgICBcIm5vdGVcIjogXCJzdHJpbmdcIixcclxuICAgICAgICAgIFwidGltZXpvbmVcIjogXCJzdHJpbmdcIixcclxuICAgICAgICAgIFwicHJvQWNjZXB0ZWRcIjogdGhpcy5yb2xlID09PSAnUk9MRV9CSVonID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXMucHVzaChkYXRhKVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5kYXRhLmludGVydmlld1Nlc3Npb25TY2hlZHVsZUxpc3QucHVzaCh7XHJcbiAgICAgICAgaWQ6IHRoaXMuaWQsXHJcbiAgICAgICAgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzOiBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXNcclxuICAgICAgfSlcclxuICAgICAgdGhpcy5kYXRhLmlkID0gdGhpcy5pZEludGVyO1xyXG4gICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnN3aXRjaCA9PT0gJ3JlcXVlc3QnKSB7XHJcbiAgICAgIGxldCBkYXRhID0ge31cclxuICAgICAgZGF0YSA9IHtcclxuICAgICAgICBpZDogc2Vzc2lvbi5pZCxcclxuICAgICAgICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXM6IFtdXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICBsZXQgeyBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXMgfSA9IHNlc3Npb247XHJcbiAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoZGF0ZSk7XHJcbiAgICAgIGxldCB2YWx1ZSA9IGRhdGVba2V5c1swXV07XHJcbiAgICAgIGxldCBzY2hlZHVsZSA9IFtdO1xyXG4gICAgICBsZXQgaW5kZXggPSB2YWx1ZVsxXTtcclxuICAgICAgbGV0IHNjaGVkdWxlU3VnZ2V0ID0gc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzW2luZGV4XTtcclxuICAgICAgZGF0YSA9IHtcclxuICAgICAgICBcImJpekFjY2VwdGVkXCI6IHRoaXMucm9sZSA9PT0gJ1JPTEVfQklaJyA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICBcImR1cmF0aW9uXCI6IHNjaGVkdWxlU3VnZ2V0LmR1cmF0aW9uLFxyXG4gICAgICAgIFwiZnJvbVRpbWVcIjogc2NoZWR1bGVTdWdnZXQuZnJvbVRpbWUsXHJcbiAgICAgICAgXCJpZFwiOiBzY2hlZHVsZVN1Z2dldC5pZCxcclxuICAgICAgICBcImludGVydmlld0RhdGVcIjogbmV3IERhdGUodmFsdWVbMF0pLFxyXG4gICAgICAgIFwiaW50ZXJ2aWV3U2Vzc2lvbklkXCI6IHNlc3Npb24uaWQsXHJcbiAgICAgICAgXCJ0aW1lem9uZVwiOiBcInN0cmluZ1wiLFxyXG4gICAgICAgIFwicHJvQWNjZXB0ZWRcIjogdGhpcy5yb2xlID09PSAnUk9MRV9CSVonID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICB9XHJcbiAgICAgIHNjaGVkdWxlLnB1c2goZGF0YSlcclxuICAgICAgbGV0IHJlc3VsdCA9IHtcclxuICAgICAgICBpZDogc2Vzc2lvbi5pZCxcclxuICAgICAgICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXM6IHNjaGVkdWxlXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgLy8gc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzW2luZGV4XS5pbnRlcnZpZXdEYXRlID0gdmFsdWU7XHJcbiAgICAgIC8vIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1tpbmRleF0uaW50ZXJ2aWV3U2Vzc2lvbklkID0gdGhpcy5pZDtcclxuICAgICAgLy8gaWYgKHRoaXMucm9sZSA9PT0gJ1JPTEVfQklaJykge1xyXG4gICAgICAvLyAgIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1tpbmRleF0uYml6QWNjZXB0ZWQgPSB0cnVlO1xyXG4gICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAvLyAgIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1tpbmRleF0ucHJvQWNjZXB0ZWQgPSB0cnVlO1xyXG4gICAgICAvLyB9XHJcblxyXG4gICAgICAvLyB0aGlzLmRhdGEuaWQgPSB0aGlzLmlkSW50ZXI7XHJcbiAgICAgIC8vIHRoaXMuZGF0YS5pbnRlcnZpZXdTZXNzaW9uU2NoZWR1bGVMaXN0LnB1c2goe1xyXG4gICAgICAvLyAgIGlkOiB0aGlzLmlkLFxyXG4gICAgICAvLyAgIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlczogc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzXHJcbiAgICAgIC8vIH0pXHJcblxyXG4gICAgICAvLyByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9ybWFydERhdGEoc2Vzc2lvbnMsIGRhdGVBdmFpbGFiaWxpdHksIGxpbmVEYXRlKSB7XHJcbiAgICBsZXQgZGF0YSA9IHt9XHJcbiAgICBpZiAodGhpcy5zd2l0Y2ggPT09ICdhZGQnKSB7XHJcbiAgICAgIGRhdGEgPSB0aGlzLnBhcnNlRGF0YShzZXNzaW9ucywgbGluZURhdGUpXHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnN3aXRjaCA9PT0gJ3JlcXVlc3QnKSB7XHJcbiAgICAgIGRhdGEgPSB0aGlzLnBhcnNlRGF0YShzZXNzaW9ucywgZGF0ZUF2YWlsYWJpbGl0eSlcclxuICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkYXRhID0gdGhpcy5wYXJzZURhdGEoc2Vzc2lvbnMsIGRhdGVBdmFpbGFiaWxpdHkpXHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25TdWJtaXREYXRhKHR5cGUpIHtcclxuICAgIGxldCBkYXRhID0ge307XHJcbiAgICBkYXRhID0gdGhpcy5mb3JtYXJ0RGF0YSh0aGlzLnNlc3Npb25zLCB0aGlzLmRhdGFDbGljaywgdGhpcy5saW5lRGF0ZSk7XHJcbiAgICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwgeyB0eXBlOiB0eXBlLCBub3RlOiB0aGlzLm5vdGUgfSlcclxuICAgIGNvbnNvbGUubG9nKCdvblN1Ym1pdC0tLS0nLCBkYXRhKVxyXG4gICAgLy8gdGhpcy5pbnRlcnZpZXdTZXJ2aWNlLnVwZGF0ZVNjaGVkdWxlKGRhdGEpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG5cclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcbiAgc2hvd0NvbmZpcm1EaWFsb2coKTogTmdiTW9kYWxSZWYge1xyXG4gICAgY29uc3QgbW9kYWxSZWYgPSB0aGlzLm1vZGFsU2VydmljZS5vcGVuKENvbmZpcm1Nb2RhbENvbXBvbmVudCk7XHJcbiAgICBtb2RhbFJlZi5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIHRoaXMuaW50ZXJ2aWV3U2VydmljZS51cGRhdGVTY2hlZHVsZSh7XHJcbiAgICAgICAgaWQ6IHRoaXMuaWRJbnRlcixcclxuICAgICAgICB0eXBlOiAwLFxyXG4gICAgICAgIGludGVydmlld1Nlc3Npb25TY2hlZHVsZUxpc3Q6IFtdIC8vIHJlcXVpcmVkXHJcbiAgICAgIH0pLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2FuY2VsIHN1Y2Nlc3NmdWxseSEnKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCAocmVhc29uKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdyZWFzb24gY29uZmlybSBjYW5jZWw6ICcsIHJlYXNvbik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtb2RhbFJlZjtcclxuICB9XHJcblxyXG4gIGNoYW5nZVRpbWV6b25lKGV2ZW50LCBpbmRleCkge1xyXG4gICAgaWYoZXZlbnQpe1xyXG4gICAgICB0aGlzLmxpbmVEYXRlW2luZGV4XS56b25lID0gZXZlbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NjcmVlbnMvYml6LWludGVydmlldy9jb21wb25lbnRzL3NjaGVkdWxlLXRhYi90YWItc2NoZWR1bGUuY29tcG9uZW50LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/webapp/app/screens/biz-interview/components/schedule-tab/tab-schedule.component.ts\n");

/***/ })

})