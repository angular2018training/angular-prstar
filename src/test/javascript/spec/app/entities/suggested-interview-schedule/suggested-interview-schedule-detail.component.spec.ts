/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProstarsWebTestModule } from '../../../test.module';
import { SuggestedInterviewScheduleDetailComponent } from '../../../../../../main/webapp/app/entities/suggested-interview-schedule/suggested-interview-schedule-detail.component';
import { SuggestedInterviewScheduleService } from '../../../../../../main/webapp/app/entities/suggested-interview-schedule/suggested-interview-schedule.service';
import { SuggestedInterviewSchedule } from '../../../../../../main/webapp/app/entities/suggested-interview-schedule/suggested-interview-schedule.model';

describe('Component Tests', () => {

    describe('SuggestedInterviewSchedule Management Detail Component', () => {
        let comp: SuggestedInterviewScheduleDetailComponent;
        let fixture: ComponentFixture<SuggestedInterviewScheduleDetailComponent>;
        let service: SuggestedInterviewScheduleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [SuggestedInterviewScheduleDetailComponent],
                providers: [
                    SuggestedInterviewScheduleService
                ]
            })
            .overrideTemplate(SuggestedInterviewScheduleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SuggestedInterviewScheduleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuggestedInterviewScheduleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SuggestedInterviewSchedule(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.suggestedInterviewSchedule).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
