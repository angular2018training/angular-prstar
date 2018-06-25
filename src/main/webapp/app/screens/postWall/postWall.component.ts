import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { AngularMultiSelectModule } from './../../shared/angular2-multiselect-dropdown-custom/angular2-multiselect-dropdown';
import { Observable } from 'rxjs/Observable';

import { DropDownItem } from '../../shared/model/dropdown-item.model';
import { PostWallDTO, PostDTO, Project, Industry, CriteriaDTO } from './postWall.model';
import { PostWallService } from './postWall.service';
import { Principal } from '../../shared'
import { Address } from '../../shared/model/address';
declare var window: any;

@Component({
    selector: 'jhi-post-wall',
    templateUrl: './postWall.component.html',
    styles: []
})
export class PostWallComponent implements OnInit, OnDestroy {
    posts: PostWallDTO[];
    currentAccount: any;
    eventSubscriber: Subscription;
    industries;
    cities;
    selected = [];
    dropdownIndustrySettings;
    dropdownCitySettings;
    address: Address;
    criteria: CriteriaDTO;
    isLoaded: Boolean;

    constructor(
        private postWallService: PostWallService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadPost();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPostsLists();
        this.industries = [
            new DropDownItem(1, "IT"),
            new DropDownItem(2, "Construction"),
            new DropDownItem(3, "Banking"),
            new DropDownItem(4, "Agriculture"),
            new DropDownItem(5, "Manufacturing")
        ];

        this.cities = [
            new DropDownItem(128, "Fortitude Valley"),
            new DropDownItem(129, "Deventer"),
            new DropDownItem(130, "Providencia"),
            new DropDownItem(131, "Quakertown"),
            new DropDownItem(132, "Termeil")
        ];

        this.dropdownIndustrySettings = {
            singleSelection: true,
            disabled: false,
            text: 'Industry',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: 'myclass custom-class'
        };

        this.dropdownCitySettings = {
            singleSelection: true,
            disabled: false,
            text: 'City',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: 'myclass custom-class'
        };

        this.criteria = new CriteriaDTO(0, 0, '', '');

        this.isLoaded = false;
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    loadPost() {
        this.postWallService.get().subscribe(
            (res: HttpResponse<PostWallDTO[]>) => {
                this.posts = res.body;
                this.isLoaded = true;
            },
            (res: HttpErrorResponse) => { this.onError(res.message) }
        );
    }

    trackId(index: number, item: Project) {
        return item.id;
    }

    registerChangeInPostsLists() {
        this.eventSubscriber = this.eventManager.subscribe('postsListModification', (response) => {
            this.loadPost();
        });
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
                    'value' :  new Date()
                }
            }
        ],(data) => {
            this.criteria.startDate = data
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
            this.criteria.endDate = data
        }, null, new Date(), null);
        
    }

    private onError(error) {
        console.log(error);
        this.jhiAlertService.error(error.mesage, null, null);
    }

    search() {
        this.criteria.latitude = this.address.latitude;
        this.criteria.longitude = this.address.longitude;
        //console.log(this.criteria);
        this.subscribeToSearchPost(this.postWallService.search(this.criteria));
    }

    private subscribeToSearchPost(result: Observable<HttpResponse<PostWallDTO[]>>) {
        result.subscribe((res: HttpResponse<PostWallDTO[]>) => {
            this.posts = res.body;
            this.isLoaded = true;
            console.log(this.posts);
        }, (res: HttpErrorResponse) => { this.onError(res.message) });
    }

    onBidClick(id) {
        this.router.navigate(['/post-detail/' + id]);
    }
}