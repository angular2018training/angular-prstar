/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProstarsWebTestModule } from '../../../test.module';
import { ContractHistoryDetailComponent } from '../../../../../../main/webapp/app/entities/contract-history/contract-history-detail.component';
import { ContractHistoryService } from '../../../../../../main/webapp/app/entities/contract-history/contract-history.service';
import { ContractHistory } from '../../../../../../main/webapp/app/entities/contract-history/contract-history.model';

describe('Component Tests', () => {

    describe('ContractHistory Management Detail Component', () => {
        let comp: ContractHistoryDetailComponent;
        let fixture: ComponentFixture<ContractHistoryDetailComponent>;
        let service: ContractHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [ContractHistoryDetailComponent],
                providers: [
                    ContractHistoryService
                ]
            })
            .overrideTemplate(ContractHistoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContractHistoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContractHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ContractHistory(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.contractHistory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
