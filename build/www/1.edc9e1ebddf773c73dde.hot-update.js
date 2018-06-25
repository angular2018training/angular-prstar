webpackHotUpdate(1,{

/***/ "./src/main/webapp/app/screens/interview/pro-interview-schedule-tab/tab-schedule.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar interview_service_1 = __webpack_require__(\"./src/main/webapp/app/screens/interview/pro-interview-schedule-tab/services/interview.service.ts\");\r\nvar common_1 = __webpack_require__(\"./node_modules/@angular/common/esm5/common.js\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar ProInterviewScheduleTabComponent = /** @class */ (function () {\r\n    function ProInterviewScheduleTabComponent(interviewService, principal, datePipe) {\r\n        var _this = this;\r\n        this.interviewService = interviewService;\r\n        this.principal = principal;\r\n        this.datePipe = datePipe;\r\n        this.switch = '';\r\n        this.showSelectDate = false;\r\n        this.dataClick = {};\r\n        this.key = null;\r\n        this.interviewIndex = 0;\r\n        this.disableList = [];\r\n        this.lineDate = [\r\n            {\r\n                timezone: '',\r\n                fromTime: '',\r\n                toTime: ''\r\n            }\r\n        ];\r\n        this.data = {\r\n            \"id\": '',\r\n            \"interviewSessionScheduleList\": [],\r\n            \"note\": 'string'\r\n        };\r\n        this.principal.identity().then(function (account) {\r\n            _this.role = account.authorities[1];\r\n            console.log('current user: ', account);\r\n        });\r\n    }\r\n    ProInterviewScheduleTabComponent.prototype.ngOnChanges = function (changes) {\r\n        var _this = this;\r\n        if (this.interview) {\r\n            this.idInter = this.interview.id;\r\n            this.sessions = this.interview.interviewSessions;\r\n            this.sessions.forEach(function (item, index) {\r\n                var key = 'disable' + index;\r\n                _this.disableList.push((_a = {},\r\n                    _a[key] = false,\r\n                    _a));\r\n                var _a;\r\n            });\r\n        }\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.onClick = function (e, key) {\r\n        var _a = e.target, value = _a.value, name = _a.name, id = _a.id;\r\n        var index = id.replace('radio', '');\r\n        this.dataClick = Object.assign({}, this.dataClick, (_b = {},\r\n            _b[name] = [value, index],\r\n            _b));\r\n        if (value.includes('add')) {\r\n            var i = value.replace('add', '');\r\n            console.log('onClick----', value);\r\n        }\r\n        var _b;\r\n        // this.interviewIndex = key;\r\n        // this.key = e.target.value+key;\r\n        // this.switch = e.target.value;\r\n        // if(e.target.value === 'add') {\r\n        //   this.showSelectDate = true;\r\n        // } else {\r\n        //   this.showSelectDate = false;\r\n        // }\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.recievedDate = function (value) {\r\n        var id = value.id, data = value.data;\r\n        this.lineDate[id].timezone = data;\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.recievedTime = function (value) {\r\n        var id = value.id, data = value.data, name = value.name;\r\n        this.lineDate[id][name] = data;\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.onRemoveLine = function (index) {\r\n        this.lineDate.splice(index, 1);\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.onAddLine = function () {\r\n        this.lineDate.push({\r\n            timezone: '',\r\n            fromTime: '',\r\n            toTime: ''\r\n        });\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.checkDisabled = function () {\r\n        var data = this.dataClick;\r\n        for (var key in data) {\r\n            if (data[key] === 'add' || data[key] === 'request') {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    };\r\n    // parseData(session, date) {\r\n    //   if (this.switch === 'add') {\r\n    //     let suggestedInterviewSchedules = [];\r\n    //     date.forEach((item, index) => {\r\n    //       let data = {};\r\n    //       data = {\r\n    //         \"bizAccepted\": this.role === 'ROLE_BIZ' ? true : false,\r\n    //         \"duration\": 30,\r\n    //         \"fromTime\": item.fromTime,\r\n    //         \"interviewDate\": new Date(item.timezone),\r\n    //         \"interviewSessionId\": this.id,\r\n    //         \"note\": \"string\",\r\n    //         \"timezone\": \"string\",\r\n    //         \"proAccepted\": this.role === 'ROLE_BIZ' ? false : true,\r\n    //       }\r\n    //       suggestedInterviewSchedules.push(data)\r\n    //     });\r\n    //     this.data.interviewSessionScheduleList.push({\r\n    //       id: this.id,\r\n    //       suggestedInterviewSchedules: suggestedInterviewSchedules\r\n    //     })\r\n    //     this.data.id = this.idInter;\r\n    //     return this.data;\r\n    //   } else if (this.switch === 'request') {\r\n    //     this.data.id = this.idInter;\r\n    //     return this.data;\r\n    //   } else {\r\n    //     let { suggestedInterviewSchedules } = session;\r\n    //     let keys = Object.keys(date);\r\n    //     let value = date[keys[0]]\r\n    //     let index = keys[0].replace('group', '')\r\n    //     suggestedInterviewSchedules[index].interviewDate = value;\r\n    //     suggestedInterviewSchedules[index].interviewSessionId = this.id;\r\n    //     if (this.role === 'ROLE_BIZ') {\r\n    //       suggestedInterviewSchedules[index].bizAccepted = true;\r\n    //     } else {\r\n    //       suggestedInterviewSchedules[index].proAccepted = true;\r\n    //     }\r\n    //     this.data.id = this.idInter;\r\n    //     this.data.interviewSessionScheduleList.push({\r\n    //       id: this.id,\r\n    //       suggestedInterviewSchedules: suggestedInterviewSchedules\r\n    //     })\r\n    //     return this.data;\r\n    //   }\r\n    // }\r\n    // formartData(sessions, dateAvailability, lineDate) {\r\n    //   let data = {}\r\n    //   if (this.switch === 'add') {\r\n    //     console.log('add--------------')\r\n    //     console.log(dateAvailability)\r\n    //     data = this.parseData(sessions, lineDate)\r\n    //     return data;\r\n    //   } else if (this.switch === 'request') {\r\n    //     data = this.parseData(sessions, dateAvailability)\r\n    //     return data;\r\n    //   } else {\r\n    //     data = this.parseData(sessions, dateAvailability)\r\n    //     return data;\r\n    //   }\r\n    // }\r\n    ProInterviewScheduleTabComponent.prototype.parseData = function (index, valueClick) {\r\n        var _this = this;\r\n        var data = {};\r\n        var sessions = this.sessions;\r\n        if (valueClick[0] === 'request') {\r\n            var session = sessions[index];\r\n            var suggestedInterviewSchedules = session.suggestedInterviewSchedules;\r\n            return { suggestedInterviewSchedules: suggestedInterviewSchedules };\r\n        }\r\n        else if (valueClick[0] === 'add') {\r\n            var suggestedInterviewSchedules_1 = [];\r\n            this.lineDate.forEach(function (item, index) {\r\n                var data = {};\r\n                data = {\r\n                    \"bizAccepted\": _this.role === 'ROLE_BIZ' ? true : false,\r\n                    \"duration\": 30,\r\n                    \"fromTime\": item.fromTime,\r\n                    \"interviewDate\": new Date(item.timezone),\r\n                    \"interviewSessionId\": _this.id,\r\n                    \"note\": \"string\",\r\n                    \"timezone\": \"string\",\r\n                    \"proAccepted\": _this.role === 'ROLE_BIZ' ? false : true,\r\n                };\r\n                suggestedInterviewSchedules_1.push(data);\r\n            });\r\n            console.log('add------', suggestedInterviewSchedules_1);\r\n        }\r\n        else {\r\n            var session = sessions[index];\r\n            var suggestedInterviewSchedules = session.suggestedInterviewSchedules;\r\n            var indexDate = valueClick[1];\r\n            var data_1 = suggestedInterviewSchedules[indexDate];\r\n            data_1.interviewDate = valueClick[0];\r\n            data_1.interviewSessionId = this.idInter;\r\n            if (this.role === 'ROLE_BIZ') {\r\n                data_1.bizAccepted = true;\r\n            }\r\n            else {\r\n                data_1.proAccepted = true;\r\n            }\r\n            var result = {\r\n                id: this.idInter,\r\n                suggestedInterviewSchedules: [data_1]\r\n            };\r\n            return result;\r\n        }\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.formartData = function (clickDate) {\r\n        var _this = this;\r\n        var keys = Object.keys(clickDate);\r\n        var sessions = this.sessions;\r\n        var dataParse = {};\r\n        keys.forEach(function (key, index) {\r\n            var i = key.replace('group', '');\r\n            dataParse = _this.parseData(i, clickDate[key]);\r\n            _this.data.interviewSessionScheduleList.push(dataParse);\r\n        });\r\n        this.data.id = this.idInter;\r\n        return this.data;\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.onSubmitData = function () {\r\n        var data = {};\r\n        data = this.formartData(this.dataClick);\r\n        console.log('onSubmitData', data);\r\n        this.interviewService.updateSchedule(data).subscribe(function (result) {\r\n        });\r\n    };\r\n    __decorate([\r\n        core_1.Input('interview'),\r\n        __metadata(\"design:type\", Object)\r\n    ], ProInterviewScheduleTabComponent.prototype, \"interview\", void 0);\r\n    ProInterviewScheduleTabComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'pro-interview-schedule-tab',\r\n            template: __webpack_require__(\"./src/main/webapp/app/screens/interview/pro-interview-schedule-tab/tab-schedule.component.html\"),\r\n            styles: [__webpack_require__(\"./src/main/webapp/app/screens/interview/pro-interview-schedule-tab/tab-schedule.component.css\")]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [interview_service_1.InterviewService,\r\n            shared_1.Principal,\r\n            common_1.DatePipe])\r\n    ], ProInterviewScheduleTabComponent);\r\n    return ProInterviewScheduleTabComponent;\r\n}());\r\nexports.ProInterviewScheduleTabComponent = ProInterviewScheduleTabComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NjcmVlbnMvaW50ZXJ2aWV3L3Byby1pbnRlcnZpZXctc2NoZWR1bGUtdGFiL3RhYi1zY2hlZHVsZS5jb21wb25lbnQudHM/ZWQzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDhFQUF5RDtBQUN6RCxrSkFBZ0U7QUFDaEUsb0ZBQTJDO0FBQzNDLDRFQUE0QztBQVE1QztJQThCRSwwQ0FDUyxnQkFBa0MsRUFDakMsU0FBb0IsRUFDcEIsUUFBa0I7UUFINUIsaUJBU0M7UUFSUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQTlCNUIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUVaLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixRQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ1gsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFRakIsYUFBUSxHQUFHO1lBQ1Q7Z0JBQ0UsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osUUFBUSxFQUFFLEVBQUU7Z0JBQ1osTUFBTSxFQUFFLEVBQUU7YUFDWDtTQUNGO1FBQ0QsU0FBSSxHQUFHO1lBQ0wsSUFBSSxFQUFFLEVBQUU7WUFDUiw4QkFBOEIsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sRUFBRSxRQUFRO1NBQ2pCO1FBT0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO1lBQ3JDLEtBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7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Q0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBQ0QsdURBQVksR0FBWjtRQUNFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQU07UUFFM0QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBM09tQjtRQUFuQixZQUFLLENBQUMsV0FBVyxDQUFDOzt1RUFBdUI7SUFGL0IsZ0NBQWdDO1FBTDVDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLDZCQUFhLGlHQUErQjtZQUM1QyxTQUFTLG1CQUFHLGdHQUErQjtTQUM1QyxDQUFDO3lDQWdDMkIsb0NBQWdCO1lBQ3RCLGtCQUFTO1lBQ1YsaUJBQVE7T0FqQ2pCLGdDQUFnQyxDQTBQNUM7SUFBRCx1Q0FBQztDQUFBO0FBMVBZLDRFQUFnQyIsImZpbGUiOiIuL3NyYy9tYWluL3dlYmFwcC9hcHAvc2NyZWVucy9pbnRlcnZpZXcvcHJvLWludGVydmlldy1zY2hlZHVsZS10YWIvdGFiLXNjaGVkdWxlLmNvbXBvbmVudC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbnRlcnZpZXdTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9pbnRlcnZpZXcuc2VydmljZSc7XHJcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUHJpbmNpcGFsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkJztcclxuaW1wb3J0IHsgSmhpQWxlcnRTZXJ2aWNlIH0gZnJvbSAnbmctamhpcHN0ZXInO1xyXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3Byby1pbnRlcnZpZXctc2NoZWR1bGUtdGFiJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGFiLXNjaGVkdWxlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90YWItc2NoZWR1bGUuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9JbnRlcnZpZXdTY2hlZHVsZVRhYkNvbXBvbmVudCB7XHJcbiAgLy8gQElucHV0KCdzZXNzaW9uJykgcHVibGljIHNlc3Npb246IGFueTtcclxuICBASW5wdXQoJ2ludGVydmlldycpIHB1YmxpYyBpbnRlcnZpZXc6IGFueTtcclxuICBzd2l0Y2ggPSAnJztcclxuICBzZXNzaW9uczogYW55W107XHJcbiAgc2hvd1NlbGVjdERhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBkYXRhQ2xpY2sgPSB7fTtcclxuICBrZXkgPSBudWxsO1xyXG4gIGludGVydmlld0luZGV4ID0gMDtcclxuICBkaXNhYmxlTGlzdCA9IFtdO1xyXG5cclxuICBkYXRlQXZhaWxhYmlsaXR5OiBhbnk7XHJcbiAgaWRJbnRlcjogYW55O1xyXG4gIGlkOiBhbnk7XHJcbiAgcm9sZTogYW55O1xyXG4gIG5vdGU6IGFueTtcclxuXHJcbiAgbGluZURhdGUgPSBbXHJcbiAgICB7XHJcbiAgICAgIHRpbWV6b25lOiAnJyxcclxuICAgICAgZnJvbVRpbWU6ICcnLFxyXG4gICAgICB0b1RpbWU6ICcnXHJcbiAgICB9XHJcbiAgXVxyXG4gIGRhdGEgPSB7XHJcbiAgICBcImlkXCI6ICcnLFxyXG4gICAgXCJpbnRlcnZpZXdTZXNzaW9uU2NoZWR1bGVMaXN0XCI6IFtdLFxyXG4gICAgXCJub3RlXCI6ICdzdHJpbmcnXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBpbnRlcnZpZXdTZXJ2aWNlOiBJbnRlcnZpZXdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBwcmluY2lwYWw6IFByaW5jaXBhbCxcclxuICAgIHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlLFxyXG4gICkge1xyXG4gICAgdGhpcy5wcmluY2lwYWwuaWRlbnRpdHkoKS50aGVuKChhY2NvdW50KSA9PiB7XHJcbiAgICAgIHRoaXMucm9sZSA9IGFjY291bnQuYXV0aG9yaXRpZXNbMV1cclxuICAgICAgY29uc29sZS5sb2coJ2N1cnJlbnQgdXNlcjogJywgYWNjb3VudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaW50ZXJ2aWV3KSB7XHJcbiAgICAgIHRoaXMuaWRJbnRlciA9IHRoaXMuaW50ZXJ2aWV3LmlkO1xyXG4gICAgICB0aGlzLnNlc3Npb25zID0gdGhpcy5pbnRlcnZpZXcuaW50ZXJ2aWV3U2Vzc2lvbnNcclxuICAgICAgdGhpcy5zZXNzaW9ucy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBrZXkgPSAnZGlzYWJsZScraW5kZXg7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlTGlzdC5wdXNoKHtcclxuICAgICAgICAgIFtrZXldOiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGUsIGtleSkge1xyXG4gICAgbGV0IHsgdmFsdWUsIG5hbWUsIGlkIH0gPSBlLnRhcmdldDtcclxuICAgIGxldCBpbmRleCA9IGlkLnJlcGxhY2UoJ3JhZGlvJywgJycpXHJcbiAgICB0aGlzLmRhdGFDbGljayA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGF0YUNsaWNrLCB7XHJcbiAgICAgIFtuYW1lXTogW3ZhbHVlLCBpbmRleF1cclxuICAgIH0pO1xyXG4gICAgaWYodmFsdWUuaW5jbHVkZXMoJ2FkZCcpKXtcclxuICAgICAgbGV0IGkgPSB2YWx1ZS5yZXBsYWNlKCdhZGQnLCAnJylcclxuICAgICAgY29uc29sZS5sb2coJ29uQ2xpY2stLS0tJywgdmFsdWUpXHJcbiAgICB9XHJcbiAgICAvLyB0aGlzLmludGVydmlld0luZGV4ID0ga2V5O1xyXG4gICAgLy8gdGhpcy5rZXkgPSBlLnRhcmdldC52YWx1ZStrZXk7XHJcbiAgICBcclxuICAgIC8vIHRoaXMuc3dpdGNoID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAvLyBpZihlLnRhcmdldC52YWx1ZSA9PT0gJ2FkZCcpIHtcclxuICAgIC8vICAgdGhpcy5zaG93U2VsZWN0RGF0ZSA9IHRydWU7XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICB0aGlzLnNob3dTZWxlY3REYXRlID0gZmFsc2U7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxuICByZWNpZXZlZERhdGUodmFsdWUpIHtcclxuICAgIGxldCB7IGlkLCBkYXRhIH0gPSB2YWx1ZTtcclxuICAgIHRoaXMubGluZURhdGVbaWRdLnRpbWV6b25lID0gZGF0YTtcclxuICB9XHJcblxyXG4gIHJlY2lldmVkVGltZSh2YWx1ZSkge1xyXG4gICAgbGV0IHsgaWQsIGRhdGEsIG5hbWUgfSA9IHZhbHVlO1xyXG4gICAgdGhpcy5saW5lRGF0ZVtpZF1bbmFtZV0gPSBkYXRhO1xyXG4gIH1cclxuXHJcbiAgb25SZW1vdmVMaW5lKGluZGV4KSB7XHJcbiAgICB0aGlzLmxpbmVEYXRlLnNwbGljZShpbmRleCwgMSlcclxuICB9XHJcblxyXG4gIG9uQWRkTGluZSgpIHtcclxuICAgIHRoaXMubGluZURhdGUucHVzaChcclxuICAgICAge1xyXG4gICAgICAgIHRpbWV6b25lOiAnJyxcclxuICAgICAgICBmcm9tVGltZTogJycsXHJcbiAgICAgICAgdG9UaW1lOiAnJ1xyXG4gICAgICB9LFxyXG4gICAgKVxyXG4gIH1cclxuICBjaGVja0Rpc2FibGVkKCkge1xyXG4gICAgbGV0IGRhdGEgPSB0aGlzLmRhdGFDbGljaztcclxuICAgIGZvciAobGV0IGtleSBpbiBkYXRhKSB7XHJcbiAgICAgIGlmIChkYXRhW2tleV0gPT09ICdhZGQnIHx8IGRhdGFba2V5XSA9PT0gJ3JlcXVlc3QnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLy8gcGFyc2VEYXRhKHNlc3Npb24sIGRhdGUpIHtcclxuICAvLyAgIGlmICh0aGlzLnN3aXRjaCA9PT0gJ2FkZCcpIHtcclxuICAvLyAgICAgbGV0IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlcyA9IFtdO1xyXG4gIC8vICAgICBkYXRlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgLy8gICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAvLyAgICAgICBkYXRhID0ge1xyXG4gIC8vICAgICAgICAgXCJiaXpBY2NlcHRlZFwiOiB0aGlzLnJvbGUgPT09ICdST0xFX0JJWicgPyB0cnVlIDogZmFsc2UsXHJcbiAgLy8gICAgICAgICBcImR1cmF0aW9uXCI6IDMwLFxyXG4gIC8vICAgICAgICAgXCJmcm9tVGltZVwiOiBpdGVtLmZyb21UaW1lLFxyXG4gIC8vICAgICAgICAgXCJpbnRlcnZpZXdEYXRlXCI6IG5ldyBEYXRlKGl0ZW0udGltZXpvbmUpLFxyXG4gIC8vICAgICAgICAgXCJpbnRlcnZpZXdTZXNzaW9uSWRcIjogdGhpcy5pZCxcclxuICAvLyAgICAgICAgIFwibm90ZVwiOiBcInN0cmluZ1wiLFxyXG4gIC8vICAgICAgICAgXCJ0aW1lem9uZVwiOiBcInN0cmluZ1wiLFxyXG4gIC8vICAgICAgICAgXCJwcm9BY2NlcHRlZFwiOiB0aGlzLnJvbGUgPT09ICdST0xFX0JJWicgPyBmYWxzZSA6IHRydWUsXHJcbiAgLy8gICAgICAgfVxyXG4gIC8vICAgICAgIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlcy5wdXNoKGRhdGEpXHJcbiAgLy8gICAgIH0pO1xyXG4gIC8vICAgICB0aGlzLmRhdGEuaW50ZXJ2aWV3U2Vzc2lvblNjaGVkdWxlTGlzdC5wdXNoKHtcclxuICAvLyAgICAgICBpZDogdGhpcy5pZCxcclxuICAvLyAgICAgICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXM6IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1xyXG4gIC8vICAgICB9KVxyXG4gIC8vICAgICB0aGlzLmRhdGEuaWQgPSB0aGlzLmlkSW50ZXI7XHJcbiAgLy8gICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgLy8gICB9IGVsc2UgaWYgKHRoaXMuc3dpdGNoID09PSAncmVxdWVzdCcpIHtcclxuICAvLyAgICAgdGhpcy5kYXRhLmlkID0gdGhpcy5pZEludGVyO1xyXG4gIC8vICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gIC8vICAgfSBlbHNlIHtcclxuICAvLyAgICAgbGV0IHsgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzIH0gPSBzZXNzaW9uO1xyXG4gIC8vICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGRhdGUpO1xyXG4gIC8vICAgICBsZXQgdmFsdWUgPSBkYXRlW2tleXNbMF1dXHJcbiAgLy8gICAgIGxldCBpbmRleCA9IGtleXNbMF0ucmVwbGFjZSgnZ3JvdXAnLCAnJylcclxuXHJcbiAgLy8gICAgIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1tpbmRleF0uaW50ZXJ2aWV3RGF0ZSA9IHZhbHVlO1xyXG4gIC8vICAgICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXNbaW5kZXhdLmludGVydmlld1Nlc3Npb25JZCA9IHRoaXMuaWQ7XHJcbiAgLy8gICAgIGlmICh0aGlzLnJvbGUgPT09ICdST0xFX0JJWicpIHtcclxuICAvLyAgICAgICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXNbaW5kZXhdLmJpekFjY2VwdGVkID0gdHJ1ZTtcclxuICAvLyAgICAgfSBlbHNlIHtcclxuICAvLyAgICAgICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXNbaW5kZXhdLnByb0FjY2VwdGVkID0gdHJ1ZTtcclxuICAvLyAgICAgfVxyXG5cclxuICAvLyAgICAgdGhpcy5kYXRhLmlkID0gdGhpcy5pZEludGVyO1xyXG4gIC8vICAgICB0aGlzLmRhdGEuaW50ZXJ2aWV3U2Vzc2lvblNjaGVkdWxlTGlzdC5wdXNoKHtcclxuICAvLyAgICAgICBpZDogdGhpcy5pZCxcclxuICAvLyAgICAgICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXM6IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1xyXG4gIC8vICAgICB9KVxyXG5cclxuICAvLyAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAvLyAgIH1cclxuICAvLyB9XHJcblxyXG4gIC8vIGZvcm1hcnREYXRhKHNlc3Npb25zLCBkYXRlQXZhaWxhYmlsaXR5LCBsaW5lRGF0ZSkge1xyXG4gIC8vICAgbGV0IGRhdGEgPSB7fVxyXG4gIC8vICAgaWYgKHRoaXMuc3dpdGNoID09PSAnYWRkJykge1xyXG4gIC8vICAgICBjb25zb2xlLmxvZygnYWRkLS0tLS0tLS0tLS0tLS0nKVxyXG4gIC8vICAgICBjb25zb2xlLmxvZyhkYXRlQXZhaWxhYmlsaXR5KVxyXG4gIC8vICAgICBkYXRhID0gdGhpcy5wYXJzZURhdGEoc2Vzc2lvbnMsIGxpbmVEYXRlKVxyXG4gIC8vICAgICByZXR1cm4gZGF0YTtcclxuICAvLyAgIH0gZWxzZSBpZiAodGhpcy5zd2l0Y2ggPT09ICdyZXF1ZXN0Jykge1xyXG4gIC8vICAgICBkYXRhID0gdGhpcy5wYXJzZURhdGEoc2Vzc2lvbnMsIGRhdGVBdmFpbGFiaWxpdHkpXHJcbiAgLy8gICAgIHJldHVybiBkYXRhO1xyXG4gIC8vICAgfSBlbHNlIHtcclxuICAvLyAgICAgZGF0YSA9IHRoaXMucGFyc2VEYXRhKHNlc3Npb25zLCBkYXRlQXZhaWxhYmlsaXR5KVxyXG4gIC8vICAgICByZXR1cm4gZGF0YTtcclxuICAvLyAgIH1cclxuICAvLyB9XHJcbiAgcGFyc2VEYXRhKGluZGV4LCB2YWx1ZUNsaWNrKSB7XHJcbiAgICBsZXQgZGF0YSA9IHt9XHJcbiAgICBsZXQgc2Vzc2lvbnMgPSB0aGlzLnNlc3Npb25zO1xyXG4gICAgaWYgKHZhbHVlQ2xpY2tbMF0gPT09ICdyZXF1ZXN0Jykge1xyXG4gICAgICBsZXQgc2Vzc2lvbiA9IHNlc3Npb25zW2luZGV4XTtcclxuICAgICAgbGV0IHsgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzIH0gPSBzZXNzaW9uO1xyXG4gICAgICByZXR1cm4geyBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXM6IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlcyB9XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlQ2xpY2tbMF0gPT09ICdhZGQnKSB7XHJcbiAgICAgIGxldCBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXMgPSBbXTtcclxuICAgICAgdGhpcy5saW5lRGF0ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBkYXRhID0ge307XHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgIFwiYml6QWNjZXB0ZWRcIjogdGhpcy5yb2xlID09PSAnUk9MRV9CSVonID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgXCJkdXJhdGlvblwiOiAzMCxcclxuICAgICAgICAgIFwiZnJvbVRpbWVcIjogaXRlbS5mcm9tVGltZSxcclxuICAgICAgICAgIFwiaW50ZXJ2aWV3RGF0ZVwiOiBuZXcgRGF0ZShpdGVtLnRpbWV6b25lKSxcclxuICAgICAgICAgIFwiaW50ZXJ2aWV3U2Vzc2lvbklkXCI6IHRoaXMuaWQsXHJcbiAgICAgICAgICBcIm5vdGVcIjogXCJzdHJpbmdcIixcclxuICAgICAgICAgIFwidGltZXpvbmVcIjogXCJzdHJpbmdcIixcclxuICAgICAgICAgIFwicHJvQWNjZXB0ZWRcIjogdGhpcy5yb2xlID09PSAnUk9MRV9CSVonID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXMucHVzaChkYXRhKVxyXG4gICAgICB9KTtcclxuICAgICAgY29uc29sZS5sb2coJ2FkZC0tLS0tLScsIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlcylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBzZXNzaW9uID0gc2Vzc2lvbnNbaW5kZXhdO1xyXG4gICAgICBsZXQgeyBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXMgfSA9IHNlc3Npb247XHJcbiAgICAgIGxldCBpbmRleERhdGUgPSB2YWx1ZUNsaWNrWzFdO1xyXG4gICAgICBsZXQgZGF0YSA9IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1tpbmRleERhdGVdO1xyXG5cclxuICAgICAgZGF0YS5pbnRlcnZpZXdEYXRlID0gdmFsdWVDbGlja1swXTtcclxuICAgICAgZGF0YS5pbnRlcnZpZXdTZXNzaW9uSWQgPSB0aGlzLmlkSW50ZXI7XHJcbiAgICAgIGlmICh0aGlzLnJvbGUgPT09ICdST0xFX0JJWicpIHtcclxuICAgICAgICBkYXRhLmJpekFjY2VwdGVkID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkYXRhLnByb0FjY2VwdGVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgcmVzdWx0ID0ge1xyXG4gICAgICAgIGlkOiB0aGlzLmlkSW50ZXIsXHJcbiAgICAgICAgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzOiBbZGF0YV1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9ybWFydERhdGEoY2xpY2tEYXRlKSB7XHJcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGNsaWNrRGF0ZSk7XHJcbiAgICBsZXQgc2Vzc2lvbnMgPSB0aGlzLnNlc3Npb25zO1xyXG4gICAgbGV0IGRhdGFQYXJzZSA9IHt9XHJcbiAgICBrZXlzLmZvckVhY2goKGtleSwgaW5kZXgpID0+IHtcclxuICAgICAgbGV0IGkgPSBrZXkucmVwbGFjZSgnZ3JvdXAnLCAnJylcclxuICAgICAgZGF0YVBhcnNlID0gdGhpcy5wYXJzZURhdGEoaSwgY2xpY2tEYXRlW2tleV0pXHJcbiAgICAgIHRoaXMuZGF0YS5pbnRlcnZpZXdTZXNzaW9uU2NoZWR1bGVMaXN0LnB1c2goZGF0YVBhcnNlKTtcclxuICAgIH0pXHJcbiAgICB0aGlzLmRhdGEuaWQgPSB0aGlzLmlkSW50ZXI7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gIH1cclxuICBvblN1Ym1pdERhdGEoKSB7XHJcbiAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgZGF0YSA9IHRoaXMuZm9ybWFydERhdGEodGhpcy5kYXRhQ2xpY2spO1xyXG4gICAgY29uc29sZS5sb2coJ29uU3VibWl0RGF0YScsIGRhdGEpXHJcbiAgICB0aGlzLmludGVydmlld1NlcnZpY2UudXBkYXRlU2NoZWR1bGUoZGF0YSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBjaGVja0tleUV4aXN0KGtleSkge1xyXG4gIC8vICBpZih0aGlzLmludGVydmlld0luZGV4ID09IGtleSkge1xyXG4gIC8vICAgIGlmKHRoaXMua2V5ID09IHRoaXMuc3dpdGNoK2tleSkge1xyXG4gIC8vICAgICAgcmV0dXJuIHRydWU7XHJcbiAgLy8gICAgfSBlbHNlIHtcclxuICAvLyAgICAgIHJldHVybiBmYWxzZTtcclxuICAvLyAgICB9XHJcbiAgLy8gIH0gZWxzZSB7XHJcbiAgLy8gICAgcmV0dXJuIHRydWU7XHJcbiAgLy8gIH1cclxuICAvLyB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NjcmVlbnMvaW50ZXJ2aWV3L3Byby1pbnRlcnZpZXctc2NoZWR1bGUtdGFiL3RhYi1zY2hlZHVsZS5jb21wb25lbnQudHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main/webapp/app/screens/interview/pro-interview-schedule-tab/tab-schedule.component.ts\n");

/***/ })

})