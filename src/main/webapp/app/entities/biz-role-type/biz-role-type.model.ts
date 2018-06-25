import { BaseEntity } from './../../shared';

export class BizRoleType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
