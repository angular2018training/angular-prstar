/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProstarsWebTestModule } from '../../../test.module';
import { ContractHistoryComponent } from '../../../../../../main/webapp/app/entities/contract-history/contract-history.component';
import { ContractHistoryService } from '../../../../../../main/webapp/app/entities/contract-history/contract-history.service';
import { ContractHistory } from '../../../../../../main/webapp/app/entities/contract-history/contract-history.model';

describe('Component Tests', () => {

    describe('ContractHistory Management Component', () => {
        let comp: ContractHistoryComponent;
        let fixture: ComponentFixture<ContractHistoryComponent>;
        let service: ContractHistoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [ContractHistoryComponent],
                providers: [
                    ContractHistoryService
                ]
            })
            .overrideTemplate(ContractHistoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContractHistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContractHistoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ContractHistory(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.contractHistories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
