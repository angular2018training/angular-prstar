webpackHotUpdate(1,{

/***/ "./src/main/webapp/app/screens/interview/pro-interview-project-tab.component.html":
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"row\\\" *ngIf=\\\"currentInterview && currentProject\\\"> <div class=\\\"col-12 col-sm-8 col-lg-9\\\"> <div *ngIf=\\\"currentInterview.status === 'PENDING_OFFER'\\\" class=\\\"p-8 d-flex bdr-top-left-4 bdr-top-right-4 bdr-bottom-right-4 bdr-bottom-left-4 bg-primary color-white\\\"> <div class=\\\"align-self-center font-weight-normal\\\"> Congratulation! You have been accepted to {{currentInterview.roleName}} Role for {{currentProject.projectName}} project </div> <div class=\\\"flex-grow-1\\\"></div> <button class=\\\"btn bg-white color-blue\\\" type=\\\"button\\\" (click)=\\\"onAcceptClick()\\\">ACCEPT</button> <button class=\\\"btn bg-white color-blue\\\" type=\\\"button\\\" (click)=\\\"onDeclineClick()\\\">DECLINE</button> </div> <div class=\\\"row\\\"> <div class=\\\"col-12 col-sm-6 col-lg-4\\\"> <div class=\\\"md-form\\\"> <div class=\\\"form-control input-data\\\" *ngFor=\\\"let interviewSession of currentInterview.interviewSessions\\\"> <p *ngIf=\\\"interviewSession.interviewDate\\\" class=\\\"mb-0\\\">{{interviewSession.interviewDate | date:'MM.dd.yyyy'}} ({{interviewSession.fromTime}} - {{interviewSession.endTime}} - {{interviewSession.timezone}})</p> </div> <label class=\\\"active\\\">Interview date</label> </div> </div> <div class=\\\"col-12 col-sm-6 col-lg-4\\\"> <div class=\\\"md-form\\\"> <div class=\\\"form-control input-data\\\"><span class=\\\"badge badge-orange\\\" [ngClass]=\\\"setProjectCssStatus(currentInterview.status)\\\">{{currentInterview.status}}</span></div> <label class=\\\"active\\\">Interview Status</label> </div> </div> <div class=\\\"col-12 col-sm-6 col-lg-4\\\"> <div class=\\\"md-form\\\"> <div class=\\\"form-control input-data\\\">{{currentInterview.roleName}}</div> <label class=\\\"active\\\">Role Name</label> </div> </div> </div> <div class=\\\"row\\\"> <div class=\\\"col-12\\\"> <div class=\\\"md-form\\\"> <textarea type=\\\"text\\\" class=\\\"md-textarea form-control\\\" placeholder=\\\"500 characters max\\\" [(ngModel)]=\\\"currentInterview.proNote\\\" maxlength=\\\"500\\\" required></textarea> <label for=\\\"Form-pass1\\\" class=\\\"active\\\">Interview Notes <i class=\\\"mdi mdi-information-outline\\\" id=\\\"tooltip-notes\\\" data-title=\\\"\\\" title=\\\"Send this message alongside your interview response details\\\"></i> </label> <div class=\\\"text-right\\\" *ngIf=\\\"currentInterview.proNote\\\"> <small class=\\\"grey-text\\\">{{ currentInterview.proNote.length }}/500</small> </div> </div> </div> </div> <div class=\\\"mt-16\\\"> <div class=\\\"card card-pro\\\"> <div class=\\\"pt-12 pb-12 card-header collapsed\\\" data-toggle=\\\"collapse\\\" data-target=\\\"#collapse-2\\\"> {{currentProject.projectName}} <span class=\\\"mdi mdi-chevron-down indicator\\\"></span> </div> <div class=\\\"collapse\\\" id=\\\"collapse-2\\\"> <div class=\\\"card-body\\\"> <div class=\\\"md-form\\\"> <div class=\\\"form-control input-data\\\">{{currentProject.description}}</div> <label class=\\\"active\\\">Description</label> </div> <div class=\\\"row\\\"> <div class=\\\"col-6\\\"> <div class=\\\"md-form\\\"> <div class=\\\"form-control input-data\\\">{{currentProject.startDate | date:'MM/dd/yyyy'}}</div> <label class=\\\"active\\\">Project Start Date</label> </div> </div> <div class=\\\"col-6\\\"> <div class=\\\"md-form\\\"> <div class=\\\"form-control input-data\\\">{{currentProject.startDate | date:'MM/dd/yyyy'}}</div> <label class=\\\"active\\\">Project End Date</label> </div> </div> </div> </div> </div> </div> </div> <hr> <div class=\\\"text-right\\\"> <button class=\\\"btn btn-primary btn-primary-profile none-margin-all waves-effect waves-light\\\" type=\\\"button\\\" (click)=\\\"onSaveClick()\\\">SAVE</button> </div> </div> </div>\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NjcmVlbnMvaW50ZXJ2aWV3L3Byby1pbnRlcnZpZXctcHJvamVjdC10YWIuY29tcG9uZW50Lmh0bWw/ZWE2NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5WUFBeVksMkJBQTJCLFlBQVksNEJBQTRCLHVnQkFBdWdCLG9EQUFvRCxJQUFJLDJCQUEyQixLQUFLLDBCQUEwQixLQUFLLDJCQUEyQixrUkFBa1IseUJBQXlCLHVMQUF1TCwyQkFBMkIsK21CQUErbUIsbUNBQW1DLHNNQUFzTSw0QkFBNEIscU1BQXFNLDRCQUE0QixxS0FBcUssOENBQThDLCtKQUErSiw4Q0FBOEMiLCJmaWxlIjoiLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NjcmVlbnMvaW50ZXJ2aWV3L3Byby1pbnRlcnZpZXctcHJvamVjdC10YWIuY29tcG9uZW50Lmh0bWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIiAqbmdJZj1cXFwiY3VycmVudEludGVydmlldyAmJiBjdXJyZW50UHJvamVjdFxcXCI+IDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tOCBjb2wtbGctOVxcXCI+IDxkaXYgKm5nSWY9XFxcImN1cnJlbnRJbnRlcnZpZXcuc3RhdHVzID09PSAnUEVORElOR19PRkZFUidcXFwiIGNsYXNzPVxcXCJwLTggZC1mbGV4IGJkci10b3AtbGVmdC00IGJkci10b3AtcmlnaHQtNCBiZHItYm90dG9tLXJpZ2h0LTQgYmRyLWJvdHRvbS1sZWZ0LTQgYmctcHJpbWFyeSBjb2xvci13aGl0ZVxcXCI+IDxkaXYgY2xhc3M9XFxcImFsaWduLXNlbGYtY2VudGVyIGZvbnQtd2VpZ2h0LW5vcm1hbFxcXCI+IENvbmdyYXR1bGF0aW9uISBZb3UgaGF2ZSBiZWVuIGFjY2VwdGVkIHRvIHt7Y3VycmVudEludGVydmlldy5yb2xlTmFtZX19IFJvbGUgZm9yIHt7Y3VycmVudFByb2plY3QucHJvamVjdE5hbWV9fSBwcm9qZWN0IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJmbGV4LWdyb3ctMVxcXCI+PC9kaXY+IDxidXR0b24gY2xhc3M9XFxcImJ0biBiZy13aGl0ZSBjb2xvci1ibHVlXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIChjbGljayk9XFxcIm9uQWNjZXB0Q2xpY2soKVxcXCI+QUNDRVBUPC9idXR0b24+IDxidXR0b24gY2xhc3M9XFxcImJ0biBiZy13aGl0ZSBjb2xvci1ibHVlXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIChjbGljayk9XFxcIm9uRGVjbGluZUNsaWNrKClcXFwiPkRFQ0xJTkU8L2J1dHRvbj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+IDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNiBjb2wtbGctNFxcXCI+IDxkaXYgY2xhc3M9XFxcIm1kLWZvcm1cXFwiPiA8ZGl2IGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgaW5wdXQtZGF0YVxcXCIgKm5nRm9yPVxcXCJsZXQgaW50ZXJ2aWV3U2Vzc2lvbiBvZiBjdXJyZW50SW50ZXJ2aWV3LmludGVydmlld1Nlc3Npb25zXFxcIj4gPHAgKm5nSWY9XFxcImludGVydmlld1Nlc3Npb24uaW50ZXJ2aWV3RGF0ZVxcXCIgY2xhc3M9XFxcIm1iLTBcXFwiPnt7aW50ZXJ2aWV3U2Vzc2lvbi5pbnRlcnZpZXdEYXRlIHwgZGF0ZTonTU0uZGQueXl5eSd9fSAoe3tpbnRlcnZpZXdTZXNzaW9uLmZyb21UaW1lfX0gLSB7e2ludGVydmlld1Nlc3Npb24uZW5kVGltZX19IC0ge3tpbnRlcnZpZXdTZXNzaW9uLnRpbWV6b25lfX0pPC9wPiA8L2Rpdj4gPGxhYmVsIGNsYXNzPVxcXCJhY3RpdmVcXFwiPkludGVydmlldyBkYXRlPC9sYWJlbD4gPC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJjb2wtMTIgY29sLXNtLTYgY29sLWxnLTRcXFwiPiA8ZGl2IGNsYXNzPVxcXCJtZC1mb3JtXFxcIj4gPGRpdiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGlucHV0LWRhdGFcXFwiPjxzcGFuIGNsYXNzPVxcXCJiYWRnZSBiYWRnZS1vcmFuZ2VcXFwiIFtuZ0NsYXNzXT1cXFwic2V0UHJvamVjdENzc1N0YXR1cyhjdXJyZW50SW50ZXJ2aWV3LnN0YXR1cylcXFwiPnt7Y3VycmVudEludGVydmlldy5zdGF0dXN9fTwvc3Bhbj48L2Rpdj4gPGxhYmVsIGNsYXNzPVxcXCJhY3RpdmVcXFwiPkludGVydmlldyBTdGF0dXM8L2xhYmVsPiA8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcImNvbC0xMiBjb2wtc20tNiBjb2wtbGctNFxcXCI+IDxkaXYgY2xhc3M9XFxcIm1kLWZvcm1cXFwiPiA8ZGl2IGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgaW5wdXQtZGF0YVxcXCI+e3tjdXJyZW50SW50ZXJ2aWV3LnJvbGVOYW1lfX08L2Rpdj4gPGxhYmVsIGNsYXNzPVxcXCJhY3RpdmVcXFwiPlJvbGUgTmFtZTwvbGFiZWw+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+IDxkaXYgY2xhc3M9XFxcImNvbC0xMlxcXCI+IDxkaXYgY2xhc3M9XFxcIm1kLWZvcm1cXFwiPiA8dGV4dGFyZWEgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcIm1kLXRleHRhcmVhIGZvcm0tY29udHJvbFxcXCIgcGxhY2Vob2xkZXI9XFxcIjUwMCBjaGFyYWN0ZXJzIG1heFxcXCIgWyhuZ01vZGVsKV09XFxcImN1cnJlbnRJbnRlcnZpZXcucHJvTm90ZVxcXCIgbWF4bGVuZ3RoPVxcXCI1MDBcXFwiIHJlcXVpcmVkPjwvdGV4dGFyZWE+IDxsYWJlbCBmb3I9XFxcIkZvcm0tcGFzczFcXFwiIGNsYXNzPVxcXCJhY3RpdmVcXFwiPkludGVydmlldyBOb3RlcyA8aSBjbGFzcz1cXFwibWRpIG1kaS1pbmZvcm1hdGlvbi1vdXRsaW5lXFxcIiBpZD1cXFwidG9vbHRpcC1ub3Rlc1xcXCIgZGF0YS10aXRsZT1cXFwiXFxcIiB0aXRsZT1cXFwiU2VuZCB0aGlzIG1lc3NhZ2UgYWxvbmdzaWRlIHlvdXIgaW50ZXJ2aWV3IHJlc3BvbnNlIGRldGFpbHNcXFwiPjwvaT4gPC9sYWJlbD4gPGRpdiBjbGFzcz1cXFwidGV4dC1yaWdodFxcXCIgKm5nSWY9XFxcImN1cnJlbnRJbnRlcnZpZXcucHJvTm90ZVxcXCI+IDxzbWFsbCBjbGFzcz1cXFwiZ3JleS10ZXh0XFxcIj57eyBjdXJyZW50SW50ZXJ2aWV3LnByb05vdGUubGVuZ3RoIH19LzUwMDwvc21hbGw+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJtdC0xNlxcXCI+IDxkaXYgY2xhc3M9XFxcImNhcmQgY2FyZC1wcm9cXFwiPiA8ZGl2IGNsYXNzPVxcXCJwdC0xMiBwYi0xMiBjYXJkLWhlYWRlciBjb2xsYXBzZWRcXFwiIGRhdGEtdG9nZ2xlPVxcXCJjb2xsYXBzZVxcXCIgZGF0YS10YXJnZXQ9XFxcIiNjb2xsYXBzZS0yXFxcIj4ge3tjdXJyZW50UHJvamVjdC5wcm9qZWN0TmFtZX19IDxzcGFuIGNsYXNzPVxcXCJtZGkgbWRpLWNoZXZyb24tZG93biBpbmRpY2F0b3JcXFwiPjwvc3Bhbj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcImNvbGxhcHNlXFxcIiBpZD1cXFwiY29sbGFwc2UtMlxcXCI+IDxkaXYgY2xhc3M9XFxcImNhcmQtYm9keVxcXCI+IDxkaXYgY2xhc3M9XFxcIm1kLWZvcm1cXFwiPiA8ZGl2IGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgaW5wdXQtZGF0YVxcXCI+e3tjdXJyZW50UHJvamVjdC5kZXNjcmlwdGlvbn19PC9kaXY+IDxsYWJlbCBjbGFzcz1cXFwiYWN0aXZlXFxcIj5EZXNjcmlwdGlvbjwvbGFiZWw+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPiA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+IDxkaXYgY2xhc3M9XFxcIm1kLWZvcm1cXFwiPiA8ZGl2IGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgaW5wdXQtZGF0YVxcXCI+e3tjdXJyZW50UHJvamVjdC5zdGFydERhdGUgfCBkYXRlOidNTS9kZC95eXl5J319PC9kaXY+IDxsYWJlbCBjbGFzcz1cXFwiYWN0aXZlXFxcIj5Qcm9qZWN0IFN0YXJ0IERhdGU8L2xhYmVsPiA8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcImNvbC02XFxcIj4gPGRpdiBjbGFzcz1cXFwibWQtZm9ybVxcXCI+IDxkaXYgY2xhc3M9XFxcImZvcm0tY29udHJvbCBpbnB1dC1kYXRhXFxcIj57e2N1cnJlbnRQcm9qZWN0LnN0YXJ0RGF0ZSB8IGRhdGU6J01NL2RkL3l5eXknfX08L2Rpdj4gPGxhYmVsIGNsYXNzPVxcXCJhY3RpdmVcXFwiPlByb2plY3QgRW5kIERhdGU8L2xhYmVsPiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPGhyPiA8ZGl2IGNsYXNzPVxcXCJ0ZXh0LXJpZ2h0XFxcIj4gPGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1wcmltYXJ5LXByb2ZpbGUgbm9uZS1tYXJnaW4tYWxsIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiAoY2xpY2spPVxcXCJvblNhdmVDbGljaygpXFxcIj5TQVZFPC9idXR0b24+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NjcmVlbnMvaW50ZXJ2aWV3L3Byby1pbnRlcnZpZXctcHJvamVjdC10YWIuY29tcG9uZW50Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL21haW4vd2ViYXBwL2FwcC9zY3JlZW5zL2ludGVydmlldy9wcm8taW50ZXJ2aWV3LXByb2plY3QtdGFiLmNvbXBvbmVudC5odG1sXG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main/webapp/app/screens/interview/pro-interview-project-tab.component.html\n");

/***/ })

})