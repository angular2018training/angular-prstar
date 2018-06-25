/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProstarsWebTestModule } from '../../../test.module';
import { BidChangeRequestHistoryComponent } from '../../../../../../main/webapp/app/entities/bid-change-request-history/bid-change-request-history.component';
import { BidChangeRequestHistoryService } from '../../../../../../main/webapp/app/entities/bid-change-request-history/bid-change-request-history.service';
import { BidChangeRequestHistory } from '../../../../../../main/webapp/app/entities/bid-change-request-history/bid-change-request-history.model';

describe('Component Tests', () => {

    describe('BidChangeRequestHistory Management Component', () => {
        let comp: BidChangeRequestHistoryComponent;
        let fixture: ComponentFixture<BidChangeRequestHistoryComponent>;
        let service: BidChangeRequestHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [BidChangeRequestHistoryComponent],
                providers: [
                    BidChangeRequestHistoryService
                ]
            })
            .overrideTemplate(BidChangeRequestHistoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BidChangeRequestHistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BidChangeRequestHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BidChangeRequestHistory(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bidChangeRequestHistories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
