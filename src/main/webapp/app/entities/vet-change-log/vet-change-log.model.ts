import { BaseEntity } from './../../shared';

export const enum Decision {
    'NO',
    'YES',
    'AWAITING'
}

export class VetChangeLog implements BaseEntity {
    constructor(
        public id?: number,
        public createdDate?: any,
        public decision?: Decision,
        public vetterComment?: string,
        public applicantId?: number,
        public veterId?: number,
    ) {
    }
}
