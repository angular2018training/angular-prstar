/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProstarsWebTestModule } from '../../../test.module';
import { InterviewSessionComponent } from '../../../../../../main/webapp/app/entities/interview-session/interview-session.component';
import { InterviewSessionService } from '../../../../../../main/webapp/app/entities/interview-session/interview-session.service';
import { InterviewSession } from '../../../../../../main/webapp/app/entities/interview-session/interview-session.model';

describe('Component Tests', () => {

    describe('InterviewSession Management Component', () => {
        let comp: InterviewSessionComponent;
        let fixture: ComponentFixture<InterviewSessionComponent>;
        let service: InterviewSessionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [InterviewSessionComponent],
                providers: [
                    InterviewSessionService
                ]
            })
            .overrideTemplate(InterviewSessionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterviewSessionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterviewSessionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InterviewSession(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.interviewSessions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
