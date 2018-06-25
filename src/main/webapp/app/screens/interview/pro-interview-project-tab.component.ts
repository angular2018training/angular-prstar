import { ProjectCssUtil } from './../../shared/utils/project-css-class';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { InterviewService } from '../biz-interview/services/interview.service';
import { ProjectService } from '../../entities/project';
import { ProjectDTO } from '../biz-interview/models/project.model';
declare var window: any;
@Component({
  selector: 'jhi-pro-interview-project-tab',
  templateUrl: './pro-interview-project-tab.component.html',
  styles: []
})
export class ProInterviewProjectTabComponent implements OnInit {
  interviewNote = "";
  @Input() currentInterview;
  @Output() refreshData = new EventEmitter<any>();
  currentProject;

  constructor(
    private interviewService: InterviewService,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.route.queryParams.subscribe((params) => {
      let roleId = params['roleId'];
      if (roleId) {
        this.projectService.getProjectByProRequirement(roleId).subscribe((res: HttpResponse<ProjectDTO>) => {
          this.currentProject  = res.body;
        }, (res: HttpErrorResponse) => {});
      }
    });
    
  }

  setProjectCssStatus(status) {
    return ProjectCssUtil.setStatusClasses(status);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initTooltip('#tooltip-notes');
  }

  initTooltip(id) {
    window.initTooltip(id);
  }

  

  onAcceptClick() {
    console.log("accept");
    this.interviewService.approveOffer({
      id: this.currentInterview.id,
      approved: true
    }).subscribe((res: HttpResponse<any>) => {
      this.refreshData.emit();
      this.route.queryParams.subscribe((params) => {
        let roleId = params['roleId'];
        if (roleId) {
          this.projectService.getProjectByProRequirement(roleId).subscribe((res: HttpResponse<ProjectDTO>) => {
            this.currentProject  = res.body;
          }, (res: HttpErrorResponse) => {});
        }
      });

    }, (res: HttpErrorResponse) => {});
  }

  onDeclineClick() {
    console.log("decline");
    this.interviewService.approveOffer({
      id: this.currentInterview.id,
      approved: false
    }).subscribe((res: HttpResponse<any>) => {
      this.refreshData.emit();
      this.route.queryParams.subscribe((params) => {
        let roleId = params['roleId'];
        if (roleId) {
          this.projectService.getProjectByProRequirement(roleId).subscribe((res: HttpResponse<ProjectDTO>) => {
            this.currentProject  = res.body;
          }, (res: HttpErrorResponse) => {});
        }
      });
    }, (res: HttpErrorResponse) => {});
  }

  onSaveClick() {
    console.log("save");
    this.interviewService.updateInterviewProNote({
      id: this.currentInterview.id,
      note: this.currentInterview.proNote
    }).subscribe((res: HttpResponse<any>) => {
      this.refreshData.emit();
      this.route.queryParams.subscribe((params) => {
        let roleId = params['roleId'];
        if (roleId) {
          this.projectService.getProjectByProRequirement(roleId).subscribe((res: HttpResponse<ProjectDTO>) => {
            this.currentProject  = res.body;
          }, (res: HttpErrorResponse) => {});
        }
      });
    }, (res: HttpErrorResponse) => {});
  }
}
