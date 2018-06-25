import { Component, OnInit, Input } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Pro } from './../../../entities/pro/pro.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DropDownItem } from '../../../shared/model/dropdown-item.model';

@Component({
  selector: 'jhi-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styles: []
})
export class ApplicantDetailComponent implements OnInit {
  @Input() pro: Pro;
  selectedRoles: any[];
  selectedSkills: any[];
  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.selectedRoles = this.pro.roles.map(
      (item) => new DropDownItem(item.role.id, item.role.name)
    );
    this.selectedSkills = this.pro.skills.map(
      (item) => {
        item.skill = new DropDownItem(item.skill.id, item.skill.name);
        return item;
      }
    );
  }

  close() {
    this.activeModal.dismiss();
  }

  approve() {
    this.activeModal.close(1);
  }

  reject() {
    this.activeModal.close(2);
  }
}