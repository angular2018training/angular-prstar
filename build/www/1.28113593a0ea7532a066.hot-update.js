webpackHotUpdate(1,{

/***/ "./src/main/webapp/app/screens/interview/pro-interview-schedule-tab/tab-schedule.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar interview_service_1 = __webpack_require__(\"./src/main/webapp/app/screens/interview/pro-interview-schedule-tab/services/interview.service.ts\");\r\nvar common_1 = __webpack_require__(\"./node_modules/@angular/common/esm5/common.js\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar ProInterviewScheduleTabComponent = /** @class */ (function () {\r\n    function ProInterviewScheduleTabComponent(interviewService, principal, datePipe) {\r\n        var _this = this;\r\n        this.interviewService = interviewService;\r\n        this.principal = principal;\r\n        this.datePipe = datePipe;\r\n        this.switch = '';\r\n        this.showSelectDate = false;\r\n        this.dataClick = {};\r\n        this.key = null;\r\n        this.interviewIndex = 0;\r\n        this.disableList = [];\r\n        this.lineDate = [\r\n            {\r\n                timezone: '',\r\n                fromTime: '',\r\n                toTime: ''\r\n            }\r\n        ];\r\n        this.data = {\r\n            \"id\": '',\r\n            \"interviewSessionScheduleList\": [],\r\n            \"note\": 'string'\r\n        };\r\n        this.principal.identity().then(function (account) {\r\n            _this.role = account.authorities[1];\r\n            console.log('current user: ', account);\r\n        });\r\n    }\r\n    ProInterviewScheduleTabComponent.prototype.ngOnChanges = function (changes) {\r\n        if (this.interview) {\r\n            this.idInter = this.interview.id;\r\n            this.sessions = this.interview.interviewSessions;\r\n        }\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.onClick = function (e, key) {\r\n        var _a = e.target, value = _a.value, name = _a.name, id = _a.id;\r\n        var index = id.replace('radio', '');\r\n        this.dataClick = Object.assign({}, this.dataClick, (_b = {},\r\n            _b[name] = [value, index],\r\n            _b));\r\n        this.interviewIndex = key;\r\n        this.key = e.target.value + key;\r\n        this.switch = e.target.value;\r\n        var _b;\r\n        // if(e.target.value === 'add') {\r\n        //   this.showSelectDate = true;\r\n        // } else {\r\n        //   this.showSelectDate = false;\r\n        // }\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.recievedDate = function (value) {\r\n        var id = value.id, data = value.data;\r\n        this.lineDate[id].timezone = data;\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.recievedTime = function (value) {\r\n        var id = value.id, data = value.data, name = value.name;\r\n        this.lineDate[id][name] = data;\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.onRemoveLine = function (index) {\r\n        this.lineDate.splice(index, 1);\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.onAddLine = function () {\r\n        this.lineDate.push({\r\n            timezone: '',\r\n            fromTime: '',\r\n            toTime: ''\r\n        });\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.checkDisabled = function () {\r\n        var data = this.dataClick;\r\n        for (var key in data) {\r\n            if (data[key] === 'add' || data[key] === 'request') {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    };\r\n    // parseData(session, date) {\r\n    //   if (this.switch === 'add') {\r\n    //     let suggestedInterviewSchedules = [];\r\n    //     date.forEach((item, index) => {\r\n    //       let data = {};\r\n    //       data = {\r\n    //         \"bizAccepted\": this.role === 'ROLE_BIZ' ? true : false,\r\n    //         \"duration\": 30,\r\n    //         \"fromTime\": item.fromTime,\r\n    //         \"interviewDate\": new Date(item.timezone),\r\n    //         \"interviewSessionId\": this.id,\r\n    //         \"note\": \"string\",\r\n    //         \"timezone\": \"string\",\r\n    //         \"proAccepted\": this.role === 'ROLE_BIZ' ? false : true,\r\n    //       }\r\n    //       suggestedInterviewSchedules.push(data)\r\n    //     });\r\n    //     this.data.interviewSessionScheduleList.push({\r\n    //       id: this.id,\r\n    //       suggestedInterviewSchedules: suggestedInterviewSchedules\r\n    //     })\r\n    //     this.data.id = this.idInter;\r\n    //     return this.data;\r\n    //   } else if (this.switch === 'request') {\r\n    //     this.data.id = this.idInter;\r\n    //     return this.data;\r\n    //   } else {\r\n    //     let { suggestedInterviewSchedules } = session;\r\n    //     let keys = Object.keys(date);\r\n    //     let value = date[keys[0]]\r\n    //     let index = keys[0].replace('group', '')\r\n    //     suggestedInterviewSchedules[index].interviewDate = value;\r\n    //     suggestedInterviewSchedules[index].interviewSessionId = this.id;\r\n    //     if (this.role === 'ROLE_BIZ') {\r\n    //       suggestedInterviewSchedules[index].bizAccepted = true;\r\n    //     } else {\r\n    //       suggestedInterviewSchedules[index].proAccepted = true;\r\n    //     }\r\n    //     this.data.id = this.idInter;\r\n    //     this.data.interviewSessionScheduleList.push({\r\n    //       id: this.id,\r\n    //       suggestedInterviewSchedules: suggestedInterviewSchedules\r\n    //     })\r\n    //     return this.data;\r\n    //   }\r\n    // }\r\n    // formartData(sessions, dateAvailability, lineDate) {\r\n    //   let data = {}\r\n    //   if (this.switch === 'add') {\r\n    //     console.log('add--------------')\r\n    //     console.log(dateAvailability)\r\n    //     data = this.parseData(sessions, lineDate)\r\n    //     return data;\r\n    //   } else if (this.switch === 'request') {\r\n    //     data = this.parseData(sessions, dateAvailability)\r\n    //     return data;\r\n    //   } else {\r\n    //     data = this.parseData(sessions, dateAvailability)\r\n    //     return data;\r\n    //   }\r\n    // }\r\n    ProInterviewScheduleTabComponent.prototype.parseData = function (index, valueClick) {\r\n        var _this = this;\r\n        var data = {};\r\n        var sessions = this.sessions;\r\n        if (valueClick[0] === 'request') {\r\n            var session = sessions[index];\r\n            var suggestedInterviewSchedules = session.suggestedInterviewSchedules;\r\n            return { suggestedInterviewSchedules: suggestedInterviewSchedules };\r\n        }\r\n        else if (valueClick[0] === 'add') {\r\n            var suggestedInterviewSchedules_1 = [];\r\n            this.lineDate.forEach(function (item, index) {\r\n                var data = {};\r\n                data = {\r\n                    \"bizAccepted\": _this.role === 'ROLE_BIZ' ? true : false,\r\n                    \"duration\": 30,\r\n                    \"fromTime\": item.fromTime,\r\n                    \"interviewDate\": new Date(item.timezone),\r\n                    \"interviewSessionId\": _this.id,\r\n                    \"note\": \"string\",\r\n                    \"timezone\": \"string\",\r\n                    \"proAccepted\": _this.role === 'ROLE_BIZ' ? false : true,\r\n                };\r\n                suggestedInterviewSchedules_1.push(data);\r\n            });\r\n            console.log('add------', suggestedInterviewSchedules_1);\r\n        }\r\n        else {\r\n            var session = sessions[index];\r\n            var suggestedInterviewSchedules = session.suggestedInterviewSchedules;\r\n            var indexDate = valueClick[1];\r\n            var data_1 = suggestedInterviewSchedules[indexDate];\r\n            data_1.interviewDate = valueClick[0];\r\n            data_1.interviewSessionId = this.idInter;\r\n            if (this.role === 'ROLE_BIZ') {\r\n                data_1.bizAccepted = true;\r\n            }\r\n            else {\r\n                data_1.proAccepted = true;\r\n            }\r\n            var result = {\r\n                id: this.idInter,\r\n                suggestedInterviewSchedules: [data_1]\r\n            };\r\n            return result;\r\n        }\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.formartData = function (clickDate) {\r\n        var _this = this;\r\n        var keys = Object.keys(clickDate);\r\n        var sessions = this.sessions;\r\n        var dataParse = {};\r\n        keys.forEach(function (key, index) {\r\n            var i = key.replace('group', '');\r\n            dataParse = _this.parseData(i, clickDate[key]);\r\n            _this.data.interviewSessionScheduleList.push(dataParse);\r\n        });\r\n        this.data.id = this.idInter;\r\n        return this.data;\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.onSubmitData = function () {\r\n        var data = {};\r\n        data = this.formartData(this.dataClick);\r\n        console.log('onSubmitData', data);\r\n        this.interviewService.updateSchedule(data).subscribe(function (result) {\r\n        });\r\n    };\r\n    ProInterviewScheduleTabComponent.prototype.checkKeyExist = function (key) {\r\n        if (this.interviewIndex == key) {\r\n            if (this.key == this.switch + key) {\r\n                return true;\r\n            }\r\n            else {\r\n                return false;\r\n            }\r\n        }\r\n        else {\r\n            return true;\r\n        }\r\n    };\r\n    __decorate([\r\n        core_1.Input('interview'),\r\n        __metadata(\"design:type\", Object)\r\n    ], ProInterviewScheduleTabComponent.prototype, \"interview\", void 0);\r\n    ProInterviewScheduleTabComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'pro-interview-schedule-tab',\r\n            template: __webpack_require__(\"./src/main/webapp/app/screens/interview/pro-interview-schedule-tab/tab-schedule.component.html\"),\r\n            styles: [__webpack_require__(\"./src/main/webapp/app/screens/interview/pro-interview-schedule-tab/tab-schedule.component.css\")]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [interview_service_1.InterviewService,\r\n            shared_1.Principal,\r\n            common_1.DatePipe])\r\n    ], ProInterviewScheduleTabComponent);\r\n    return ProInterviewScheduleTabComponent;\r\n}());\r\nexports.ProInterviewScheduleTabComponent = ProInterviewScheduleTabComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NjcmVlbnMvaW50ZXJ2aWV3L3Byby1pbnRlcnZpZXctc2NoZWR1bGUtdGFiL3RhYi1zY2hlZHVsZS5jb21wb25lbnQudHM/ZWQzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDhFQUF5RDtBQUN6RCxrSkFBZ0U7QUFDaEUsb0ZBQTJDO0FBQzNDLDRFQUE0QztBQVE1QztJQThCRSwwQ0FDUyxnQkFBa0MsRUFDakMsU0FBb0IsRUFDcEIsUUFBa0I7UUFINUIsaUJBU0M7UUFSUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQTlCNUIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUVaLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixRQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ1gsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFRakIsYUFBUSxHQUFHO1lBQ1Q7Z0JBQ0UsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osUUFBUSxFQUFFLEVBQUU7Z0JBQ1osTUFBTSxFQUFFLEVBQUU7YUFDWDtTQUNGO1FBQ0QsU0FBSSxHQUFHO1lBQ0wsSUFBSSxFQUFFLEVBQUU7WUFDUiw4QkFBOEIsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sRUFBRSxRQUFRO1NBQ2pCO1FBT0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO1lBQ3JDLEtBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7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SSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQU07UUFFM0QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsd0RBQWEsR0FBYixVQUFjLEdBQUc7UUFDaEIsRUFBRSxFQUFDLElBQUksQ0FBQyxjQUFjLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM5QixFQUFFLEVBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNmLENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNGLENBQUM7SUE5T21CO1FBQW5CLFlBQUssQ0FBQyxXQUFXLENBQUM7O3VFQUF1QjtJQUYvQixnQ0FBZ0M7UUFMNUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw0QkFBNEI7WUFDdEMsNkJBQWEsaUdBQStCO1lBQzVDLFNBQVMsbUJBQUcsZ0dBQStCO1NBQzVDLENBQUM7eUNBZ0MyQixvQ0FBZ0I7WUFDdEIsa0JBQVM7WUFDVixpQkFBUTtPQWpDakIsZ0NBQWdDLENBaVA1QztJQUFELHVDQUFDO0NBQUE7QUFqUFksNEVBQWdDIiwiZmlsZSI6Ii4vc3JjL21haW4vd2ViYXBwL2FwcC9zY3JlZW5zL2ludGVydmlldy9wcm8taW50ZXJ2aWV3LXNjaGVkdWxlLXRhYi90YWItc2NoZWR1bGUuY29tcG9uZW50LnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEludGVydmlld1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2ludGVydmlldy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBQcmluY2lwYWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQnO1xyXG5pbXBvcnQgeyBKaGlBbGVydFNlcnZpY2UgfSBmcm9tICduZy1qaGlwc3Rlcic7XHJcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAncHJvLWludGVydmlldy1zY2hlZHVsZS10YWInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90YWItc2NoZWR1bGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RhYi1zY2hlZHVsZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFByb0ludGVydmlld1NjaGVkdWxlVGFiQ29tcG9uZW50IHtcclxuICAvLyBASW5wdXQoJ3Nlc3Npb24nKSBwdWJsaWMgc2Vzc2lvbjogYW55O1xyXG4gIEBJbnB1dCgnaW50ZXJ2aWV3JykgcHVibGljIGludGVydmlldzogYW55O1xyXG4gIHN3aXRjaCA9ICcnO1xyXG4gIHNlc3Npb25zOiBhbnlbXTtcclxuICBzaG93U2VsZWN0RGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGRhdGFDbGljayA9IHt9O1xyXG4gIGtleSA9IG51bGw7XHJcbiAgaW50ZXJ2aWV3SW5kZXggPSAwO1xyXG4gIGRpc2FibGVMaXN0ID0gW107XHJcbiAgXHJcbiAgZGF0ZUF2YWlsYWJpbGl0eTogYW55O1xyXG4gIGlkSW50ZXI6IGFueTtcclxuICBpZDogYW55O1xyXG4gIHJvbGU6IGFueTtcclxuICBub3RlOiBhbnk7XHJcblxyXG4gIGxpbmVEYXRlID0gW1xyXG4gICAge1xyXG4gICAgICB0aW1lem9uZTogJycsXHJcbiAgICAgIGZyb21UaW1lOiAnJyxcclxuICAgICAgdG9UaW1lOiAnJ1xyXG4gICAgfVxyXG4gIF1cclxuICBkYXRhID0ge1xyXG4gICAgXCJpZFwiOiAnJyxcclxuICAgIFwiaW50ZXJ2aWV3U2Vzc2lvblNjaGVkdWxlTGlzdFwiOiBbXSxcclxuICAgIFwibm90ZVwiOiAnc3RyaW5nJ1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgaW50ZXJ2aWV3U2VydmljZTogSW50ZXJ2aWV3U2VydmljZSxcclxuICAgIHByaXZhdGUgcHJpbmNpcGFsOiBQcmluY2lwYWwsXHJcbiAgICBwcml2YXRlIGRhdGVQaXBlOiBEYXRlUGlwZSxcclxuICApIHtcclxuICAgIHRoaXMucHJpbmNpcGFsLmlkZW50aXR5KCkudGhlbigoYWNjb3VudCkgPT4ge1xyXG4gICAgICB0aGlzLnJvbGUgPSBhY2NvdW50LmF1dGhvcml0aWVzWzFdXHJcbiAgICAgIGNvbnNvbGUubG9nKCdjdXJyZW50IHVzZXI6ICcsIGFjY291bnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmludGVydmlldykge1xyXG4gICAgICB0aGlzLmlkSW50ZXIgPSB0aGlzLmludGVydmlldy5pZDtcclxuICAgICAgdGhpcy5zZXNzaW9ucyA9IHRoaXMuaW50ZXJ2aWV3LmludGVydmlld1Nlc3Npb25zXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGUsIGtleSkge1xyXG4gICAgbGV0IHsgdmFsdWUsIG5hbWUsIGlkIH0gPSBlLnRhcmdldDtcclxuICAgIGxldCBpbmRleCA9IGlkLnJlcGxhY2UoJ3JhZGlvJywgJycpXHJcbiAgICB0aGlzLmRhdGFDbGljayA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGF0YUNsaWNrLCB7XHJcbiAgICAgIFtuYW1lXTogW3ZhbHVlLCBpbmRleF1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaW50ZXJ2aWV3SW5kZXggPSBrZXk7XHJcbiAgICB0aGlzLmtleSA9IGUudGFyZ2V0LnZhbHVlK2tleTtcclxuICAgIFxyXG4gICAgdGhpcy5zd2l0Y2ggPSBlLnRhcmdldC52YWx1ZTtcclxuICAgIC8vIGlmKGUudGFyZ2V0LnZhbHVlID09PSAnYWRkJykge1xyXG4gICAgLy8gICB0aGlzLnNob3dTZWxlY3REYXRlID0gdHJ1ZTtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIHRoaXMuc2hvd1NlbGVjdERhdGUgPSBmYWxzZTtcclxuICAgIC8vIH1cclxuICB9XHJcblxyXG4gIHJlY2lldmVkRGF0ZSh2YWx1ZSkge1xyXG4gICAgbGV0IHsgaWQsIGRhdGEgfSA9IHZhbHVlO1xyXG4gICAgdGhpcy5saW5lRGF0ZVtpZF0udGltZXpvbmUgPSBkYXRhO1xyXG4gIH1cclxuXHJcbiAgcmVjaWV2ZWRUaW1lKHZhbHVlKSB7XHJcbiAgICBsZXQgeyBpZCwgZGF0YSwgbmFtZSB9ID0gdmFsdWU7XHJcbiAgICB0aGlzLmxpbmVEYXRlW2lkXVtuYW1lXSA9IGRhdGE7XHJcbiAgfVxyXG5cclxuICBvblJlbW92ZUxpbmUoaW5kZXgpIHtcclxuICAgIHRoaXMubGluZURhdGUuc3BsaWNlKGluZGV4LCAxKVxyXG4gIH1cclxuXHJcbiAgb25BZGRMaW5lKCkge1xyXG4gICAgdGhpcy5saW5lRGF0ZS5wdXNoKFxyXG4gICAgICB7XHJcbiAgICAgICAgdGltZXpvbmU6ICcnLFxyXG4gICAgICAgIGZyb21UaW1lOiAnJyxcclxuICAgICAgICB0b1RpbWU6ICcnXHJcbiAgICAgIH0sXHJcbiAgICApXHJcbiAgfVxyXG4gIGNoZWNrRGlzYWJsZWQoKSB7XHJcbiAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YUNsaWNrO1xyXG4gICAgZm9yIChsZXQga2V5IGluIGRhdGEpIHtcclxuICAgICAgaWYgKGRhdGFba2V5XSA9PT0gJ2FkZCcgfHwgZGF0YVtrZXldID09PSAncmVxdWVzdCcpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvLyBwYXJzZURhdGEoc2Vzc2lvbiwgZGF0ZSkge1xyXG4gIC8vICAgaWYgKHRoaXMuc3dpdGNoID09PSAnYWRkJykge1xyXG4gIC8vICAgICBsZXQgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzID0gW107XHJcbiAgLy8gICAgIGRhdGUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAvLyAgICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gIC8vICAgICAgIGRhdGEgPSB7XHJcbiAgLy8gICAgICAgICBcImJpekFjY2VwdGVkXCI6IHRoaXMucm9sZSA9PT0gJ1JPTEVfQklaJyA/IHRydWUgOiBmYWxzZSxcclxuICAvLyAgICAgICAgIFwiZHVyYXRpb25cIjogMzAsXHJcbiAgLy8gICAgICAgICBcImZyb21UaW1lXCI6IGl0ZW0uZnJvbVRpbWUsXHJcbiAgLy8gICAgICAgICBcImludGVydmlld0RhdGVcIjogbmV3IERhdGUoaXRlbS50aW1lem9uZSksXHJcbiAgLy8gICAgICAgICBcImludGVydmlld1Nlc3Npb25JZFwiOiB0aGlzLmlkLFxyXG4gIC8vICAgICAgICAgXCJub3RlXCI6IFwic3RyaW5nXCIsXHJcbiAgLy8gICAgICAgICBcInRpbWV6b25lXCI6IFwic3RyaW5nXCIsXHJcbiAgLy8gICAgICAgICBcInByb0FjY2VwdGVkXCI6IHRoaXMucm9sZSA9PT0gJ1JPTEVfQklaJyA/IGZhbHNlIDogdHJ1ZSxcclxuICAvLyAgICAgICB9XHJcbiAgLy8gICAgICAgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzLnB1c2goZGF0YSlcclxuICAvLyAgICAgfSk7XHJcbiAgLy8gICAgIHRoaXMuZGF0YS5pbnRlcnZpZXdTZXNzaW9uU2NoZWR1bGVMaXN0LnB1c2goe1xyXG4gIC8vICAgICAgIGlkOiB0aGlzLmlkLFxyXG4gIC8vICAgICAgIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlczogc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzXHJcbiAgLy8gICAgIH0pXHJcbiAgLy8gICAgIHRoaXMuZGF0YS5pZCA9IHRoaXMuaWRJbnRlcjtcclxuICAvLyAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAvLyAgIH0gZWxzZSBpZiAodGhpcy5zd2l0Y2ggPT09ICdyZXF1ZXN0Jykge1xyXG4gIC8vICAgICB0aGlzLmRhdGEuaWQgPSB0aGlzLmlkSW50ZXI7XHJcbiAgLy8gICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICBsZXQgeyBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXMgfSA9IHNlc3Npb247XHJcbiAgLy8gICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoZGF0ZSk7XHJcbiAgLy8gICAgIGxldCB2YWx1ZSA9IGRhdGVba2V5c1swXV1cclxuICAvLyAgICAgbGV0IGluZGV4ID0ga2V5c1swXS5yZXBsYWNlKCdncm91cCcsICcnKVxyXG5cclxuICAvLyAgICAgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzW2luZGV4XS5pbnRlcnZpZXdEYXRlID0gdmFsdWU7XHJcbiAgLy8gICAgIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1tpbmRleF0uaW50ZXJ2aWV3U2Vzc2lvbklkID0gdGhpcy5pZDtcclxuICAvLyAgICAgaWYgKHRoaXMucm9sZSA9PT0gJ1JPTEVfQklaJykge1xyXG4gIC8vICAgICAgIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1tpbmRleF0uYml6QWNjZXB0ZWQgPSB0cnVlO1xyXG4gIC8vICAgICB9IGVsc2Uge1xyXG4gIC8vICAgICAgIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlc1tpbmRleF0ucHJvQWNjZXB0ZWQgPSB0cnVlO1xyXG4gIC8vICAgICB9XHJcblxyXG4gIC8vICAgICB0aGlzLmRhdGEuaWQgPSB0aGlzLmlkSW50ZXI7XHJcbiAgLy8gICAgIHRoaXMuZGF0YS5pbnRlcnZpZXdTZXNzaW9uU2NoZWR1bGVMaXN0LnB1c2goe1xyXG4gIC8vICAgICAgIGlkOiB0aGlzLmlkLFxyXG4gIC8vICAgICAgIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlczogc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzXHJcbiAgLy8gICAgIH0pXHJcblxyXG4gIC8vICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuXHJcbiAgLy8gZm9ybWFydERhdGEoc2Vzc2lvbnMsIGRhdGVBdmFpbGFiaWxpdHksIGxpbmVEYXRlKSB7XHJcbiAgLy8gICBsZXQgZGF0YSA9IHt9XHJcbiAgLy8gICBpZiAodGhpcy5zd2l0Y2ggPT09ICdhZGQnKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKCdhZGQtLS0tLS0tLS0tLS0tLScpXHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKGRhdGVBdmFpbGFiaWxpdHkpXHJcbiAgLy8gICAgIGRhdGEgPSB0aGlzLnBhcnNlRGF0YShzZXNzaW9ucywgbGluZURhdGUpXHJcbiAgLy8gICAgIHJldHVybiBkYXRhO1xyXG4gIC8vICAgfSBlbHNlIGlmICh0aGlzLnN3aXRjaCA9PT0gJ3JlcXVlc3QnKSB7XHJcbiAgLy8gICAgIGRhdGEgPSB0aGlzLnBhcnNlRGF0YShzZXNzaW9ucywgZGF0ZUF2YWlsYWJpbGl0eSlcclxuICAvLyAgICAgcmV0dXJuIGRhdGE7XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICBkYXRhID0gdGhpcy5wYXJzZURhdGEoc2Vzc2lvbnMsIGRhdGVBdmFpbGFiaWxpdHkpXHJcbiAgLy8gICAgIHJldHVybiBkYXRhO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuICBwYXJzZURhdGEoaW5kZXgsIHZhbHVlQ2xpY2spIHtcclxuICAgIGxldCBkYXRhID0ge31cclxuICAgIGxldCBzZXNzaW9ucyA9IHRoaXMuc2Vzc2lvbnM7XHJcbiAgICBpZiAodmFsdWVDbGlja1swXSA9PT0gJ3JlcXVlc3QnKSB7XHJcbiAgICAgIGxldCBzZXNzaW9uID0gc2Vzc2lvbnNbaW5kZXhdO1xyXG4gICAgICBsZXQgeyBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXMgfSA9IHNlc3Npb247XHJcbiAgICAgIHJldHVybiB7IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlczogc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzIH1cclxuICAgIH0gZWxzZSBpZiAodmFsdWVDbGlja1swXSA9PT0gJ2FkZCcpIHtcclxuICAgICAgbGV0IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlcyA9IFtdO1xyXG4gICAgICB0aGlzLmxpbmVEYXRlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgXCJiaXpBY2NlcHRlZFwiOiB0aGlzLnJvbGUgPT09ICdST0xFX0JJWicgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICBcImR1cmF0aW9uXCI6IDMwLFxyXG4gICAgICAgICAgXCJmcm9tVGltZVwiOiBpdGVtLmZyb21UaW1lLFxyXG4gICAgICAgICAgXCJpbnRlcnZpZXdEYXRlXCI6IG5ldyBEYXRlKGl0ZW0udGltZXpvbmUpLFxyXG4gICAgICAgICAgXCJpbnRlcnZpZXdTZXNzaW9uSWRcIjogdGhpcy5pZCxcclxuICAgICAgICAgIFwibm90ZVwiOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgXCJ0aW1lem9uZVwiOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgXCJwcm9BY2NlcHRlZFwiOiB0aGlzLnJvbGUgPT09ICdST0xFX0JJWicgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlcy5wdXNoKGRhdGEpXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZygnYWRkLS0tLS0tJywgc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHNlc3Npb24gPSBzZXNzaW9uc1tpbmRleF07XHJcbiAgICAgIGxldCB7IHN1Z2dlc3RlZEludGVydmlld1NjaGVkdWxlcyB9ID0gc2Vzc2lvbjtcclxuICAgICAgbGV0IGluZGV4RGF0ZSA9IHZhbHVlQ2xpY2tbMV07XHJcbiAgICAgIGxldCBkYXRhID0gc3VnZ2VzdGVkSW50ZXJ2aWV3U2NoZWR1bGVzW2luZGV4RGF0ZV07XHJcblxyXG4gICAgICBkYXRhLmludGVydmlld0RhdGUgPSB2YWx1ZUNsaWNrWzBdO1xyXG4gICAgICBkYXRhLmludGVydmlld1Nlc3Npb25JZCA9IHRoaXMuaWRJbnRlcjtcclxuICAgICAgaWYgKHRoaXMucm9sZSA9PT0gJ1JPTEVfQklaJykge1xyXG4gICAgICAgIGRhdGEuYml6QWNjZXB0ZWQgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRhdGEucHJvQWNjZXB0ZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCByZXN1bHQgPSB7XHJcbiAgICAgICAgaWQ6IHRoaXMuaWRJbnRlcixcclxuICAgICAgICBzdWdnZXN0ZWRJbnRlcnZpZXdTY2hlZHVsZXM6IFtkYXRhXVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3JtYXJ0RGF0YShjbGlja0RhdGUpIHtcclxuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoY2xpY2tEYXRlKTtcclxuICAgIGxldCBzZXNzaW9ucyA9IHRoaXMuc2Vzc2lvbnM7XHJcbiAgICBsZXQgZGF0YVBhcnNlID0ge31cclxuICAgIGtleXMuZm9yRWFjaCgoa2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICBsZXQgaSA9IGtleS5yZXBsYWNlKCdncm91cCcsICcnKVxyXG4gICAgICBkYXRhUGFyc2UgPSB0aGlzLnBhcnNlRGF0YShpLCBjbGlja0RhdGVba2V5XSlcclxuICAgICAgdGhpcy5kYXRhLmludGVydmlld1Nlc3Npb25TY2hlZHVsZUxpc3QucHVzaChkYXRhUGFyc2UpO1xyXG4gICAgfSlcclxuICAgIHRoaXMuZGF0YS5pZCA9IHRoaXMuaWRJbnRlcjtcclxuICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgfVxyXG4gIG9uU3VibWl0RGF0YSgpIHtcclxuICAgIGxldCBkYXRhID0ge307XHJcbiAgICBkYXRhID0gdGhpcy5mb3JtYXJ0RGF0YSh0aGlzLmRhdGFDbGljayk7XHJcbiAgICBjb25zb2xlLmxvZygnb25TdWJtaXREYXRhJywgZGF0YSlcclxuICAgIHRoaXMuaW50ZXJ2aWV3U2VydmljZS51cGRhdGVTY2hlZHVsZShkYXRhKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcclxuXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNoZWNrS2V5RXhpc3Qoa2V5KSB7XHJcbiAgIGlmKHRoaXMuaW50ZXJ2aWV3SW5kZXggPT0ga2V5KSB7XHJcbiAgICAgaWYodGhpcy5rZXkgPT0gdGhpcy5zd2l0Y2gra2V5KSB7XHJcbiAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICB9IGVsc2Uge1xyXG4gICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgIH1cclxuICAgfSBlbHNlIHtcclxuICAgICByZXR1cm4gdHJ1ZTtcclxuICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9tYWluL3dlYmFwcC9hcHAvc2NyZWVucy9pbnRlcnZpZXcvcHJvLWludGVydmlldy1zY2hlZHVsZS10YWIvdGFiLXNjaGVkdWxlLmNvbXBvbmVudC50cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main/webapp/app/screens/interview/pro-interview-schedule-tab/tab-schedule.component.ts\n");

/***/ })

})