import { BaseEntity } from './../../shared';

export class InvoiceTerm implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public term?: number,
    ) {
    }
}
