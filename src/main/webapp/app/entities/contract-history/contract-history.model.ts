import { BaseEntity } from './../../shared';

export class ContractHistory implements BaseEntity {
    constructor(
        public id?: number,
        public note?: string,
        public createdDate?: any,
        public contractId?: number,
        public file?: File,
    ) {
    }
}
