import { Pro } from './../../entities/pro/pro.model'
export class VettingModel {
    constructor(
        public id?: number,
        public createdDate?: any,
        public decision?: Decision,
        public vetterComment?: string,
        public applicantId?: number,
        public veterId?: number,
        public applicant?: Pro,
        public isReady: boolean = false,
        public decisionOption?: number
    ) { }
}
export const enum Decision {
    NO = 'NO',
    YES = 'YES',
    AWAITING = 'AWAITING'
}