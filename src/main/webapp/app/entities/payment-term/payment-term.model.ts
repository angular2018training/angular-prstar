import { BaseEntity } from './../../shared';

export class PaymentTerm implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public term?: number,
    ) {
    }
}
