import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { AngularMultiSelectModule } from './../../shared/angular2-multiselect-dropdown-custom/angular2-multiselect-dropdown';
import { MasterService } from './../../shared/master/master.service';
import { Role } from './role.model';
import { DropDownItem } from '../model/dropdown-item.model';

@Component({
  selector: 'jhi-role-common',
  templateUrl: './role.component.html',
  styles: [],
  inputs: ['roles', 'isEditable']
})
export class RoleComponent implements OnInit {
  @Input() roles: any[] = [];
  @Input() isEditable: boolean = true;
  @Output() selectedRolesChange = new EventEmitter();
  @Output() allRoleListLoad = new EventEmitter();
  @Input() singleSelect = false;

  // For role multiselect
  dropdownRoleList = [];
  @Input() selectedRolesValue = [];
  dropdownRoleSettings = {};

  constructor(
    private masterService: MasterService,
    private jhiAlertService: JhiAlertService,

  ) { }

  @Input()
  get selectedRoles() {
    return this.selectedRolesValue;
  }

  set selectedRoles(value) {
    this.selectedRolesValue = value;
    this.selectedRolesChange.emit(this.selectedRolesValue);
  }
  ngOnInit() {
    // init setting for role list
    this.dropdownRoleSettings = {
      singleSelection: this.singleSelect,
      text: 'Please select role',
      enableCheckAll: false,
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

    if (this.roles.length === 0) {
      this.masterService.roles().subscribe(
        (res: HttpResponse<Role[]>) => {
          // fill role list to GUI
          this.allRoleListLoad.emit(res.body);
          this.dropdownRoleList = res.body.map(
            (item) =>
              new DropDownItem(item.id, item.name)
          );
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    }
  }
  onItemSelect(item: any) {
    console.debug(item);
    console.debug(this.selectedRoles);
  }

  onItemDeSelect(item: any) {
    console.debug(item);
    console.debug(this.selectedRoles);
  }

  onSelectAll(items: any) {
    console.debug(items);
  }

  onDeSelectAll(items: any) {
    console.debug(items);
  }

  selectedRole(roles) {
    this.selectedRoles = roles;
  }

  private onError(error) {
    this.jhiAlertService.error(error.message, null, null);
  }
}