import { Component, OnInit } from '@angular/core';
import { BidsManagementService } from '../../bids-management.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss']
})
export class RolesPage implements OnInit {
  postId = this.activatedRoute.snapshot.queryParams['postId'];

  roles = [];
  projectData = {};
  totalBids = 0;

  constructor(
    private bidsManagementService: BidsManagementService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.getRoleList();
  }

  getRoleList() {
    return this.bidsManagementService.getRoleList(this.postId).subscribe((result) => {
      if (result) {
        this.roles = result.proRequirements;
        this.projectData = result.project;

        result.proRequirements.forEach((item) => {
          this.totalBids += item.numberOfBids;
        });
      }

    }, error => {

    });
  }

  onReviewBids(role) {
    this.router.navigate(['/bid-common-individual'], { queryParams: { roleID: role.id, tab:0, postId: this.postId } });
  }
}
