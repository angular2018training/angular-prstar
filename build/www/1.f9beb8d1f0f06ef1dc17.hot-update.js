webpackHotUpdate(1,{

/***/ "./src/main/webapp/app/screens/biz-interview/components/schedule-tab/tab-schedule.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar interview_service_1 = __webpack_require__(\"./src/main/webapp/app/screens/biz-interview/services/interview.service.ts\");\r\nvar common_1 = __webpack_require__(\"./node_modules/@angular/common/esm5/common.js\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar ng_bootstrap_1 = __webpack_require__(\"./node_modules/@ng-bootstrap/ng-bootstrap/index.js\");\r\nvar confirm_modal_component_1 = __webpack_require__(\"./src/main/webapp/app/screens/biz-interview/components/confirm-modal/confirm-modal.component.ts\");\r\nvar ScheduleTabComponent = /** @class */ (function () {\r\n    function ScheduleTabComponent(interviewService, principal, datePipe, modalService, elementRef) {\r\n        var _this = this;\r\n        this.interviewService = interviewService;\r\n        this.principal = principal;\r\n        this.datePipe = datePipe;\r\n        this.modalService = modalService;\r\n        this.elementRef = elementRef;\r\n        this.switch = '';\r\n        this.showSelectDate = false;\r\n        this.dataClick = {};\r\n        this.lineDate = [\r\n            {\r\n                timezone: '',\r\n                fromTime: '',\r\n                toTime: '',\r\n                zone: ''\r\n            }\r\n        ];\r\n        this.data = {\r\n            \"id\": '',\r\n            \"interviewSessionScheduleList\": [],\r\n            \"note\": 'string',\r\n            \"type\": ''\r\n        };\r\n        this.timezone = '';\r\n        this.principal.identity().then(function (account) {\r\n            _this.role = account.authorities[1];\r\n            console.log('current user: ', account);\r\n        });\r\n    }\r\n    ScheduleTabComponent.prototype.checkBizAcepted = function (data) {\r\n        var _this = this;\r\n        var schedule = data.suggestedInterviewSchedules;\r\n        if (schedule.length > 0) {\r\n            schedule.forEach(function (el, i) {\r\n                if (el.proAccepted && el.bizAccepted) {\r\n                    _this.dataClick = Object.assign({}, _this.dataClick, (_a = {},\r\n                        _a[name] = [el.interviewDate, i],\r\n                        _a));\r\n                }\r\n                var _a;\r\n            });\r\n        }\r\n        console.log('valueMAcDinh---', this.dataClick);\r\n    };\r\n    ScheduleTabComponent.prototype.ngOnChanges = function (changes) {\r\n        if (this.session) {\r\n            this.id = this.session.id;\r\n            this.sessions = this.session;\r\n            this.checkBizAcepted(this.sessions);\r\n            console.log('onChanges--', this.sessions);\r\n        }\r\n        if (this.interview) {\r\n            this.idInter = this.interview.id;\r\n        }\r\n    };\r\n    ScheduleTabComponent.prototype.ngAfterViewInit = function () {\r\n        this.initTooltip('#tooltip-message');\r\n    };\r\n    ScheduleTabComponent.prototype.initTooltip = function (id) {\r\n        window.initTooltip(id);\r\n    };\r\n    ScheduleTabComponent.prototype.onClick = function (e) {\r\n        var _a = e.target, value = _a.value, name = _a.name, id = _a.id;\r\n        id = id.replace('radio', '');\r\n        this.dataClick = Object.assign({}, this.dataClick, (_b = {},\r\n            _b[name] = [value, id],\r\n            _b));\r\n        this.switch = e.target.value;\r\n        e.target.value === 'add' ? this.showSelectDate = true : this.showSelectDate = false;\r\n        var _b;\r\n    };\r\n    ScheduleTabComponent.prototype.recievedDate = function (value) {\r\n        var id = value.id, data = value.data;\r\n        this.lineDate[id].timezone = data;\r\n    };\r\n    ScheduleTabComponent.prototype.recievedTime = function (value) {\r\n        var id = value.id, data = value.data, name = value.name;\r\n        this.lineDate[id][name] = data;\r\n    };\r\n    ScheduleTabComponent.prototype.onRemoveLine = function (index) {\r\n        this.lineDate.splice(index, 1);\r\n    };\r\n    ScheduleTabComponent.prototype.onAddLine = function () {\r\n        this.lineDate.push({\r\n            timezone: '',\r\n            fromTime: '',\r\n            toTime: '',\r\n            zone: ''\r\n        });\r\n    };\r\n    ScheduleTabComponent.prototype.checkDisabled = function () {\r\n        var data = this.dataClick;\r\n        for (var key in data) {\r\n            if (data[key] === 'add' || data[key] === 'request') {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    };\r\n    ScheduleTabComponent.prototype.parseDuaration = function (fromTime, toTime) {\r\n        var result = 0;\r\n        if (fromTime && toTime) {\r\n            var from = fromTime.split(':');\r\n            var to = toTime.split(':');\r\n            result = (parseInt(to[0]) * 60 + parseInt(to[1])) - (parseInt(from[0]) * 60 + parseInt(from[1]));\r\n            return result;\r\n        }\r\n    };\r\n    ScheduleTabComponent.prototype.parseData = function (session, date) {\r\n        var _this = this;\r\n        if (this.switch === 'add') {\r\n            var suggestedInterviewSchedules_1 = [];\r\n            var result = {};\r\n            date.forEach(function (item, index) {\r\n                var data = {};\r\n                data = {\r\n                    \"bizAccepted\": _this.role === 'ROLE_BIZ' ? true : false,\r\n                    \"duration\": _this.parseDuaration(item.fromTime, item.toTime),\r\n                    \"fromTime\": item.fromTime,\r\n                    \"interviewDate\": new Date(item.timezone),\r\n                    \"interviewSessionId\": _this.id,\r\n                    \"timezone\": item.zone,\r\n                    \"proAccepted\": _this.role === 'ROLE_BIZ' ? false : true,\r\n                };\r\n                suggestedInterviewSchedules_1.push(data);\r\n            });\r\n            result = {\r\n                id: session.id,\r\n                suggestedInterviewSchedules: suggestedInterviewSchedules_1\r\n            };\r\n            // this.data.interviewSessionScheduleList.push({\r\n            //   id: this.id,\r\n            //   suggestedInterviewSchedules: suggestedInterviewSchedules\r\n            // })\r\n            // this.data.id = this.idInter;\r\n            return result;\r\n        }\r\n        else if (this.switch === 'request') {\r\n            var data = {};\r\n            data = {\r\n                id: session.id,\r\n                suggestedInterviewSchedules: []\r\n            };\r\n            return data;\r\n        }\r\n        else {\r\n            var suggestedInterviewSchedules = session.suggestedInterviewSchedules;\r\n            var keys = Object.keys(date);\r\n            var result = {};\r\n            var schedule = [];\r\n            var data = {};\r\n            var index = parseInt(date[keys[0]][1]);\r\n            var scheduleSugget = suggestedInterviewSchedules[index];\r\n            data = {\r\n                \"bizAccepted\": this.role === 'ROLE_BIZ' ? true : false,\r\n                \"duration\": scheduleSugget.duration,\r\n                \"fromTime\": scheduleSugget.fromTime,\r\n                \"id\": scheduleSugget.id,\r\n                \"interviewDate\": new Date(scheduleSugget.interviewDate),\r\n                \"interviewSessionId\": session.id,\r\n                \"timezone\": scheduleSugget.timezone,\r\n                \"proAccepted\": this.role === 'ROLE_BIZ' ? false : true,\r\n            };\r\n            schedule.push(data);\r\n            result = {\r\n                id: session.id,\r\n                suggestedInterviewSchedules: schedule\r\n            };\r\n            return result;\r\n            // let index = keys[0].replace('group', '')\r\n            // suggestedInterviewSchedules[index].interviewDate = value;\r\n            // suggestedInterviewSchedules[index].interviewSessionId = this.id;\r\n            // if (this.role === 'ROLE_BIZ') {\r\n            //   suggestedInterviewSchedules[index].bizAccepted = true;\r\n            // } else {\r\n            //   suggestedInterviewSchedules[index].proAccepted = true;\r\n            // }\r\n            // this.data.id = this.idInter;\r\n            // this.data.interviewSessionScheduleList.push({\r\n            //   id: this.id,\r\n            //   suggestedInterviewSchedules: suggestedInterviewSchedules\r\n            // })\r\n            // return this.data;\r\n        }\r\n    };\r\n    ScheduleTabComponent.prototype.formartData = function (sessions, dateAvailability, lineDate) {\r\n        var data = {};\r\n        if (this.switch === 'add') {\r\n            data = this.parseData(sessions, lineDate);\r\n            return data;\r\n        }\r\n        else if (this.switch === 'request') {\r\n            data = this.parseData(sessions, dateAvailability);\r\n            return data;\r\n        }\r\n        else {\r\n            data = this.parseData(sessions, dateAvailability);\r\n            return data;\r\n        }\r\n    };\r\n    ScheduleTabComponent.prototype.onSubmitData = function (type) {\r\n        var data = {};\r\n        data = this.formartData(this.sessions, this.dataClick, this.lineDate);\r\n        this.data.id = this.idInter;\r\n        this.data.interviewSessionScheduleList.push(data);\r\n        this.data.type = type;\r\n        this.data.note = this.note;\r\n        console.log('onSubmitData----', this.data);\r\n        // data = Object.assign({}, data, { type: type, note: this.note })\r\n        // this.interviewService.updateSchedule(data).subscribe(result => {\r\n        // });\r\n    };\r\n    ScheduleTabComponent.prototype.showConfirmDialog = function () {\r\n        var _this = this;\r\n        var modalRef = this.modalService.open(confirm_modal_component_1.ConfirmModalComponent);\r\n        modalRef.result.then(function (result) {\r\n            _this.interviewService.updateSchedule({\r\n                id: _this.idInter,\r\n                type: 0,\r\n                interviewSessionScheduleList: [] // required\r\n            }).subscribe(function (data) {\r\n                console.log('cancel successfully!');\r\n            });\r\n        }, function (reason) {\r\n            console.log('reason confirm cancel: ', reason);\r\n        });\r\n        return modalRef;\r\n    };\r\n    ScheduleTabComponent.prototype.changeTimezone = function (event, index) {\r\n        if (event) {\r\n            this.lineDate[index].zone = event;\r\n        }\r\n    };\r\n    __decorate([\r\n        core_1.Input('session'),\r\n        __metadata(\"design:type\", Object)\r\n    ], ScheduleTabComponent.prototype, \"session\", void 0);\r\n    __decorate([\r\n        core_1.Input('interview'),\r\n        __metadata(\"design:type\", Object)\r\n    ], ScheduleTabComponent.prototype, \"interview\", void 0);\r\n    ScheduleTabComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'app-schedule-tab',\r\n            template: __webpack_require__(\"./src/main/webapp/app/screens/biz-interview/components/schedule-tab/tab-schedule.component.html\"),\r\n            styles: [__webpack_require__(\"./src/main/webapp/app/screens/biz-interview/components/schedule-tab/tab-schedule.component.css\")]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [interview_service_1.InterviewService,\r\n            shared_1.Principal,\r\n            common_1.DatePipe,\r\n            ng_bootstrap_1.NgbModal,\r\n            core_1.ElementRef])\r\n    ], ScheduleTabComponent);\r\n    return ScheduleTabComponent;\r\n}());\r\nexports.ScheduleTabComponent = ScheduleTabComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NjcmVlbnMvYml6LWludGVydmlldy9jb21wb25lbnRzL3NjaGVkdWxlLXRhYi90YWItc2NoZWR1bGUuY29tcG9uZW50LnRzPzRjYWYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw4RUFBcUU7QUFHckUsMkhBQXNFO0FBQ3RFLG9GQUEyQztBQUMzQyw0RUFBK0M7QUFDL0MsK0ZBQW1FO0FBQ25FLHVKQUFpRjtBQU9qRjtJQStCRSw4QkFDUyxnQkFBa0MsRUFDakMsU0FBb0IsRUFDcEIsUUFBa0IsRUFDbEIsWUFBc0IsRUFDdEIsVUFBc0I7UUFMaEMsaUJBV0M7UUFWUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixpQkFBWSxHQUFaLFlBQVksQ0FBVTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBaENoQyxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBRVosbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQVFmLGFBQVEsR0FBRztZQUNUO2dCQUNFLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFFBQVEsRUFBRSxFQUFFO2dCQUNaLE1BQU0sRUFBRSxFQUFFO2dCQUNWLElBQUksRUFBRSxFQUFFO2FBQ1Q7U0FDRjtRQUNELFNBQUksR0FBRztZQUNMLElBQUksRUFBRSxFQUFFO1lBQ1IsOEJBQThCLEVBQUUsRUFBRTtZQUNsQyxNQUFNLEVBQUUsUUFBUTtZQUNoQixNQUFNLEVBQUUsRUFBRTtTQUNYO1FBQ0QsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQVNwQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87WUFDckMsS0FBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENB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QkFDUCw0QkFBNEIsRUFBRSxFQUFFLENBQUMsV0FBVzthQUM3QyxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQUk7Z0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFFLFVBQUMsTUFBTTtZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCw2Q0FBYyxHQUFkLFVBQWUsS0FBSyxFQUFFLEtBQUs7UUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQWhRaUI7UUFBakIsWUFBSyxDQUFDLFNBQVMsQ0FBQzs7eURBQXFCO0lBQ2xCO1FBQW5CLFlBQUssQ0FBQyxXQUFXLENBQUM7OzJEQUF1QjtJQUgvQixvQkFBb0I7UUFMaEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsNkJBQWEsa0dBQStCO1lBQzVDLFNBQVMsbUJBQUcsaUdBQStCO1NBQzVDLENBQUM7eUNBaUMyQixvQ0FBZ0I7WUFDdEIsa0JBQVM7WUFDVixpQkFBUTtZQUNKLHVCQUFRO1lBQ1YsaUJBQVU7T0FwQ3JCLG9CQUFvQixDQW9RaEM7SUFBRCwyQkFBQztDQUFBO0FBcFFZLG9EQUFvQiIsImZpbGUiOiIuL3NyYy9tYWluL3dlYmFwcC9hcHAvc2NyZWVucy9iaXotaW50ZXJ2aWV3L2NvbXBvbmVudHMvc2NoZWR1bGUtdGFiL3RhYi1zY2hlZHVsZS5jb21wb25lbnQudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSmhpQWxlcnRTZXJ2aWNlIH0gZnJvbSAnbmctamhpcHN0ZXInO1xyXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbnRlcnZpZXdTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9pbnRlcnZpZXcuc2VydmljZSc7XHJcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUHJpbmNpcGFsIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkJztcclxuaW1wb3J0IHsgTmdiTW9kYWwsIE5nYk1vZGFsUmVmIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xyXG5pbXBvcnQgeyBDb25maXJtTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi9jb25maXJtLW1vZGFsL2NvbmZpcm0tbW9kYWwuY29tcG9uZW50JztcclxuZGVjbGFyZSB2YXIgd2luZG93OiBhbnk7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXNjaGVkdWxlLXRhYicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYi1zY2hlZHVsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGFiLXNjaGVkdWxlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2NoZWR1bGVUYWJDb21wb25lbnQge1xyXG4gIC8vIEBJbnB1dCgnaW50ZXJ2aWV3JykgcHVibGljIGludGVydmlldzogYW55O1xyXG4gIEBJbnB1dCgnc2Vzc2lvbicpIHB1YmxpYyBzZXNzaW9uOiBhbnk7XHJcbiAgQElucHV0KCdpbnRlcnZpZXcnKSBwdWJsaWMgaW50ZXJ2aWV3OiBhbnk7XHJcbiAgc3dpdGNoID0gJyc7XHJcbiAgc2Vzc2lvbnM6IGFueTtcclxuICBzaG93U2VsZWN0RGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGRhdGFDbGljayA9IHt9O1xyXG5cclxuICBkYXRlQXZhaWxhYmlsaXR5OiBhbnk7XHJcbiAgaWRJbnRlcjogYW55O1xyXG4gIGlkOiBhbnk7XHJcbiAgcm9sZTogYW55O1xyXG4gIG5vdGU6IGFueTtcclxuXHJcbiAgbGluZURhdGUgPSBbXHJcbiAgICB7XHJcbiAgICAgIHRpbWV6b25lOiAnJyxcclxuICAgICAgZnJvbVRpbWU6ICcnLFxyXG4gICAgICB0b1RpbWU6ICcnLFxyXG4gICAgICB6b25lOiAnJ1xyXG4gICAgfVxyXG4gIF1cclxuICBkYXRhID0ge1xyXG4gICAgXCJpZFwiOiAnJyxcclxuICAgIFwiaW50ZXJ2aWV3U2Vzc2lvblNjaGVkdWxlTGlzdFwiOiBbXSxcclxuICAgIFwibm90ZVwiOiAnc3RyaW5nJyxcclxuICAgIFwidHlwZVwiOiAnJ1xyXG4gIH1cclxuICB0aW1lem9uZTogc3RyaW5nID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGludGVydmlld1NlcnZpY2U6IEludGVydmlld1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHByaW5jaXBhbDogUHJpbmNpcGFsLFxyXG4gICAgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGUsXHJcbiAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTmdiTW9kYWwsXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcclxuICApIHtcclxuICAgIHRoaXMucHJpbmNpcGFsLmlkZW50aXR5KCkudGhlbigoYWNjb3VudCkgPT4ge1xyXG4gICAgICB0aGlzLnJvbGUgPSBhY2NvdW50LmF1dGhvcml0aWVzWzFdXHJcbiAgICAgIGNvbnNvbGUubG9nKCdjdXJyZW50IHVzZXI6ICcsIGFjY291bnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGVja0JpekFjZXB0ZWQoZGF0YSkge1xyXG4gICAgbGV0IHNjaGVkdWxlID0gZGF0YS5zdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXM7XHJcbiAgICBpZiAoc2NoZWR1bGUubGVuZ3RoID4gMCkge1xyXG4gICAgICBzY2hlZHVsZS5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChlbC5wcm9BY2NlcHRlZCAmJiBlbC5iaXpBY2NlcHRlZCkge1xyXG4gICAgICAgICAgdGhpcy5kYXRhQ2xpY2sgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRhdGFDbGljaywge1xyXG4gICAgICAgICAgICBbbmFtZV06IFtlbC5pbnRlcnZpZXdEYXRlLCBpXVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKCd2YWx1ZU1BY0RpbmgtLS0nLCB0aGlzLmRhdGFDbGljaylcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc2Vzc2lvbikge1xyXG4gICAgICB0aGlzLmlkID0gdGhpcy5zZXNzaW9uLmlkO1xyXG4gICAgICB0aGlzLnNlc3Npb25zID0gdGhpcy5zZXNzaW9uO1xyXG4gICAgICB0aGlzLmNoZWNrQml6QWNlcHRlZCh0aGlzLnNlc3Npb25zKTtcclxuICAgICAgY29uc29sZS5sb2coJ29uQ2hhbmdlcy0tJywgdGhpcy5zZXNzaW9ucylcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmludGVydmlldykge1xyXG4gICAgICB0aGlzLmlkSW50ZXIgPSB0aGlzLmludGVydmlldy5pZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuaW5pdFRvb2x0aXAoJyN0b29sdGlwLW1lc3NhZ2UnKTtcclxuICB9XHJcblxyXG4gIGluaXRUb29sdGlwKGlkKSB7XHJcbiAgICB3aW5kb3cuaW5pdFRvb2x0aXAoaWQpO1xyXG4gIH1cclxuXHJcbiAgb25DbGljayhlKSB7XHJcbiAgICBsZXQgeyB2YWx1ZSwgbmFtZSwgaWQgfSA9IGUudGFyZ2V0O1xyXG4gICAgaWQgPSBpZC5yZXBsYWNlKCdyYWRpbycsICcnKTtcclxuICAgIHRoaXMuZGF0YUNsaWNrID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kYXRhQ2xpY2ssIHtcclxuICAgICAgW25hbWVdOiBbdmFsdWUsIGlkXVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN3aXRjaCA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgZS50YXJnZXQudmFsdWUgPT09ICdhZGQnID8gdGhpcy5zaG93U2VsZWN0RGF0ZSA9IHRydWUgOiB0aGlzLnNob3dTZWxlY3REYXRlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZWNpZXZlZERhdGUodmFsdWUpIHtcclxuICAgIGxldCB7IGlkLCBkYXRhIH0gPSB2YWx1ZTtcclxuICAgIHRoaXMubGluZURhdGVbaWRdLnRpbWV6b25lID0gZGF0YTtcclxuICB9XHJcblxyXG4gIHJlY2lldmVkVGltZSh2YWx1ZSkge1xyXG4gICAgbGV0IHsgaWQsIGRhdGEsIG5hbWUgfSA9IHZhbHVlO1xyXG4gICAgdGhpcy5saW5lRGF0ZVtpZF1bbmFtZV0gPSBkYXRhO1xyXG4gIH1cclxuXHJcbiAgb25SZW1vdmVMaW5lKGluZGV4KSB7XHJcbiAgICB0aGlzLmxpbmVEYXRlLnNwbGljZShpbmRleCwgMSlcclxuICB9XHJcblxyXG4gIG9uQWRkTGluZSgpIHtcclxuICAgIHRoaXMubGluZURhdGUucHVzaChcclxuICAgICAge1xyXG4gICAgICAgIHRpbWV6b25lOiAnJyxcclxuICAgICAgICBmcm9tVGltZTogJycsXHJcbiAgICAgICAgdG9UaW1lOiAnJyxcclxuICAgICAgICB6b25lOiAnJ1xyXG4gICAgICB9LFxyXG4gICAgKVxyXG4gIH1cclxuICBjaGVja0Rpc2FibGVkKCkge1xyXG4gICAgbGV0IGRhdGEgPSB0aGlzLmRhdGFDbGljaztcclxuICAgIGZvciAobGV0IGtleSBpbiBkYXRhKSB7XHJcbiAgICAgIGlmIChkYXRhW2tleV0gPT09ICdhZGQnIHx8IGRhdGFba2V5XSA9PT0gJ3JlcXVlc3QnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcGFyc2VEdWFyYXRpb24oZnJvbVRpbWUsIHRvVGltZSkge1xyXG4gICAgbGV0IHJlc3VsdCA9IDA7XHJcbiAgICBpZiAoZnJvbVRpbWUgJiYgdG9UaW1lKSB7XHJcbiAgICAgIGxldCBmcm9tID0gZnJvbVRpbWUuc3BsaXQoJzonKTtcclxuICAgICAgbGV0IHRvID0gdG9UaW1lLnNwbGl0KCc6Jyk7XHJcbiAgICAgIHJlc3VsdCA9IChwYXJzZUludCh0b1swXSkgKiA2MCArIHBhcnNlSW50KHRvWzFdKSkgLSAocGFyc2VJbnQoZnJvbVswXSkgKiA2MCArIHBhcnNlSW50KGZyb21bMV0pKVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFyc2VEYXRhKHNlc3Npb24sIGRhdGUpIHtcclxuICAgIGlmICh0aGlzLnN3aXRjaCA9PT0gJ2FkZCcpIHtcclxuICAgICAgbGV0IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlcyA9IFtdO1xyXG4gICAgICBsZXQgcmVzdWx0ID0ge307XHJcbiAgICAgIGRhdGUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICBcImJpekFjY2VwdGVkXCI6IHRoaXMucm9sZSA9PT0gJ1JPTEVfQklaJyA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgIFwiZHVyYXRpb25cIjogdGhpcy5wYXJzZUR1YXJhdGlvbihpdGVtLmZyb21UaW1lLCBpdGVtLnRvVGltZSksXHJcbiAgICAgICAgICBcImZyb21UaW1lXCI6IGl0ZW0uZnJvbVRpbWUsXHJcbiAgICAgICAgICBcImludGVydmlld0RhdGVcIjogbmV3IERhdGUoaXRlbS50aW1lem9uZSksXHJcbiAgICAgICAgICBcImludGVydmlld1Nlc3Npb25JZFwiOiB0aGlzLmlkLFxyXG4gICAgICAgICAgXCJ0aW1lem9uZVwiOiBpdGVtLnpvbmUsXHJcbiAgICAgICAgICBcInByb0FjY2VwdGVkXCI6IHRoaXMucm9sZSA9PT0gJ1JPTEVfQklaJyA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzLnB1c2goZGF0YSlcclxuICAgICAgfSk7XHJcbiAgICAgIHJlc3VsdCA9IHtcclxuICAgICAgICBpZDogc2Vzc2lvbi5pZCxcclxuICAgICAgICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXM6IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHRoaXMuZGF0YS5pbnRlcnZpZXdTZXNzaW9uU2NoZWR1bGVMaXN0LnB1c2goe1xyXG4gICAgICAvLyAgIGlkOiB0aGlzLmlkLFxyXG4gICAgICAvLyAgIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlczogc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzXHJcbiAgICAgIC8vIH0pXHJcbiAgICAgIC8vIHRoaXMuZGF0YS5pZCA9IHRoaXMuaWRJbnRlcjtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zd2l0Y2ggPT09ICdyZXF1ZXN0Jykge1xyXG4gICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICBkYXRhID0ge1xyXG4gICAgICAgIGlkOiBzZXNzaW9uLmlkLFxyXG4gICAgICAgIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlczogW11cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZGF0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCB7IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlcyB9ID0gc2Vzc2lvbjtcclxuICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRlKTtcclxuICAgICAgbGV0IHJlc3VsdCA9IHt9XHJcbiAgICAgIGxldCBzY2hlZHVsZSA9IFtdO1xyXG4gICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICBsZXQgaW5kZXggPSBwYXJzZUludChkYXRlW2tleXNbMF1dWzFdKTtcclxuICAgICAgbGV0IHNjaGVkdWxlU3VnZ2V0ID0gc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzW2luZGV4XTtcclxuXHJcbiAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgXCJiaXpBY2NlcHRlZFwiOiB0aGlzLnJvbGUgPT09ICdST0xFX0JJWicgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgXCJkdXJhdGlvblwiOiBzY2hlZHVsZVN1Z2dldC5kdXJhdGlvbixcclxuICAgICAgICBcImZyb21UaW1lXCI6IHNjaGVkdWxlU3VnZ2V0LmZyb21UaW1lLFxyXG4gICAgICAgIFwiaWRcIjogc2NoZWR1bGVTdWdnZXQuaWQsXHJcbiAgICAgICAgXCJpbnRlcnZpZXdEYXRlXCI6IG5ldyBEYXRlKHNjaGVkdWxlU3VnZ2V0LmludGVydmlld0RhdGUpLFxyXG4gICAgICAgIFwiaW50ZXJ2aWV3U2Vzc2lvbklkXCI6IHNlc3Npb24uaWQsXHJcbiAgICAgICAgXCJ0aW1lem9uZVwiOiBzY2hlZHVsZVN1Z2dldC50aW1lem9uZSxcclxuICAgICAgICBcInByb0FjY2VwdGVkXCI6IHRoaXMucm9sZSA9PT0gJ1JPTEVfQklaJyA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgfVxyXG4gICAgICBzY2hlZHVsZS5wdXNoKGRhdGEpXHJcbiAgICAgIHJlc3VsdCA9IHtcclxuICAgICAgICBpZDogc2Vzc2lvbi5pZCxcclxuICAgICAgICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXM6IHNjaGVkdWxlXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgLy8gbGV0IGluZGV4ID0ga2V5c1swXS5yZXBsYWNlKCdncm91cCcsICcnKVxyXG4gICAgICAvLyBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXNbaW5kZXhdLmludGVydmlld0RhdGUgPSB2YWx1ZTtcclxuICAgICAgLy8gc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzW2luZGV4XS5pbnRlcnZpZXdTZXNzaW9uSWQgPSB0aGlzLmlkO1xyXG4gICAgICAvLyBpZiAodGhpcy5yb2xlID09PSAnUk9MRV9CSVonKSB7XHJcbiAgICAgIC8vICAgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzW2luZGV4XS5iaXpBY2NlcHRlZCA9IHRydWU7XHJcbiAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgIC8vICAgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzW2luZGV4XS5wcm9BY2NlcHRlZCA9IHRydWU7XHJcbiAgICAgIC8vIH1cclxuXHJcbiAgICAgIC8vIHRoaXMuZGF0YS5pZCA9IHRoaXMuaWRJbnRlcjtcclxuICAgICAgLy8gdGhpcy5kYXRhLmludGVydmlld1Nlc3Npb25TY2hlZHVsZUxpc3QucHVzaCh7XHJcbiAgICAgIC8vICAgaWQ6IHRoaXMuaWQsXHJcbiAgICAgIC8vICAgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzOiBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXNcclxuICAgICAgLy8gfSlcclxuXHJcbiAgICAgIC8vIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3JtYXJ0RGF0YShzZXNzaW9ucywgZGF0ZUF2YWlsYWJpbGl0eSwgbGluZURhdGUpIHtcclxuICAgIGxldCBkYXRhID0ge31cclxuICAgIGlmICh0aGlzLnN3aXRjaCA9PT0gJ2FkZCcpIHtcclxuICAgICAgZGF0YSA9IHRoaXMucGFyc2VEYXRhKHNlc3Npb25zLCBsaW5lRGF0ZSlcclxuICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3dpdGNoID09PSAncmVxdWVzdCcpIHtcclxuICAgICAgZGF0YSA9IHRoaXMucGFyc2VEYXRhKHNlc3Npb25zLCBkYXRlQXZhaWxhYmlsaXR5KVxyXG4gICAgICByZXR1cm4gZGF0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGEgPSB0aGlzLnBhcnNlRGF0YShzZXNzaW9ucywgZGF0ZUF2YWlsYWJpbGl0eSlcclxuICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblN1Ym1pdERhdGEodHlwZSkge1xyXG4gICAgbGV0IGRhdGEgPSB7fTtcclxuICAgIGRhdGEgPSB0aGlzLmZvcm1hcnREYXRhKHRoaXMuc2Vzc2lvbnMsIHRoaXMuZGF0YUNsaWNrLCB0aGlzLmxpbmVEYXRlKTtcclxuICAgIHRoaXMuZGF0YS5pZCA9IHRoaXMuaWRJbnRlcjtcclxuICAgIHRoaXMuZGF0YS5pbnRlcnZpZXdTZXNzaW9uU2NoZWR1bGVMaXN0LnB1c2goZGF0YSlcclxuICAgIHRoaXMuZGF0YS50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuZGF0YS5ub3RlID0gdGhpcy5ub3RlO1xyXG4gICAgY29uc29sZS5sb2coJ29uU3VibWl0RGF0YS0tLS0nLCB0aGlzLmRhdGEpXHJcbiAgICAvLyBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwgeyB0eXBlOiB0eXBlLCBub3RlOiB0aGlzLm5vdGUgfSlcclxuICAgIC8vIHRoaXMuaW50ZXJ2aWV3U2VydmljZS51cGRhdGVTY2hlZHVsZShkYXRhKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuXHJcbiAgICAvLyB9KTtcclxuICB9XHJcblxyXG4gIHNob3dDb25maXJtRGlhbG9nKCk6IE5nYk1vZGFsUmVmIHtcclxuICAgIGNvbnN0IG1vZGFsUmVmID0gdGhpcy5tb2RhbFNlcnZpY2Uub3BlbihDb25maXJtTW9kYWxDb21wb25lbnQpO1xyXG4gICAgbW9kYWxSZWYucmVzdWx0LnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICB0aGlzLmludGVydmlld1NlcnZpY2UudXBkYXRlU2NoZWR1bGUoe1xyXG4gICAgICAgIGlkOiB0aGlzLmlkSW50ZXIsXHJcbiAgICAgICAgdHlwZTogMCxcclxuICAgICAgICBpbnRlcnZpZXdTZXNzaW9uU2NoZWR1bGVMaXN0OiBbXSAvLyByZXF1aXJlZFxyXG4gICAgICB9KS5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NhbmNlbCBzdWNjZXNzZnVsbHkhJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgKHJlYXNvbikgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygncmVhc29uIGNvbmZpcm0gY2FuY2VsOiAnLCByZWFzb24pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbW9kYWxSZWY7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VUaW1lem9uZShldmVudCwgaW5kZXgpIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICB0aGlzLmxpbmVEYXRlW2luZGV4XS56b25lID0gZXZlbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL21haW4vd2ViYXBwL2FwcC9zY3JlZW5zL2Jpei1pbnRlcnZpZXcvY29tcG9uZW50cy9zY2hlZHVsZS10YWIvdGFiLXNjaGVkdWxlLmNvbXBvbmVudC50cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main/webapp/app/screens/biz-interview/components/schedule-tab/tab-schedule.component.ts\n");

/***/ })

})