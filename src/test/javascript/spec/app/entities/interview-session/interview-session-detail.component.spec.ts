/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProstarsWebTestModule } from '../../../test.module';
import { InterviewSessionDetailComponent } from '../../../../../../main/webapp/app/entities/interview-session/interview-session-detail.component';
import { InterviewSessionService } from '../../../../../../main/webapp/app/entities/interview-session/interview-session.service';
import { InterviewSession } from '../../../../../../main/webapp/app/entities/interview-session/interview-session.model';

describe('Component Tests', () => {

    describe('InterviewSession Management Detail Component', () => {
        let comp: InterviewSessionDetailComponent;
        let fixture: ComponentFixture<InterviewSessionDetailComponent>;
        let service: InterviewSessionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [InterviewSessionDetailComponent],
                providers: [
                    InterviewSessionService
                ]
            })
            .overrideTemplate(InterviewSessionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterviewSessionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterviewSessionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InterviewSession(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.interviewSession).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
