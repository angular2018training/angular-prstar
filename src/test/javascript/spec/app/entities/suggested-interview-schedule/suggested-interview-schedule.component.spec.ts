/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProstarsWebTestModule } from '../../../test.module';
import { SuggestedInterviewScheduleComponent } from '../../../../../../main/webapp/app/entities/suggested-interview-schedule/suggested-interview-schedule.component';
import { SuggestedInterviewScheduleService } from '../../../../../../main/webapp/app/entities/suggested-interview-schedule/suggested-interview-schedule.service';
import { SuggestedInterviewSchedule } from '../../../../../../main/webapp/app/entities/suggested-interview-schedule/suggested-interview-schedule.model';

describe('Component Tests', () => {

    describe('SuggestedInterviewSchedule Management Component', () => {
        let comp: SuggestedInterviewScheduleComponent;
        let fixture: ComponentFixture<SuggestedInterviewScheduleComponent>;
        let service: SuggestedInterviewScheduleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [SuggestedInterviewScheduleComponent],
                providers: [
                    SuggestedInterviewScheduleService
                ]
            })
            .overrideTemplate(SuggestedInterviewScheduleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SuggestedInterviewScheduleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuggestedInterviewScheduleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SuggestedInterviewSchedule(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.suggestedInterviewSchedules[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
