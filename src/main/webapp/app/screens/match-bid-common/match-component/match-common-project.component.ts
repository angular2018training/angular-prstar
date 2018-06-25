import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatchService } from './match-bid-common.service';

@Component({
  selector: 'jhi-match-common-project',
  templateUrl: './match-common-project.component.html',
  styles: []
})
export class MatchCommonProjectComponent implements OnInit {
  requsetId = this.activatedRoute.snapshot.queryParams['requestid'];
  roleMatchs = [];
  totalMatch = 0;
  projectData = {};
  

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matchService: MatchService
  ) { }

  ngOnInit() {
    this.getRoleMatchs();
  }

  getRoleMatchs() {
    return this.matchService.getRoleMatchs(this.requsetId).subscribe(result =>{
      if(result) {
        this.roleMatchs = result.roleMatches;
        this.projectData = {
          status: result.commonStatus,
          projectName: result.proRequest.project.projectName,
          id: result.proRequest.project.id,
        }

        result.roleMatches.forEach((item) => {
          this.totalMatch += item.numberOfPros;
        });
      }
    }, error =>{

    })
  }

  onReviewMatch(roleMatch) {
    this.router.navigate(['/match-common-individual'],{queryParams: {
      roleid: roleMatch.proRequirementId,
      requestid: this.requsetId
    }});
  }
}
