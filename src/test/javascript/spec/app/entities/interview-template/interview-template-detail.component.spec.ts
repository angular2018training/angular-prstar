/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProstarsWebTestModule } from '../../../test.module';
import { InterviewTemplateDetailComponent } from '../../../../../../main/webapp/app/entities/interview-template/interview-template-detail.component';
import { InterviewTemplateService } from '../../../../../../main/webapp/app/entities/interview-template/interview-template.service';
import { InterviewTemplate } from '../../../../../../main/webapp/app/entities/interview-template/interview-template.model';

describe('Component Tests', () => {

    describe('InterviewTemplate Management Detail Component', () => {
        let comp: InterviewTemplateDetailComponent;
        let fixture: ComponentFixture<InterviewTemplateDetailComponent>;
        let service: InterviewTemplateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [InterviewTemplateDetailComponent],
                providers: [
                    InterviewTemplateService
                ]
            })
            .overrideTemplate(InterviewTemplateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterviewTemplateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterviewTemplateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InterviewTemplate(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.interviewTemplate).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
