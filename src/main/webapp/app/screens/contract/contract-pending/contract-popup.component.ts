
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProRequirement, UserService, User } from '../../../shared';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Contract } from '../contract.model';
import { Pro } from '../../../entities/pro';
import { File } from '../../../entities/file';
import { ProjectService, Project } from '../../../entities/project';
import { DropDownItem } from '../../../shared/model/dropdown-item.model';
import { RoleService } from '../../../shared/role/role.service';
import { Role } from '../../../shared/role/role.model';
import { ContractTemplate } from '../contract-template/contract-template.model';
import { ContractTemplateService } from '../contract-template/contract-template.service';
import { ContractService } from '../contract.service';
import { FILE_SIZE } from '../../../app.constants';


@Component({
selector: 'jhi-contract-popup',
templateUrl: './contract-popup.component.html',
styles: []
})
export class ContractPopupComponent implements OnInit {
file: File;
content = "";
selectedRole: Role[];
selectedTemplate = [];
selectedProject: Project[];
selectedPro: Pro[];

dropdownProList = [];
dropdownProSettings;
dropdownProjectList = [];
dropdownProjectSettings;
dropdownRoleList = [];
dropdownRoleSettings;
dropdownContractTemplates = [];
dropdownContractTemplatesSettings;
pro: Pro;
proRequirement: ProRequirement
contractData: Contract;
isSaving: boolean;
validateAvatarFile = {
  isNotImage: false,
  isOverSize: false
    };
validateResumeFile = {
  isOverSize: false
      }
contractTemplate: ContractTemplate; 
typeContract = 1;
;
constructor(
  private activeModal: NgbActiveModal,
  private dataUtils: JhiDataUtils,
  private projectService: ProjectService, 
  private roleService: RoleService,
  private proUserService: UserService,
  private contractTemplateService: ContractTemplateService,
  private contracService: ContractService,         
  ) { 
    this.contractData = new Contract;
    this.contractData.project = new Project;
    this.contractData.role = new Role;
    this.contractData.pro = new Pro;
    this.contractData.file = new File;
    this.contractTemplate = new ContractTemplate;
    }

ngOnInit() {
// load Project list
this.projectService.loadProject().subscribe(
(res: HttpResponse<Project[]>) => {
// fill role list to GUI
  this.dropdownProjectList = res.body.map(
    (item) =>
    new DropDownItem(item.id, item.projectName)
    );
    },
    (res: HttpErrorResponse) => this.onError(res.message)
    );
      // init setting for Project list
      this.dropdownProjectSettings = {
        singleSelection: true,
        text: 'Project',
        classes: 'myclass custom-class',
        enableSearchFilter: true
      };
    // load ContractTemplate list
    this.contractTemplateService.query().subscribe(
      (res: HttpResponse<ContractTemplate[]>) => {
        // fill Contract list to GUI
        this.dropdownContractTemplates = res.body.map(
          (item) =>
            new DropDownItem(item.id, item.name)
        );
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    // init setting for Contract Template list
    this.dropdownContractTemplatesSettings = {
      singleSelection: true,
      text: 'Contract Template',
      classes: 'myclass custom-class',
      enableSearchFilter: true
    };
          
}
resetchild(){
  this.dropdownRoleList = [];
  this.dropdownProList = [];
}
onSelectRole(item: any){
    // load Role list
  this.roleService.queryGetById(this.selectedProject[0].id).subscribe(
    (res: HttpResponse<Role[]>) => {
      // fill role list to GUI
      this.dropdownRoleList = res.body.map(
        (item) =>
          new DropDownItem(item.id, item.name)
      );
    },
    (res: HttpErrorResponse) => this.onError(res.message)
      );
// init setting for Role list
    this.dropdownRoleSettings = {
    singleSelection: true,
    text: 'Role Name',
    classes: 'myclass custom-class',
    enableSearchFilter: true
      };      
  }

onSelectProName(item: any){
    // load Pro list
    this.proUserService.queryGetProById(this.selectedProject[0].id,this.selectedRole[0].id).subscribe(
      (res: HttpResponse<User[]>) => {
        // fill role list to GUI
        this.dropdownProList = res.body.map(
          (item) =>
            new DropDownItem(item.id, item.lastName + item.firstName)
        );
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    // init setting for industry list
    this.dropdownProSettings = {
      singleSelection: true,
      text: 'Pro Name',
      classes: 'myclass custom-class'
    };
}
    setFileDataContract(event) {
        if (event && event.target.files && event.target.files[0]) {
          this.validateResumeFile.isOverSize = false;
          const file = event.target.files[0];
          if (file.size >FILE_SIZE) {
            this.validateResumeFile.isOverSize = true;
            this.contractData.file.name ="";
            return;
          }
          this.dataUtils.toBase64(file, (base64Data) => {
              this.contractData.file.content = base64Data;
              this.contractData.file.contentType = file.type;
              this.contractData.file.name = file.name;
          });
        }
      }
      cancel(){
        this.activeModal.dismiss();
      }
      submitAddContract(){
        this.isSaving = true;
        this.contractData.project.id = this.selectedProject[0].id;
        this.contractData.role.id = this.selectedRole[0].id;
        this.contractData.pro.id = this.selectedPro[0].id;
        if( this.selectedTemplate.length != 0 )
        {
          this.contractData.file.id = this.selectedTemplate[0].id;
        }
        this.subscribeToSaveResponse(
        this.contracService.create(this.contractData));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ContractTemplate>>) {
        result.subscribe((res: HttpResponse<ContractTemplate>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }
    private onSaveSuccess(result: ContractTemplate) {
        // this.eventManager.broadcast({ name: 'contractTemplateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.close(result);
    }
    private onSaveError() {
        this.isSaving = false;
    }
    onError(msg): any {
      console.log(msg);
    }
  
}