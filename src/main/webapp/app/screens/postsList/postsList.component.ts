import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Post, PostDTO } from './postsList.model';
import { PostsListService } from './postsList.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-posts-list',
    templateUrl: './postsList.component.html'
})
export class PostsListComponent implements OnInit, OnDestroy {
    posts: PostDTO[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private postsListService: PostsListService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadPosts() {
        this.postsListService.posts().subscribe(
            (res: HttpResponse<PostDTO[]>) => {
                this.posts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadPosts();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPostsLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Post) {
        return item.id;
    }

    registerChangeInPostsLists() {
        this.eventSubscriber = this.eventManager.subscribe('postsListModification', (response) => {
            this.loadPosts();
        });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
