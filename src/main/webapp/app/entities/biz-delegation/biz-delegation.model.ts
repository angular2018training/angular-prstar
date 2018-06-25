import { BaseEntity } from './../../shared';

export const enum Status {
    'DONE',
    'DELEGATED'
}

export class BizDelegation implements BaseEntity {
    constructor(
        public id?: number,
        public status?: Status,
        public typeId?: number,
    ) {
    }
}
