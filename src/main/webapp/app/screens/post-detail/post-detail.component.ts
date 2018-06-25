import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PostDTO, ProRequirement } from './post-detail.model';
import { PostDetailService } from './post-detail.service';
import { Principal } from '../../shared'

@Component({
    selector: 'jhi-post-detail',
    templateUrl: './post-detail.component.html',
    styles: []
})
export class PostDetailComponent implements OnInit, OnDestroy {
    post: PostDTO;
    currentAccount: any;
    eventSubscriber: Subscription;
    isLoaded: Boolean;

    constructor(
        private postDetailService: PostDetailService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.loadPost(params['id']);
        });
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPost();
        this.isLoaded = false;
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    loadPost(id) {
        this.postDetailService.get(id).subscribe(
            (res: HttpResponse<PostDTO>) => {
                this.post = res.body;
                this.isLoaded = true;
            },
            (res: HttpErrorResponse) => { this.onError(res.message) }
        );
    }

    onBidClick(id) {
        this.router.navigate(['/create-bid'], { queryParams: { proReqID: id } });
    }

    private onError(error) {
        this.jhiAlertService.error(error.mesage, null, null);
    }

    registerChangeInPost() {
        this.eventSubscriber = this.eventManager.subscribe('postsListModification', (response) => {
            this.loadPost(this.post.id);
        });
    }

}