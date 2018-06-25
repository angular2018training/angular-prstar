/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProstarsWebTestModule } from '../../../test.module';
import { InterviewTemplateComponent } from '../../../../../../main/webapp/app/entities/interview-template/interview-template.component';
import { InterviewTemplateService } from '../../../../../../main/webapp/app/entities/interview-template/interview-template.service';
import { InterviewTemplate } from '../../../../../../main/webapp/app/entities/interview-template/interview-template.model';

describe('Component Tests', () => {

    describe('InterviewTemplate Management Component', () => {
        let comp: InterviewTemplateComponent;
        let fixture: ComponentFixture<InterviewTemplateComponent>;
        let service: InterviewTemplateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [InterviewTemplateComponent],
                providers: [
                    InterviewTemplateService
                ]
            })
            .overrideTemplate(InterviewTemplateComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterviewTemplateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterviewTemplateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InterviewTemplate(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.interviewTemplates[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
