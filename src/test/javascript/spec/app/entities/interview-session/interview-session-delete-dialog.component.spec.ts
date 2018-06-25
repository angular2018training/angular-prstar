/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProstarsWebTestModule } from '../../../test.module';
import { InterviewSessionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/interview-session/interview-session-delete-dialog.component';
import { InterviewSessionService } from '../../../../../../main/webapp/app/entities/interview-session/interview-session.service';

describe('Component Tests', () => {

    describe('InterviewSession Management Delete Component', () => {
        let comp: InterviewSessionDeleteDialogComponent;
        let fixture: ComponentFixture<InterviewSessionDeleteDialogComponent>;
        let service: InterviewSessionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [InterviewSessionDeleteDialogComponent],
                providers: [
                    InterviewSessionService
                ]
            })
            .overrideTemplate(InterviewSessionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterviewSessionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterviewSessionService);
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
