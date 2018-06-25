import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AccountService } from './account.service';
import { BizService } from '../../entities/biz/biz.service';
import { ProService } from '../../entities/pro/pro.service';

@Injectable()
export class Principal {
    private userIdentity: any;
    private authenticated = false;
    private authenticationState = new Subject<any>(); 
    constructor(
        private account: AccountService,
        private bizService: BizService,
        private proService: ProService
    ) {}

    authenticate(identity) {
        this.userIdentity = identity;
        this.authenticated = identity !== null;
        this.authenticationState.next(this.userIdentity);
    }

    hasAnyAuthority(authorities: string[]): Promise<boolean> {
        return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
    }

    hasAnyAuthorityDirect(authorities: string[]): boolean {
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
            return false;
        }

        for (let i = 0; i < authorities.length; i++) {
            if (this.userIdentity.authorities.includes(authorities[i])) {
                return true;
            }
        }

        return false;
    }

    hasAuthority(authority: string): Promise<boolean> {
        if (!this.authenticated) {
           return Promise.resolve(false);
        }

        return this.identity().then((id) => {
            return Promise.resolve(id.authorities && id.authorities.includes(authority));
        }, () => {
            return Promise.resolve(false);
        });
    }

    identity(force?: boolean): Promise<any> {
        if (force === true) {
            this.userIdentity = undefined;
        }

        // check and see if we have retrieved the userIdentity data from the server.
        // if we have, reuse it by immediately resolving
        if (this.userIdentity) {
            return Promise.resolve(this.userIdentity);
        }

        // retrieve the userIdentity data from the server, update the identity object, and then resolve.
        return this.account.get().toPromise().then((response) => {
            const account = response.body;
            if (account) {
                this.userIdentity = account;
                this.authenticated = true;
                if(account['authorities'].indexOf("ROLE_BIZ") > -1) {
                    this.getBizInfo(account);
                } else if(account['authorities'].indexOf("ROLE_PRO") > -1) {
                    this.getProInfo(account);
                }
            } else {
                this.userIdentity = null;
                this.authenticated = false;
            }
            this.authenticationState.next(this.userIdentity);
            return this.userIdentity;
        }).catch((err) => {
            this.userIdentity = null;
            this.authenticated = false;
            this.authenticationState.next(this.userIdentity);
            return null;
        });
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    isIdentityResolved(): boolean {
        return this.userIdentity !== undefined;
    }

    getAuthenticationState(): Observable<any> {
        return this.authenticationState.asObservable();
    }

    getImageUrl(): String {
        return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
    } 
 
    getUserIdentity():  any {
        return this.isIdentityResolved() ? this.userIdentity: null;
    }
    
    getBizInfo(account) {
        return this.bizService.findByBizUser(account.login)
        .subscribe((res) => {
            if(res) {
                sessionStorage.setItem('prostart_accout', JSON.stringify({
                    login: account['login'],
                    firstName : account['firstName'],
                    middleName : account['middleName'],
                    lastName : account['lastName'],
                    authorities: account['authorities'],
                    companyName: res.body.companyName,
                    avatar: res.body['companyLogoFile'] ? res.body['companyLogoFile'].content : null
                }));
            }
        });
    }

    getProInfo(account) {
        return this.proService.getAvatarCurrentLoginPro().subscribe(res => {
            if(res) {
                sessionStorage.setItem('prostart_accout', JSON.stringify({
                    login: account['login'],
                    firstName : account['firstName'],
                    middleName : account['middleName'],
                    lastName : account['lastName'],
                    authorities: account['authorities'],
                    avatar: res.body.pictureFile ? res.body.pictureFile.content : null,
                    contentType: res.body.pictureFile ? res.body.pictureFile.contentType: 'image/jpeg'
                }));
            }
        })
    }
}
