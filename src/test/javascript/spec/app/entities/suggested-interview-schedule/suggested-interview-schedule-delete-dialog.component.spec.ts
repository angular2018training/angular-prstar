/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProstarsWebTestModule } from '../../../test.module';
import { SuggestedInterviewScheduleDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/suggested-interview-schedule/suggested-interview-schedule-delete-dialog.component';
import { SuggestedInterviewScheduleService } from '../../../../../../main/webapp/app/entities/suggested-interview-schedule/suggested-interview-schedule.service';

describe('Component Tests', () => {

    describe('SuggestedInterviewSchedule Management Delete Component', () => {
        let comp: SuggestedInterviewScheduleDeleteDialogComponent;
        let fixture: ComponentFixture<SuggestedInterviewScheduleDeleteDialogComponent>;
        let service: SuggestedInterviewScheduleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [SuggestedInterviewScheduleDeleteDialogComponent],
                providers: [
                    SuggestedInterviewScheduleService
                ]
            })
            .overrideTemplate(SuggestedInterviewScheduleDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SuggestedInterviewScheduleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuggestedInterviewScheduleService);
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
