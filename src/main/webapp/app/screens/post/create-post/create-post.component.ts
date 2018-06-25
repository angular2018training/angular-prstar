import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { UrlSegment } from "@angular/router/src/url_tree";

@Component({
    selector: 'jhi-create-post',
    templateUrl: 'create-post.component.html',
    styleUrls: [],
    inputs: ['isCreatePost']
})
export class CreatePostComponent implements OnInit {

    // This variable is used to display buttons on GUI
    isCreatePost: boolean;
    constructor(
        private route: ActivatedRoute
    ) {
        if (this.route.snapshot.url[0].path == 'create-post') {
            this.isCreatePost = true;
        } else {
            this.isCreatePost = false;
        }
    }

    ngOnInit() {
        
    }

}
