webpackHotUpdate(1,{

/***/ "./src/main/webapp/app/screens/biz-interview/components/schedule-tab/tab-schedule.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar interview_service_1 = __webpack_require__(\"./src/main/webapp/app/screens/biz-interview/services/interview.service.ts\");\r\nvar common_1 = __webpack_require__(\"./node_modules/@angular/common/esm5/common.js\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar ng_bootstrap_1 = __webpack_require__(\"./node_modules/@ng-bootstrap/ng-bootstrap/index.js\");\r\nvar confirm_modal_component_1 = __webpack_require__(\"./src/main/webapp/app/screens/biz-interview/components/confirm-modal/confirm-modal.component.ts\");\r\nvar ScheduleTabComponent = /** @class */ (function () {\r\n    function ScheduleTabComponent(interviewService, principal, datePipe, modalService, elementRef) {\r\n        var _this = this;\r\n        this.interviewService = interviewService;\r\n        this.principal = principal;\r\n        this.datePipe = datePipe;\r\n        this.modalService = modalService;\r\n        this.elementRef = elementRef;\r\n        this.switch = '';\r\n        this.showSelectDate = false;\r\n        this.dataClick = {};\r\n        this.lineDate = [\r\n            {\r\n                timezone: '',\r\n                fromTime: '',\r\n                toTime: '',\r\n                zone: ''\r\n            }\r\n        ];\r\n        this.data = {\r\n            \"id\": '',\r\n            \"interviewSessionScheduleList\": [],\r\n            \"note\": 'string',\r\n            \"type\": ''\r\n        };\r\n        this.timezone = '';\r\n        this.principal.identity().then(function (account) {\r\n            _this.role = account.authorities[1];\r\n            console.log('current user: ', account);\r\n        });\r\n    }\r\n    ScheduleTabComponent.prototype.checkBizAcepted = function (data) {\r\n        var schedule = data.suggestedInterviewSchedules;\r\n        if (schedule.length > 0) {\r\n            schedule.forEach(function (el, i) {\r\n                if (el.proAccepted && el.bizAccepted) {\r\n                    console.log('checkBizAcepted', i);\r\n                    console.log('checkBizAcepted', el);\r\n                }\r\n            });\r\n        }\r\n    };\r\n    ScheduleTabComponent.prototype.ngOnChanges = function (changes) {\r\n        if (this.session) {\r\n            this.id = this.session.id;\r\n            this.sessions = this.session;\r\n            this.checkBizAcepted(this.sessions);\r\n            console.log('onChanges--', this.sessions);\r\n        }\r\n        if (this.interview) {\r\n            this.idInter = this.interview.id;\r\n        }\r\n    };\r\n    ScheduleTabComponent.prototype.ngAfterViewInit = function () {\r\n        this.initTooltip('#tooltip-message');\r\n    };\r\n    ScheduleTabComponent.prototype.initTooltip = function (id) {\r\n        window.initTooltip(id);\r\n    };\r\n    ScheduleTabComponent.prototype.onClick = function (e) {\r\n        var _a = e.target, value = _a.value, name = _a.name, id = _a.id;\r\n        id = id.replace('radio', '');\r\n        this.dataClick = Object.assign({}, this.dataClick, (_b = {},\r\n            _b[name] = [value, id],\r\n            _b));\r\n        // console.log('dataClick---', this.dataClick);\r\n        this.switch = e.target.value;\r\n        e.target.value === 'add' ? this.showSelectDate = true : this.showSelectDate = false;\r\n        var _b;\r\n    };\r\n    ScheduleTabComponent.prototype.recievedDate = function (value) {\r\n        var id = value.id, data = value.data;\r\n        this.lineDate[id].timezone = data;\r\n    };\r\n    ScheduleTabComponent.prototype.recievedTime = function (value) {\r\n        var id = value.id, data = value.data, name = value.name;\r\n        this.lineDate[id][name] = data;\r\n    };\r\n    ScheduleTabComponent.prototype.onRemoveLine = function (index) {\r\n        this.lineDate.splice(index, 1);\r\n    };\r\n    ScheduleTabComponent.prototype.onAddLine = function () {\r\n        this.lineDate.push({\r\n            timezone: '',\r\n            fromTime: '',\r\n            toTime: '',\r\n            zone: ''\r\n        });\r\n    };\r\n    ScheduleTabComponent.prototype.checkDisabled = function () {\r\n        var data = this.dataClick;\r\n        for (var key in data) {\r\n            if (data[key] === 'add' || data[key] === 'request') {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    };\r\n    ScheduleTabComponent.prototype.parseDuaration = function (fromTime, toTime) {\r\n        var result = 0;\r\n        if (fromTime && toTime) {\r\n            var from = fromTime.split(':');\r\n            var to = toTime.split(':');\r\n            result = (parseInt(to[0]) * 60 + parseInt(to[1])) - (parseInt(from[0]) * 60 + parseInt(from[1]));\r\n            return result;\r\n        }\r\n    };\r\n    ScheduleTabComponent.prototype.parseData = function (session, date) {\r\n        var _this = this;\r\n        if (this.switch === 'add') {\r\n            var data = {};\r\n            var suggestedInterviewSchedules_1 = [];\r\n            console.log('date-----', date);\r\n            date.forEach(function (item, index) {\r\n                var data = {};\r\n                data = {\r\n                    \"bizAccepted\": _this.role === 'ROLE_BIZ' ? true : false,\r\n                    \"duration\": _this.parseDuaration(item.fromTime, item.toTime),\r\n                    \"fromTime\": item.fromTime,\r\n                    \"interviewDate\": new Date(item.timezone),\r\n                    \"interviewSessionId\": _this.id,\r\n                    \"timezone\": item.zone,\r\n                    \"proAccepted\": _this.role === 'ROLE_BIZ' ? false : true,\r\n                };\r\n                suggestedInterviewSchedules_1.push(data);\r\n            });\r\n            console.log('suggestedInterviewSchedules', suggestedInterviewSchedules_1);\r\n            data = {\r\n                id: this.id,\r\n                suggestedInterviewSchedules: suggestedInterviewSchedules_1\r\n            };\r\n            return data;\r\n        }\r\n        else if (this.switch === 'request') {\r\n            var data = {};\r\n            data = {\r\n                id: session.id,\r\n                suggestedInterviewSchedules: []\r\n            };\r\n            return data;\r\n        }\r\n        else {\r\n            var data = {};\r\n            var suggestedInterviewSchedules = session.suggestedInterviewSchedules;\r\n            var keys = Object.keys(date);\r\n            var value = date[keys[0]];\r\n            var schedule = [];\r\n            var index = value[1];\r\n            var scheduleSugget = suggestedInterviewSchedules[index];\r\n            data = {\r\n                \"bizAccepted\": this.role === 'ROLE_BIZ' ? true : false,\r\n                \"duration\": scheduleSugget.duration,\r\n                \"fromTime\": scheduleSugget.fromTime,\r\n                \"id\": scheduleSugget.id,\r\n                \"interviewDate\": new Date(value[0]),\r\n                \"interviewSessionId\": session.id,\r\n                \"timezone\": \"string\",\r\n                \"proAccepted\": this.role === 'ROLE_BIZ' ? false : true,\r\n            };\r\n            schedule.push(data);\r\n            var result = {\r\n                id: session.id,\r\n                suggestedInterviewSchedules: schedule\r\n            };\r\n            return result;\r\n            // suggestedInterviewSchedules[index].interviewDate = value;\r\n            // suggestedInterviewSchedules[index].interviewSessionId = this.id;\r\n            // if (this.role === 'ROLE_BIZ') {\r\n            //   suggestedInterviewSchedules[index].bizAccepted = true;\r\n            // } else {\r\n            //   suggestedInterviewSchedules[index].proAccepted = true;\r\n            // }\r\n            // this.data.id = this.idInter;\r\n            // this.data.interviewSessionScheduleList.push({\r\n            //   id: this.id,\r\n            //   suggestedInterviewSchedules: suggestedInterviewSchedules\r\n            // })\r\n            // return this.data;\r\n        }\r\n    };\r\n    ScheduleTabComponent.prototype.formartData = function (sessions, dateAvailability, lineDate) {\r\n        var data = {};\r\n        if (this.switch === 'add') {\r\n            data = this.parseData(sessions, lineDate);\r\n            return data;\r\n        }\r\n        else if (this.switch === 'request') {\r\n            data = this.parseData(sessions, dateAvailability);\r\n            return data;\r\n        }\r\n        else {\r\n            data = this.parseData(sessions, dateAvailability);\r\n            return data;\r\n        }\r\n    };\r\n    ScheduleTabComponent.prototype.onSubmitData = function (type) {\r\n        var data = {};\r\n        data = this.formartData(this.sessions, this.dataClick, this.lineDate);\r\n        this.data = this.idInter;\r\n        this.data.interviewSessionScheduleList = data['suggestedInterviewSchedules'];\r\n        console.log('onSubmit----', this.data);\r\n        // this.data.id = this.idInter;\r\n        // this.data.interviewSessionScheduleList = data.suggestedInterviewSchedules;\r\n        // this.data.type = type;\r\n        // this.data.note = this.note;\r\n        // data = Object.assign({}, data, { type: type, note: this.note })\r\n        // this.interviewService.updateSchedule(data).subscribe(result => {\r\n        // });\r\n    };\r\n    ScheduleTabComponent.prototype.showConfirmDialog = function () {\r\n        var _this = this;\r\n        var modalRef = this.modalService.open(confirm_modal_component_1.ConfirmModalComponent);\r\n        modalRef.result.then(function (result) {\r\n            _this.interviewService.updateSchedule({\r\n                id: _this.idInter,\r\n                type: 0,\r\n                interviewSessionScheduleList: [] // required\r\n            }).subscribe(function (data) {\r\n                console.log('cancel successfully!');\r\n            });\r\n        }, function (reason) {\r\n            console.log('reason confirm cancel: ', reason);\r\n        });\r\n        return modalRef;\r\n    };\r\n    ScheduleTabComponent.prototype.changeTimezone = function (event, index) {\r\n        if (event) {\r\n            this.lineDate[index].zone = event;\r\n        }\r\n    };\r\n    __decorate([\r\n        core_1.Input('session'),\r\n        __metadata(\"design:type\", Object)\r\n    ], ScheduleTabComponent.prototype, \"session\", void 0);\r\n    __decorate([\r\n        core_1.Input('interview'),\r\n        __metadata(\"design:type\", Object)\r\n    ], ScheduleTabComponent.prototype, \"interview\", void 0);\r\n    ScheduleTabComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'app-schedule-tab',\r\n            template: __webpack_require__(\"./src/main/webapp/app/screens/biz-interview/components/schedule-tab/tab-schedule.component.html\"),\r\n            styles: [__webpack_require__(\"./src/main/webapp/app/screens/biz-interview/components/schedule-tab/tab-schedule.component.css\")]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [interview_service_1.InterviewService,\r\n            shared_1.Principal,\r\n            common_1.DatePipe,\r\n            ng_bootstrap_1.NgbModal,\r\n            core_1.ElementRef])\r\n    ], ScheduleTabComponent);\r\n    return ScheduleTabComponent;\r\n}());\r\nexports.ScheduleTabComponent = ScheduleTabComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NjcmVlbnMvYml6LWludGVydmlldy9jb21wb25lbnRzL3NjaGVkdWxlLXRhYi90YWItc2NoZWR1bGUuY29tcG9uZW50LnRzPzRjYWYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw4RUFBcUU7QUFHckUsMkhBQXNFO0FBQ3RFLG9GQUEyQztBQUMzQyw0RUFBK0M7QUFDL0MsK0ZBQW1FO0FBQ25FLHVKQUFpRjtBQU9qRjtJQStCRSw4QkFDUyxnQkFBa0MsRUFDakMsU0FBb0IsRUFDcEIsUUFBa0IsRUFDbEIsWUFBc0IsRUFDdEIsVUFBc0I7UUFMaEMsaUJBV0M7UUFWUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixpQkFBWSxHQUFaLFlBQVksQ0FBVTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBaENoQyxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBRVosbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQVFmLGFBQVEsR0FBRztZQUNUO2dCQUNFLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFFBQVEsRUFBRSxFQUFFO2dCQUNaLE1BQU0sRUFBRSxFQUFFO2dCQUNWLElBQUksRUFBRSxFQUFFO2FBQ1Q7U0FDRjtRQUNELFNBQUksR0FBRztZQUNMLElBQUksRUFBRSxFQUFFO1lBQ1IsOEJBQThCLEVBQUUsRUFBRTtZQUNsQyxNQUFNLEVBQUUsUUFBUTtZQUNoQixNQUFNLEVBQUUsRUFBRTtTQUNYO1FBQ0QsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQVNwQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87WUFDckMsS0FBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENB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QUMsTUFBTTtZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCw2Q0FBYyxHQUFkLFVBQWUsS0FBSyxFQUFFLEtBQUs7UUFDekIsRUFBRSxFQUFDLEtBQUssQ0FBQyxFQUFDO1lBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLENBQUM7SUFDSCxDQUFDO0lBN1BpQjtRQUFqQixZQUFLLENBQUMsU0FBUyxDQUFDOzt5REFBcUI7SUFDbEI7UUFBbkIsWUFBSyxDQUFDLFdBQVcsQ0FBQzs7MkRBQXVCO0lBSC9CLG9CQUFvQjtRQUxoQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1Qiw2QkFBYSxrR0FBK0I7WUFDNUMsU0FBUyxtQkFBRyxpR0FBK0I7U0FDNUMsQ0FBQzt5Q0FpQzJCLG9DQUFnQjtZQUN0QixrQkFBUztZQUNWLGlCQUFRO1lBQ0osdUJBQVE7WUFDVixpQkFBVTtPQXBDckIsb0JBQW9CLENBZ1FoQztJQUFELDJCQUFDO0NBQUE7QUFoUVksb0RBQW9CIiwiZmlsZSI6Ii4vc3JjL21haW4vd2ViYXBwL2FwcC9zY3JlZW5zL2Jpei1pbnRlcnZpZXcvY29tcG9uZW50cy9zY2hlZHVsZS10YWIvdGFiLXNjaGVkdWxlLmNvbXBvbmVudC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBKaGlBbGVydFNlcnZpY2UgfSBmcm9tICduZy1qaGlwc3Rlcic7XHJcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEludGVydmlld1NlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2ludGVydmlldy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBQcmluY2lwYWwgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQnO1xyXG5pbXBvcnQgeyBOZ2JNb2RhbCwgTmdiTW9kYWxSZWYgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XHJcbmltcG9ydCB7IENvbmZpcm1Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL2NvbmZpcm0tbW9kYWwvY29uZmlybS1tb2RhbC5jb21wb25lbnQnO1xyXG5kZWNsYXJlIHZhciB3aW5kb3c6IGFueTtcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc2NoZWR1bGUtdGFiJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGFiLXNjaGVkdWxlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90YWItc2NoZWR1bGUuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTY2hlZHVsZVRhYkNvbXBvbmVudCB7XHJcbiAgLy8gQElucHV0KCdpbnRlcnZpZXcnKSBwdWJsaWMgaW50ZXJ2aWV3OiBhbnk7XHJcbiAgQElucHV0KCdzZXNzaW9uJykgcHVibGljIHNlc3Npb246IGFueTtcclxuICBASW5wdXQoJ2ludGVydmlldycpIHB1YmxpYyBpbnRlcnZpZXc6IGFueTtcclxuICBzd2l0Y2ggPSAnJztcclxuICBzZXNzaW9uczogYW55O1xyXG4gIHNob3dTZWxlY3REYXRlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgZGF0YUNsaWNrID0ge307XHJcblxyXG4gIGRhdGVBdmFpbGFiaWxpdHk6IGFueTtcclxuICBpZEludGVyOiBhbnk7XHJcbiAgaWQ6IGFueTtcclxuICByb2xlOiBhbnk7XHJcbiAgbm90ZTogYW55O1xyXG5cclxuICBsaW5lRGF0ZSA9IFtcclxuICAgIHtcclxuICAgICAgdGltZXpvbmU6ICcnLFxyXG4gICAgICBmcm9tVGltZTogJycsXHJcbiAgICAgIHRvVGltZTogJycsXHJcbiAgICAgIHpvbmU6ICcnXHJcbiAgICB9XHJcbiAgXVxyXG4gIGRhdGEgPSB7XHJcbiAgICBcImlkXCI6ICcnLFxyXG4gICAgXCJpbnRlcnZpZXdTZXNzaW9uU2NoZWR1bGVMaXN0XCI6IFtdLFxyXG4gICAgXCJub3RlXCI6ICdzdHJpbmcnLFxyXG4gICAgXCJ0eXBlXCI6ICcnXHJcbiAgfVxyXG4gIHRpbWV6b25lOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgaW50ZXJ2aWV3U2VydmljZTogSW50ZXJ2aWV3U2VydmljZSxcclxuICAgIHByaXZhdGUgcHJpbmNpcGFsOiBQcmluY2lwYWwsXHJcbiAgICBwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZSxcclxuICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBOZ2JNb2RhbCxcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxyXG4gICkge1xyXG4gICAgdGhpcy5wcmluY2lwYWwuaWRlbnRpdHkoKS50aGVuKChhY2NvdW50KSA9PiB7XHJcbiAgICAgIHRoaXMucm9sZSA9IGFjY291bnQuYXV0aG9yaXRpZXNbMV1cclxuICAgICAgY29uc29sZS5sb2coJ2N1cnJlbnQgdXNlcjogJywgYWNjb3VudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNoZWNrQml6QWNlcHRlZChkYXRhKSB7XHJcbiAgICBsZXQgc2NoZWR1bGUgPSBkYXRhLnN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlcztcclxuICAgIGlmIChzY2hlZHVsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHNjaGVkdWxlLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgaWYgKGVsLnByb0FjY2VwdGVkICYmIGVsLmJpekFjY2VwdGVkKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tCaXpBY2VwdGVkJywgaSlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGVja0JpekFjZXB0ZWQnLCBlbClcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zZXNzaW9uKSB7XHJcbiAgICAgIHRoaXMuaWQgPSB0aGlzLnNlc3Npb24uaWQ7XHJcbiAgICAgIHRoaXMuc2Vzc2lvbnMgPSB0aGlzLnNlc3Npb247XHJcbiAgICAgIHRoaXMuY2hlY2tCaXpBY2VwdGVkKHRoaXMuc2Vzc2lvbnMpO1xyXG4gICAgICBjb25zb2xlLmxvZygnb25DaGFuZ2VzLS0nLCB0aGlzLnNlc3Npb25zKVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaW50ZXJ2aWV3KSB7XHJcbiAgICAgIHRoaXMuaWRJbnRlciA9IHRoaXMuaW50ZXJ2aWV3LmlkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5pbml0VG9vbHRpcCgnI3Rvb2x0aXAtbWVzc2FnZScpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFRvb2x0aXAoaWQpIHtcclxuICAgIHdpbmRvdy5pbml0VG9vbHRpcChpZCk7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGUpIHtcclxuICAgIGxldCB7IHZhbHVlLCBuYW1lLCBpZCB9ID0gZS50YXJnZXQ7XHJcbiAgICBpZCA9IGlkLnJlcGxhY2UoJ3JhZGlvJywgJycpO1xyXG4gICAgdGhpcy5kYXRhQ2xpY2sgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRhdGFDbGljaywge1xyXG4gICAgICBbbmFtZV06IFt2YWx1ZSwgaWRdXHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdkYXRhQ2xpY2stLS0nLCB0aGlzLmRhdGFDbGljayk7XHJcbiAgICB0aGlzLnN3aXRjaCA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgZS50YXJnZXQudmFsdWUgPT09ICdhZGQnID8gdGhpcy5zaG93U2VsZWN0RGF0ZSA9IHRydWUgOiB0aGlzLnNob3dTZWxlY3REYXRlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZWNpZXZlZERhdGUodmFsdWUpIHtcclxuICAgIGxldCB7IGlkLCBkYXRhIH0gPSB2YWx1ZTtcclxuICAgIHRoaXMubGluZURhdGVbaWRdLnRpbWV6b25lID0gZGF0YTtcclxuICB9XHJcblxyXG4gIHJlY2lldmVkVGltZSh2YWx1ZSkge1xyXG4gICAgbGV0IHsgaWQsIGRhdGEsIG5hbWUgfSA9IHZhbHVlO1xyXG4gICAgdGhpcy5saW5lRGF0ZVtpZF1bbmFtZV0gPSBkYXRhO1xyXG4gIH1cclxuXHJcbiAgb25SZW1vdmVMaW5lKGluZGV4KSB7XHJcbiAgICB0aGlzLmxpbmVEYXRlLnNwbGljZShpbmRleCwgMSlcclxuICB9XHJcblxyXG4gIG9uQWRkTGluZSgpIHtcclxuICAgIHRoaXMubGluZURhdGUucHVzaChcclxuICAgICAge1xyXG4gICAgICAgIHRpbWV6b25lOiAnJyxcclxuICAgICAgICBmcm9tVGltZTogJycsXHJcbiAgICAgICAgdG9UaW1lOiAnJyxcclxuICAgICAgICB6b25lOiAnJ1xyXG4gICAgICB9LFxyXG4gICAgKVxyXG4gIH1cclxuICBjaGVja0Rpc2FibGVkKCkge1xyXG4gICAgbGV0IGRhdGEgPSB0aGlzLmRhdGFDbGljaztcclxuICAgIGZvciAobGV0IGtleSBpbiBkYXRhKSB7XHJcbiAgICAgIGlmIChkYXRhW2tleV0gPT09ICdhZGQnIHx8IGRhdGFba2V5XSA9PT0gJ3JlcXVlc3QnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcGFyc2VEdWFyYXRpb24oZnJvbVRpbWUsIHRvVGltZSkge1xyXG4gICAgbGV0IHJlc3VsdCA9IDA7XHJcbiAgICBpZiAoZnJvbVRpbWUgJiYgdG9UaW1lKSB7XHJcbiAgICAgIGxldCBmcm9tID0gZnJvbVRpbWUuc3BsaXQoJzonKTtcclxuICAgICAgbGV0IHRvID0gdG9UaW1lLnNwbGl0KCc6Jyk7XHJcbiAgICAgIHJlc3VsdCA9IChwYXJzZUludCh0b1swXSkgKiA2MCArIHBhcnNlSW50KHRvWzFdKSkgLSAocGFyc2VJbnQoZnJvbVswXSkgKiA2MCArIHBhcnNlSW50KGZyb21bMV0pKVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFyc2VEYXRhKHNlc3Npb24sIGRhdGUpIHtcclxuICAgIGlmICh0aGlzLnN3aXRjaCA9PT0gJ2FkZCcpIHtcclxuICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgbGV0IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlcyA9IFtdO1xyXG4gICAgICBjb25zb2xlLmxvZygnZGF0ZS0tLS0tJywgZGF0ZSk7XHJcbiAgICAgIGRhdGUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICBcImJpekFjY2VwdGVkXCI6IHRoaXMucm9sZSA9PT0gJ1JPTEVfQklaJyA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgIFwiZHVyYXRpb25cIjogdGhpcy5wYXJzZUR1YXJhdGlvbihpdGVtLmZyb21UaW1lLCBpdGVtLnRvVGltZSksXHJcbiAgICAgICAgICBcImZyb21UaW1lXCI6IGl0ZW0uZnJvbVRpbWUsXHJcbiAgICAgICAgICBcImludGVydmlld0RhdGVcIjogbmV3IERhdGUoaXRlbS50aW1lem9uZSksXHJcbiAgICAgICAgICBcImludGVydmlld1Nlc3Npb25JZFwiOiB0aGlzLmlkLFxyXG4gICAgICAgICAgXCJ0aW1lem9uZVwiOiBpdGVtLnpvbmUsXHJcbiAgICAgICAgICBcInByb0FjY2VwdGVkXCI6IHRoaXMucm9sZSA9PT0gJ1JPTEVfQklaJyA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzLnB1c2goZGF0YSlcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXMnLCBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXMpXHJcbiAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaWQ6IHRoaXMuaWQsXHJcbiAgICAgICAgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzOiBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXNcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zd2l0Y2ggPT09ICdyZXF1ZXN0Jykge1xyXG4gICAgICBsZXQgZGF0YSA9IHt9XHJcbiAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaWQ6IHNlc3Npb24uaWQsXHJcbiAgICAgICAgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzOiBbXVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgbGV0IHsgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzIH0gPSBzZXNzaW9uO1xyXG4gICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGRhdGUpO1xyXG4gICAgICBsZXQgdmFsdWUgPSBkYXRlW2tleXNbMF1dO1xyXG4gICAgICBsZXQgc2NoZWR1bGUgPSBbXTtcclxuICAgICAgbGV0IGluZGV4ID0gdmFsdWVbMV07XHJcbiAgICAgIGxldCBzY2hlZHVsZVN1Z2dldCA9IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1tpbmRleF07XHJcbiAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgXCJiaXpBY2NlcHRlZFwiOiB0aGlzLnJvbGUgPT09ICdST0xFX0JJWicgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgXCJkdXJhdGlvblwiOiBzY2hlZHVsZVN1Z2dldC5kdXJhdGlvbixcclxuICAgICAgICBcImZyb21UaW1lXCI6IHNjaGVkdWxlU3VnZ2V0LmZyb21UaW1lLFxyXG4gICAgICAgIFwiaWRcIjogc2NoZWR1bGVTdWdnZXQuaWQsXHJcbiAgICAgICAgXCJpbnRlcnZpZXdEYXRlXCI6IG5ldyBEYXRlKHZhbHVlWzBdKSxcclxuICAgICAgICBcImludGVydmlld1Nlc3Npb25JZFwiOiBzZXNzaW9uLmlkLFxyXG4gICAgICAgIFwidGltZXpvbmVcIjogXCJzdHJpbmdcIixcclxuICAgICAgICBcInByb0FjY2VwdGVkXCI6IHRoaXMucm9sZSA9PT0gJ1JPTEVfQklaJyA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgfVxyXG4gICAgICBzY2hlZHVsZS5wdXNoKGRhdGEpXHJcbiAgICAgIGxldCByZXN1bHQgPSB7XHJcbiAgICAgICAgaWQ6IHNlc3Npb24uaWQsXHJcbiAgICAgICAgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzOiBzY2hlZHVsZVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgIC8vIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1tpbmRleF0uaW50ZXJ2aWV3RGF0ZSA9IHZhbHVlO1xyXG4gICAgICAvLyBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXNbaW5kZXhdLmludGVydmlld1Nlc3Npb25JZCA9IHRoaXMuaWQ7XHJcbiAgICAgIC8vIGlmICh0aGlzLnJvbGUgPT09ICdST0xFX0JJWicpIHtcclxuICAgICAgLy8gICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXNbaW5kZXhdLmJpekFjY2VwdGVkID0gdHJ1ZTtcclxuICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgLy8gICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXNbaW5kZXhdLnByb0FjY2VwdGVkID0gdHJ1ZTtcclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgLy8gdGhpcy5kYXRhLmlkID0gdGhpcy5pZEludGVyO1xyXG4gICAgICAvLyB0aGlzLmRhdGEuaW50ZXJ2aWV3U2Vzc2lvblNjaGVkdWxlTGlzdC5wdXNoKHtcclxuICAgICAgLy8gICBpZDogdGhpcy5pZCxcclxuICAgICAgLy8gICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXM6IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1xyXG4gICAgICAvLyB9KVxyXG5cclxuICAgICAgLy8gcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvcm1hcnREYXRhKHNlc3Npb25zLCBkYXRlQXZhaWxhYmlsaXR5LCBsaW5lRGF0ZSkge1xyXG4gICAgbGV0IGRhdGEgPSB7fVxyXG4gICAgaWYgKHRoaXMuc3dpdGNoID09PSAnYWRkJykge1xyXG4gICAgICBkYXRhID0gdGhpcy5wYXJzZURhdGEoc2Vzc2lvbnMsIGxpbmVEYXRlKVxyXG4gICAgICByZXR1cm4gZGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zd2l0Y2ggPT09ICdyZXF1ZXN0Jykge1xyXG4gICAgICBkYXRhID0gdGhpcy5wYXJzZURhdGEoc2Vzc2lvbnMsIGRhdGVBdmFpbGFiaWxpdHkpXHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGF0YSA9IHRoaXMucGFyc2VEYXRhKHNlc3Npb25zLCBkYXRlQXZhaWxhYmlsaXR5KVxyXG4gICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uU3VibWl0RGF0YSh0eXBlKSB7XHJcbiAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgZGF0YSA9IHRoaXMuZm9ybWFydERhdGEodGhpcy5zZXNzaW9ucywgdGhpcy5kYXRhQ2xpY2ssIHRoaXMubGluZURhdGUpO1xyXG4gICAgdGhpcy5kYXRhID0gdGhpcy5pZEludGVyO1xyXG4gICAgdGhpcy5kYXRhLmludGVydmlld1Nlc3Npb25TY2hlZHVsZUxpc3QgPSBkYXRhWydzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXMnXTtcclxuICAgIGNvbnNvbGUubG9nKCdvblN1Ym1pdC0tLS0nLCB0aGlzLmRhdGEpXHJcbiAgICBcclxuICAgIC8vIHRoaXMuZGF0YS5pZCA9IHRoaXMuaWRJbnRlcjtcclxuICAgIC8vIHRoaXMuZGF0YS5pbnRlcnZpZXdTZXNzaW9uU2NoZWR1bGVMaXN0ID0gZGF0YS5zdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXM7XHJcbiAgICAvLyB0aGlzLmRhdGEudHlwZSA9IHR5cGU7XHJcbiAgICAvLyB0aGlzLmRhdGEubm90ZSA9IHRoaXMubm90ZTtcclxuICAgIC8vIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7IHR5cGU6IHR5cGUsIG5vdGU6IHRoaXMubm90ZSB9KVxyXG4gICAgLy8gdGhpcy5pbnRlcnZpZXdTZXJ2aWNlLnVwZGF0ZVNjaGVkdWxlKGRhdGEpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG5cclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcbiAgc2hvd0NvbmZpcm1EaWFsb2coKTogTmdiTW9kYWxSZWYge1xyXG4gICAgY29uc3QgbW9kYWxSZWYgPSB0aGlzLm1vZGFsU2VydmljZS5vcGVuKENvbmZpcm1Nb2RhbENvbXBvbmVudCk7XHJcbiAgICBtb2RhbFJlZi5yZXN1bHQudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIHRoaXMuaW50ZXJ2aWV3U2VydmljZS51cGRhdGVTY2hlZHVsZSh7XHJcbiAgICAgICAgaWQ6IHRoaXMuaWRJbnRlcixcclxuICAgICAgICB0eXBlOiAwLFxyXG4gICAgICAgIGludGVydmlld1Nlc3Npb25TY2hlZHVsZUxpc3Q6IFtdIC8vIHJlcXVpcmVkXHJcbiAgICAgIH0pLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2FuY2VsIHN1Y2Nlc3NmdWxseSEnKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCAocmVhc29uKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdyZWFzb24gY29uZmlybSBjYW5jZWw6ICcsIHJlYXNvbik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtb2RhbFJlZjtcclxuICB9XHJcblxyXG4gIGNoYW5nZVRpbWV6b25lKGV2ZW50LCBpbmRleCkge1xyXG4gICAgaWYoZXZlbnQpe1xyXG4gICAgICB0aGlzLmxpbmVEYXRlW2luZGV4XS56b25lID0gZXZlbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NjcmVlbnMvYml6LWludGVydmlldy9jb21wb25lbnRzL3NjaGVkdWxlLXRhYi90YWItc2NoZWR1bGUuY29tcG9uZW50LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/webapp/app/screens/biz-interview/components/schedule-tab/tab-schedule.component.ts\n");

/***/ })

})