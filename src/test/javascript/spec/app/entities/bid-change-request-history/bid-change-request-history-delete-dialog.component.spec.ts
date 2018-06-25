/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProstarsWebTestModule } from '../../../test.module';
import { BidChangeRequestHistoryDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bid-change-request-history/bid-change-request-history-delete-dialog.component';
import { BidChangeRequestHistoryService } from '../../../../../../main/webapp/app/entities/bid-change-request-history/bid-change-request-history.service';

describe('Component Tests', () => {

    describe('BidChangeRequestHistory Management Delete Component', () => {
        let comp: BidChangeRequestHistoryDeleteDialogComponent;
        let fixture: ComponentFixture<BidChangeRequestHistoryDeleteDialogComponent>;
        let service: BidChangeRequestHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [BidChangeRequestHistoryDeleteDialogComponent],
                providers: [
                    BidChangeRequestHistoryService
                ]
            })
            .overrideTemplate(BidChangeRequestHistoryDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BidChangeRequestHistoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BidChangeRequestHistoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
