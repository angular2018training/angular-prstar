import { DropDownItem } from './../../../shared/model/dropdown-item.model';
import { Industry } from './../../../entities/industry/industry.model';
import { IndustryService } from './../../../entities/industry/industry.service';
import { Router } from '@angular/router';
import { ProService } from './../../../entities/pro/pro.service';
import { Question, QuestionType } from './../../../entities/question/question.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { QuestionService } from './../../../entities/question/question.service';
import { JhiDataUtils } from 'ng-jhipster';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MessengerService } from '../../shared/messenger.service';
import { FILE_IMAGE_SIZE } from '../../../app.constants';

@Component({
  selector: 'jhi-pro-detail-background',
  templateUrl: './pro-detail-background.component.html',
  styles: []
})
export class ProDetailBackgroundComponent implements OnInit {
  backgroundData;
  errorList = [];
  dropdownIndustryList = [];
  dropdownIndustrySettings;
  validateAvatarFile = {
    isNotImage: false,
    isOverSize: false
  };
  validateResumeFile = {
    isOverSize: false
  }

  constructor(
    private location: Location, 
    private router: Router,
    private proService: ProService,
    private dataUtils: JhiDataUtils,
    private questionService: QuestionService,
    private messengerService: MessengerService,
    private industryService: IndustryService
  ) { }

  ngOnInit() {
    this.backgroundData = this.proService.backgroundData;

    // load question list
    if (this.backgroundData.freeAnswerQuestionList.length === 0) {
      this.questionService.query().subscribe(
        (res: HttpResponse<Question[]>) => {
          // fill question list to GUI
          this.backgroundData.freeAnswerQuestionList = res.body.filter(
            (question) => question.questionType.toString() === 'FREE');
  
          this.backgroundData.checkboxAnswerQuestionList = res.body.filter(
            (question) => question.questionType.toString() === 'CHECKBOX');
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    }
    // load industry list
    this.industryService.query().subscribe(
      (res: HttpResponse<Industry[]>) => {
        // fill role list to GUI
        this.dropdownIndustryList = res.body.map(
          (item) =>
            new DropDownItem(item.id, item.name)
        );
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    // init setting for industry list
    this.dropdownIndustrySettings = {
      singleSelection: false,
      text: 'Industries',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }

  ngAfterViewInit() {
    this.messengerService.stepChange(2);
  }

  onError(msg): any {
    console.log(msg);
  }

  setLogoData(event) {
    if (event && event.target.files && event.target.files[0]) {
      this.validateAvatarFile.isNotImage = false;
      this.validateAvatarFile.isOverSize = false;
      const file = event.target.files[0];
      if (!/^image\//.test(file.type)) {
          this.validateAvatarFile.isNotImage = true;
          return;
      }
      if (file.size > FILE_IMAGE_SIZE) {
        this.validateAvatarFile.isOverSize = true;
        return;
      }
      this.dataUtils.toBase64(file, (base64Data) => {
          this.backgroundData.avatarPhoto = base64Data;
          this.backgroundData.avatarPhotoContentType = file.type;
          this.backgroundData.avatarPhotoFileName = file.name;
      });
    }
  }

  setFileData(event) {
    if (event && event.target.files && event.target.files[0]) {
      this.validateResumeFile.isOverSize = false;
      const file = event.target.files[0];
      if (file.size > 3072000) {
        this.validateResumeFile.isOverSize = true;
        this.backgroundData.resumeFileName = "";
        return;
      }
      this.dataUtils.toBase64(file, (base64Data) => {
          this.backgroundData.resume = base64Data;
          this.backgroundData.resumeContentType = file.type;
          this.backgroundData.resumeFileName = file.name;
      });
    }
  }

  onNext() {
    if (this.validData()) {
      this.router.navigate(['pro-create-detail/bio-skill']);
    }
  }

  validData() : boolean {
    this.errorList = [];
    if (!this.backgroundData.avatarPhoto) {
      this.errorList.push("Please select avatar photo");
    }
    if (!this.backgroundData.resume) {
      this.errorList.push("Please select resume");
    }
    let missingAnswer = false;
    this.backgroundData.freeAnswerQuestionList.forEach(element => {
      if (!element.proAnswer) {
        missingAnswer = true;
      }
    });
    if (missingAnswer) {
      this.errorList.push("Please answer background questions");
    }
    
    return this.errorList.length === 0;
  }

  onBack() {
    this.location.back();
  }

}
