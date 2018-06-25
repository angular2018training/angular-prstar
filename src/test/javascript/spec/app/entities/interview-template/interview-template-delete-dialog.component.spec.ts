/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProstarsWebTestModule } from '../../../test.module';
import { InterviewTemplateDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/interview-template/interview-template-delete-dialog.component';
import { InterviewTemplateService } from '../../../../../../main/webapp/app/entities/interview-template/interview-template.service';

describe('Component Tests', () => {

    describe('InterviewTemplate Management Delete Component', () => {
        let comp: InterviewTemplateDeleteDialogComponent;
        let fixture: ComponentFixture<InterviewTemplateDeleteDialogComponent>;
        let service: InterviewTemplateService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [InterviewTemplateDeleteDialogComponent],
                providers: [
                    InterviewTemplateService
                ]
            })
            .overrideTemplate(InterviewTemplateDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterviewTemplateDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterviewTemplateService);
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
