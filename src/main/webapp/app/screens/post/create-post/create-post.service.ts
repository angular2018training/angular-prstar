import { Injectable } from '@angular/core';
import { Post } from '../../../shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/**
 * This Service used to share data between Introduction and its children.
 */
@Injectable()
export class CreatePostService {

    post: Post = new Post(null, {}, null, null, "false", 1);

    private postSource = new BehaviorSubject<Post>(this.post);

    error = false;

    constructor() {
    }

    setPost(post: Post) {
        this.postSource.next(post);
    }

    getPost() {
        return this.postSource;
    }

    resetData() {
        this.post.project.projectName = '';
        this.post.project.startDate = null;
        this.post.project.endDate = null;
        this.post.project.bidDeadline = null;
        this.post.project.decitionDate = null;
        this.post.project.description = '';

        this.post = new Post(null, {}, null, null, "false", 1, null, this.post.isCreatePost);
        this.postSource = new BehaviorSubject<Post>(this.post);
    }
}
