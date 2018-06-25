import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CreatePostService } from "../create-post.service";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { Post } from "../../../../shared/";
declare var window: any;

@Component({
    selector: 'jhi-project',
    templateUrl: 'project.component.html',
    styleUrls: []
})
export class ProjectComponent implements OnInit, OnDestroy, AfterViewInit {

    // This variable is used to store data of form.
    post: Post = new Post();

    // Get current date to validate start date.
    currentDate: any;
    path: string;

    constructor(private translate: TranslateService,
        private datePipe: DatePipe,
        private router: Router,
        private createPostService: CreatePostService) {
        this.createPostService.getPost().subscribe((post) => {
            if (post.project) {
                this.post = post;
            }
        });
        this.currentDate = this.datePipe.transform(Date.now(), "yyyy-MM-dd");
    }

    ngOnInit() {
        if (this.router.url.includes('create-post')) {
            if(this.post.isCreatePost == false) {
                this.createPostService.resetData();
            }
            this.post.isCreatePost = true;
            this.path = "create-post";
        } else {
            if(this.post.isCreatePost == true) {
                this.createPostService.resetData();
            }
            this.post.isCreatePost = false;
            this.path="create-pro-request";
        }
    }

    ngAfterViewInit() {
        
        window.initDatePicker("#startDate", [
            {   
                'selector' : '#endDate',
                'select' : {
                    'constraint' : 'min',
                },
                'clear' : {
                    'constraint' : 'min',
                    'value' : new Date()
                }
            }
        ],(data) => {
            this.post.project.startDate = data
        }, null, new Date(), null);

        window.initDatePicker("#endDate", [
            {   
                'selector' : '#startDate',
                'select' : {
                    'constraint' : 'max',
                },
                'clear' : {
                    'constraint' : 'max',
                    'value' : false
                }
            }
        ],(data) => {
            this.post.project.endDate = data
        }, null, null, null);

    }

    /**
     * Handle for button Next.
     * - Validate form data
     * - Go to Pro Request screen if form is valid.
     * - Show error message if form is invalid.
     */
    onNext(form) {
        if (!this.validateFormData(form)) {
            return false;
        };

        if (this.post.isManyPros == 'false') {
            //Set number of list Pro
            this.post.numberOfPros = 1;
        }
        //generate list 
        //Case init data at the first time (Does not exist any pros request)
        if (!this.post.proRequests) {
            this.post.proRequests = [];
            for (var i = 0; i < this.post.numberOfPros; i++) {
                this.post.proRequests.push({});
            }
        }
        //Case change the Pros Needed (change option, number of Pro)
        else {
            let numberProRequest: number = this.post.numberOfPros;
            let actualProRequest: number = this.post.proRequests.length;
            if (actualProRequest > numberProRequest) {
                //Case: remove Pro
                this.post.proRequests.splice(numberProRequest - 1, actualProRequest - 1);
            }
            else if (actualProRequest < numberProRequest) {
                //Case: add more Pro
                for (var i = actualProRequest; i < numberProRequest; i++) {
                    this.post.proRequests.push({});
                }
            }
        }

        this.createPostService.setPost(this.post);
        this.router.navigate(['/' + this.path + '/pro-request']);
    }

    validateFormData(form) {
        if(form.form.status == "INVALID") {
            return false;
        }
        let isValid = true;
        // Validate number of Pros
        if (this.post.numberOfPros <= 0) {
            form.controls.numberOfPros.errors = {
                min: true
            };
            form.controls.numberOfPros.status = "INVALID";
            isValid = false;
        }

        form.form.status = isValid ? "VALID" : "INVALID";
        return isValid;
    }

    ngOnDestroy(): void {
    }
}
