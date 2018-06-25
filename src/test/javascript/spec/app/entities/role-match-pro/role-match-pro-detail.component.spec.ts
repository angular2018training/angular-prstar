/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProstarsWebTestModule } from '../../../test.module';
import { RoleMatchProDetailComponent } from '../../../../../../main/webapp/app/entities/role-match-pro/role-match-pro-detail.component';
import { RoleMatchProService } from '../../../../../../main/webapp/app/entities/role-match-pro/role-match-pro.service';
import { RoleMatchPro } from '../../../../../../main/webapp/app/entities/role-match-pro/role-match-pro.model';

describe('Component Tests', () => {

    describe('RoleMatchPro Management Detail Component', () => {
        let comp: RoleMatchProDetailComponent;
        let fixture: ComponentFixture<RoleMatchProDetailComponent>;
        let service: RoleMatchProService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [RoleMatchProDetailComponent],
                providers: [
                    RoleMatchProService
                ]
            })
            .overrideTemplate(RoleMatchProDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoleMatchProDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleMatchProService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RoleMatchPro(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.roleMatchPro).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
