import { ProjectCssUtil } from './../../../../shared/utils/project-css-class';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { InterviewScore } from '../../models/interview-score.model';
import { Interview, InterviewStatus } from '../../models/interview.model';
import { Project } from '../../models/project.model';
declare var $;

@Component({
  selector: 'app-project-tab',
  templateUrl: './project-tab.component.html',
  styleUrls: ['./project-tab.component.scss']
})
export class ProjectTabComponent implements OnInit {
  public interviewScores: any[];
  public totalScore: number = 0;

  @Input('project') public project: Project;
  @Input('roleName') public roleName: any;
  @Input('session') public session: any;
  @Input('interview') public interview: any;
  @Input('status') public status: any;

  @Output('onSave') public saveData = new EventEmitter<any>();
  @Output('onNext') public next = new EventEmitter<any>();

  @ViewChild('newSkill') newSkill;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: any): void {
    // TODO: check current session
    if (this.session) {
      this.interviewScores = this.session.interviewScores;
      this.onCalculateTotalScore();
    }
  }

  onCalculateTotalScore() {
    this.totalScore = Math.round(
      this.interviewScores.reduce((total, item) => {
        return total + item.score;
      }, 0) / this.interviewScores.length
    );
    if (isNaN(this.totalScore)) {
      this.totalScore = 1;
    }
  }

  onUpdateTotalScore() {
    this.onCalculateTotalScore();
  }

  onRemoveScore(index){
    this.interviewScores.splice(index, 1);
  }

  async onAddNewSkill(e) {
    this.interviewScores.push({
      criteria: await e.target.value,
      score: 1,
      interviewSessionId: this.session.id
    });
    this.onUpdateTotalScore();
    e.target.value = '';
    this.removeFocus();
    this.removeThumb(this.interviewScores.length);
  }

  /**
   * Remove duplicated thumb
   * @param position : check if exist score, remove duplicated thumb
   */
  removeThumb(position) {
    let range_type = 'input[type=range]';
    $(document).on('mousedown', range_type, e => {
      let elmRangeField = document.getElementsByClassName('range-field');
      const length = elmRangeField.length;
      for (let i = 0; i < length; i++) {
        if (elmRangeField[i].children.length > 2) {
          for (let j = 2; j < elmRangeField[i].children.length; j++) {
            elmRangeField[i].children[j].remove();
          }
        }
      }
    });
  }

  removeFocus() {
    this.newSkill.nativeElement.blur();
  }

  onSave() {
    this.interviewScores.forEach(item => {
      item.interviewSessionId = this.session.id;
    });
    const interviewSessionResult = {
      id: this.session.id,
      interviewScores: this.interviewScores,
      note: this.session.note
    };
    console.log(interviewSessionResult);
    this.saveData.emit(interviewSessionResult);
  }

  onNext() {
    this.interviewScores.forEach(item => {
      item.interviewSessionId = this.session.id;
    });
    const interviewSessionResult = {
      decision: this.session.decision,
      id: this.session.id,
      interviewScores: this.interviewScores,
      note: this.session.note
    };
    console.log(interviewSessionResult);
    this.next.emit(interviewSessionResult);
  }

  setStatusClasses(status) {
    ProjectCssUtil.setStatusClasses(status);
  }
}
