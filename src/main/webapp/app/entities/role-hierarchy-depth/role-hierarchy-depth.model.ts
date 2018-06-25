import { BaseEntity } from './../../shared';

export class RoleHierarchyDepth implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public depth?: number,
    ) {
    }
}
