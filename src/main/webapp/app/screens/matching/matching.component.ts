import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Post } from './matching.model';
import { MatchingService } from './matching.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-matching',
    templateUrl: './matching.component.html'
})
export class MatchingComponent implements OnInit, OnDestroy {
    posts: Post[];
    piddedPosts: Post[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private matchingService: MatchingService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadPosts() {
        this.matchingService.unpiddedPosts().subscribe(
            (res: HttpResponse<Post[]>) => {
                this.posts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadPiddedPosts() {
        this.matchingService.piddedPosts().subscribe(
            (res: HttpResponse<Post[]>) => {
                this.piddedPosts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadPosts();
        this.loadPiddedPosts();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMatchings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    pid(postId: number) {
        this.matchingService.pid(postId).subscribe(
            (res: any) => {
                this.loadPosts();
                this.loadPiddedPosts();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    cancelPid(postId: number) {
        this.matchingService.cancelPid(postId).subscribe(
            (res: any) => {
                this.loadPosts();
                this.loadPiddedPosts();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackId(index: number, item: Post) {
        return item.id;
    }

    registerChangeInMatchings() {
        this.eventSubscriber = this.eventManager.subscribe('matchingModification', (response) => {
            this.loadPosts();
            this.loadPiddedPosts();
        });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
