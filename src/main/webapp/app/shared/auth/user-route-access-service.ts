import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Principal } from '../';
import { StateStorageService } from './state-storage.service';
import {ModalDialogService} from '../dialog/modal-dialog.service'

@Injectable()
export class UserRouteAccessService implements CanActivate {

    constructor(private router: Router,
                private principal: Principal,
                private modalDialogService: ModalDialogService,
                private stateStorageService: StateStorageService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

        const authorities = route.data['authorities'];
        // We need to call the checkLogin / and so the principal.identity() function, to ensure,
        // that the client has a principal too, if they already logged in by the server.
        // This could happen on a page refresh.
        return this.checkLogin(authorities, state.url);
    }

    checkLogin(authorities: string[], url: string): Promise<boolean> {
        const principal = this.principal;
        return Promise.resolve(principal.identity().then((account) => {

            if (!authorities || authorities.length === 0) {
                return true;
            }

            if (account) {
                return principal.hasAnyAuthority(authorities).then((response) => {
                    if (response) {
                        return true;
                    }
                    this.show403Error();
                    return false;
                });
            }

            this.stateStorageService.storeUrl(url);
            this.router.navigate(["/"]).then(() => {
                this.show403Error();
            });
            return false;
        }));
    }

    show403Error() {
        let map = new Map<string,VoidFunction>();
        map.set("error.button",null)
        this.modalDialogService.open(
            "error.title",
            "error.http.403",
            map,
            false
        );
    }
}
