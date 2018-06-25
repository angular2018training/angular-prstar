/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProstarsWebTestModule } from '../../../test.module';
import { InterviewScoreComponent } from '../../../../../../main/webapp/app/entities/interview-score/interview-score.component';
import { InterviewScoreService } from '../../../../../../main/webapp/app/entities/interview-score/interview-score.service';
import { InterviewScore } from '../../../../../../main/webapp/app/entities/interview-score/interview-score.model';

describe('Component Tests', () => {

    describe('InterviewScore Management Component', () => {
        let comp: InterviewScoreComponent;
        let fixture: ComponentFixture<InterviewScoreComponent>;
        let service: InterviewScoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [InterviewScoreComponent],
                providers: [
                    InterviewScoreService
                ]
            })
            .overrideTemplate(InterviewScoreComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterviewScoreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterviewScoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InterviewScore(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.interviewScores[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
