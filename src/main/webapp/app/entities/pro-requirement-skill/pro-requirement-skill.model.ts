import { BaseEntity } from './../../shared';

export class ProRequirementSkill implements BaseEntity {
    constructor(
        public id?: number,
        public strength?: number,
        public yearsOfExperience?: number,
        public proRequirementId?: number,
        public skillName?: string,
        public skillId?: number,
    ) {
    }
}
