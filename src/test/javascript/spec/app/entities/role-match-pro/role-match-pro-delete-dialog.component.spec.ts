/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProstarsWebTestModule } from '../../../test.module';
import { RoleMatchProDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/role-match-pro/role-match-pro-delete-dialog.component';
import { RoleMatchProService } from '../../../../../../main/webapp/app/entities/role-match-pro/role-match-pro.service';

describe('Component Tests', () => {

    describe('RoleMatchPro Management Delete Component', () => {
        let comp: RoleMatchProDeleteDialogComponent;
        let fixture: ComponentFixture<RoleMatchProDeleteDialogComponent>;
        let service: RoleMatchProService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProstarsWebTestModule],
                declarations: [RoleMatchProDeleteDialogComponent],
                providers: [
                    RoleMatchProService
                ]
            })
            .overrideTemplate(RoleMatchProDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoleMatchProDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleMatchProService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
