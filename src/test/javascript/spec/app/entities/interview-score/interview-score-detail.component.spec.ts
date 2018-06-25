/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProstarsWebTestModule } from '../../../test.module';
import { InterviewScoreDetailComponent } from '../../../../../../main/webapp/app/entities/interview-score/interview-score-detail.component';
import { InterviewScoreService } from '../../../../../../main/webapp/app/entities/interview-score/interview-score.service';
import { InterviewScore } from '../../../../../../main/webapp/app/entities/interview-score/interview-score.model';

describe('Component Tests', () => {

    describe('InterviewScore Management Detail Component', () => {
        let comp: InterviewScoreDetailComponent;
        let fixture: ComponentFixture<InterviewScoreDetailComponent>;
        let service: InterviewScoreService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [InterviewScoreDetailComponent],
                providers: [
                    InterviewScoreService
                ]
            })
            .overrideTemplate(InterviewScoreDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterviewScoreDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterviewScoreService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InterviewScore(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.interviewScore).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
