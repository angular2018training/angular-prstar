import { MatchReport } from './../../../entities/match-report/match-report.model';
import { MatchingService } from './../../matching/matching.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RoleMatch } from '../../../entities/role-match/role-match.model';
import { HttpResponse } from '@angular/common/http';
import { Pro } from '../../../entities/pro';

@Component({
  selector: 'jhi-bid-common-project',
  templateUrl: './bid-common-project.component.html',
  styles: []
})
export class BidCommonProjectComponent implements OnInit {
  matchReport: MatchReport;

  constructor(
    private router: Router,
    private matchingService: MatchingService
  ) { 
    this.matchReport = this.matchingService.matchReport;
    // recalc data
    this.matchReport.totalMatch = 0;
    this.matchReport.roleMatches.forEach((roleMatch) => {
      if (!roleMatch.passedPros) {
        roleMatch.passedPros = [];
      }
      if (!roleMatch.savedPros) {
        roleMatch.savedPros = [];
      }
      roleMatch.totalMatch = roleMatch.pros.length + roleMatch.passedPros.length + roleMatch.savedPros.length;
      this.matchReport.totalMatch += roleMatch.totalMatch;
      
      roleMatch.status = "Awaiting Review";
      if (roleMatch.pros.length > 0) {
        if (roleMatch.passedPros.length > 0 || roleMatch.savedPros.length > 0) {
          roleMatch.status = "In Review";
        } else {
          roleMatch.status = "Awaiting Review";
        }
      } else {
        roleMatch.status = "Review Complete";
      }
    });
  }

  ngOnInit() {
    
  }

  onNext() {
    this.router.navigate(['/match-individual']);
  }
}
