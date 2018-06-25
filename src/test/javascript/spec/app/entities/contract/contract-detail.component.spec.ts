/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProstarsWebTestModule } from '../../../test.module';
import { ContractDetailComponent } from '../../../../../../main/webapp/app/entities/contract/contract-detail.component';
import { ContractService } from '../../../../../../main/webapp/app/entities/contract/contract.service';
import { Contract } from '../../../../../../main/webapp/app/entities/contract/contract.model';

describe('Component Tests', () => {

    describe('Contract Management Detail Component', () => {
        let comp: ContractDetailComponent;
        let fixture: ComponentFixture<ContractDetailComponent>;
        let service: ContractService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [ContractDetailComponent],
                providers: [
                    ContractService
                ]
            })
            .overrideTemplate(ContractDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContractDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContractService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Contract(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.contract).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
