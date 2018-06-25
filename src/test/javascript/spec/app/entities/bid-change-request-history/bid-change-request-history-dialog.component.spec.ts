/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProstarsWebTestModule } from '../../../test.module';
import { BidChangeRequestHistoryDialogComponent } from '../../../../../../main/webapp/app/entities/bid-change-request-history/bid-change-request-history-dialog.component';
import { BidChangeRequestHistoryService } from '../../../../../../main/webapp/app/entities/bid-change-request-history/bid-change-request-history.service';
import { BidChangeRequestHistory } from '../../../../../../main/webapp/app/entities/bid-change-request-history/bid-change-request-history.model';

describe('Component Tests', () => {

    describe('BidChangeRequestHistory Management Dialog Component', () => {
        let comp: BidChangeRequestHistoryDialogComponent;
        let fixture: ComponentFixture<BidChangeRequestHistoryDialogComponent>;
        let service: BidChangeRequestHistoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [BidChangeRequestHistoryDialogComponent],
                providers: [
                    BidChangeRequestHistoryService
                ]
            })
            .overrideTemplate(BidChangeRequestHistoryDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BidChangeRequestHistoryDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BidChangeRequestHistoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BidChangeRequestHistory(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.bidChangeRequestHistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bidChangeRequestHistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BidChangeRequestHistory();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.bidChangeRequestHistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bidChangeRequestHistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
