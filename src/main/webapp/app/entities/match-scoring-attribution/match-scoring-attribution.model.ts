import { BaseEntity } from './../../shared';

export const enum MatchType {
    'POST',
    'MATCH'
}

export class MatchScoringAttribution implements BaseEntity {
    constructor(
        public id?: number,
        public skills?: number,
        public rate?: number,
        public roleName?: number,
        public rating?: number,
        public industryExpertise?: number,
        public type?: MatchType,
    ) {
    }
}
