import { BaseEntity } from './../../shared';

export class CommissionLevel implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public commissionRate?: number,
        public updatedDate?: any,
        public levels?: BaseEntity[],
    ) {
    }
}
