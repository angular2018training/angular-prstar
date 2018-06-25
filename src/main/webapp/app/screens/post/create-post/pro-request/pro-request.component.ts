import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { DropDownItem } from './../../../../shared/model/dropdown-item.model';
import { CreatePostService } from '../create-post.service';
import { MasterService, Post } from '../../../../shared';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { BaseMasterEntity } from '../../../../shared/master/master.model';
import { HttpErrorResponse } from '@angular/common/http';
import { File } from './../../../../entities/file/file.model';
declare var window: any;

@Component({
    selector: 'jhi-pro-request',
    templateUrl: 'pro-request.component.html',
    styleUrls: []
})
export class ProRequestComponent implements OnInit, AfterViewInit {

    readonly INDEX_KEY = 'index';

    //Flag for displaying the title of skills
    showIndustryTitle = false;
    showIndustryAddMoreControl = false;
    showSkillTitle = false;
    showSkillAddMoreControl = false;

    /**
     * Index of current pro request.
     */
    proRequestIndex: number = 0;

    /**
     * Current pro request.
     */
    currentProRequest: any = {};

    /**
     * Current step.
     * Step1: input skills, industries,..
     * Step2: payment, project type,...
     */
    numberStep: number = 1;

    /**
     * Post entity.
     */
    post: Post = new Post();

    /**
     * Skill form
     */
    readonly MAX_SKILL_NUM = 10;
    selectedSkillStrength = 1;
    selectedSkillYears = 1;

    /**
     * Industry form
     */
    readonly MAX_INDUSTRY_NUM = 5;
    selectedIndustryYears = 1;

    /**
     * Dropdown Entities.
     */
    // Settings for dropdown.
    dropdownSettings = {};

    //Role
    dropdownRoleList = [];
    selectedRoles = [];

    // Skill
    selectedSkills = [];
    dropdownSkillListTmp: DropDownItem[] = [];
    dropdownSkillListData: DropDownItem[] = [];

    // Industry
    selectedIndustries = [];
    //Using for storage draff data
    dropdownIndustryListTmp: DropDownItem[] = [];
    //Using for storage data which is displayed on GUI
    dropdownIndustryListData: DropDownItem[] = [];

    // Project Type
    selectedProjectType = [];
    dropdownProjectTypeList: DropDownItem[] = [
        {
            "id": 1,
            "itemName": "Time + Materials",
            "value": "TIME"
        },
        {
            "id": 2,
            "itemName": "Fixed Fee/ MileStone",
            "value": "FIXED_FEE"
        }
    ];

    // Payment terms
    selectedPaymentTerm = [];
    dropdownPaymentList: DropDownItem[] = [];

    // Place
    selectedPlace = [];
    dropdownPlaceList: DropDownItem[] = [];

    // Invoice terms
    selectedInvoiceTerm = [];
    dropdownInvoiceList: DropDownItem[] = [];

    /**
     * Form Reference.
     */
    @ViewChild('postForm') postForm: NgForm;


    constructor(private router: Router,
        private masterService: MasterService,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private location: Location,
        private datePipe: DatePipe,
        private route: ActivatedRoute,
        private createPostService: CreatePostService) {
    }

