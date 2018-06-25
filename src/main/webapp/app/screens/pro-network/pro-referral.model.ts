// import { Pro } from './../../entities/pro/pro.model';
import { Role } from './../../shared/master/master.model';

export class Referral {
    constructor(
        public proName: string,
        public roleName: string[],
        public referralStatus: ReferralStatus
    ) { }

}

export const enum ReferralStatus {
    REFERRAL_SENT = 'REFERRAL_SENT',
    IN_REVIEW = 'IN_REVIEW',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    PROFILE_SETUP = 'PROFILE_SETUP'
}