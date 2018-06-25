import { BaseEntity } from './../../shared';

export class ProRequirement implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public workLocation?: string,
        public additionalCommmentary?: string,
        public projectId?: number,
        public proRequirementSkills?: BaseEntity[],
        public roleName?: string,
        public roleId?: number,
        public bidDeadline?: any,
        public decisionDate?: any
    ) {
    }
}