    //Calculator target
    target: any = {
        estimatedLow: 0.00,
        estimatedHigh: 0.00,
        proBudgetLow: 0.00,
        proBudgetHigh: 0.00
    }
    ngOnInit() {
        //build data of Role Name dropdownlist
        this.masterService.roles()
            .subscribe(
            (res: HttpResponse<BaseMasterEntity[]>) => {
                this.dropdownRoleList = this.generateDropdownItemFromMasterData(res.body);
            },
            (res: HttpErrorResponse) => this.onError(res.error)
            );

        //build data of Skill dropdownlist
        this.masterService.skills()
            .subscribe(
            (res: HttpResponse<BaseMasterEntity[]>) => {
                // fill skill list to GUI
                this.dropdownSkillListData = this.generateDropdownItemFromMasterData(res.body);
                this.dropdownSkillListTmp = Object.assign({}, this.dropdownSkillListData);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
            );

        //build data of Payment dropdownlist
        this.masterService.paymentTerms()
            .subscribe(
            (res: HttpResponse<BaseMasterEntity[]>) => {
                // fill skill list to GUI
                this.dropdownPaymentList = this.generateDropdownItemFromMasterData(res.body);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
            );

        //build data of Invoice dropdownlist
        this.masterService.invoiceTerms()
            .subscribe(
            (res: HttpResponse<BaseMasterEntity[]>) => {
                // fill skill list to GUI
                this.dropdownInvoiceList = this.generateDropdownItemFromMasterData(res.body);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
            );

        //build data of Industry dropdownlist
        this.masterService.industries()
            .subscribe(
            (res: HttpResponse<BaseMasterEntity[]>) => {
                this.dropdownIndustryListData = this.generateDropdownItemFromMasterData(res.body);
                this.dropdownIndustryListTmp = Object.assign({}, this.dropdownIndustryListData);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
            );

        //Work place list
        this.dropdownPlaceList = [
            new DropDownItem(1, 'Local Only'),
            new DropDownItem(2, 'Remote/Travel OK')
        ];

        this.dropdownSettings = {
            singleSelection: true,
            disabled: false,
            text: '',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: 'myclass custom-class'
        };

        /**
         * Get index of current pro request from path.
         */
        this.route.queryParams.subscribe((params) => {
            // Get token which is send in email.
            if (params[this.INDEX_KEY]) {
                this.proRequestIndex = params[this.INDEX_KEY];
            }
        });

        /**
         * Get post from shared service.
         */
        this.createPostService.getPost()
            .subscribe(
            (post) => {
                if (post.project) {
                    this.post = post;
                    // Init pro requests according to numberOfPros
                    if (!this.post.proRequests || this.post.proRequests.length == 0) {
                        this.post.proRequests = [];
                        for (let i = 0; i < this.post.numberOfPros; i++) {
                            this.post.proRequests.push({});
                        }
                    }

                    // Add get selected pro request
                    this.selectProRequest(post.proRequests[this.proRequestIndex]);
                }
            });

        //Calculate the target
        this.recalculateTarget(this.currentProRequest);
    }

    ngAfterViewInit() {

        const today = new Date();
        const isToday = new Date(this.post.project.startDate) === today;
        let minBidDeadLine = isToday ? this.post.project.startDate : today;
        let maxBidDeadLine = this.post.project.startDate
        let minDecision = isToday ? this.post.project.startDate : today;
        let maxDicision = this.post.project.startDate
        
        window.initDatePicker('#startDate',[
            {   
                'selector' : '#endDate',
                'select' : {
                    'constraint' : 'min',
                },
                'clear' : {
                    'constraint' : 'min',
                    'value' : this.post.project.startDate
                }
            },
            {
                'selector' : '#bidDeadline',
                'select' : {
                    'constraint' : 'max'
                }
            },
            {
                'selector' : '#startDate',
                'clear' : {
                    'constraint' : 'min',
                    'value' : this.post.project.startDate
                }
            }
        ] , (data) => {
            this.currentProRequest.startDate = data;
        }, null, this.post.project.startDate, this.post.project.endDate);

        window.initDatePicker('#endDate',[
            {   
                'selector' : '#startDate',
                'select' : {
                    'constraint' : 'max',
                },
                'clear' : {
                    'constraint' : 'max',
                    'value' : this.post.project.endDate
                }
            }
        ] , (data) => {
            this.currentProRequest.endDate = data;
        }, null, this.post.project.startDate, this.post.project.endDate);

        window.initDatePicker('#bidDeadline',[
            {   
                'selector' : '#decisionDate',
                'select' : {
                    'constraint' : 'min',
                },
                'clear' : {
                    'constraint' : 'min',
                    'value' : this.post.project.startDate
                }
            }
        ] , (data) => {
            this.currentProRequest.bidDeadline = data;
        }, null, minBidDeadLine, maxBidDeadLine);

        window.initDatePicker('#decisionDate',[
            {   
                'selector' : '#bidDeadline',
                'select' : {
                    'constraint' : 'max',
                },
                'clear' : {
                    'constraint' : 'max',
                    'value' : false
                }
            }
        ] , (data) => {
            this.currentProRequest.decisionDate = data;
        }, null, minDecision, maxDicision);
    
    }

    /**
     * Show Data of current pro request on GUI.
     */
    showUIForSelectedProRequest() {
        // Reset data for skill dropdown
        // if (this.currentProRequest.skills && this.currentProRequest.skills.length <= 0) {
        //     this.dropdownSkillList = Object.assign([], this.dropdownSkillListData);
        // } else if (!this.currentProRequest.skills) {
        //     this.dropdownSkillList = Object.assign([], this.dropdownSkillListData);
        // }

        // Reset data for industry dropdown
        // if (this.currentProRequest.industries && this.currentProRequest.industries.length <= 0) {
        //     this.dropdownIndustryList = Object.assign([], this.dropdownIndustryListData);
        // } else if (!this.currentProRequest.industries) {
        //     this.dropdownIndustryList = Object.assign([], this.dropdownIndustryListData);
        // }

        // Reset selected data.
        this.selectedRoles = [];
        this.selectedInvoiceTerm = [];
        this.selectedSkills = [];
        this.selectedIndustries = [];
        this.selectedPaymentTerm = [];
        this.selectedProjectType = [];
        this.selectedPlace = [];

        // Select Role.
        if (this.currentProRequest.role) {
            this.selectedRoles = [
                {
                    "id": this.currentProRequest.role.id,
                    "itemName": this.currentProRequest.role.name
                }
            ];
        }

        // Select Project type.
        this.selectedProjectType = this.dropdownProjectTypeList.filter((item) => {
            if (item.value === this.currentProRequest.projectType) {
                return item;
            }
        })
        // Select Invoice.
        if (this.currentProRequest.invoiceTerm) {
            this.selectedInvoiceTerm = [
                {
                    "id": this.currentProRequest.invoiceTerm.id,
                    "itemName": this.currentProRequest.invoiceTerm.name
                }
            ];
        }
        // Select Payment.
        if (this.currentProRequest.paymentTerm) {
            this.selectedPaymentTerm = [
                {
                    "id": this.currentProRequest.paymentTerm.id,
                    "itemName": this.currentProRequest.paymentTerm.name
                }
            ];
        }
        // Select Place
        if (this.currentProRequest.requireLocal) {
            this.selectedPlace = (this.currentProRequest.requireLocal) ?
                [this.dropdownPlaceList[0]] :
                [this.dropdownPlaceList[1]];
        }

        // Remove selected skills from dropdown list.
        // if (this.dropdownSkillList.length > 0) {
        //     this.dropdownSkillList = this.dropdownSkillList.filter((item) => {

        //         if (!this.currentProRequest.skills) {
        //             return true;
        //         }

        //         const selectedSkillOfRequest = this.currentProRequest.skills.find((selectedSkill) => {
        //             return selectedSkill.skill.id === item.id;
        //         }) || [];

        //         return selectedSkillOfRequest.length <= 0;
        //     })
        // }

        // Remove selected industries from dropdown list.
        // if (this.dropdownIndustryList.length > 0) {
        //     this.dropdownIndustryList = this.dropdownIndustryList.filter((item) => {

        //         if (!this.currentProRequest.industries) {
        //             return true;
        //         }

        //         const selectedIndustryOfRequest = this.currentProRequest.industries.find((selectedIndustry) => {
        //             return selectedIndustry.industry.id === item.id;
        //         }) || [];

        //         return selectedIndustryOfRequest.length <= 0;
        //     })
        // }

        // Reset data for industry dropdown
        if (this.currentProRequest.industries == undefined) {
            this.dropdownIndustryListData = Object.assign([], this.dropdownIndustryListTmp);
        } else {
            this.dropdownIndustryListData = Object.assign([], this.currentProRequest.industryRemains);
        }

        // Reset data for Skill dropdown
        if (this.currentProRequest.skills == undefined) {
            this.dropdownSkillListData = Object.assign([], this.dropdownSkillListTmp);
        } else {
            this.dropdownSkillListData = Object.assign([], this.currentProRequest.skillRemains);
        }
    }

    /**
     * Set a pro request as current request.
     */
    selectProRequest(proRequest) {

        this.currentProRequest = proRequest ? proRequest : {};

        this.showUIForSelectedProRequest();

        // Init data for empty pro request.
        if (!this.currentProRequest.role) {
            this.postForm.onReset();
            this.selectedSkillStrength = 1;
            this.selectedSkillYears = 1;
            this.selectedIndustryYears = 1;
            this.currentProRequest.startDate = this.post.project.startDate;
            this.currentProRequest.endDate = this.post.project.endDate;
            this.currentProRequest.bidDeadline = this.post.project.bidDeadline;
            this.currentProRequest.decisionDate = this.post.project.decisionDate;
        }
    }

    /**
     * Generate dropdown data
     */
    generateDropdownItemFromMasterData(data) {
        return data.map(
            (item) =>
                new DropDownItem(item.id, item.name)
        );
    }


    onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    /**
     * SELECT DROPDOWN LIST
     */
    onRoleSelect(item: any) {
        this.currentProRequest.role = {
            id: item.id,
            name: item.itemName
        }
    }
    onProjectTypeSelect(item: any) {
        this.currentProRequest.projectType = item.value;
    }
    onPaymentTermSelect(item: any) {
        this.currentProRequest.paymentTerm = {
            id: item.id,
            name: item.itemName
        }
    }
    onPlaceSelect(item: any) {
        this.currentProRequest.requireLocal = (item.id == 1) ? true : false;
    }
    onInvoiceTermSelect(item: any) {
        this.currentProRequest.invoiceTerm = {
            id: item.id,
            name: item.itemName
        }
    }

    /**
     * DESELECT DROPDOWN LIST
     */
    onRoleDeSelect(item: any) {
        this.currentProRequest.role = null;
    }
    onProjectTypeDeSelect(item: any) {
        this.currentProRequest.role = null;
    }
    onPaymentTermDeSelect(item: any) {
        this.currentProRequest.role = null;
    }
    onInvoiceTermDeSelect(item: any) {
        this.currentProRequest.role = null;
    }


    /**
     * Remove skill.
     */
    deleteProSkill(index: any) {
        if (this.currentProRequest.skills.length > 0) {
            this.currentProRequest.skills.splice(index, 1);
        }
        if (this.currentProRequest.skills.length == 0) {
            this.showSkillTitle = false;
        }
    }
    /**
     * Remove Industry.
     */
    deleteProIndustry(index: any) {
        if (this.currentProRequest.industries.length > 0) {
            this.currentProRequest.industries.splice(index, 1);
        }
        if (this.currentProRequest.industries.length == 0) {
            this.showIndustryTitle = false;
        }
    }

    /**
     * Add a new record for Skill.
     */
    addSkill() {
        this.showSkillTitle = true;
        this.showSkillAddMoreControl = true;
        if (!this.currentProRequest.skills) {
            this.currentProRequest.skills = [];
        }
        // Just add a new skill if all field has been valid.
        if (this.selectedSkills.length <= 0
            || !this.selectedSkillStrength
            || !this.selectedSkillYears) {
            return
        }
        console.log(this.selectedSkillStrength);

        if (this.currentProRequest.skills.length < this.MAX_SKILL_NUM) {
            let selectedSkill = this.selectedSkills[0];
            // Add skill to current request
            // workaround for add more skill because strange behaviour of slider control
            // when pushing new item directly to skills list
            let tempSkills = [];
            this.currentProRequest.skills.forEach((item) => {
                tempSkills.push({
                skill: item.skill,
                strength: item.strength,
                yearsOfExperience: item.yearsOfExperience
                });
            });
            
            tempSkills.push({
                skill: new DropDownItem(selectedSkill.id, selectedSkill.itemName),
                strength: this.selectedSkillStrength,
                yearsOfExperience: this.selectedSkillYears
            });

            this.currentProRequest.skills = tempSkills;

            // remove selected skill from dropdown list & clear selected skill
            let index = this.dropdownSkillListData.indexOf(selectedSkill, 0);
            if (index > -1) {
                this.dropdownSkillListData.splice(index, 1);
            }

            this.currentProRequest.skillRemains = this.dropdownSkillListData;
            // Reset data.
            this.selectedSkills = [];
            this.selectedSkillStrength = 1;
            this.selectedSkillYears = 1;
        }
    }

    /**
     * Get list skill form Skill common component
     */
    getListSkill(lstSkills: any[]) {
        this.currentProRequest.skills = lstSkills;
    }

    /**
     * Add a new record for Industry.
     */
    addIndustry() {
        this.showIndustryAddMoreControl = true;
        this.showIndustryTitle = true;
        if (!this.currentProRequest.industries) {
            this.currentProRequest.industries = [];
            this.currentProRequest.industryRemains = [];
        }

        // Just add a new industry if all field has been valid.
        if (this.selectedIndustries.length <= 0
            || !this.selectedIndustryYears) {
            return
        }

        if (this.currentProRequest.industries.length < this.MAX_INDUSTRY_NUM) {
            let selectedIndustry = this.selectedIndustries[0];
            // Save valid industry to current request
            this.currentProRequest.industries.push({
                industry: {
                    id: selectedIndustry.id,
                    name: selectedIndustry.itemName
                },
                yearsOfExperience: this.selectedIndustryYears
            });

            // remove selected skill from dropdown list & clear selected skill
            let index = this.dropdownIndustryListData.indexOf(selectedIndustry, 0);
            if (index > -1) {
                this.dropdownIndustryListData.splice(index, 1);
            }

            this.currentProRequest.industryRemains = this.dropdownIndustryListData;
            // Reset data.
            this.selectedIndustries = [];
            this.selectedIndustryYears = 1;
        }
    }


    /**
     * Click on Next button.
     * If current step is 1, validate 1st form data and move to step 2.
     * If current step is 2, validate 2nd form data and move to :
     *   + Input for next pro request if having many pro requests.
     *   + Pro proof screen if all pro request has been inputted.
     * @param form the form to validate data.
     */
    onNext(form) {
        /**
         * Current step is 1
         */
        if (this.numberStep == 1) {
            // Validate step 1.
            if (!this.validateFormFirstStep(form, this.currentProRequest)) {
                return;
            }
            // Go to step 2
            form.form.touched = false;
            this.numberStep = 2;
            this.recalculateTarget(this.currentProRequest);
            return;
        }

        /**
         * Current step is 2
         */
        // Validate step 2
        if (!this.validateFormSecondStep(form, this.currentProRequest)) {
            return false;
        }
        // Set done for valid pro request.
        this.currentProRequest.isDone = true;

        
        /**
         * Loop through each pro request to validate data.
         * Redirect to the Pro Request which is not valid.
         */
        for (let key = 0; key < this.post.proRequests.length; key++) {
            // Validate step 1.
            if (!this.validateFormFirstStep(this.postForm, this.post.proRequests[key])) {
                this.numberStep = 1;
                this.selectProRequest(this.post.proRequests[key]);
                return;
            }
            // Validate step 2
            if (!this.validateFormSecondStep(this.postForm, this.post.proRequests[key])) {
                this.numberStep = 2;
                this.recalculateTarget(this.post.proRequests[key]);
                this.selectProRequest(this.post.proRequests[key]);
                return;
            }
        }

        console.log(this.currentProRequest.skills);
        // return;
        /**
         * Move to next screen if all pro request has been inputted correctly.
         */
        if (this.post.isCreatePost) {
            this.router.navigate(['create-post/proof-post']);
        } else {
            this.router.navigate(['create-pro-request/proof-post']);
        }

    }

    /**
     * Validate the first step.
     */
    validateFormFirstStep(form, proRequest) {
        let isValid = true;
        var yearError = document.getElementById("yearError");

        // validate undefine or defined & empty role, skills, industries
        if (!proRequest.role
            || !proRequest.skills
            || proRequest.skills.length == 0
            || !proRequest.industries
            || proRequest.industries.length == 0
            || yearError
        ) {
            isValid = false;
        }

        // Set status to form.
        if (form) {
            form.form.status = isValid ? "VALID" : "INVALID";
            form.form.touched = true;
        }
        return isValid;
    }

    /**
     * Validate the second step.
     */
    validateFormSecondStep(form, proRequest) {
        let isValid = true;

        // Validate min of start date.
        // if (proRequest.startDate < this.post.project.startDate) {
        //     form.form.controls.startDate.errors = { min: true };
        //     form.form.controls.startDate.status = "INVALID";
        //     isValid = false;
        // }

        // Validate max of end date.
        // if (proRequest.endDate > this.post.project.endDate) {
        //     form.form.controls.endDate.errors = { max: true };
        //     form.form.controls.endDate.status = "INVALID";
        //     isValid = false;
        // }

        // Validate project type
        if (!proRequest.projectType) {
            isValid = false;
        }

        if (!this.post.isCreatePost){
            if (!proRequest.lowTargetRate) {
                isValid = false;
            }
    
            if (!proRequest.highTargetRate) {
                isValid = false;
            }
        }

        // Validate payment terms
        if (!proRequest.paymentTerm) {
            isValid = false;
        }

        // Validate place
        if (proRequest.requireLocal === null || proRequest.requireLocal === undefined) {
            isValid = false;
        }

        // Validate invoice terms
        if (!proRequest.invoiceTerm) {
            isValid = false;
        }

        if(!proRequest.additionalCommmentary) {
            isValid = false
        }

        form.form.status = isValid ? "VALID" : "INVALID";
        form.form.touched = true;
        return isValid;

    }

    /**
     * Select file
     */
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event) {
        if (event && event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          this.dataUtils.toBase64(file, (base64Data) => {
              this.currentProRequest.proposalTemplateFile = new File();
              this.currentProRequest.proposalTemplateFile.content = base64Data;
              this.currentProRequest.proposalTemplateFile.contentType = file.type;
              this.currentProRequest.proposalTemplateFile.name = file.name;
          });
        }
    }

    onBack() {
        if (this.numberStep == 1) {
            this.location.back();
        }
        else {
            this.numberStep = 1;
        }
    }

    //Calculate target
    recalculateTarget(proRequest) {
        if (proRequest.lowTargetRate == undefined) {
            proRequest.lowTargetRate = 0;
        }
        if (proRequest.highTargetRate == undefined) {
            proRequest.highTargetRate = 0;
        }
        if (proRequest.expenseRate == undefined) {
            proRequest.expenseRate = 0;
        }
        this.target.estimatedLow = proRequest.lowTargetRate * proRequest.expenseRate / 100;
        this.target.estimatedHigh = proRequest.highTargetRate * proRequest.expenseRate / 100;
        this.target.proBudgetLow = this.target.estimatedLow + proRequest.lowTargetRate;
        this.target.proBudgetHigh = this.target.estimatedHigh + proRequest.highTargetRate;
    }

    //handle when add industries
    onIndustrySelect($event) {
        this.addIndustry();
        this.showIndustryAddMoreControl = false;
    }
    //handle when add Skill
    onSkillSelect($event) {
        this.addSkill();
        this.showSkillAddMoreControl = false;
    }
}
