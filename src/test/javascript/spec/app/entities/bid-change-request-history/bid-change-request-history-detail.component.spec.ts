/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProstarsWebTestModule } from '../../../test.module';
import { BidChangeRequestHistoryDetailComponent } from '../../../../../../main/webapp/app/entities/bid-change-request-history/bid-change-request-history-detail.component';
import { BidChangeRequestHistoryService } from '../../../../../../main/webapp/app/entities/bid-change-request-history/bid-change-request-history.service';
import { BidChangeRequestHistory } from '../../../../../../main/webapp/app/entities/bid-change-request-history/bid-change-request-history.model';

describe('Component Tests', () => {

    describe('BidChangeRequestHistory Management Detail Component', () => {
        let comp: BidChangeRequestHistoryDetailComponent;
        let fixture: ComponentFixture<BidChangeRequestHistoryDetailComponent>;
        let service: BidChangeRequestHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [BidChangeRequestHistoryDetailComponent],
                providers: [
                    BidChangeRequestHistoryService
                ]
            })
            .overrideTemplate(BidChangeRequestHistoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BidChangeRequestHistoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BidChangeRequestHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BidChangeRequestHistory(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bidChangeRequestHistory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
