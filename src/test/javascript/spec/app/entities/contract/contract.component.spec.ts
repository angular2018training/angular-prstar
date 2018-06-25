/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProstarsWebTestModule } from '../../../test.module';
import { ContractComponent } from '../../../../../../main/webapp/app/entities/contract/contract.component';
import { ContractService } from '../../../../../../main/webapp/app/entities/contract/contract.service';
import { Contract } from '../../../../../../main/webapp/app/entities/contract/contract.model';

describe('Component Tests', () => {

    describe('Contract Management Component', () => {
        let comp: ContractComponent;
        let fixture: ComponentFixture<ContractComponent>;
        let service: ContractService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [ContractComponent],
                providers: [
                    ContractService
                ]
            })
            .overrideTemplate(ContractComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContractComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContractService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Contract(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.contracts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
