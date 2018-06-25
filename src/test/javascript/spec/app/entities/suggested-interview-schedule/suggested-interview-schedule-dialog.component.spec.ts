/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProstarsWebTestModule } from '../../../test.module';
import { SuggestedInterviewScheduleDialogComponent } from '../../../../../../main/webapp/app/entities/suggested-interview-schedule/suggested-interview-schedule-dialog.component';
import { SuggestedInterviewScheduleService } from '../../../../../../main/webapp/app/entities/suggested-interview-schedule/suggested-interview-schedule.service';
import { SuggestedInterviewSchedule } from '../../../../../../main/webapp/app/entities/suggested-interview-schedule/suggested-interview-schedule.model';
import { InterviewSessionService } from '../../../../../../main/webapp/app/entities/interview-session';

describe('Component Tests', () => {

    describe('SuggestedInterviewSchedule Management Dialog Component', () => {
        let comp: SuggestedInterviewScheduleDialogComponent;
        let fixture: ComponentFixture<SuggestedInterviewScheduleDialogComponent>;
        let service: SuggestedInterviewScheduleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [SuggestedInterviewScheduleDialogComponent],
                providers: [
                    InterviewSessionService,
                    SuggestedInterviewScheduleService
                ]
            })
            .overrideTemplate(SuggestedInterviewScheduleDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SuggestedInterviewScheduleDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuggestedInterviewScheduleService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SuggestedInterviewSchedule(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.suggestedInterviewSchedule = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'suggestedInterviewScheduleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SuggestedInterviewSchedule();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.suggestedInterviewSchedule = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'suggestedInterviewScheduleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
