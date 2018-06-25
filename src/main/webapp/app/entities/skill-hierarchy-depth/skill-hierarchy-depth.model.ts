import { BaseEntity } from './../../shared';

export class SkillHierarchyDepth implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public depth?: number,
    ) {
    }
}
