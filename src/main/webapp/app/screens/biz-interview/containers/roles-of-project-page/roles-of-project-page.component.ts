import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InterviewService } from '../../services/interview.service';
import { JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ProjectDTO } from '../../models/project.model';

@Component({
  selector: 'app-roles-of-project-page',
  templateUrl: './roles-of-project-page.component.html',
  styleUrls: ['./roles-of-project-page.component.scss']
})
export class RolesOfProjectPageComponent implements OnInit, OnDestroy {
  private subsParams: Subscription;
  private subsInterviewService: Subscription;
  public projectId: number;
  public listProjectDTO: ProjectDTO[];
  public rolesOfProject: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private interviewService: InterviewService,
    private jhiAlertService: JhiAlertService
  ) {}

  ngOnInit(): void {
    this.onHandleParams();
  }

  async onHandleParams() {
    this.projectId = await this.activatedRoute.snapshot.params['projectId'];
    if (this.projectId) {
      this.subsInterviewService = this.interviewService
        .getExistedInterviews()
        .subscribe(
          (res: HttpResponse<ProjectDTO[]>) => {
            if (res.body) {
              console.log(res);
              this.listProjectDTO = res.body;
              this.listProjectDTO.forEach(item => {
                if (item.id == this.projectId) {
                  this.rolesOfProject = item;
                  this.interviewService.setListRoleOfProject(
                    this.rolesOfProject
                  );
                }
              });
            }
          },
          (res: HttpErrorResponse) => {
            this.onError(res.message);
          }
        );
    }
  }

  private onError(error) {
    this.jhiAlertService.error(error.mesage, null, null);
  }

  async gotoInterviewListPerRolePage(id: number) {
    await this.rolesOfProject.lstProRequirements.forEach((item, index) => {
      if (item.id === id) {
        this.interviewService.setRole(item);
      }
    });
    this.router.navigate(['interviews-per-role', id], {
      relativeTo: this.activatedRoute
    });
  }

  ngOnDestroy() {
    if (this.subsParams) {
      this.subsParams.unsubscribe();
    }
  }
}
