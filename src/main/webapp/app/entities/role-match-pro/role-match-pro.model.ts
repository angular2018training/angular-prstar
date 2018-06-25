import { BaseEntity } from './../../shared';

export const enum DecisionStatus {
    'SAVED',
    'PASSED'
}

export class RoleMatchPro implements BaseEntity {
    constructor(
        public id?: number,
        public status?: DecisionStatus,
    ) {
    }
}
