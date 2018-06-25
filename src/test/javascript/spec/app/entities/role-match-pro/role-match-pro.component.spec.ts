/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProstarsWebTestModule } from '../../../test.module';
import { RoleMatchProComponent } from '../../../../../../main/webapp/app/entities/role-match-pro/role-match-pro.component';
import { RoleMatchProService } from '../../../../../../main/webapp/app/entities/role-match-pro/role-match-pro.service';
import { RoleMatchPro } from '../../../../../../main/webapp/app/entities/role-match-pro/role-match-pro.model';

describe('Component Tests', () => {

    describe('RoleMatchPro Management Component', () => {
        let comp: RoleMatchProComponent;
        let fixture: ComponentFixture<RoleMatchProComponent>;
        let service: RoleMatchProService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [RoleMatchProComponent],
                providers: [
                    RoleMatchProService
                ]
            })
            .overrideTemplate(RoleMatchProComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoleMatchProComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleMatchProService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RoleMatchPro(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.roleMatchPros[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
