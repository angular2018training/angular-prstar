import { error } from 'util';
import { PostModalService } from './../post-modal.service';
import { ProService } from './../../../../entities/pro/pro.service';
import { Component, OnInit } from "@angular/core";
import { CreatePostService } from "../create-post.service";
import { Post, Principal, AccountService, Account } from "../../../../shared/";
import { PostService } from '../../post.service';
import { BizService } from '../../../../entities/biz/biz.service'
import { ProRequestService } from '../../pro-request.service';
import { HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Biz } from './../../../../entities/biz';
import { User } from '../../../../shared/';
import { MatchingService } from '../../../matching';
import { MatchReport } from '../../../../entities/match-report';

@Component({
    selector: 'jhi-proof-post',
    templateUrl: 'proof-post.component.html',
    styleUrls: []
})
export class ProofPostComponent implements OnInit {

    // This variable is used to store data of form.
    post: Post = new Post();
    workLocationList = [];
    loginAccount: Account;
    biz: Biz;

    constructor(
        private createPostService: CreatePostService,
        private postService: PostService,
        private proRequestService: ProRequestService,
        private postModalService: PostModalService,
        private principal: Principal,
        private bizService: BizService,
        private matchingService: MatchingService
    ) {
        this.createPostService.getPost().subscribe((post) => {
            if (post.project) {
                this.post = post;
            }
        })
    }

    ngOnInit() {
        // get login user information
        this.principal.identity().then((account) => {
            this.loginAccount = account;
            this.bizService.findByUserID(Number(account.id))
                .subscribe((bizResponse: HttpResponse<Biz>) => {
                    this.biz = bizResponse.body;
                });
        });
    }

    saveData() {
        console.log("Save post");
        // convert address model to suitable format for REST API
        this.workLocationList = [];
        this.post.proRequests.forEach(element => {
            this.workLocationList.push(element.workLocation);
        });
        this.post.proRequests.map((item) => {
            if (item.workLocation) {
                item.latitude = item.workLocation.latitude;
                item.longitude = item.workLocation.longitude;
                item.workLocation = {
                    name: item.workLocation.city,
                    stateName: item.workLocation.state,
                    state: {
                        name: item.workLocation.state
                    }
                }

            }
        });
        this.post.owner = new User;
        this.post.owner.id = this.loginAccount.id;
        // Case: Create post
        if (this.post.isCreatePost) {
            this.postService.create(this.post).subscribe((res: HttpResponse<any>) =>
                this.onSaveSuccess(res.body, this.post.isCreatePost), (res: HttpErrorResponse) => this.onSaveError(res));
        }
        // Case: Create Pro-request
        else {
            this.proRequestService.createProRequestFromPost(this.post).subscribe((res: HttpResponse<any>) =>
                this.onSaveSuccess(res.body, this.post.isCreatePost), (res: HttpErrorResponse) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: any, isCreatePost: boolean) {
        if (!isCreatePost) {
            this.matchingService.find(result.id)
                .subscribe((matchReportResponse: HttpResponse<MatchReport>) => {
                    this.matchingService.matchReport = matchReportResponse.body;
                });
        }
        this.createPostService.error = false;
        this.postModalService.open(isCreatePost, result.id);
        // reset data
        this.workLocationList = [];
        this.createPostService.resetData();
    }

    private onSaveError(error) {
        this.createPostService.error = true;
        this.postModalService.open(this.post.isCreatePost, -1);
        // restore address
        this.restoreAddress();
    }

    restoreAddress() {
        this.workLocationList.forEach(
            (item, index) => {
                this.post.proRequests[index].workLocation = item
            }
        );
    }

}
