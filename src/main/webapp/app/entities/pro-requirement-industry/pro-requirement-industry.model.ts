import { BaseEntity } from './../../shared';

export class ProRequirementIndustry implements BaseEntity {
    constructor(
        public id?: number,
        public yearsOfExperience?: number,
        public proRequirementId?: number,
        public industryName?: string,
        public industryId?: number,
    ) {
    }
}
