webpackHotUpdate(1,{

/***/ "./src/main/webapp/app/screens/interview/interview.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar pro_interview_component_1 = __webpack_require__(\"./src/main/webapp/app/screens/interview/pro-interview.component.ts\");\r\nvar tab_schedule_component_1 = __webpack_require__(\"./src/main/webapp/app/screens/interview/pro-interview-schedule-tab/tab-schedule.component.ts\");\r\nvar pro_interview_project_tab_component_1 = __webpack_require__(\"./src/main/webapp/app/screens/interview/pro-interview-project-tab.component.ts\");\r\nvar tab_schedule_service_1 = __webpack_require__(\"./src/main/webapp/app/screens/interview/pro-interview-schedule-tab/tab-schedule.service.ts\");\r\nvar forms_1 = __webpack_require__(\"./node_modules/@angular/forms/esm5/forms.js\");\r\nvar router_1 = __webpack_require__(\"./node_modules/@angular/router/esm5/router.js\");\r\nvar common_1 = __webpack_require__(\"./node_modules/@angular/common/esm5/common.js\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar interview_route_1 = __webpack_require__(\"./src/main/webapp/app/screens/interview/interview.route.ts\");\r\nvar InterviewModule = /** @class */ (function () {\r\n    function InterviewModule() {\r\n    }\r\n    InterviewModule = __decorate([\r\n        core_1.NgModule({\r\n            imports: [\r\n                shared_1.ProstarsWebSharedModule,\r\n                common_1.CommonModule,\r\n                forms_1.FormsModule,\r\n                router_1.RouterModule.forChild(interview_route_1.INTERVIEW_ROUTE)\r\n            ],\r\n            declarations: [\r\n                pro_interview_project_tab_component_1.ProInterviewProjectTabComponent,\r\n                tab_schedule_component_1.ProInterviewScheduleTabComponent,\r\n                pro_interview_component_1.ProInterviewComponent\r\n            ],\r\n            providers: [\r\n                tab_schedule_service_1.ProInterviewScheduleTabServices\r\n            ],\r\n        })\r\n    ], InterviewModule);\r\n    return InterviewModule;\r\n}());\r\nexports.InterviewModule = InterviewModule;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NjcmVlbnMvaW50ZXJ2aWV3L2ludGVydmlldy5tb2R1bGUudHM/NGQ4YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDBIQUFrRTtBQUNsRSxtSkFBdUc7QUFDdkcsa0pBQXdGO0FBQ3hGLCtJQUFvRztBQUVwRyxpRkFBNkM7QUFDN0Msb0ZBQStDO0FBQy9DLG9GQUErQztBQUMvQyw0RUFBdUQ7QUFDdkQsOEVBQXlDO0FBR3pDLDBHQUFtRDtBQWtCbkQ7SUFBQTtJQUE4QixDQUFDO0lBQWxCLGVBQWU7UUFoQjNCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxnQ0FBdUI7Z0JBQ3ZCLHFCQUFZO2dCQUNaLG1CQUFXO2dCQUNYLHFCQUFZLENBQUMsUUFBUSxDQUFDLGlDQUFlLENBQUM7YUFDdkM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1oscUVBQStCO2dCQUMvQix5REFBZ0M7Z0JBQ2hDLCtDQUFxQjthQUN0QjtZQUNELFNBQVMsRUFBRTtnQkFDVCxzREFBK0I7YUFDaEM7U0FDRixDQUFDO09BQ1csZUFBZSxDQUFHO0lBQUQsc0JBQUM7Q0FBQTtBQUFsQiwwQ0FBZSIsImZpbGUiOiIuL3NyYy9tYWluL3dlYmFwcC9hcHAvc2NyZWVucy9pbnRlcnZpZXcvaW50ZXJ2aWV3Lm1vZHVsZS50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb0ludGVydmlld0NvbXBvbmVudCB9IGZyb20gJy4vcHJvLWludGVydmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvSW50ZXJ2aWV3U2NoZWR1bGVUYWJDb21wb25lbnQgfSBmcm9tICcuL3Byby1pbnRlcnZpZXctc2NoZWR1bGUtdGFiL3RhYi1zY2hlZHVsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvSW50ZXJ2aWV3UHJvamVjdFRhYkNvbXBvbmVudCB9IGZyb20gJy4vcHJvLWludGVydmlldy1wcm9qZWN0LXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvSW50ZXJ2aWV3U2NoZWR1bGVUYWJTZXJ2aWNlcyB9IGZyb20gJy4vcHJvLWludGVydmlldy1zY2hlZHVsZS10YWIvdGFiLXNjaGVkdWxlLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUHJvc3RhcnNXZWJTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSYXRpbmdNb2R1bGV9IGZyb20gXCJuZ3gtcmF0aW5nXCI7XG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbE1vZHVsZSB9IGZyb20gXCJuZ3gtaW5maW5pdGUtc2Nyb2xsXCI7XG5pbXBvcnQgeyBJTlRFUlZJRVdfUk9VVEUgfSBmcm9tICcuL2ludGVydmlldy5yb3V0ZSdcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFByb3N0YXJzV2ViU2hhcmVkTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoSU5URVJWSUVXX1JPVVRFKVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBQcm9JbnRlcnZpZXdQcm9qZWN0VGFiQ29tcG9uZW50LFxuICAgIFByb0ludGVydmlld1NjaGVkdWxlVGFiQ29tcG9uZW50LFxuICAgIFByb0ludGVydmlld0NvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBQcm9JbnRlcnZpZXdTY2hlZHVsZVRhYlNlcnZpY2VzXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEludGVydmlld01vZHVsZSB7fVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NjcmVlbnMvaW50ZXJ2aWV3L2ludGVydmlldy5tb2R1bGUudHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main/webapp/app/screens/interview/interview.module.ts\n");

/***/ })

})