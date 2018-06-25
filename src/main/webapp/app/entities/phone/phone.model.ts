import { BaseEntity } from './../../shared';

export const enum PhoneType {
    'HOME',
    'CELL',
    'OFFICE',
    'OTHER'
}

export class Phone implements BaseEntity {
    constructor(
        public id?: number,
        public number?: string,
        public type?: PhoneType,
    ) {
    }
}
