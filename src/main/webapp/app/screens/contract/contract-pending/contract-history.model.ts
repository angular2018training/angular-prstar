import { BaseEntity, User } from '../../../shared';

export class ContractHistory implements BaseEntity {
    constructor(
        public id?: number,
        public note?: string,
        public createdDate?: any,
        public contractId?: number,
        public createdBy?: User,
        public file?: File,
    ) {
    }
}
