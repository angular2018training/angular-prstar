/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProstarsWebTestModule } from '../../../test.module';
import { InterviewScoreDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/interview-score/interview-score-delete-dialog.component';
import { InterviewScoreService } from '../../../../../../main/webapp/app/entities/interview-score/interview-score.service';

describe('Component Tests', () => {

    describe('InterviewScore Management Delete Component', () => {
        let comp: InterviewScoreDeleteDialogComponent;
        let fixture: ComponentFixture<InterviewScoreDeleteDialogComponent>;
        let service: InterviewScoreService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [InterviewScoreDeleteDialogComponent],
                providers: [
                    InterviewScoreService
                ]
            })
            .overrideTemplate(InterviewScoreDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterviewScoreDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterviewScoreService);
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
