import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { MasterService } from './../master/master.service';
import { Skill } from '../../entities/skill/skill.model';
import { DropDownItem } from '../model/dropdown-item.model';
import { filter } from 'rxjs/operator/filter';

@Component({
  selector: 'jhi-skill-common',
  templateUrl: './skill.component.html',
  styles: []
})

export class SkillComponent implements OnInit {

  @Input() skillsValue: any[] = [];
  @Input() addMoreRowsFlag: boolean = false;
  @Output() skillsChange = new EventEmitter<any[]>();
  readonly MAX_SKILL_NUM = 10;

  // For skill dropdown list
  dropdownSkillList = [];
  selectedSkills = [];
  dropdownSkillSettings = {};

  selectedSkillStrength = 1;
  selectedSkillYears = 1;
  showAddMoreControl = false;

  //Flag for displaying the title of skills
  showTitle = false;
  constructor(
    private router: Router,
    private masterService: MasterService,
    private jhiAlertService: JhiAlertService
  ) { }

  @Input()
  get skills() {
    return this.skillsValue;
  }

  set skills(val) {
    if (val === undefined) {
      this.skillsValue = [];
    }
    else {
      this.skillsValue = val;
    }
    this.skillsChange.emit(this.skillsValue);
  }

  ngOnInit() {
    // init setting for skill list
    this.dropdownSkillSettings = {
      singleSelection: true,
      disabled: false,
      text: '',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    }

    this.masterService.skills().subscribe(
      (res: HttpResponse<Skill[]>) => {
        // fill skill list to GUI
        this.dropdownSkillList = res.body.map(
          (item) => new DropDownItem(item.id, item.name)
        ).filter(
          (item) => {
            let alreadyAddedSkillFlag = false;
            this.skillsValue.forEach(skill => {
              if (skill.skill.id === item.id) {
                alreadyAddedSkillFlag = true;
              }
            });
            return !alreadyAddedSkillFlag;
          }
        );
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }
  private onError(error) {
    this.jhiAlertService.error(error.message, null, null);
  }

  addProSkill() {
    if (this.skillsValue.length < this.MAX_SKILL_NUM && this.selectedSkills.length > 0) {
      // workaround for add more skill because strange behaviour of slider control
      // when pushing new item directly to skills list
      let tempSkills = [];
      this.skillsValue.forEach((item) => {
        tempSkills.push({
          id: item.id,
          skill: item.skill,
          strength: item.strength,
          yearsOfExperience: item.yearsOfExperience
        });
      });
      let selectedSkill = this.selectedSkills[0];
      tempSkills.push({
        skill: selectedSkill,
        strength: this.selectedSkillStrength,
        yearsOfExperience: this.selectedSkillYears
      });
      this.skillsValue = tempSkills;

      this.skillsChange.emit(this.skillsValue);
      // remove selected skill from dropdown list & clear selected skill
      let index = this.dropdownSkillList.indexOf(selectedSkill, 0);
      if (index > -1) {
        this.dropdownSkillList.splice(index, 1);
      }
      this.selectedSkills = [];
    }
  }

  deleteProSkill(index) {
    this.dropdownSkillList.push(this.skills[index].skill);
    this.skillsValue.splice(index, 1);
    if (this.skills.length == 0) {
      this.showTitle = false;
    }
  }

  onItemSelect($event) {
    this.addProSkill();
    this.showAddMoreControl = false;
  }

  onAddMoreSkillClick() {
    this.showAddMoreControl = true;
    this.showTitle = true;
  }
}
