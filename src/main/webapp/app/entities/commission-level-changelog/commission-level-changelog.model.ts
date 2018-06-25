import { BaseEntity } from './../../shared';

export class CommissionLevelChangelog implements BaseEntity {
    constructor(
        public id?: number,
        public updatedDate?: any,
        public commissionRate?: number,
        public commissionLevelId?: number,
    ) {
    }
}
